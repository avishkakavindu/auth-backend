import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, TypeOf, ZodObject, ZodSchema, object } from 'zod';

/**
 * Validate the request body using the schema and un defined data in object will be stripped
 * @param {AnyZodObject} schema - Schema required for validation
 * @returns
 */
const validateResource =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const validatedReqData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      req.body = validatedReqData?.body || {};
      req.query = validatedReqData?.query || {};
      req.params = validatedReqData?.params || {};

      next();
    } catch (e: any) {
      return res.status(400).send(e.errors);
    }
  };

export default validateResource;
