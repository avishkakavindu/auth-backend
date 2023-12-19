import { Request } from 'express';
import logger from './logger';

export const handleRequestStart = (req: Request) => {
  try {
    const ignoreUrls = ['health'];

    const isIgnoredUrl = ignoreUrls.some((x) => req.originalUrl.includes(x));
    if (isIgnoredUrl) return;

    const remoteAddress =
      req.headers['x-forwarded-for'] || req?.connection?.remoteAddress || null;

    logger.info(
      `New Request | ${req.originalUrl} | METHOD : ${req.method} | IP : ${remoteAddress}`
    );
  } catch (e) {
    console.log(e);
  }
};

export const handleRequestComplete = (req: any, res: any) => {
  try {
    const ignoreUrls = ['health'];

    const isIgnoredUrl = ignoreUrls.some((x) => req.originalUrl.includes(x));
    if (isIgnoredUrl) return;

    const allErrorCodes = [403, 404, 422, 500, 409];

    if (res.statusCode === 403) {
      logger.fatal(
        `Request Completed | ${res.req.originalUrl || ''} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    } else if (res.statusCode === 401) {
      logger.debug(
        `Request Completed | ${res.req.originalUrl || ''} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    } else if (allErrorCodes.includes(res.statusCode)) {
      logger.error(
        `Request Completed | ${res.req.originalUrl || ''} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    } else {
      logger.info(
        `Request Completed | ${res.req.originalUrl || ''} | METHOD : ${
          res.req.method
        } | STATUS : ${res.statusCode}`
      );
    }
  } catch (e) {
    console.log(e);
  }
};
