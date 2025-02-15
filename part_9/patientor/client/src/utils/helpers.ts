import { AxiosError } from "axios";

interface ErrorData {
  error: ZodErrors
}

interface ZodErrors {
  issues: Issue[]
}

interface Issue {
  code: string
  message: string
  path: string[]
  received?: string
}

export const parseErrors = (error: AxiosError<ErrorData>) => {
  const errors = error.response?.data.error.issues;
  return errors?.map(error => error.message).join('\n');
};