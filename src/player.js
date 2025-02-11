"use strict";
import { Board } from "./board.js";
import { DiskState } from "./disk.js";

/**
 * プレイヤークラス。
 */
export class Player {
  /**
   * コンストラクタ
   * @param {DiskState} diskState
   * @param {Board} board
   */
  constructor(diskState, board) {
    this.diskState = diskState;
    this.board = board;
  }

  /**
   * ディスクの状態を取得する。
   * @returns {DiskState}
   */
  getDiskState() {
    return this.diskState;
  }

  /**
   * 合法手かどうかを判定する。
   * playerに実装するとboardの状態を知らなければならないためこの場合には不適切。
   * boardに実装して移譲することでplayerはboardの状態を知らなくてもよくなる。
   * @param {number} row
   * @param {number} col
   * @returns {boolean} trueなら合法手。
   */
  isLegalMove(row, col) {
    return this.board.isLegalMove(row, col, this.diskState);
  }

  /**
   * 手を打つ。
   * playerに実装するとboardの状態を知らなければならないためこの場合には不適切。
   * boardに実装して移譲することでplayerはboardの状態を知らなくてもよくなる。
   * @param {number} row
   * @param {number} col
   */
  playMove(row, col) {
    this.board.playMove(row, col, this.diskState);
  }
}
