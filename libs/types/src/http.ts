export namespace Http {
  export enum Protocol {
    HTTP = 'http',
    HTTPS = 'https',
  }

  export enum Status {
    SUCCESS = 200,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    INTERNAL_SERVE = 500,
  }
}

export enum ErrorCode {}
