import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import _0x4bc345 from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SIGHTAI } from './dapps/sight_ai.js';
import { Config } from '../../config/config.js';
export default class Core extends API {
  constructor(_0x36c156) {
    super("https://sightai.io", "sightai.io", "https://sightai.io");
    this.acc = _0x36c156;
    this.played = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
 // this.stateTree = '%5B%22%22%2C%7B%22children%22%3A%5B%22(platform)%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22referral-code%5C%22%3A%5C%22' + this.something + "%5C%22%7D%22%2C%7B%7D%2C%22%2Fdashboard%3Freferral-code%3D" + this.something + '%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D';
  }
  async ["connectWallet"]() {
    try {
      const _0x4ca45b = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x46e6fe = Helper.determineType(_0x4ca45b);
      _0x4bc345.info("Account Type : " + _0x46e6fe);
      if (_0x46e6fe == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x4ca45b, this.provider);
      } else {
        if (_0x46e6fe == "Private Key") {
          this.wallet = new ethers.Wallet(_0x4ca45b.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}";
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x5c28c2) {
      throw _0x5c28c2;
    }
  }
  async ["getBalance"](_0x228500 = false) {
    try {
      if (!_0x228500) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x49be10 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x49be10;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x4bd3a5) {
      throw _0x4bd3a5;
    }
  }
  async ["getUserInfo"](_0x8b59d3 = false) {
    try {
      if (_0x8b59d3) {
        await Helper.delay(0x1f4, this.acc, "Getting User Information of " + this.wallet.address, this);
      }
      const _0x496815 = await this.fetch("/dashboard?referral-code=" + this.something, 'POST', undefined, [this.address], {
     // 'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
        'Next-Action': "5dd1862a3d5d9a970c36c027f2d82f7280223906",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x496815.status == 0xc8) {
        this.user = this.decodeData(_0x496815.message);
        this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}; " + this.sessionCookie;
        if (_0x8b59d3) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got User Data", this);
        }
      }
    } catch (_0x21f606) {
      throw _0x21f606;
    }
  }
  async ["checkIn"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Check In...", this);
      const _0x9d633c = await this.fetch('/dashboard?referral-code=' + this.something, 'POST', undefined, [], {
     // 'Referer': 'https://sightai.io/dashboard?referral-code=' + this.something,
        'Next-Action': "e5afaaaeff44c664f214a016c10409c8e930d77a",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x9d633c.status == 0xc8) {
        await Helper.delay(0x1f4, this.acc, "Successfully Check In", this);
      } else {
        throw Error("Failed To Check In " + _0x9d633c.message);
      }
    } catch (_0x145846) {
      throw _0x145846;
    }
  }
  async ["connectSightAiDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Sight Ai Dapps", this);
    const _0x5cf463 = SIGHTAI.URL + " wants you to sign in with your Ethereum account: " + this.address + "\n\nMake sure that you trust this site and are aware of the security implications of signing this message.\n\nURI: " + SIGHTAI.URL + "\nVersion: " + SIGHTAI.VERSION + "\nChain ID: " + RPC.CHAINID + "\nNonce: " + Helper.generateNonce() + "\nIssued At: " + new Date().toISOString() + "\n";
    _0x4bc345.info("Message to sign: " + _0x5cf463);
    const _0x25eb07 = await this.wallet.signMessage(_0x5cf463);
    _0x4bc345.info("Signed Message: " + _0x25eb07);
    const _0x4a59dd = await this.fetch('/dashboard?referral-code=' + this.something, 'POST', undefined, [_0x25eb07, _0x5cf463, this.something], {
   // 'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
      'Next-Action': '3b934a35aaaa2acd0f7846cda4c3b1031a840b89',
      'Next-Router-State-Tree': this.stateTree,
      'Cookie': this.cookie
    });
    if (_0x4a59dd.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Connected to Sight AI", this);
      this.sightAiSignature = _0x25eb07;
    } else {
      throw Error("Failed to connect to SIGHT AI");
    }
  }
  async ['getArcadeData'](_0x2f148c = false) {
    try {
      if (_0x2f148c) {
        await Helper.delay(0x1f4, this.acc, "Getting Arcade Game Information...", this);
      }
      const _0x2c6980 = await this.fetch("/fomo", "POST", undefined, [0x0, "$undefined", 0x1, 0x6], {
     // 'Referer': "https://sightai.io/fomo",
        'Next-Action': "5ac42dcc7a005b04d92431cdc4172391e05d2ca3",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x2c6980.status == 0xc8) {
        const _0x4f37e6 = this.decodeData(_0x2c6980.message);
        this.arcade = [];
        if (_0x4f37e6.pools) {
          this.arcade.push(..._0x4f37e6.pools);
        }
        this.availableArcade = this.arcade.find(_0x484767 => _0x484767.state == 0x1 || _0x484767.state == 0x2 || _0x484767.winner == "0x0000000000000000000000000000000000000000");
        if (_0x2f148c) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got Arcade Info", this);
        }
      }
    } catch (_0x1e3206) {
      throw _0x1e3206;
    }
  }
  async ['playArcade'](_0x681114) {
    try {
      await Helper.delay(0x3e8, this.acc, "Playing Arcade Game ID " + _0x681114.id + "...", this);
      await Helper.delay(0x1f4, this.acc, "Prepare for Tx...", this);
      await Helper.delay(0x1f4, this.acc, "Estimating Gas...", this);
      const _0x4f32a5 = ethers.parseEther(Config.PLAYAMOUNT.toString());
      const _0x2bac48 = Config.RAWDATA;
      const _0x338271 = await this.provider.getTransactionCount(this.wallet.address, 'latest');
      const _0x3823ab = await this.provider.getFeeData();
      const _0x49e33d = await this.estimateGasWithRetry(_0x681114.address, _0x4f32a5, _0x2bac48, 0x3);
      await Helper.delay(0x1f4, this.acc, "Build Tx Data...", this);
      const _0x3eea25 = {
        'from': this.address,
        'to': _0x681114.address,
        'value': _0x4f32a5,
        'gasLimit': _0x49e33d,
        'gasPrice': _0x3823ab.gasPrice,
        'nonce': _0x338271,
        'data': _0x2bac48
      };
      _0x4bc345.info("Preparing to send transaction for Arcade Game ID " + _0x681114.id);
      await this.executeTx(_0x3eea25);
      this.played = true;
    } catch (_0x3bf372) {
      await Helper.delay(0xbb8, this.acc, "Error Playing Arcade " + _0x3bf372.message + "...", this);
      this.played = false;
    }
  }
  async ['estimateGasWithRetry'](_0x3ebbe7, _0x2fb19e, _0x4f171f, _0x3dfc8a = 0x3, _0x4b0411 = 0xbb8) {
    for (let _0x268487 = 0x0; _0x268487 < _0x3dfc8a; _0x268487++) {
      try {
        const _0x327c52 = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x3ebbe7,
          'value': _0x2fb19e,
          'data': _0x4f171f
        });
        return _0x327c52;
      } catch (_0x30e02b) {
        await Helper.delay(_0x4b0411, this.acc, _0x30e02b.shortMessage + "... Attempt " + (_0x268487 + 0x1) + " of " + _0x3dfc8a, this);
        if (_0x268487 === _0x3dfc8a - 0x1) {
          throw Error("Failed to estimate gas after " + _0x3dfc8a + " attempts.");
        }
      }
    }
  }
  ["decodeData"](_0x11058c) {
    const _0x2f846e = _0x11058c.split("\n").filter(Boolean);
    let _0x2feee7 = null;
    _0x2f846e.forEach(_0x7e1350 => {
      if (_0x7e1350.startsWith('1:')) {
        const _0x19870b = _0x7e1350.substring(0x2).trim();
        try {
          _0x2feee7 = JSON.parse(_0x19870b);
        } catch (_0x6f41fc) {
          _0x2feee7 = {};
        }
      }
    });
    let _0x22d028 = JSON.stringify(_0x2feee7).replace(new RegExp(this.something, 'g'), "?????");
    if (_0x22d028.length > 0xc8) {
      _0x22d028 = _0x22d028.substring(0x0, 0xc8) + "...";
    }
    _0x4bc345.info("JSON Data : " + _0x22d028);
    return _0x2feee7;
  }
  async ["executeTx"](_0x3ce68e) {
    _0x4bc345.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x3ce68e)));
    await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
    const _0x2ad7a0 = await this.wallet.sendTransaction(_0x3ce68e);
    const _0x45d591 = await _0x2ad7a0.wait();
    _0x4bc345.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x45d591));
    await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + "tx/" + _0x45d591.hash, this);
    await this.getBalance(true);
  }
}
