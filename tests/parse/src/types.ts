export enum Integer {
  U8,
  U32,
  CHAR,
  U8Array,
}

export type PacketSchema = Record<string, SchemaItem>;

export type SchemaItem = { LENGTH: number; TYPE: Integer };
