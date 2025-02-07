interface ErrorBase {
  code: string;
  message: string;
  path: string[];
}

interface EnumError extends ErrorBase {
  options: string[];
  received: string;
}

interface ValidationError extends ErrorBase {
  validation: string;
}

export type CustomError = EnumError | ValidationError;

export interface ParsedError {
  message: string;
  path?: string;
}

export const parseErrors = (errors: CustomError[]): ParsedError[] => {
  return errors.map(error => {
    if (error.message.includes('enum')) {
      const message = error.message.split('.')[0];
      return { message, path: error.path[0] };
    } else {
      return { message: error.message };
    }
  });
};