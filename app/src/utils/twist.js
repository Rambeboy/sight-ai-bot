import { Twisters } from 'twisters';
import './helper.js';
import _0x2f0969 from './logger.js';
import _0x37570c from '../core/core.js';
import { privateKey } from '../../accounts/accounts.js';
import { RPC } from '../core/network/rpc.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ['log'](_0x28a723 = '', _0x36d72b = '', _0x1f4ee2 = new _0x37570c(), _0x451a09) {
    if (_0x451a09 == undefined) {
      _0x2f0969.info("Account " + (privateKey.indexOf(_0x36d72b) + 0x1) + " - " + _0x28a723);
      _0x451a09 = '-';
    }
    const _0x32d98c = _0x1f4ee2.address ?? '-';
    const _0x206914 = _0x1f4ee2.balance ?? '-';
    const _0x58d7a6 = _0x1f4ee2.user ?? {};
    const _0x4ea0df = _0x58d7a6.point ?? '-';
    this.twisters.put(_0x36d72b, {
      'text': "\n================== Account " + (privateKey.indexOf(_0x36d72b) + 0x1) + " ==================\nAddress      : " + _0x32d98c + "\nBalance      : " + _0x206914 + " " + RPC.SYMBOL + "\nPoint        : " + _0x4ea0df + "\n\nStatus : " + _0x28a723 + "\nDelay : " + _0x451a09 + "\n=============================================="
    });
  }
  ["info"](_0x3813db = '') {
    this.twisters.put(0x2, {
      'text': "\n=============================================\nInfo : " + _0x3813db + "\n============================================="
    });
    return;
  }
  ['clearInfo']() {
    this.twisters.remove(0x2);
  }
  ["clear"](_0x4f529e) {
    this.twisters.remove(_0x4f529e);
  }
}
export default new Twist();
