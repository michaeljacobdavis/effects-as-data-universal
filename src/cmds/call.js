/**
 * Creates a `call` cmd.  `yield` a `call` cmd to call another effects-as-data function.  `call` is used to compose effects-as-data functions in a testible manner.
 * @param {Function} fn an effects-as-data generator function.
 * @param {any} [payload] the payload for the effects-as-data function.
 * @param {Object} [options={}] options for `call`
 * @returns {Object} an cmd of type `call`.
 * @example //  Test It
 * const { testIt } = require('effects-as-data/test')
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * const testExample = testIt(example)
 *
 * describe('example()', () => {
 *   it('should call an effects-as-data function', testExample(() => {
 *     return [
 *       ['123', cmds.call(getUser, { id: '123' })],
 *       [{ id: '123', username: 'foo' }, success({ id: '123', username: 'foo' })]
 *     ]
 *   }))
 * })
 *
 * @example //  Write It
 * const { cmds } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * function * getUser ({ id }) {
 *  const user = yield cmds.httpGet(`https://example.com/api/v1/users/${id}`)
 *  return user
 * }
 *
 * function * example ({ id }) {
 *   const result = yield cmds.call(getUser, { id })
 *   return result
 * }
 *
 * @example //  Run It
 * const { handlers, run } = require('effects-as-data/universal') //  also available in require('effects-as-data/node')
 *
 * run(handlers, example, { id: '123' }).then((user) => {
 *   user.payload.id === '123' //  true
 *   user.payload.username === 'foo' //  true, if a user with an id of '123' has the `username` 'foo'.
 * })
 */
function call(fn, payload) {
  return {
    type: 'call',
    fn,
    payload
  }
}

module.exports = {
  call
}
