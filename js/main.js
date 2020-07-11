"use strict";

{
  //これでpressedクラスがついたli要素を４つ持つボードができる
  class Panel {
    constructor(game) {
      this.game = game;
      this.el = document.createElement("li");
      this.el.classList.add("pressed");
      this.el.addEventListener("click", () => {
        this.check();
      });
    }

    getEl() {
      return this.el;
    }

    activate(num) {
      this.el.classList.remove("pressed");
      this.el.textContent = num;
    }

    check() {
      // parseInt()で数値に変換
      if (this.game.getCurrentNum() === parseInt(this.el.textContent, 10)) {
        this.el.classList.add("pressed");
        this.game.addCurrentNum();
        if (this.game.getCurrentNum() === 4) {
          clearTimeout(this.game.getTimeoutId());
        }
      }
    }
  }

  //パネルを管理
  class Board {
    constructor(game) {
      this.game = game;
      this.panels = [];
      for (let i = 0; i < 4; i++) {
        this.panels.push(new Panel(this.game));
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

  class Game {
    constructor() {
      //thisはそのクラスのプロパティという意味
      this.board = new Board(this);

      this.currentNum = undefined;
      this.startTime = undefined;
      this.timeoutId = undefined;

      const button = document.getElementById("button");
      button.addEventListener("click", () => {
        //タイマーが走っていたら
        this.start();
      });
    }
    start() {
      if (typeof this.timeoutId !== "undefined") {
        clearTimeout(timeoutId);
      }

      this.currentNum = 0;
      this.board.activate();

      this.startTime = Date.now();
      this.runTimer();
    }

    runTimer() {
      const timer = document.getElementById("timer");
      //現在の時刻からSTARTボタンを押した時の時刻を引いてあげる。
      //ミリ秒単位なので1000で割ってあげて、少数点以下2桁まで表示するためにtoFixed()を使う
      timer.textContent = ((Date.now() - this.startTime) / 1000).toFixed(2);

      //runTimerを10ミリ秒後に呼び出す
      this.timeoutId = setTimeout(() => {
        this.runTimer();
      }, 10);
    }

    addCurrentNum() {
      this.currentNum++;
    }

    getCurrentNum() {
      return this.currentNum;
    }

    getTimeoutId() {
      return this.timeoutId;
    }
  }

  new Game();
}
