import numpy as np
from PIL import Image, ImageDraw, ImageFont

# For image color scheme, see https://paletton.com/#uid=1000u0kllllaFw0g0qFqFg0w0aF
CREATE_DEBUG_IMAGES = False
IMAGE_WIDTH = 64

def create_fourier_stripes_gif():

    frames = []

    for i in range(6):
        strip_width = 2**i
        array_spatial = create_stripes(IMAGE_WIDTH, strip_width)
        array_fourier = fourier_transform(i, array_spatial)

        array_spatial_rgb = np.stack([array_spatial, array_spatial, array_spatial], axis=-1).astype(np.uint8)
        array_fourier_rgb = np.stack([array_fourier, array_fourier, array_fourier], axis=-1).astype(np.uint8)
        
        img_combined = Image.new('RGBA', (550, 350), (170, 57, 57, 255))

        img_combined.paste(Image.fromarray(array_spatial_rgb).resize([200, 200]), [50, 50])        
        img_combined.paste(Image.fromarray(array_fourier_rgb).resize([200, 200]), [300, 50])        

        # Font files are located in same dir as this script
        font = ImageFont.truetype("Verdana.ttf", 24)
        
        # get a drawing context
        drawContext = ImageDraw.Draw(img_combined)
        # drawContext.fontmode = "1" # Disable anti-aliasing
        drawContext.text((50, 270), f"strip width = {strip_width}",font=font, fill=(255, 170, 170, 255))
        frames.append(img_combined)

    frames[0].save('fourier_stripes.gif', format='GIF', append_images=frames[1:], save_all=True, duration=1000, loop=0)

def fourier_transform(i, array):
    print(f'fourier_transform() called. i = {i}, spatial_image =.')
    print(array)

    f = np.fft.fft2(array)
    f_shift = np.fft.fftshift(f)

    f_mag = np.abs(f_shift)
    print('f_mag (before type conversion) =')
    print(f_mag)
    f_mag = 255*(f_mag - np.min(f_mag))/np.ptp(f_mag)
    f_mag = f_mag.astype(np.uint8)
    if np.min(f_mag) < 0 or np.max(f_mag) > 255:
        raise RuntimeError(f'Value in f_mag will be truncated!'
            f' min = {np.min(f_mag)}, max = {np.max(f_mag)}.')
    

    img = Image.fromarray(array)
    if CREATE_DEBUG_IMAGES:
        img.save(f'{i}_spatial.png')

    img = Image.fromarray(f_mag)

    if CREATE_DEBUG_IMAGES:
        img.save(f'{i}_fourier.png')

    return f_mag

# Stripes
def create_stripes(image_width_pix, stripe_width_pix):
    """
    Creates a image with vertical stripes.
    """
    array = np.zeros((image_width_pix, image_width_pix), dtype='uint8')
    period = stripe_width_pix * 2
    for col_num in range(image_width_pix):
        if col_num % period < stripe_width_pix:
            array[:,col_num] = 255
    return array

################################################################################
# SIN
################################################################################

def create_sin_image(image_width_px: int, freq_pixel: int) -> np.ndarray:
    """
    Creates an image with a sinusoidal pattern in the a-axis.
    """

    num_cycles_in_image = image_width_px/freq_pixel

    linspace_a = np.linspace(0, 2*np.pi*num_cycles_in_image, num=image_width_px)
    sin_a = np.sin(linspace_a)

    # Scale from 0 to 255 (8-bit image)
    image_x = ((sin_a + 1)/2)*255
    image_a = np.tile(image_x, (image_width_px, 1)).astype(np.uint8)
    return image_a

def create_sin_gif():

    frames = []

    for i in range(1, 6):
        strip_width = 2**i
        array_spatial = create_sin_image(64, 2**i)
        array_fourier = fourier_transform(0, array_spatial)

        array_spatial_rgb = np.stack([array_spatial, array_spatial, array_spatial], axis=-1).astype(np.uint8)
        array_fourier_rgb = np.stack([array_fourier, array_fourier, array_fourier], axis=-1).astype(np.uint8)
        
        img_combined = Image.new('RGBA', (550, 350), (170, 57, 57, 255))

        img_combined.paste(Image.fromarray(array_spatial_rgb).resize([200, 200]), [50, 50])        
        img_combined.paste(Image.fromarray(array_fourier_rgb).resize([200, 200]), [300, 50])        

        # Font files are located in same dir as this script
        font = ImageFont.truetype("Verdana.ttf", 24)
        
        # get a drawing context
        drawContext = ImageDraw.Draw(img_combined)
        # drawContext.fontmode = "1" # Disable anti-aliasing
        drawContext.text((50, 270), f"wavelength = {strip_width}px",font=font, fill=(255, 170, 170, 255))
        frames.append(img_combined)

    frames[0].save('sinusoidal.gif', format='GIF', append_images=frames[1:], save_all=True, duration=1000, loop=0)

if __name__ == '__main__':
    create_fourier_stripes_gif()
    create_sin_gif()
