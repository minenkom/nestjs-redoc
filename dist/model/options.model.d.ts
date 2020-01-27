import Joi = require('@hapi/joi');
import { SwaggerDocument } from '@nestjs/swagger';
export declare const schema: (document: SwaggerDocument) => Joi.ObjectSchema;
