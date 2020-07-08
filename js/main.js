"use strict";

{
  //これでpressedクラスがついたli要素を４つ持つボードができる
  class Panel {
    constructor() {
      this.el = document.createElement("li");
      this.el.classList.add("pressed");
    }

    getEl() {
      return this.el;
    }
  }

  //パネルを管理
  class Board {
    constructor() {
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel());
      }
      this.setUp();
    }
    setUp() {
      const board = document.getElementById("board");
      this.panels.forEach((panel) => {
        //クラスのプロパティに外部からアクセスしない方がよいとされている
        // board.appendChild(panel.el);
        //ので、メソッド経由で取得するようにする
        //オブジェクト思考のカプセル化
        board.appendChild(panel.getEl());
      });
    }
  }

  const board = new Board();
}
