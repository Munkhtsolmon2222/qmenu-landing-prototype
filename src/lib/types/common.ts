export class QueryError {
  message?: string;
  code?: string;
}

export interface ActionResponseType<T> {
  data?: T;
  error?: QueryError;
}
