"use strict";

import { Cell } from "./cell.js";
import { DiskState } from "./disk.js";

/**
 * ルールバリデータクラス。
 */
export class RuleValidator {
  /**
   * コンストラクタ
   * @param {Cell[][]} board
   */
  constructor(board) {
    this.board = board;
  }

  /**
   * 合法手かどうかを判定する。
   * @param {number} row
   * @param {number} col
   * @param {DiskState} playerDisk
   * @returns {boolean} trueなら合法手。
   */
  isLegalMove(row, col, playerDisk) {
    if (this.board[row][col].getDisk().getState() !== DiskState.EMPTY) {
      return false;
    }

    const opponent =
      playerDisk === DiskState.BLACK ? DiskState.WHITE : DiskState.BLACK;

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      let foundOpponent = false;

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const state = this.board[x][y].getDisk().getState();
        if (state === opponent) {
          foundOpponent = true;
        } else if (state === playerDisk) {
          if (foundOpponent) {
            return true;
          }
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return false;
  }

  /**
   * ひっくり返せるディスクを取得する。
   * @param {number} row
   * @param {number} col
   * @param {DiskState} playerDisk
   * @returns {Array<{row: number, col: number}>} ひっくり返せるディスクの位置の配列。
   */
  getReversibleDisks(row, col, playerDisk) {
    const reversibleDisks = [];

    const opponent =
      playerDisk === DiskState.BLACK ? DiskState.WHITE : DiskState.BLACK;

    const directions = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, -1],
      [0, 1],
      [1, -1],
      [1, 0],
      [1, 1],
    ];

    for (const [dx, dy] of directions) {
      let x = row + dx;
      let y = col + dy;
      const path = [];

      while (x >= 0 && x < 8 && y >= 0 && y < 8) {
        const state = this.board[x][y].getDisk().getState();
        if (state === opponent) {
          path.push({ row: x, col: y });
        } else if (state === playerDisk) {
          if (path.length > 0) {
            reversibleDisks.push(...path);
          }
          break;
        } else {
          break;
        }
        x += dx;
        y += dy;
      }
    }

    return reversibleDisks;
  }
}
