import merge from 'lodash.merge'

export type FooParams = Parameters<typeof merge>

export const foo = (...args: FooParams) => merge(...args)
