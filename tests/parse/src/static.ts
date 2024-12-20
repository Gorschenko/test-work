import { Integer, PacketSchema } from './types';

export const GET_SYS_INFO_TO_BASE64 =
  'cAACAWGpAAAEAAH/AAcBAAEAEwASUHJvZHVjdGlvbiBzYW1wbGVzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMv/YBU1YMTEFchJDmJWLC4ZIZgVjhCgYiXAQEkGCAmkyAw==';
// console.log('BASE64: ', GET_SYS_INFO_TO_BASE64, 'LENGTH: ', GET_SYS_INFO_TO_BASE64.length);

export const GET_SYS_INFO_TO_BINARY = Buffer.from(GET_SYS_INFO_TO_BASE64, 'base64');
// console.log('BINARY: ', GET_SYS_INFO_TO_BINARY, 'LENGTH: ', GET_SYS_INFO_TO_BINARY.length);

export const GET_SYS_INFO_TO_HEX = GET_SYS_INFO_TO_BINARY.toString('hex');
// console.log('HEX: ', GET_SYS_INFO_TO_HEX, 'LENGTH: ', GET_SYS_INFO_TO_HEX.length);

export const GET_SYS_INFO_TO_ASCII = GET_SYS_INFO_TO_BINARY.toString('ascii');
// console.log('ASCII: ', GET_SYS_INFO_TO_ASCII, 'LENGTH: ', GET_SYS_INFO_TO_ASCII.length);

export const IGLA_BASE_SCHEMA: PacketSchema = {
  CODE: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  RESULT: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  REVISION: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  SERIAL: {
    LENGTH: 8,
    TYPE: Integer.CHAR,
  },
  DEVICE_FAMILY: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  CAR_ID: {
    LENGTH: 4,
    TYPE: Integer.U32,
  },
  CAR_NAME: {
    LENGTH: 32,
    TYPE: Integer.CHAR,
  },
  DEVICE_ID: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  HW_VER: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  FW_VER: {
    LENGTH: 20,
    TYPE: Integer.CHAR,
  },
  RADIO_VER: {
    LENGTH: 20,
    TYPE: Integer.CHAR,
  },
  EXT_INFO: {
    LENGTH: 64,
    TYPE: Integer.CHAR,
  },
  MCU_SERIAL: {
    LENGTH: 12,
    TYPE: Integer.U8Array,
  },
  PRODUCTION_DATE: {
    LENGTH: 4,
    TYPE: Integer.U32,
  },
  IMEI: {
    LENGTH: 17,
    TYPE: Integer.CHAR,
  },
  ICCID: {
    LENGTH: 21,
    TYPE: Integer.CHAR,
  },
};

export const get_0x30_igla_schema = (): PacketSchema => {
  const SCHEMA = { ...IGLA_BASE_SCHEMA };
  delete SCHEMA.CAR_ID;
  delete SCHEMA.DEVICE_ID;
  return SCHEMA;
};

export const get_0x40_igla_schema = (): PacketSchema => {
  const SCHEMA = { ...IGLA_BASE_SCHEMA };
  delete SCHEMA.DEVICE_FAMILY;
  return SCHEMA;
};

export const COMPASS_SCHEMA: PacketSchema = {
  CODE: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  RESULT: {
    LENGTH: 1,
    TYPE: Integer.U8,
  },
  PROTOCOL_REVISION: {
    LENGTH: 2,
    TYPE: Integer.U8Array,
  },
  SERIAL: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  MODEL: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  HW_VER: {
    LENGTH: 2,
    TYPE: Integer.U8Array,
  },
  FW_VER: {
    LENGTH: 6,
    TYPE: Integer.U8Array,
  },
  EXT_INFO: {
    LENGTH: 64,
    TYPE: Integer.U8Array,
  },
  MCU_SERIAL: {
    LENGTH: 12,
    TYPE: Integer.U8Array,
  },
  PRODUCTION_DATE: {
    LENGTH: 4,
    TYPE: Integer.U8Array,
  },
  IMEI: {
    LENGTH: 8,
    TYPE: Integer.U8Array,
  },
  ICCID: {
    LENGTH: 10,
    TYPE: Integer.U8Array,
  },
};
