export interface IMeta {
  page: number;
  limit: number;
  total: number;
  totalPage: number;
}

export class ResponseDto {
  static success<TData = void>(message: string, data?: TData, meta?: IMeta) {
    return {
      ok: true,
      message,
      meta,
      data,
    };
  }

  static error(message: string, status?: number, error?: unknown) {
    return {
      ok: false,
      message,
      status,
      error,
    };
  }
}
