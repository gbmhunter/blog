import numpy as np
from PIL import Image

# # Single white pixel in middle of image
# array = np.zeros((5, 5), dtype='uint8')
# array[2, 2] = 255

# Stripes
def create_stripes(image_width_pix, stripe_width_pix):
    array = np.zeros((image_width_pix, image_width_pix), dtype='uint8')
    period = stripe_width_pix * 2
    for col_num in range(image_width_pix):
        if col_num % period < stripe_width_pix:
            array[:,col_num] = 255
    return array

def main():

    array = create_stripes(100, 5)
    print('image (spatial) =')
    print(array)

    f = np.fft.fft2(array)
    f_shift = np.fft.fftshift(f)

    f_mag = np.abs(f_shift).astype(np.uint8)
    print('image (frequency) =')
    print(f_mag)

    img = Image.fromarray(array)
    img.save('test.png')

    img = Image.fromarray(f_mag)
    img.save('fourier.png')

if __name__ == '__main__':
    main()