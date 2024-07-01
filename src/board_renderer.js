"use strict";
import { Cell } from "./cell.js";
import { DiskState } from "./disk.js";

/**
 * ボードレンダラークラス。
 */
export class BoardRenderer {
  /**
   * コンストラクタ
   * @param {Cell[][]} board
   */
  constructor(board) {
    this.board = board;
  }

  /**
   * ボードを描画する。
   */
  render() {
    const $board = $("#board").empty();
    this.board.forEach((row) => {
      const $tr = $("<tr>").appendTo($board);
      row.forEach((cell) => {
        const $td = $("<td>").appendTo($tr);
        if (cell.getDisk().getState() === DiskState.BLACK) {
          $("<div>").addClass("black").appendTo($td);
        } else if (cell.getDisk().getState() === DiskState.WHITE) {
          $("<div>").addClass("white").appendTo($td);
        }
      });
    });
  }

  /**
   * セルをハイライトする。
   * @param {number} row
   * @param {number} col
   * @param {DiskState} playerDisk
   */
  highlightCell(row, col, playerDisk) {
    const $row = $("#board").find("tr").eq(row);
    const $cell = $row.find("td").eq(col);
    const highlightClass =
      playerDisk === DiskState.BLACK ? "black-highlight" : "white-highlight";
    $cell.append(`<div class="${highlightClass}"></div>`);
  }

  /**
   * 全てのハイライトをクリアする。
   */
  clearHighlights() {
    $("#board").find(".black-highlight, .white-highlight").remove();
  }
}
