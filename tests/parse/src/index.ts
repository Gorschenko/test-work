import { COMPASS_SCHEMA, get_0x40_igla_schema, GET_SYS_INFO_TO_BINARY } from './static';
import { parse_packet } from './utils';

const parse_igla_iccid = (packet: Buffer) => {
  let iccidBuf: Buffer;
  let iccid: string;
  //   if (devSubtype === DeviceSubType.IGLA_X) {
  if (packet[2] === 0x03) {
    iccidBuf = packet.slice(216, 236);
  }
  if (packet[2] === 0x04) {
    iccidBuf = packet.slice(186, 206);
    console.log('BINARY ICCID: ', iccidBuf, 'BINARY ICCID LENGTH: ', iccidBuf.length);
  }
  iccid = iccidBuf.toString();
  //   }
  //   else {
  //     iccid = packet.toString('hex').slice(216, 236);
  //   }

  // если двадцатый символ iccid не цифра, то его нужно обрезать до длины в 19
  // [0x30, 0x31, 0x32, 0x33, 0x34, 0x35, 0x36, 0x37, 0x38, 0x39]
  if (!['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'].includes(iccid[19])) {
    iccid = iccid.slice(0, -1);
  }

  console.log('RESULTED ICCID: ', iccid, 'ICCID LENGTH: ', iccid.length);
};

// parse_igla_iccid(data.GET_SYS_INFO_TO_BINARY);

const parsed_packet = parse_packet(GET_SYS_INFO_TO_BINARY, get_0x40_igla_schema());
