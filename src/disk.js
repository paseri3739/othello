"use strict";

/**
 * ディスクの状態を表す定数。
 * @typedef {number} DiskState
 */
export const DiskState = Object.freeze({
  EMPTY: /** @type {DiskState} */ (0),
  BLACK: /** @type {DiskState} */ (1),
  WHITE: /** @type {DiskState} */ (-1),

  /**
   * 状態に対応するラベルを取得する。
   * @param {DiskState} state
   * @returns {string} The label of the disk state.
   */
  getLabel(state) {
    switch (state) {
      case DiskState.BLACK:
        return "BLACK";
      case DiskState.WHITE:
        return "WHITE";
      case DiskState.EMPTY:
      default:
        return "EMPTY";
    }
  },
});

/**
 * ディスククラス。
 */
export class Disk {
  /**
   * コンストラクタ
   * @param {DiskState} state
   */
  constructor(state) {
    this.state = state;
  }

  /**
   * 状態を取得する。
   * @returns {DiskState}
   */
  getState() {
    return this.state;
  }

  /**
   * 状態を設定する。
   * @param {DiskState} state
   */
  setState(state) {
    this.state = state;
  }
}
