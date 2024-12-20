import { Integer, PacketSchema, SchemaItem } from './types';

const get_packet_length_by_schema = (schema: PacketSchema): number => {
  const length = Object.values(schema).reduce((acc, v) => {
    acc = acc + v.LENGTH;
    return acc;
  }, 0);
  return length;
};

const validate_packet_by_schema = (packet: Buffer, schema: PacketSchema): boolean => {
  const schema_length = get_packet_length_by_schema(schema);
  const result = schema_length === packet.length ? true : false;
  console.log('VALIDATE PACKET RESULT: ', result);
  return result;
};

const parse_value = (packet: Buffer, offset: number, schema_item: SchemaItem) => {
  console.log(offset, schema_item);
  switch (schema_item.TYPE) {
    case Integer.U8:
      return packet.readUInt8(offset).toString(16);
    case Integer.U32:
      return packet.readUInt32LE(offset).toString(16);
    case Integer.CHAR:
      return packet
        .slice(offset, offset + schema_item.LENGTH)
        .toString('utf8')
        .replace(/\x00/g, '');
    case Integer.U8Array:
      return packet.slice(offset, offset + schema_item.LENGTH).toString('utf8');
    default:
      throw new Error('Invalid integer type');
  }
};

export const parse_packet = (packet: Buffer, schema: PacketSchema) => {
  console.log('START TO PARSE PACKET: ', packet);

  const is_valid_packet = validate_packet_by_schema(packet, schema);
  if (!is_valid_packet) {
    throw new Error('Packet is not valid');
  }

  const parsed_packet: { [key: string]: unknown } = {};
  let offset = 0;

  for (const prop of Object.keys(schema)) {
    const schema_item = schema[prop];
    parsed_packet[prop] = parse_value(packet, offset, schema_item);

    offset += schema_item.LENGTH;
  }
  return parsed_packet;
};
