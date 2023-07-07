const ZKLibTCP = require("./zklibtcp");

const { ZKError, ERROR_TYPES } = require("./zkerror");

class ZKLib {
  constructor(ip, port, timeout, inPort) {
    this.connectionType = "tcp";

    this.zklibTcp = new ZKLibTCP(ip, port, timeout);
    this.interval = null;
    this.timer = null;
    this.isBusy = false;
    this.ip = ip;
  }

  async functionWrapper(tcpCallback, command) {
    switch (this.connectionType) {
      case "tcp":
        if (this.zklibTcp.socket) {
          try {
            const res = await tcpCallback();
            return res;
          } catch (err) {
            return Promise.reject(new ZKError(err, `[TCP] ${command}`, this.ip));
          }
        } else {
          return Promise.reject(new ZKError(new Error(`Socket isn't connected !`), `[TCP]`, this.ip));
        }

      default:
        return Promise.reject(new ZKError(new Error(`Socket isn't connected !`), "", this.ip));
    }
  }

  async createSocket(cbErr, cbClose) {
    try {
      if (!this.zklibTcp.socket) {
        try {
          await this.zklibTcp.createSocket(cbErr, cbClose);
        } catch (err) {
          throw err;
        }

        try {
          await this.zklibTcp.connect();
        } catch (err) {
          throw err;
        }
      }

      this.connectionType = "tcp";
      return true;
    } catch (err) {
      console.log({ error: err });
    }
  }

  async getUsers() {
    return await this.functionWrapper(
      () => this.zklibTcp.getUsers(),
      () => this.zklibUdp.getUsers()
    );
  }

  async getAttendances(cb) {
    return await this.functionWrapper(
      () => this.zklibTcp.getAttendances(cb),
      () => this.zklibUdp.getAttendances(cb)
    );
  }

  async getRealTimeLogs(cb) {
    return await this.functionWrapper(
      () => this.zklibTcp.getRealTimeLogs(cb),
      () => this.zklibUdp.getRealTimeLogs(cb)
    );
  }

  async disconnect() {
    return await this.functionWrapper(
      () => this.zklibTcp.disconnect(),
      () => this.zklibUdp.disconnect()
    );
  }

  async freeData() {
    return await this.functionWrapper(
      () => this.zklibTcp.freeData(),
      () => this.zklibUdp.freeData()
    );
  }

  async getTime() {
    return await this.functionWrapper(
      () => this.zklibTcp.getTime(),
      () => this.zklibUdp.getTime()
    );
  }

  async disableDevice() {
    return await this.functionWrapper(
      () => this.zklibTcp.disableDevice(),
      () => this.zklibUdp.disableDevice()
    );
  }

  async enableDevice() {
    return await this.functionWrapper(
      () => this.zklibTcp.enableDevice(),
      () => this.zklibUdp.enableDevice()
    );
  }

  async getInfo() {
    return await this.functionWrapper(
      () => this.zklibTcp.getInfo(),
      () => this.zklibUdp.getInfo()
    );
  }

  async getSocketStatus() {
    return await this.functionWrapper(
      () => this.zklibTcp.getSocketStatus(),
      () => this.zklibUdp.getSocketStatus()
    );
  }

  async clearAttendanceLog() {
    return await this.functionWrapper(
      () => this.zklibTcp.clearAttendanceLog(),
      () => this.zklibUdp.clearAttendanceLog()
    );
  }

  async executeCmd(command, data = "") {
    return await this.functionWrapper(
      () => this.zklibTcp.executeCmd(command, data),
      () => this.zklibUdp.executeCmd(command, data)
    );
  }

  setIntervalSchedule(cb, timer) {
    this.interval = setInterval(cb, timer);
  }

  setTimerSchedule(cb, timer) {
    this.timer = setTimeout(cb, timer);
  }

  async setUser(name = "", password = "", uid, user_id) {
    return await this.functionWrapper(
      () => this.zklibTcp.setUser(name, password, uid, user_id),
      () => this.zklibUdp.setUser()
    );
  }

  async deleteUser(uid) {
    return await this.functionWrapper(
      () => this.zklibTcp.deleteUser(uid),
      () => this.zklibUdp.deleteUser(uid)
    );
  }
}

module.exports = ZKLib;
