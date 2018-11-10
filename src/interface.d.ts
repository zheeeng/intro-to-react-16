declare type FacebookStandardAction<T = string, P = never, M extends { error: Error } = never> =
  [P] extends [never]
    ? [M] extends [never]
      ? { type: T }
      : { type: T, meta: M }
    : [M] extends [never]
      ? { type: T, payload: P }
      : { type: T, payload: P, meta: M }

declare type FSA<T = string, P = never, M extends { error: Error } = never> = FacebookStandardAction<T, P, M>
