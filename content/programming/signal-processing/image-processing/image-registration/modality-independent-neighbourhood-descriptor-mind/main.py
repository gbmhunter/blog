import rasterio
# import geopyspark as gps
import numpy as np
from PIL import Image
import cv2
from skimage import exposure

REF_IMAGE_PATH = '/root/scratch/S2B_MSIL2A_20190625T221609_N0212_R129_T60GUA_20190626T000320.SAFE' +\
    '/GRANULE/L2A_T60GUA_A012024_20190625T221608/IMG_DATA/R10m/T60GUA_20190625T221609_B03_10m.jp2'
CMP_IMAGE_PATH = '/root/scratch/S2B_MSIL2A_20190625T221609_N0212_R129_T60GUA_20190626T000320.SAFE' +\
    '/GRANULE/L2A_T60GUA_A012024_20190625T221608/IMG_DATA/R10m/T60GUA_20190625T221609_B08_10m.jp2'

OUTPUT_IMAGE_WIDTH_PIXELS = 500
OUTPUT_IMAGE_HEIGHT_PIXELS = 500

def main():
    # rasterio will use gdal to open .jp2 (JPEG 2000) files
    print(f'Reading imagery...')
    with rasterio.open(REF_IMAGE_PATH) as f:
        ref_array = np.array(f.read(1))
        src_dataset_profile = f.profile

        start_row, start_col = f.index(381229, 5537545)
        print(f'start_row = {start_row}, start_col = {start_col}')
    with rasterio.open(CMP_IMAGE_PATH) as f:
        cmp_array = np.array(f.read(1))

    print(ref_array)

    ref_array_cropped = ref_array[start_row:start_row+OUTPUT_IMAGE_HEIGHT_PIXELS,
            start_col:start_col+OUTPUT_IMAGE_WIDTH_PIXELS]
    # ref_array_cropped = ref_array

    cmp_array_cropped = cmp_array[start_row:start_row+OUTPUT_IMAGE_HEIGHT_PIXELS,
            start_col:start_col+OUTPUT_IMAGE_WIDTH_PIXELS]



    # Normalize to float between 0-1
    # import pdb; pdb.set_trace()
    ref_array_cropped = (ref_array_cropped - np.amin(ref_array_cropped)) / (np.amax(ref_array_cropped) - np.amin(ref_array_cropped))

    # Stretch image using 2-98% clipping (make the image easier to see)
    p2, p98 = np.percentile(ref_array_cropped, (2.0, 98.0))
    ref_array_cropped = exposure.rescale_intensity(ref_array_cropped, in_range=(p2, p98))

    ref_array_cropped = ref_array_cropped* (2**16-1)
    ref_array_cropped = ref_array_cropped.astype(np.uint16)

    # Write chips to disk
    print(f'Writing imagery to disk...')

    print(f'ref_array_cropped = {ref_array_cropped}')
    print(f'ref_array_cropped.dtype = {ref_array_cropped.dtype}')
    # img = Image.fromarray(ref_array_cropped, 'L')  
        
    #Saved in the same relative location 
    # img.save("/root/scratch/pasted_picture.png") 
    cv2.imwrite("/root/scratch/pasted_picture2.png", ref_array_cropped)


    # Register GDAL format drivers and configuration options with a
    # context manager.
    # with rasterio.Env():

    #     # Get a copy of the source dataset's profile. Thus our
    #     # destination dataset will have the same dimensions,
    #     # number of bands, data type, and georeferencing as the
    #     # source dataset.
    #     kwds = src_dataset_profile

    #     # Change the format driver for the destination dataset to
    #     # 'GTiff', short for GeoTIFF.
    #     kwds['driver'] = 'GTiff'

    #     # Add GeoTIFF-specific keyword arguments.
    #     kwds['tiled'] = True
    #     kwds['width'] = OUTPUT_IMAGE_WIDTH_PIXELS
    #     kwds['height'] = OUTPUT_IMAGE_HEIGHT_PIXELS
    #     kwds['blockxsize'] = 128
    #     kwds['blockysize'] = 128
    #     # kwds['photometric'] = 'YCbCr'
    #     # kwds['compress'] = 'JPEG'
    #     print(f'driver = {kwds}')

    #     with rasterio.open('/root/scratch/ref_full1.tif', 'w', **kwds) as dst:
    #         dst.write(ref_array_cropped.astype(rasterio.uint16), 1)
    #     with rasterio.open('/root/scratch/cmp_full.tif', 'w', **kwds) as dst:
    #         dst.write(cmp_array_cropped.astype(rasterio.uint16), 1)

if __name__ == '__main__':
    main()

