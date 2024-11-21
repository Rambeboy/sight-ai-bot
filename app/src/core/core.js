import { ethers } from 'ethers';
import { API } from '../api/api.js';
import { privateKey } from '../../accounts/accounts.js';
import { Helper } from '../utils/helper.js';
import _0x49b452 from '../utils/logger.js';
import { RPC } from './network/rpc.js';
import { SIGHTAI } from './dapps/sight_ai.js';
import { Config } from '../../config/config.js';
export default class Core extends API {
  constructor(_0x1431f3) {
    super('https://sightai.io', "sightai.io", "https://sightai.io");
    this.acc = _0x1431f3;
    this.played = false;
    this.provider = new ethers.JsonRpcProvider(RPC.RPCURL, RPC.CHAINID);
    this.stateTree = "%5B%22%22%2C%7B%22children%22%3A%5B%22(platform)%22%2C%7B%22children%22%3A%5B%22dashboard%22%2C%7B%22children%22%3A%5B%22__PAGE__%3F%7B%5C%22referral-code%5C%22%3A%5C%22" + this.something + "%5C%22%7D%22%2C%7B%7D%2C%22%2Fdashboard%3Freferral-code%3D" + this.something + "%22%2C%22refresh%22%5D%7D%5D%7D%5D%7D%2Cnull%2Cnull%2Ctrue%5D";
  }
  async ["connectWallet"]() {
    try {
      const _0x1cac34 = this.acc.replace(/^0x/, '');
      await Helper.delay(0x3e8, this.acc, "Connecting to Account : " + (privateKey.indexOf(this.acc) + 0x1), this);
      const _0x50a18d = Helper.determineType(_0x1cac34);
      _0x49b452.info("Account Type : " + _0x50a18d);
      if (_0x50a18d == "Secret Phrase") {
        this.wallet = new ethers.Wallet.fromPhrase(_0x1cac34, this.provider);
      } else {
        if (_0x50a18d == "Private Key") {
          this.wallet = new ethers.Wallet(_0x1cac34.trim(), this.provider);
        } else {
          throw Error("Invalid account Secret Phrase or Private Key");
        }
      }
      this.address = this.wallet.address;
      this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.wallet.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}";
      await Helper.delay(0x3e8, this.acc, "Wallet connected " + JSON.stringify(this.wallet.address), this);
    } catch (_0x5b703c) {
      throw _0x5b703c;
    }
  }
  async ["getBalance"](_0xaff5fb = false) {
    try {
      if (!_0xaff5fb) {
        await Helper.delay(0x1f4, this.acc, "Getting Wallet Balance of " + this.wallet.address, this);
      }
      const _0x4d70b9 = ethers.formatEther(await this.provider.getBalance(this.wallet.address));
      this.balance = _0x4d70b9;
      await Helper.delay(0x1f4, this.acc, "Balance updated", this);
    } catch (_0x10901d) {
      throw _0x10901d;
    }
  }
  async ["getUserInfo"](_0x1437d1 = false) {
    try {
      if (_0x1437d1) {
        await Helper.delay(0x1f4, this.acc, "Getting User Information of " + this.wallet.address, this);
      }
      const _0x15152f = await this.fetch('/dashboard?referral-code=' + this.something, "POST", undefined, [this.address], {
        'Referer': 'https://sightai.io/dashboard?referral-code=' + this.something,
        'Next-Action': '5dd1862a3d5d9a970c36c027f2d82f7280223906',
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x15152f.status == 0xc8) {
        this.user = this.decodeData(_0x15152f.message);
        this.cookie = "wagmi.recentConnectorId=\"com.okex.wallet\"; wagmi.store={\"state\":{\"connections\":{\"__type\":\"Map\",\"value\":[[\"b5fe8e1e492\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"com.okex.wallet\",\"name\":\"OKX Wallet\",\"type\":\"injected\",\"uid\":\"b5fe8e1e492\"}}],[\"8c5b60aac25\",{\"accounts\":[\"" + this.address + "\"],\"chainId\":17000,\"connector\":{\"id\":\"metaMask\",\"name\":\"MetaMask\",\"type\":\"injected\",\"uid\":\"8c5b60aac25\"}}]]},\"chainId\":17000,\"current\":\"8c5b60aac25\"},\"version\":2}; " + this.sessionCookie;
        if (_0x1437d1) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got User Data", this);
        }
      }
    } catch (_0x459f61) {
      throw _0x459f61;
    }
  }
  async ["checkIn"]() {
    try {
      await Helper.delay(0x1f4, this.acc, "Try To Check In...", this);
      const _0x3880f9 = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [], {
        'Referer': 'https://sightai.io/dashboard?referral-code=' + this.something,
        'Next-Action': "e5afaaaeff44c664f214a016c10409c8e930d77a",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0x3880f9.status == 0xc8) {
        await Helper.delay(0x1f4, this.acc, "Successfully Check In", this);
      } else {
        throw Error("Failed To Check In " + _0x3880f9.message);
      }
    } catch (_0xbef2d5) {
      throw _0xbef2d5;
    }
  }
  async ["connectSightAiDapps"]() {
    await Helper.delay(0x3e8, this.acc, "Connecting to Sight Ai Dapps", this);
    const _0x1a7ee7 = SIGHTAI.URL + " wants you to sign in with your Ethereum account: " + this.address + "\n\nMake sure that you trust this site and are aware of the security implications of signing this message.\n\nURI: " + SIGHTAI.URL + "\nVersion: " + SIGHTAI.VERSION + "\nChain ID: " + RPC.CHAINID + "\nNonce: " + Helper.generateNonce() + "\nIssued At: " + new Date().toISOString() + "\n";
    _0x49b452.info("Message to sign: " + _0x1a7ee7);
    const _0x11e704 = await this.wallet.signMessage(_0x1a7ee7);
    _0x49b452.info("Signed Message: " + _0x11e704);
    const _0x7c537c = await this.fetch("/dashboard?referral-code=" + this.something, "POST", undefined, [_0x11e704, _0x1a7ee7, this.something], {
      'Referer': "https://sightai.io/dashboard?referral-code=" + this.something,
      'Next-Action': "3b934a35aaaa2acd0f7846cda4c3b1031a840b89",
      'Next-Router-State-Tree': this.stateTree,
      'Cookie': this.cookie
    });
    if (_0x7c537c.status == 0xc8) {
      await Helper.delay(0x1f4, this.acc, "Connected to Sight AI", this);
      this.sightAiSignature = _0x11e704;
    } else {
      throw Error("Failed to connect to SIGHT AI");
    }
  }
  async ["getArcadeData"](_0x2debca = false) {
    try {
      if (_0x2debca) {
        await Helper.delay(0x1f4, this.acc, "Getting Arcade Game Information...", this);
      }
      const _0xc46391 = await this.fetch("/fomo", "POST", undefined, [0x0, "$undefined", 0x1, 0x6], {
        'Referer': "https://sightai.io/fomo",
        'Next-Action': "5ac42dcc7a005b04d92431cdc4172391e05d2ca3",
        'Next-Router-State-Tree': this.stateTree,
        'Cookie': this.cookie
      });
      if (_0xc46391.status == 0xc8) {
        const _0x584cd2 = this.decodeData(_0xc46391.message);
        this.arcade = [];
        if (_0x584cd2.pools) {
          this.arcade.push(..._0x584cd2.pools);
        }
        this.availableArcade = this.arcade.find(_0x3b0fb7 => _0x3b0fb7.state == 0x1 || _0x3b0fb7.state == 0x2 || _0x3b0fb7.winner == "0x0000000000000000000000000000000000000000");
        if (_0x2debca) {
          await Helper.delay(0x1f4, this.acc, "Successfully Got Arcade Info", this);
        }
      }
    } catch (_0x303e74) {
      throw _0x303e74;
    }
  }
  async ['playArcade'](_0x239dcb) {
    try {
      await Helper.delay(0x3e8, this.acc, "Playing Arcade Game ID " + _0x239dcb.id + "...", this);
      await Helper.delay(0x1f4, this.acc, "Prepare for Tx...", this);
      await Helper.delay(0x1f4, this.acc, "Estimating Gas...", this);
      const _0x33747f = ethers.parseEther(Config.PLAYAMOUNT.toString());
      const _0x272e47 = Config.RAWDATA;
      const _0x152e0f = await this.provider.getTransactionCount(this.wallet.address, "latest");
      const _0x5ad7a9 = await this.provider.getFeeData();
      const _0x2442fc = await this.estimateGasWithRetry(_0x239dcb.address, _0x33747f, _0x272e47, 0x3);
      await Helper.delay(0x1f4, this.acc, "Build Tx Data...", this);
      const _0x1c956a = {
        'from': this.address,
        'to': _0x239dcb.address,
        'value': _0x33747f,
        'gasLimit': _0x2442fc,
        'gasPrice': _0x5ad7a9.gasPrice,
        'nonce': _0x152e0f,
        'data': _0x272e47
      };
      _0x49b452.info("Preparing to send transaction for Arcade Game ID " + _0x239dcb.id);
      await this.executeTx(_0x1c956a);
      this.played = true;
    } catch (_0x24fbc0) {
      await Helper.delay(0xbb8, this.acc, "Error Playing Arcade " + _0x24fbc0.message + "...", this);
      this.played = false;
    }
  }
  async ["estimateGasWithRetry"](_0x20e7eb, _0x3f9c45, _0x46812e, _0x57a6a0 = 0x3, _0x416710 = 0xbb8) {
    for (let _0xd77c86 = 0x0; _0xd77c86 < _0x57a6a0; _0xd77c86++) {
      try {
        const _0x2fbae8 = await this.provider.estimateGas({
          'from': this.wallet.address,
          'to': _0x20e7eb,
          'value': _0x3f9c45,
          'data': _0x46812e
        });
        return _0x2fbae8;
      } catch (_0x38d05d) {
        await Helper.delay(_0x416710, this.acc, _0x38d05d.shortMessage + "... Attempt " + (_0xd77c86 + 0x1) + " of " + _0x57a6a0, this);
        if (_0xd77c86 === _0x57a6a0 - 0x1) {
          throw Error("Failed to estimate gas after " + _0x57a6a0 + " attempts.");
        }
      }
    }
  }
  ["decodeData"](_0x22d7dd) {
    const _0x21fb54 = _0x22d7dd.split("\n").filter(Boolean);
    let _0x575dba = null;
    _0x21fb54.forEach(_0x9a206b => {
      if (_0x9a206b.startsWith('1:')) {
        const _0x5c53af = _0x9a206b.substring(0x2).trim();
        try {
          _0x575dba = JSON.parse(_0x5c53af);
        } catch (_0x1dfd23) {
          _0x575dba = {};
        }
      }
    });
    let _0x29f54e = JSON.stringify(_0x575dba).replace(new RegExp(this.something, 'g'), "?????");
    if (_0x29f54e.length > 0xc8) {
      _0x29f54e = _0x29f54e.substring(0x0, 0xc8) + '...';
    }
    _0x49b452.info("JSON Data : " + _0x29f54e);
    return _0x575dba;
  }
  async ['executeTx'](_0x21141c) {
    _0x49b452.info("TX DATA " + JSON.stringify(Helper.serializeBigInt(_0x21141c)));
    await Helper.delay(0x1f4, this.acc, "Executing TX...", this);
    const _0xdf5e05 = await this.wallet.sendTransaction(_0x21141c);
    const _0x26e3b1 = await _0xdf5e05.wait();
    _0x49b452.info("Tx Confirmed and Finalizing: " + JSON.stringify(_0x26e3b1));
    await Helper.delay(0x1388, this.acc, "Tx Executed \n" + RPC.EXPLORER + 'tx/' + _0x26e3b1.hash, this);
    await this.getBalance(true);
  }
        }
