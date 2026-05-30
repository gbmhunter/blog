# /// script
# requires-python = ">=3.9"
# dependencies = ["pillow"]
# ///
"""Snip a region of the screen and save it as a resized, 85%-quality WebP.

Replaces the Greenshot -> save -> Affinity (resize + convert) -> save-to-_assets
workflow with a single step.

Everything is collected in the capture window itself (no terminal prompts), so
the tool can be launched either by hand or by another program:

    uv run scripts/snip-to-webp.py --outdir path/to/post/_assets

By default the tool *arms* and waits: navigate/scroll to whatever you want to
capture, then press the trigger hotkey (F9 by default) to freeze the screen. A
fullscreen overlay then appears — drag a box over the region, release, type a
filename and target width in the little panel, and press Enter (or click Save).
Esc cancels; dragging again reselects. The image is cropped, resized (preserving
aspect ratio), encoded as WebP at quality 85, and written to --outdir.

Flags:
    --outdir DIR    directory to save into (default: current working directory)
    --name NAME     output filename (".webp" appended if missing)
    --width PX      target width in pixels
    --key KEY       global hotkey that triggers the freeze (default: f9; also
                    f1-f12, printscreen, pause, scrolllock)
    --now           capture immediately, don't arm/wait for a hotkey
    --delay SECONDS capture after a fixed countdown instead of a hotkey
    --quality Q     WebP quality 0-100 (default: 85). Lower = smaller files;
                    ~75-80 is usually indistinguishable for screenshots.
--name/--width pre-fill (and hide) the matching panel field. If both are given,
the capture saves as soon as you release the mouse, with no panel at all.
"""
import argparse
import os
import sys
import tkinter as tk

from PIL import Image, ImageGrab, ImageTk

QUALITY = 85


def wait_for_trigger(key_name, cancel_name="f10"):
    """Block until the global hotkey is pressed. Return True to capture, False to cancel.

    Windows-only (uses RegisterHotKey so the key works even when another window is
    focused). On other platforms, returns True immediately.
    """
    if sys.platform != "win32":
        return True

    import ctypes
    from ctypes import wintypes

    vk_map = {f"f{i}": 0x70 + (i - 1) for i in range(1, 13)}
    vk_map.update({"printscreen": 0x2C, "prtsc": 0x2C, "pause": 0x13, "scrolllock": 0x91})
    vk = vk_map.get(key_name.lower())
    cancel_vk = vk_map.get(cancel_name.lower())
    if vk is None:
        print(f"Unknown --key '{key_name}'; capturing immediately.")
        return True

    user32 = ctypes.windll.user32
    user32.RegisterHotKey.argtypes = [wintypes.HWND, ctypes.c_int, wintypes.UINT, wintypes.UINT]
    user32.RegisterHotKey.restype = wintypes.BOOL
    MOD_NOREPEAT = 0x4000
    WM_HOTKEY = 0x0312
    CAP_ID, CANCEL_ID = 1, 2

    if not user32.RegisterHotKey(None, CAP_ID, MOD_NOREPEAT, vk):
        print(f"Could not register {key_name.upper()} (already in use?); capturing immediately.")
        return True
    has_cancel = bool(cancel_vk and user32.RegisterHotKey(None, CANCEL_ID, MOD_NOREPEAT, cancel_vk))

    msg = "Armed. Navigate to your target, then press " + key_name.upper() + " to capture"
    print(msg + (f" ({cancel_name.upper()} to cancel)." if has_cancel else "."), flush=True)

    message = wintypes.MSG()
    capture = True
    try:
        while user32.GetMessageW(ctypes.byref(message), None, 0, 0) > 0:
            if message.message == WM_HOTKEY:
                capture = message.wParam != CANCEL_ID
                break
    finally:
        user32.UnregisterHotKey(None, CAP_ID)
        if has_cancel:
            user32.UnregisterHotKey(None, CANCEL_ID)
    return capture


