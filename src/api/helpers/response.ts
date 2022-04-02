import { Response } from 'express';

class ErrorResponse extends Error {
  statusCode: number;
  data: object | null;

  constructor(message: string, statusCode?: number, data?: object) {
    super(message);
    this.statusCode = statusCode === undefined ? 500 : statusCode;
    this.data = data === undefined ? null : data;
  }
}

class SuccessResponse {
  static send(res: Response, data: object, status = 201) {
    res.status(status);
    // if (data && data.docs) {
    //   return res.json({
    //     status: 'success',
    // data: data.docs,
    // total: data.totalDocs,
    // limit: data.limit,
    // page: data.page,
    // pages: data.totalPages,
    //   });
    // }
    return res.json({
      success: true,
      message: 'OK',
      data: data,
    });
  }
}

export { ErrorResponse, SuccessResponse };
