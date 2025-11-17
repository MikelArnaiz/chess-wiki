export const Status = {
  Idle: 'idle',
  Loading: 'loading',
  Success: 'success',
  Failure: 'failure',
} as const

export type Idle = { kind: typeof Status.Idle }
export type Loading = { kind: typeof Status.Loading }
export type Success<T> = { kind: typeof Status.Success; data: T }
export type Failure = {
  kind: typeof Status.Failure
}

export const idle: Idle = { kind: Status.Idle }
export const loading: Loading = { kind: Status.Loading }
export const createSuccessStatus = <T>(data: T): Success<T> => ({
  kind: Status.Success,
  data,
})
export const createFailureStatus = (): Failure => ({
  kind: Status.Failure,
})

export type Status<Data> = Idle | Loading | Success<Data> | Failure

export const isIdleStatus = <T>(status: Status<T>): status is Idle =>
  status.kind === Status.Idle

export const isSuccessStatus = <T>(status: Status<T>): status is Success<T> =>
  status.kind === Status.Success

export const isFailureStatus = <T>(status: Status<T>): status is Failure =>
  status.kind === Status.Failure
