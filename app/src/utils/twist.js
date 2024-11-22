import { Twisters } from 'twisters';
import './helper.js';
import _0x1ba111 from './logger.js';
import _0x24d83a from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x1224af = '', _0x33a809 = '', _0x41bdad = new _0x24d83a(), _0x3bd72c) {
    if (_0x3bd72c == undefined) {
      _0x1ba111.info("Account " + (privateKey.indexOf(_0x33a809) + 0x1) + " - " + _0x1224af);
      _0x3bd72c = '-';
    }
    const _0x5c41b7 = _0x41bdad.address ?? '-';
    const _0x582fa2 = _0x41bdad.balance ?? '-';
    const _0xd48fa3 = _0x41bdad.user ?? {};
    const _0x141f6f = _0xd48fa3.point ?? '-';
    this.twisters.put(_0x33a809, {
      'text': "\n================== Account " + (privateKey.indexOf(_0x33a809) + 0x1) + " ==================\nAddress      : " + _0x5c41b7 + "\nBalance      : " + _0x582fa2 + " " + RPC.SYMBOL + "\nPoint        : " + _0x141f6f + "\n\nStatus : " + _0x1224af + "\nDelay : " + _0x3bd72c + "\n=============================================="
    });
  }
  ['info'](_0x1cd9af = '') {
    this.twisters.put(0x2, {
      'text': "\n=============================================\nInfo : " + _0x1cd9af + "\n============================================"
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x5f1202) {
    this.twisters.remove(_0x5f1202);
  }
}
export default new Twist();
