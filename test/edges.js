var states = require('../state')
var tape = require('tape')
var u = require('../util')

function clone (obj) {
  return JSON.parse(JSON.stringify(obj))
}

tape('receive remote note before we sent ours', function (t) {

  var msg = {sequence: 3, author: 'alice', content: 'blah'}

  var state = states.init(2)
  t.equal(state.ready, 2) //assume that a request for message 2 has been sent.

//  state = states.read(state)
  
  //we received their note, but have not sent ours yet.
  state = states.receiveNote(state, 1)

  t.equal(state.local.req, null)
  t.equal(state.remote.req, 1)

  //since when we receive their note we know we are behind
  //assume they are in tx mode, but we are not.
//  t.equal(state.local.tx, true, 'since we are behind, we should not transmit')
//  t.equal(state.remote.tx, true, 'since remote is ahead, they should transmit')

  t.deepEqual(state, {
    local: {seq: 2, req: null, tx: true},
    remote: {seq: null, req: 1, tx: true},
    ready: 2,
    effect: null
  })


//  var _state = states.receiveMessage(clone(state), msg)
//
//  t.deepEqual(_state, {
//    local: {seq: 2, req: 2, tx: false},
//    remote: {seq: 3, req: 10, tx: true},
//    ready: null,
//    effect: msg
//  })
//
//  _state.effect = null //assume this was appended
//
//  _state = states.appendMessage(_state, msg)
//
//  t.deepEqual(_state, {
//    local: {seq: 3, req: 2, tx: false},
//    remote: {seq: 3, req: 10, tx: true},
//    ready: null,
//    effect: null
//  })
//

  t.end()
})


