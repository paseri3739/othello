"use strict";
import { Board } from "./board.js";
import { Player } from "./player.js";
import { DiskState } from "./disk.js";

/**
 * ゲームクラス。
 */
export class Game {
  constructor() {
    this.board = new Board(
      () => this.getCurrentPlayer(),
      () => this.changePlayer()
    );
    this.blackPlayer = new Player(DiskState.BLACK, this.board);
    this.whitePlayer = new Player(DiskState.WHITE, this.board);
    this.currentPlayer = this.blackPlayer;
  }

  /**
   * 現在のプレイヤーを取得する。
   * @returns {Player} The current player.
   */
  getCurrentPlayer() {
    return this.currentPlayer;
  }

  /**
   * プレイヤーを交代する。
   */
  changePlayer() {
    this.currentPlayer =
      this.currentPlayer === this.blackPlayer
        ? this.whitePlayer
        : this.blackPlayer;
    this.board.notifyPlayerChange();
  }

  /**
   * メインのゲームロジックを実行する。
   * @param {number} row
   * @param {number} col
   */
  playMove(row, col) {
    this.currentPlayer.playMove(row, col);
  }
}
