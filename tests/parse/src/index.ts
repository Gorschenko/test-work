import { COMPASS_SCHEMA, get_0x40_igla_schema, GET_SYS_INFO_TO_BINARY } from './static';
import { get_public_compass_packet, get_public_igla_packet, parse_packet } from './utils';

const parsed_packet = parse_packet(GET_SYS_INFO_TO_BINARY, get_0x40_igla_schema());
const public_parsed_packet = get_public_igla_packet(parsed_packet);
