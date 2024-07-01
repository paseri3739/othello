"use strict";

import { Board } from "./board.js";

/**
 * イベントマネージャークラス。
 */
export class EventManager {
  /**
   * コンストラクタ
   * @param {Board} board
   * @param {Function} getCurrentPlayerCallback
   */
  constructor(board, getCurrentPlayerCallback) {
    this.board = board;
    this.getCurrentPlayerCallback = getCurrentPlayerCallback;
    this.highlightedCell = { row: -1, col: -1 }; // 初期化
  }

  /**
   * 全てのイベントを初期化する。
   */
  init() {
    this.addClickEvent();
    this.addMouseOverEvent();
  }

  /**
   * クリックイベントを追加する。
   */
  addClickEvent() {
    const self = this;
    $("#board")
      .off("click")
      .on("click", "td", function (event) {
        const $cell = $(event.currentTarget);
        const { row, col } = self.board.getClickedCellIndex($cell);
        const currentPlayer = self.getCurrentPlayerCallback();
        if (currentPlayer.isLegalMove(row, col)) {
          currentPlayer.playMove(row, col);
        }
      });
  }

  /**
   * マウスオーバーイベントを追加する。
   */
  addMouseOverEvent() {
    const self = this;
    $("#board")
      .off("mouseover", "td")
      .on("mouseenter", "td", function (event) {
        const $cell = $(event.currentTarget);
        const { row, col } = self.board.getClickedCellIndex($cell);
        const currentPlayer = self.getCurrentPlayerCallback();
        if (currentPlayer.isLegalMove(row, col)) {
          self.board.renderer.clearHighlights();
          self.board.renderer.highlightCell(
            row,
            col,
            currentPlayer.getDiskState()
          );
          self.highlightedCell = { row, col }; // ハイライトされたセルを更新
        }
      })
      .off("mouseleave", "td")
      .on("mouseleave", "td", function (event) {
        const $cell = $(event.currentTarget);
        const { row, col } = self.board.getClickedCellIndex($cell);
        if (
          self.highlightedCell.row === row &&
          self.highlightedCell.col === col
        ) {
          self.board.renderer.clearHighlights();
          self.highlightedCell = { row: -1, col: -1 }; // ハイライトされたセルをリセット
        }
      });
  }
}
