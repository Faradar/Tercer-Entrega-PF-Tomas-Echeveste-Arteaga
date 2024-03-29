import logger from "./logger.js";

const httpStatus = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

export class HttpResponse {
  Ok(res, data, msg = "Success") {
    logger.info(msg, data);
    return res.status(httpStatus.OK).json({
      status: httpStatus.OK,
      message: msg,
      data: data,
    });
  }

  Created(res, data, msg = "Created") {
    logger.info(msg, data);
    return res.status(httpStatus.CREATED).json({
      status: httpStatus.CREATED,
      message: msg,
      data: data,
    });
  }

  NoContent(res, data, msg = "No Content") {
    logger.info(msg, data);
    return res.status(httpStatus.NO_CONTENT).json({
      status: httpStatus.NO_CONTENT,
      message: msg,
      data: data,
    });
  }

  BadRequest(res, data, msg = "Bad Request") {
    logger.error(msg, data);
    return res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      message: msg,
      data: data,
    });
  }

  Unauthorized(res, data, msg = "Unauthorized") {
    logger.error(msg, data);
    return res.status(httpStatus.UNAUTHORIZED).json({
      status: httpStatus.UNAUTHORIZED,
      message: msg,
      data: data,
    });
  }

  Forbidden(res, data, msg = "Forbidden") {
    logger.error(msg, data);
    return res.status(httpStatus.FORBIDDEN).json({
      status: httpStatus.FORBIDDEN,
      message: msg,
      data: data,
    });
  }

  NotFound(res, data, msg = "Not Found") {
    logger.error(msg, data);
    return res.status(httpStatus.NOT_FOUND).json({
      status: httpStatus.NOT_FOUND,
      message: msg,
      data: data,
    });
  }

  ServerError(res, data, msg = "Internal Server Error") {
    logger.error(msg, data);
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      status: httpStatus.INTERNAL_SERVER_ERROR,
      message: msg,
      data: data,
    });
  }
}
