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

    activate(num) {
      this.el.classList.remove("pressed");
      this.el.textContent = num;
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

    activate() {
      const nums = [0, 1, 2, 3];

      this.panels.forEach((panel) => {
        //ランダムな位置から要素を一つ取り出す
        //[0]を付け足すことで返り値が配列でなくなる
        const num = nums.splice(Math.floor(Math.random() * nums.length), 1)[0];
        panel.activate(num);
      });
    }
  }

  const board = new Board();

  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    board.activate();
  });
}
