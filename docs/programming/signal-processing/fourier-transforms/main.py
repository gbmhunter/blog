import matplotlib.pyplot as plt
import numpy as np
from PIL import Image, ImageDraw, ImageFont
from typing import Tuple

CREATE_DEBUG_IMAGES = False
IMAGE_WIDTH = 64
GIF_WIDTH = 800

BACKGROUND_COLOR = (255, 255, 255, 255)

def main():
    create_2d_transform()
    # create_gif(create_sin_image, 'sinusoidal.gif')
    # create_gif(create_square_image, 'square_wave.gif')

def create_2d_transform():

    Fs = 150.0 # sampling rate (Hz). Able to detect frequencies up to Fs/2
    Ts = 1/Fs # sampling interval (s)

    t_array = np.arange(0, 1, Ts)
    # f(t) = sin(5*2pi*t)
    ft_array = np.sin(5*2*np.pi*t_array) + 0.5*np.sin(10*2*np.pi*t_array)

    n = len(ft_array) # number of samples
    k = np.arange(0, n)
    T = n/Fs
    frq = k/T # two sided frequency range
    print(f'frq = {frq}')
    print(f'n = {n}')
    frq = frq[0:int(n/2)] # one-sided frequency range, this will be the transform variable


    Ft_array = np.fft.fft(ft_array)/n # Divide by n to normalize
    Ft_array = Ft_array[0:int(n/2)]


    fig, ax = plt.subplots(2, 1)

    ax[0].plot(t_array, ft_array, label='$f(t) = sin(5* 2\pi t) + sin(10* 2\pi t)$')
    ax[0].legend()
    ax[0].set_xlabel('$t(s)$')
    ax[0].set_ylabel('$f(t)$')

    ax[1].plot(frq, np.abs(Ft_array), label='F(t)', color='C1')
    ax[1].legend()
    ax[1].set_xlabel('$f(Hz)$')
    ax[1].set_ylabel('$Magnitude$')

    plt.tight_layout()
    plt.savefig('1d-fourier-transform.png')
    

def fourier_transform(i, array: np.ndarray) -> Tuple[np.ndarray, np.ndarray]:
    """
    Calculates the fourier transform for the provided 2D image array.
    """
    print(f'fourier_transform() called. i = {i}, spatial_image =.')
    print(array)

    f = np.fft.fft2(array)
    f_shift = np.fft.fftshift(f)

    f_mag = np.abs(f_shift)
    f_phase = np.angle(f_shift)
    print('f_phase (before type conversion) =')
    print(np.min(f_phase))

    # Normalize
    f_mag = 255*(f_mag - np.min(f_mag))/np.ptp(f_mag)
    f_mag = f_mag.astype(np.uint8)

    if not np.ptp(f_phase) == 0.0:
        f_phase = 255*(f_phase - np.min(f_phase))/np.ptp(f_phase)
    f_phase = f_phase.astype(np.uint8)

    if np.min(f_mag) < 0 or np.max(f_mag) > 255:
        raise RuntimeError(f'Value in f_mag will be truncated!'
            f' min = {np.min(f_mag)}, max = {np.max(f_mag)}.')
    if np.min(f_phase) < 0 or np.max(f_phase) > 255:
        raise RuntimeError(f'Value in f_mag will be truncated!'
            f' min = {np.min(f_phase)}, max = {np.max(f_phase)}.')
    

    img = Image.fromarray(array)
    if CREATE_DEBUG_IMAGES:
        img.save(f'{i}_spatial.png')

    img = Image.fromarray(f_mag)

    if CREATE_DEBUG_IMAGES:
        img.save(f'{i}_fourier.png')

    return f_mag, f_phase

################################################################################
# SQUARE
################################################################################

# def create_fourier_stripes_gif():

#     frames = []

#     for i in range(6, 0, -1):
#         strip_width = (2**i)
#         array_spatial = create_square_image(IMAGE_WIDTH, strip_width/2)
#         array_f_mag, array_f_phase = fourier_transform(i, array_spatial)
#         Image.fromarray(array_f_phase).save(f'square_f_phase_{i}.png')

#         array_spatial_rgb = np.stack([array_spatial, array_spatial, array_spatial], axis=-1).astype(np.uint8)
#         array_f_mag_rgb = np.stack([array_f_mag, array_f_mag, array_f_mag], axis=-1).astype(np.uint8)
#         array_f_phase_rgb = np.stack([array_f_phase, array_f_phase, array_f_phase], axis=-1).astype(np.uint8)
        
#         img_combined = Image.new('RGBA', (GIF_WIDTH, 350), BACKGROUND_COLOR)

#         img_combined.paste(Image.fromarray(array_spatial_rgb).resize([200, 200]), [50, 50])
#         img_combined.paste(Image.fromarray(array_f_mag_rgb).resize([200, 200]), [300, 50])        
#         img_combined.paste(Image.fromarray(array_f_phase_rgb).resize([200, 200]), [550, 50])        

#         # Font files are located in same dir as this script
#         font = ImageFont.truetype("Verdana.ttf", 24)
        
#         # get a drawing context
#         drawContext = ImageDraw.Draw(img_combined)
#         # drawContext.fontmode = "1" # Disable anti-aliasing

