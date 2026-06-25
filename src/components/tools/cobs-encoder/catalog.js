import tile from './tile.webp?url';

export const catalog = {
  id: 'cobs-encoder',
  title: 'COBS encoder/decoder',
  description: 'Encode raw bytes into a Consistent Overhead Byte Stuffing (COBS) frame, or decode a COBS frame back into the original data. Enter bytes as hex; the tool validates the input and appends/strips the 0x00 packet delimiter.',
  href: '/programming/serialization-formats/consistent-overhead-byte-stuffing-cobs/#cobs-encoderdecoder',
  categoryPath: ['Software', 'Serialization'],
  tags: ['COBS', 'serialization', 'framing', 'packetizing', 'byte stuffing', 'encoding', 'decoding'],
  tile,
};
