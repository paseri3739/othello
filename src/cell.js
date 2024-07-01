"use strict";
import { Disk } from "./disk.js";

/**
 * セルクラス。
 */
export class Cell {
  /**
   * コンストラクタ
   * @param {number} row
   * @param {number} col
   * @param {Disk} disk
   */
  constructor(row, col, disk) {
    this.row = row;
    this.col = col;
    this.disk = disk;
  }

  /**
   * ディスクを取得する。
   * @returns {Disk}
   */
  getDisk() {
    return this.disk;
  }

  /**
   * ディスクを設定する。
   * @param {Disk} disk
   */
  setDisk(disk) {
    this.disk = disk;
  }
}
