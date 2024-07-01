"use strict";
import { BoardRenderer } from "./board_renderer.js";
import { Cell } from "./cell.js";
import { Disk, DiskState } from "./disk.js";
import { EventManager } from "./event_manager.js";
import { RuleValidator } from "./rule_validator.js";

/**
 * オセロ盤を管理するクラス。
 */
export class Board {
  /**
   * コンストラクタ
   * @param {Function} getCurrentPlayerCallback
   * @param {Function} changePlayerCallback
   */
  constructor(getCurrentPlayerCallback, changePlayerCallback) {
    this.board = Array(8)
      .fill(undefined)
      .map((_, row) =>
        Array(8)
          .fill(undefined)
          .map((_, col) => new Cell(row, col, new Disk(DiskState.EMPTY)))
      );
    this.board[3][3].setDisk(new Disk(DiskState.BLACK));
    this.board[4][4].setDisk(new Disk(DiskState.BLACK));
    this.board[3][4].setDisk(new Disk(DiskState.WHITE));
    this.board[4][3].setDisk(new Disk(DiskState.WHITE));
    this.getCurrentPlayerCallback = getCurrentPlayerCallback;
    this.changePlayerCallback = changePlayerCallback;
    this.endGame = false;
    this.eventManager = new EventManager(this, getCurrentPlayerCallback);
    this.renderer = new BoardRenderer(this.board);
    this.ruleValidator = new RuleValidator(this.board);
    this.init();
  }

  /**
   * ゲームを初期化する。最初の盤面をレンダリングし、クリックイベントを追加する。
   */
  init() {
    this.renderer.render();
    this.eventManager.init(); // イベントの初期化を一括で行う
  }

  /**
   * 合法手かどうかを判定する。
   * @param {number} row
   * @param {number} col
   * @param {DiskState} playerDisk
   * @returns {boolean} trueなら合法手。
   */
  isLegalMove(row, col, playerDisk) {
    return this.ruleValidator.isLegalMove(row, col, playerDisk);
  }

  /**
   * ひっくり返せるディスクを取得する。
   * @param {number} row
   * @param {number} col
   * @param {DiskState} playerDisk
   * @returns {Array<{row: number, col: number}>} ひっくり返せるディスクの位置の配列。
   */
  getReversibleDisks(row, col, playerDisk) {
    return this.ruleValidator.getReversibleDisks(row, col, playerDisk);
  }

  /**
   * クリックされたセルのインデックスを取得する。
   * @param {JQuery} $cell
   * @returns {{row: number, col: number}}
   */
  getClickedCellIndex($cell) {
    const $tr = $cell.closest("tr");
    const row = $tr.index();
    const col = $cell.index();
    return {
      row,
      col,
    };
  }

  /**
   * 手を打つ。
   * @param {number} row
   * @param {number} col
   * @param {DiskState} playerDisk
   */
  playMove(row, col, playerDisk) {
    if (this.endGame) {
      return;
    }

    if (this.isLegalMove(row, col, playerDisk)) {
      this.board[row][col].getDisk().setState(playerDisk);
      const reversibleDisks = this.getReversibleDisks(row, col, playerDisk);
      for (const disk of reversibleDisks) {
        this.board[disk.row][disk.col].getDisk().setState(playerDisk);
      }
      this.renderer.render();
      if (!this.hasLegalMoves(this.getNextPlayer(playerDisk))) {
        if (!this.hasLegalMoves(playerDisk)) {
          this.endGame = true;
          const winner = this.determineWinner();
          alert(`Game Over! Winner: ${winner}`);
        }
      } else {
        this.changePlayerCallback();
        this.notifyPlayerChange();
      }
    }
  }

  /**
   * 合法手が残っているかを確認する。
   * @param {DiskState} playerDisk
   * @returns {boolean} trueなら合法手が残っている。
   */
  hasLegalMoves(playerDisk) {
    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (
          this.board[row][col].getDisk().getState() === DiskState.EMPTY &&
          this.isLegalMove(row, col, playerDisk)
        ) {
          return true;
        }
      }
    }
    return false;
  }

  /**
   * 勝者を判定する。
   * @returns {string} 勝者のラベル。
   */
  determineWinner() {
    let blackCount = 0;
    let whiteCount = 0;

    for (let row = 0; row < 8; row++) {
      for (let col = 0; col < 8; col++) {
        if (this.board[row][col].getDisk().getState() === DiskState.BLACK) {
          blackCount++;
        } else if (
          this.board[row][col].getDisk().getState() === DiskState.WHITE
        ) {
          whiteCount++;
        }
      }
    }

    if (blackCount > whiteCount) {
      return "BLACK";
    } else if (whiteCount > blackCount) {
      return "WHITE";
    } else {
      return "DRAW";
    }
  }

  /**
   * 次のプレイヤーを取得する。
   * @param {DiskState} currentPlayer
   * @returns {DiskState} The next player.
   */
  getNextPlayer(currentPlayer) {
    return currentPlayer === DiskState.BLACK
      ? DiskState.WHITE
      : DiskState.BLACK;
  }

  /**
   * プレイヤー変更を通知する。
   */
  notifyPlayerChange() {
    this.getCurrentPlayerCallback();
  }
}
