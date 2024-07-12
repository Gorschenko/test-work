// Парсинг события /n и перевод данных в бинарник
// [200,43,254,15,0,99,182,35,192,33,39,18,137,7,0,0,1]
const coordsData = [151, 1, 254, 15, 192, 100, 182, 35, 128, 35, 39, 18, 158, 10, 0, 0, 1];

export interface IParsedCoord {
  ptime: number;
  plat: number;
  plon: number;
  pcourse: number;
  pspeed: number;
  pmode: number;
}

export const parse = (data: number[] | Buffer): IParsedCoord => {
  console.log('Coords data: ', data, 'length: ', data.length);
  const coordBuffer = Array.isArray(data) ? Buffer.from(data) : data;
  const ptime = coordBuffer.readUInt32LE(0);
  const plat = coordBuffer.readInt32LE(4);
  const plon = coordBuffer.readInt32LE(8);
  const pcourse = coordBuffer.readUInt16LE(12);
  const pspeed = coordBuffer.readUInt16LE(14);
  const pmode = coordBuffer.readUInt8(16);

  return {
    ptime,
    plat,
    plon,
    pcourse,
    pspeed,
    pmode,
  };
};

const parsed = parse(coordsData);
console.log('Parsed coords data: ', parsed);

export const serialize = (coord: IParsedCoord): Buffer => {
  const buffer = Buffer.alloc(17);
  buffer.writeUInt32LE(coord.ptime, 0);
  buffer.writeInt32LE(coord.plat, 4);
  buffer.writeInt32LE(coord.plon, 8);
  buffer.writeUInt16LE(coord.pcourse, 12);
  buffer.writeUInt16LE(coord.pspeed, 14);
  buffer.writeInt8(coord.pmode, 16);
  return buffer;
};

const serialized = serialize(parsed);

console.log(serialized);
