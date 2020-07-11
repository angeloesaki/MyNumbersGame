"use strict";

{
  //これでpressedクラスがついたli要素を４つ持つボードができる
  class Panel {
    constructor() {
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
      if (currentNum === parseInt(this.el.textContent, 10)) {
        this.el.classList.add("pressed");
        currentNum++;
        if (currentNum === 4) {
          clearTimeout(timeoutId);
        }
      }
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

  function runTimer() {
    const timer = document.getElementById("timer");
    //現在の時刻からSTARTボタンを押した時の時刻を引いてあげる。
    //ミリ秒単位なので1000で割ってあげて、少数点以下2桁まで表示するためにtoFixed()を使う
    timer.textContent = ((Date.now() - startTime) / 1000).toFixed(2);

    //runTimerを10ミリ秒後に呼び出す
    timeoutId = setTimeout(() => {
      runTimer();
    }, 10);
  }

  const board = new Board();

  let currentNum;
  let startTime;
  let timeoutId;

  const button = document.getElementById("button");
  button.addEventListener("click", () => {
    //タイマーが走っていたら
    if (typeof timeoutId !== "undefined") {
      clearTimeout(timeoutId);
    }

    currentNum = 0;
    board.activate();

    startTime = Date.now();
    runTimer();
  });
}
