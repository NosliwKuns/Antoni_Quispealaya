import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';

export function IsValidSeatType(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isValidSeatType',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return ['Turista', 'Ejecutivo', 'Premium'].includes(value.toLowerCase());
        },
        defaultMessage(validationArguments?: ValidationArguments) {
          return `${validationArguments?.property} must be one of: Turista, Ejecutivo, Premium`;
        },
      },
    });
  };
}