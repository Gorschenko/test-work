import { Integer, PacketSchema, ParsedPacket, SchemaItem } from './types';

const split_string_by_dot = (source: string): string => {
  return source.replace(/0/g, '').padEnd(3, '0').split('').join('.');
};

const reverse_string = (source: string): string => {
  return source.split('').reverse().join('');
};

const get_packet_length_by_schema = (schema: PacketSchema): number => {
  const length = Object.values(schema).reduce((acc, v) => {
    acc = acc + v.LENGTH;
    return acc;
  }, 0);
  return length;
};

const validate_packet_by_schema = (packet: Buffer, schema: PacketSchema): boolean => {
  const schema_length = get_packet_length_by_schema(schema);
  const is_valid = schema_length === packet.length;
  console.log('VALIDATE PACKET RESULT: ', is_valid);
  return is_valid;
};

const parse_UInt8_by_packet = (packet: Buffer, offset: number): string => {
  return packet.readUInt8(offset).toString(16).padStart(2, '0');
};

const parse_UInt32_by_packet = (packet: Buffer, offset: number): string => {
  return packet.readUInt32LE(offset).toString(16);
};

const parse_chars_by_packet = (
  packet: Buffer,
  start_offset: number,
  end_offset: number,
): string => {
  return packet.slice(start_offset, end_offset).toString('utf8');
};

const parse_UInt8Array = (packet: Buffer, start_offset: number, end_offset: number): string => {
  const buffer_slice = packet.slice(start_offset, end_offset);
  const packet_to_string: string[] = [];
  let inner_offset = 0;

  for (const byte of buffer_slice) {
    const parsed_string = parse_UInt8_by_packet(buffer_slice, inner_offset);
    packet_to_string.push(parsed_string);
    inner_offset += 1;
  }

  const parsed_packet = packet_to_string.join('');
  return parsed_packet;
};

const parse_value = (packet: Buffer, offset: number, schema_item: SchemaItem) => {
  switch (schema_item.TYPE) {
    case Integer.U8:
      return parse_UInt8_by_packet(packet, offset);
    case Integer.U32:
      return parse_UInt32_by_packet(packet, offset);
    case Integer.CHAR:
      return parse_chars_by_packet(packet, offset, offset + schema_item.LENGTH);
    case Integer.U8Array: {
      return parse_UInt8Array(packet, offset, offset + schema_item.LENGTH);
    }
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

  const parsed_packet: ParsedPacket = {};
  let offset = 0;

  for (const prop of Object.keys(schema)) {
    const schema_item = schema[prop];
    parsed_packet[prop] = parse_value(packet, offset, schema_item);

    offset += schema_item.LENGTH;
  }

  console.log('PARSED PACKET: ', parsed_packet);
  return parsed_packet;
};

export const get_public_igla_packet = (parsed_packet: ParsedPacket) => {
  const public_parsed_packet = Object.keys(parsed_packet).reduce<ParsedPacket>((acc, k) => {
    acc[k] = parsed_packet[k].replace(/\x00/g, '');
    return acc;
  }, {});

  console.log('PUBLIC PARSED PACKET: ', public_parsed_packet);

  return public_parsed_packet;
};

export const get_public_compass_packet = (parsed_packet: ParsedPacket) => {
  if (parsed_packet.revision) {
    parsed_packet.revision = split_string_by_dot(parsed_packet.revision);
  }

  if (parsed_packet.model) {
    const reversed_model = reverse_string(parsed_packet.model);
    parsed_packet.model = reversed_model;
  }

  if (parsed_packet.hw_ver) {
    parsed_packet.hw_ver = split_string_by_dot(parsed_packet.hw_ver);
  }

  if (parsed_packet.fw_ver) {
    parsed_packet.fw_ver = split_string_by_dot(parsed_packet.fw_ver);
  }

  console.log('PUBLIC PARSED PACKET: ', parsed_packet);

  return parsed_packet;
};
