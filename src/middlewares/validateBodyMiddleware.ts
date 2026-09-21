import { NextFunction, Request, Response } from "express";

export const validateBodyMiddleware = (requiredFields: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const camposFaltantes = requiredFields.filter(field => req.body[field] === undefined || req.body[field] === null);

    if (camposFaltantes.length > 0) {
      return res.status(400).json({ 
        message: `Faltan campos: ${camposFaltantes.join(", ")}` 
      });
    }

    next();
  };
};

//export const validateSchemaMiddleware = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
//  try {
//    await schema.validate(req.body);
//    next();
//  } catch (error: any) {
//    return res.status(400).json({ message: error.message });
//  }
//};