def run_capture(preset_name, preset_width):
    """Show the overlay and return {image, name, width} or None if cancelled."""
    # Make tkinter's logical coordinates match physical pixels so the crop lines
    # up correctly under Windows display scaling (e.g. 125% / 150%).
    if sys.platform == "win32":
        import ctypes

        try:
            ctypes.windll.shcore.SetProcessDpiAwareness(2)  # per-monitor v2
        except Exception:
            ctypes.windll.user32.SetProcessDPIAware()

    screenshot = ImageGrab.grab()  # primary monitor, physical pixels

    root = tk.Tk()
    root.attributes("-fullscreen", True)
    root.attributes("-topmost", True)
    root.configure(cursor="cross")

    canvas = tk.Canvas(root, highlightthickness=0)
    canvas.pack(fill=tk.BOTH, expand=True)
    photo = ImageTk.PhotoImage(screenshot)
    canvas.create_image(0, 0, anchor=tk.NW, image=photo)
    # Dim the frozen screenshot so the live selection stands out.
    canvas.create_rectangle(
        0, 0, screenshot.width, screenshot.height,
        fill="black", stipple="gray50", outline="",
    )

    st = {"x0": 0, "y0": 0, "x1": 0, "y1": 0, "rect": None, "win": None, "result": None}

    # ---- control panel (built once, shown after a selection is made) ----------
    panel = tk.Frame(root, bg="#222222", bd=2, relief="solid", padx=12, pady=10)
    info = tk.StringVar(value="")
    tk.Label(panel, textvariable=info, fg="white", bg="#222222",
             font=("Segoe UI", 10, "bold")).grid(row=0, column=0, columnspan=2,
                                                  sticky="w", pady=(0, 6))
    r = 1
    name_entry = None
    if preset_name is None:
        tk.Label(panel, text="Filename:", fg="white", bg="#222222").grid(
            row=r, column=0, sticky="e", padx=(0, 6), pady=2)
        name_entry = tk.Entry(panel, width=38)
        name_entry.grid(row=r, column=1, sticky="we", pady=2)
        r += 1
    width_entry = None
    if preset_width is None:
        tk.Label(panel, text="Width (px):", fg="white", bg="#222222").grid(
            row=r, column=0, sticky="e", padx=(0, 6), pady=2)
        width_entry = tk.Entry(panel, width=12)
        width_entry.grid(row=r, column=1, sticky="w", pady=2)
        r += 1
    tk.Label(panel, text="Enter = save   •   Esc = cancel   •   drag again to reselect",
             fg="#aaaaaa", bg="#222222", font=("Segoe UI", 8)).grid(
        row=r, column=0, columnspan=2, sticky="w", pady=(6, 0))
    r += 1
    btns = tk.Frame(panel, bg="#222222")
    btns.grid(row=r, column=0, columnspan=2, sticky="e", pady=(8, 0))

    def selection_size():
        return abs(st["x1"] - st["x0"]), abs(st["y1"] - st["y0"])

    def has_selection():
        w, h = selection_size()
        return w >= 2 and h >= 2

    def hide_panel():
        if st["win"] is not None:
            canvas.delete(st["win"])
            st["win"] = None

    def show_panel():
        w, h = selection_size()
        info.set(f"Selection: {w} × {h} px")
        if width_entry is not None:
            width_entry.delete(0, tk.END)
            width_entry.insert(0, str(w))
        if st["win"] is None:
            st["win"] = canvas.create_window(24, 24, anchor="nw", window=panel)
        if name_entry is not None:
            name_entry.focus_set()
        elif width_entry is not None:
            width_entry.focus_set()

    def do_save(_event=None):
        if not has_selection():
            return
        name = preset_name
        if name_entry is not None:
            name = name_entry.get().strip()
            if not name:
                info.set("Enter a filename.")
                return
        width = preset_width
        if width_entry is not None:
            txt = width_entry.get().strip()
            if not txt.isdigit() or int(txt) <= 0:
                info.set("Width must be a positive integer.")
                return
            width = int(txt)
        x0, x1 = sorted((st["x0"], st["x1"]))
        y0, y1 = sorted((st["y0"], st["y1"]))
        st["result"] = {"image": screenshot.crop((x0, y0, x1, y1)), "name": name, "width": width}
        root.quit()

    def do_cancel(_event=None):
        root.quit()

    tk.Button(btns, text="Cancel", command=do_cancel).pack(side="right", padx=(6, 0))
    tk.Button(btns, text="Save", command=do_save).pack(side="right")

    # ---- selection mouse handlers ---------------------------------------------
    def on_press(e):
        hide_panel()
        if st["rect"] is not None:
            canvas.delete(st["rect"])
        st["x0"], st["y0"] = e.x, e.y
        st["rect"] = canvas.create_rectangle(e.x, e.y, e.x, e.y, outline="red", width=2)

    def on_drag(e):
        st["x1"], st["y1"] = e.x, e.y
        canvas.coords(st["rect"], st["x0"], st["y0"], e.x, e.y)

    def on_release(e):
        st["x1"], st["y1"] = e.x, e.y
        if not has_selection():
            return
        # If nothing left to ask, save immediately.
        if name_entry is None and width_entry is None:
            do_save()
        else:
            show_panel()

    canvas.bind("<ButtonPress-1>", on_press)
    canvas.bind("<B1-Motion>", on_drag)
    canvas.bind("<ButtonRelease-1>", on_release)
    root.bind("<Return>", do_save)
    root.bind("<Escape>", do_cancel)

    root.mainloop()
    root.destroy()
    return st["result"]


def main():
    parser = argparse.ArgumentParser(description="Snip a screen region to a resized WebP.")
    parser.add_argument("--outdir", default=".", help="directory to save into (default: cwd)")
    parser.add_argument("--name", help="output filename (.webp appended if missing)")
    parser.add_argument("--width", type=int, help="target width in px")
    parser.add_argument("--key", default="f9", help="global hotkey to trigger the freeze (default: f9)")
    parser.add_argument("--now", action="store_true", help="capture immediately, don't wait for a hotkey")
    parser.add_argument("--delay", type=int, help="capture after a fixed countdown (seconds) instead of a hotkey")
    parser.add_argument("--quality", type=int, default=QUALITY, help=f"WebP quality 0-100 (default: {QUALITY})")
    args = parser.parse_args()

    if args.now:
        pass
    elif args.delay:
        import time

        print(f"Capturing in {args.delay}s — navigate now...", flush=True)
        time.sleep(args.delay)
    elif not wait_for_trigger(args.key):
        print("Cancelled.")
        return

    result = run_capture(args.name, args.width)
    if result is None:
        print("Cancelled / empty selection.")
        return

    region = result["image"]
    name = result["name"]
    if not name.lower().endswith(".webp"):
        name += ".webp"
    target_w = result["width"] if result["width"] is not None else region.width
    if target_w != region.width:
        target_h = round(region.height * target_w / region.width)
        region = region.resize((target_w, target_h), Image.LANCZOS)

    os.makedirs(args.outdir, exist_ok=True)
    out_path = os.path.join(args.outdir, name)
    region.save(out_path, "WEBP", quality=args.quality, method=6)
    print(f"Saved {out_path} ({region.width}x{region.height}px, quality {args.quality}).")


if __name__ == "__main__":
    main()
