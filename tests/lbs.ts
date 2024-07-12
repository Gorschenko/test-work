// Изменить	dc_id	dc_dev_id	dc_dev_login	dc_time	dc_longitude	dc_latitude	dc_course	dc_speed	dc_accuracy	dc_mode	dc_created
// редактировать	97115193	200105	9990002	269112447	302123360	600037410	0	0	NULL	0	2024-07-11 20:27:40
/* 
longitude 303963358, 9 знаков
latitud 599175000, 9 знаков
*/

export const CODE_LENGTH = 1;
export const TIME_LENGTH = 4;
export const LATITUDE_LENGTH = 4;
export const LONGITUDE_LENGTH = 4;
export const COURSE_LENGTH = 2;
export const SPEED_LENGTH = 2;
export const MODE_LENGTH = 1;
export const ACCURANCY_LENGTH = 2;
export const PACKET_DATA =
  CODE_LENGTH +
  TIME_LENGTH +
  LATITUDE_LENGTH +
  LONGITUDE_LENGTH +
  COURSE_LENGTH +
  SPEED_LENGTH +
  MODE_LENGTH +
  ACCURANCY_LENGTH;

export interface IGeolocateData {
  location: {
    lat: number;
    lng: number;
  };
  accuracy: number;
}

const geolocateData: IGeolocateData = {
  location: {
    lat: 49.9571529,
    lng: 15.278397,
  },
  accuracy: 1000.0,
};

const getTime = () => {
  const start = Date.UTC(2016, 0, 1, 0, 0, 0);
  const now = Date.now();
  const dif = now - start;
  const difToMs = dif / 1000;
  return Math.round(difToMs);
};

const increaseNumberByExponent = (number: number, exponent: number) => {
  return Math.round(number * Math.pow(10, exponent));
};

export const serialize = (data: IGeolocateData): Buffer => {
  const buffer = Buffer.alloc(PACKET_DATA);
  const code = 0x01;
  const time = getTime();
  const course = 0x00;
  const speed = 0x00;
  const mode = 0x11;
  const latitude = increaseNumberByExponent(data.location.lat, 7);
  const longitude = increaseNumberByExponent(data.location.lng, 7);

  let offset = 0;
  buffer.writeInt8(code, offset);
  offset += CODE_LENGTH;
  buffer.writeUInt32LE(time, offset);
  offset += TIME_LENGTH;
  buffer.writeInt32LE(latitude, offset);
  offset += LATITUDE_LENGTH;
  buffer.writeInt32LE(longitude, offset);
  offset += LONGITUDE_LENGTH;
  buffer.writeUInt16LE(course, offset);
  offset += COURSE_LENGTH;
  buffer.writeUInt16LE(speed, offset);
  offset += SPEED_LENGTH;
  buffer.writeInt8(mode, offset);
  offset += MODE_LENGTH;
  buffer.writeUInt16LE(data.accuracy, offset);
  return buffer;
};

const serialized = serialize(geolocateData);
console.log(serialized);
