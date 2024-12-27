import { Integer, PacketSchema } from './types';
const IGLA_GET_SYS_INFO_TO_BASE64 =
  'cAAEWDAwMDA0NQCYYje3YmF0bW9iaWxlX2RlZgAAAAAAAAAAAAAAAAAAAAAAAAAqAHYxLjIuM2EyNDA5MjUAAAAAAAAAdjguMS4wXzI0MDMyOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMQAtABhQS0Y0MDMgwHW4XDg2MzE5MjA1OTcyNDY0MgAAODk3MDEwMTI0MTgyMTkzNDQ2MTgA';

const COMPASS_GET_SYS_INFO_TO_BASE64 =
  'cAACAX1vmAAFAAH/AwACAAEAAAAPVGVzdGluZyBzYW1wbGVzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAANADfBUNVNzJFOAZDIJ7aEIaIIgSGiTWPiXAQGClBIxgQcQ==';

export const GET_SYS_INFO_TO_BASE64 = IGLA_GET_SYS_INFO_TO_BASE64;
// console.log('BASE64: ', GET_SYS_INFO_TO_BASE64, 'LENGTH: ', GET_SYS_INFO_TO_BASE64.length);

export const GET_SYS_INFO_TO_BINARY = Buffer.from(GET_SYS_INFO_TO_BASE64, 'base64');
// console.log('BINARY: ', GET_SYS_INFO_TO_BINARY, 'LENGTH: ', GET_SYS_INFO_TO_BINARY.length);

export const GET_SYS_INFO_TO_HEX = GET_SYS_INFO_TO_BINARY.toString('hex');
// console.log('HEX: ', GET_SYS_INFO_TO_HEX, 'LENGTH: ', GET_SYS_INFO_TO_HEX.length);

export const GET_SYS_INFO_TO_ASCII = GET_SYS_INFO_TO_BINARY.toString('ascii');
// console.log('ASCII: ', GET_SYS_INFO_TO_ASCII, 'LENGTH: ', GET_SYS_INFO_TO_ASCII.length);

export const IGLA_BASE_SCHEMA: PacketSchema = {
  code: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  result: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  revision: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  serial_number: {
    LENGTH: 8,
    TYPE: Integer.CHAR,
  },
  device_family: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  car_id: {
    LENGTH: 4,
    TYPE: Integer.U32,
  },
  car_name: {
    LENGTH: 32,
    TYPE: Integer.CHAR,
  },
  device_id: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  hw_ver: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  fw_ver: {
    LENGTH: 20,
    TYPE: Integer.CHAR,
  },
  radio_ver: {
    LENGTH: 20,
    TYPE: Integer.CHAR,
  },
  ext_info: {
    LENGTH: 64,
    TYPE: Integer.CHAR,
  },
  mcu_serial: {
    LENGTH: 12,
    TYPE: Integer.U8Array,
  },
  production_date: {
    LENGTH: 4,
    TYPE: Integer.U32,
  },
  imei: {
    LENGTH: 17,
    TYPE: Integer.CHAR,
  },
  iccid: {
    LENGTH: 21,
    TYPE: Integer.CHAR,
  },
};

export const get_0x30_igla_schema = (): PacketSchema => {
  const SCHEMA = { ...IGLA_BASE_SCHEMA };
  delete SCHEMA.car_id;
  delete SCHEMA.device_id;
  return SCHEMA;
};

export const get_0x40_igla_schema = (): PacketSchema => {
  const SCHEMA = { ...IGLA_BASE_SCHEMA };
  delete SCHEMA.device_family;
  return SCHEMA;
};

export const COMPASS_SCHEMA: PacketSchema = {
  code: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  result: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  revision: {
    LENGTH: 2,
    TYPE: Integer.U8Array,
  },
  serial_number: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  model: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  hw_ver: {
    LENGTH: 2,
    TYPE: Integer.U8Array,
  },
  fw_ver: {
    LENGTH: 6,
    TYPE: Integer.U8Array,
  },
  ext_info: {
    LENGTH: 64,
    TYPE: Integer.U8Array,
  },
  mcu_serial: {
    LENGTH: 12,
    TYPE: Integer.U8Array,
  },
  production_date: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  imei: {
    LENGTH: 8,
    TYPE: Integer.U8Array,
  },
  iccid: {
    LENGTH: 10,
    TYPE: Integer.U8Array,
  },
};
