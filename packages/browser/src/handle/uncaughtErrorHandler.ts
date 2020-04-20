import { types, createEvent } from '@ohbug/core'
import { OhbugEvent, OhbugBaseDetail } from '@ohbug/types'

const { UNCAUGHT_ERROR } = types

export interface UncaughtErrorDetail extends OhbugBaseDetail {
  name: string
  filename: string
  lineno: number
  colno: number
  stack: string
}

function uncaughtErrorHandler(
  error: ErrorEvent,
  collect: (event: OhbugEvent<UncaughtErrorDetail>) => void
) {
  const {
    message,
    filename,
    lineno,
    colno,
    error: { stack, name }
  } = error

  const event = createEvent<UncaughtErrorDetail>(UNCAUGHT_ERROR, {
    name,
    message,
    filename,
    lineno,
    colno,
    stack
  })
  collect(event)
}

export default uncaughtErrorHandler
