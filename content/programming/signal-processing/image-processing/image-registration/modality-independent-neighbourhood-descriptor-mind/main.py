import rasterio
# import geopyspark as gps
import numpy as np

REF_IMAGE_PATH = '/root/scratch/S2B_MSIL2A_20190625T221609_N0212_R129_T60GUA_20190626T000320.SAFE' +\
    '/GRANULE/L2A_T60GUA_A012024_20190625T221608/IMG_DATA/R10m/T60GUA_20190625T221609_B03_10m.jp2'
CMP_IMAGE_PATH = '/root/scratch/S2B_MSIL2A_20190625T221609_N0212_R129_T60GUA_20190626T000320.SAFE' +\
    '/GRANULE/L2A_T60GUA_A012024_20190625T221608/IMG_DATA/R10m/T60GUA_20190625T221609_B08_10m.jp2'

def main():
    # rasterio will use gdal to open .jp2 (JPEG 2000) files
    with rasterio.open(REF_IMAGE_PATH) as f:
        ref_array = np.array(f.read(1))
    with rasterio.open(CMP_IMAGE_PATH) as f:
        cmp_array = np.array(f.read(1))

    print(ref_array)

if __name__ == '__main__':
    main()

