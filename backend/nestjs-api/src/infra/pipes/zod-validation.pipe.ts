import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
  UsePipes,
  applyDecorators,
} from '@nestjs/common'
import { ZodError, ZodSchema, ZodType, z } from 'zod'

type ZodObj<T extends Record<PropertyKey, unknown>> = {
  [key in keyof T]: ZodType<T[key]>
}

/**
 * type ObjType = { name: string }
 *
 * const myZodObj = zodObject<ObjType>({ name: z.string() })
 */
function zodObject<T extends Record<PropertyKey, unknown>>(
  schema: ZodObj<T>
): ZodSchema<T> {
  return z.object(schema) as unknown as ZodSchema<T>
}

class ZodValidationError extends BadRequestException {
  constructor(errors: ZodError['errors']) {
    const details = errors.map(({ path, ...rest }) => ({
      field: path.join('.'),
      ...rest,
    }))

    super({
      details,
      error: 'InputData',
      statusCode: 400,
    })
  }

  static example(field = 'name') {
    const errors: ZodError['errors'] = [
      {
        code: 'invalid_type',
        expected: 'string',
        message: 'Required',
        path: [field],
        received: 'undefined',
      },
    ]
    return new this(errors).getResponse()
  }
}

class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema) {}

  transform(value: unknown, metadata: ArgumentMetadata) {
    if (!value) return

    const isNotBodyParam = metadata.type !== 'body'
    const isFile = typeof value === 'object' && 'fieldname' in value

    if (isNotBodyParam || isFile) return value

    try {
      return this.schema.parse(value)
    } catch (error) {
      if (error instanceof ZodError) {
        throw new ZodValidationError(error.errors)
      }

      throw new BadRequestException('Zod Validation failed:', error.message)
    }
  }
}

/**
 * @UseZodValidation(someZodObject)
 */
function UseZodValidation(schema: ZodSchema) {
  return applyDecorators(UsePipes(new ZodValidationPipe(schema)))
}

export { UseZodValidation, zodObject, z, ZodValidationError }
