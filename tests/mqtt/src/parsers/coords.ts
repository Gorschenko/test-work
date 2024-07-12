// Парсинг события /n и перевод данных в бинарник
// [200,43,254,15,0,99,182,35,192,33,39,18,137,7,0,0,1]
// const coordsData = [151, 1, 254, 15, 192, 100, 182, 35, 128, 35, 39, 18, 158, 10, 0, 0, 1];
// console.log('Coords data: ', coordsData);
// console.log('Coords data length: ', coordsData.length);

// const coordsBuf = Buffer.from(coordsData);
// console.log('Coords data buffer: ', coordsBuf);

// const ptime = coordsBuf.readUInt32LE(0);
// const plat = coordsBuf.readInt32LE(4);
// const plon = coordsBuf.readInt32LE(8);
// const pcourse = coordsBuf.readUInt16LE(12);
// const pspeed = coordsBuf.readUInt16LE(14);
// const pmode = coordsBuf.readUInt8(16);

// console.log('Parsed coords data: ', ptime, plat, plon, pcourse, pspeed, pmode);

// const newData = Buffer.alloc(17);
// newData.writeUInt32LE(ptime, 0);
// newData.writeInt32LE(plat, 4);
// newData.writeInt32LE(plon, 8);
// newData.writeUInt16LE(pcourse, 12);
// newData.writeUInt16LE(pspeed, 14);
// newData.writeInt8(pmode, 16);
// console.log(newData);