#         add_border(drawContext, (50, 50), (200, 200), 4, (255, 0, 0, 255))
#         add_border(drawContext, (300, 50), (200, 200), 4, (255, 0, 0, 255))
#         add_border(drawContext, (550, 50), (200, 200), 4, (255, 0, 0, 255))


#         drawContext.text((50, 270), f"wavelength = {strip_width}px",font=font, fill=(255, 170, 170, 255))
#         frames.append(img_combined)

#     frames[0].save('fourier_stripes.gif', format='GIF', append_images=frames[1:], save_all=True, duration=1000, loop=0)

def add_border(drawContent, origin, width_height, border_width, fill):
    """
    Adds a border in the draw context around a rectangle (e.g. an image).
    """

    width = width_height[0]
    height = width_height[1]
    drawContent.line((
        origin[0] - border_width/2, origin[1] - border_width/2,
        origin[0] + width + 1 + border_width/2, origin[1] - border_width/2),
        width=border_width, fill=fill)
    drawContent.line((
        origin[0] + width + 1, origin[1] - border_width/2,
        origin[0] + width + 1, origin[1] + height + border_width/2),
        width=border_width, fill=fill)
    drawContent.line((
        origin[0] + width + 1 + border_width/2, origin[1] + height + border_width/2,
        origin[0] - border_width, origin[1] + height + border_width/2),
        width=border_width, fill=fill)
    drawContent.line((
        origin[0] - border_width/2, origin[1] + height,
        origin[0] - border_width/2, origin[1] - 1 - border_width/2),
        width=border_width, fill=fill)

# Stripes
def create_square_image(image_width_pix, wavelength):
    """
    Creates a image with vertical stripes.
    """
    array = np.zeros((image_width_pix, image_width_pix), dtype='uint8')
    for col_num in range(image_width_pix):
        if col_num % wavelength < wavelength/2:
            array[:,col_num] = 255
    return array

################################################################################
# SIN
################################################################################

def create_sin_image(image_width_px: int, freq_pixel: int) -> np.ndarray:
    """
    Creates an image array with a sinusoidal pattern in the x-axis.
    """

    num_cycles_in_image = image_width_px/freq_pixel

    linspace_a = np.linspace(0, 2*np.pi*num_cycles_in_image, num=image_width_px)
    sin_a = np.sin(linspace_a)

    # Scale from 0 to 255 (8-bit image)
    image_x = ((sin_a + 1)/2)*255
    image_a = np.tile(image_x, (image_width_px, 1)).astype(np.uint8)
    return image_a

def create_gif(spatial_img_fn, filename: str):

    frames = []

    for i in range(1, 7):
        strip_width = 2**i
        array_spatial = spatial_img_fn(64, 2**i)
        array_f_mag, array_f_phase = fourier_transform(0, array_spatial)

        array_spatial_rgb = np.stack([array_spatial, array_spatial, array_spatial], axis=-1).astype(np.uint8)
        array_f_mag_rgb = np.stack([array_f_mag, array_f_mag, array_f_mag], axis=-1).astype(np.uint8)
        array_f_phase_rgb = np.stack([array_f_phase, array_f_phase, array_f_phase], axis=-1).astype(np.uint8)
        
        img_combined = Image.new('RGBA', (GIF_WIDTH, 350), BACKGROUND_COLOR)

        img_combined.paste(Image.fromarray(array_spatial_rgb).resize([200, 200]), [50, 50])
        img_combined.paste(Image.fromarray(array_f_mag_rgb).resize([200, 200]), [300, 50])        
        img_combined.paste(Image.fromarray(array_f_phase_rgb).resize([200, 200]), [550, 50])        

        # Font files are located in same dir as this script
        font = ImageFont.truetype("Verdana.ttf", 24)
        
        # get a drawing context
        drawContext = ImageDraw.Draw(img_combined)
        # drawContext.fontmode = "1" # Disable anti-aliasing
        add_border(drawContext, (50, 50), (200, 200), 4, (255, 0, 0, 255))
        add_border(drawContext, (300, 50), (200, 200), 4, (255, 0, 0, 255))
        add_border(drawContext, (550, 50), (200, 200), 4, (255, 0, 0, 255))

        drawContext.text((50,250), f'f(x,y)', font=ImageFont.truetype('Verdana.ttf', 18), fill=(0, 0, 0, 255))
        drawContext.text((50,275), f'spatial domain', font=ImageFont.truetype('Verdana.ttf', 12), fill=(0, 0, 0, 255))
        
        drawContext.text((300,250), f'|F(u,v)|', font=ImageFont.truetype('Verdana.ttf', 18), fill=(0, 0, 0, 255))
        drawContext.text((300,275), f'frequency domain, magnitude', font=ImageFont.truetype('Verdana.ttf', 11), fill=(0, 0, 0, 255))

        drawContext.text((550,250), f'Ф(u,v)', font=ImageFont.truetype('Verdana.ttf', 18), fill=(0, 0, 0, 255))
        drawContext.text((550,275), f'frequency domain, phase', font=ImageFont.truetype('Verdana.ttf', 11), fill=(0, 0, 0, 255))

        drawContext.text((50, 290), f"wavelength = {strip_width}px", font=ImageFont.truetype('Verdana.ttf', 11), fill=(0, 0, 0, 255))
        frames.append(img_combined)

    frames[0].save(filename, format='GIF', append_images=frames[1:], save_all=True, duration=1000, loop=0)

if __name__ == '__main__':
    main()
