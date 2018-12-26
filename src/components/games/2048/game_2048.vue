<template>
  <div>
    <p>
      SCORE:<span id="score">{{score}}</span>
    </p>
    <!--zencoding:
      创建一个id为gridPanel的div，其中包含16个class为grid的div
      div#gridPanel>div.grid*16+Tab

      在gridPanel内部的结尾位置创建16个id为c00，class为cell的div
      div#c00.cell*16+Tab
    -->
    <!--div#playground>div.grid*16+div#c.cell*16-->
    <div id="playground">
      <div v-for="n in 16" class="grid"></div>

      <span v-for="(row, r) in arr" :key="r">
        <div v-for="(col, c) in row"
             :data-id="'c'+r+c"
             class="cell"
             :class="'n'+col"
             :key="c">
          <span v-if="col">{{col}}</span>
        </div>
      </span>
    </div>
    <div id="gameOver" v-show="state == GAMEOVER">
      <div></div>
      <p>
        GAME OVER<br>
        SCORE:<span>{{score}}</span><br>
        <a class="btn" @click="start">TRY AGAIN</a>
      </p>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">

  export default {
    name: 'game_2048',
    data() {
      return {
        RN: 4, CN: 4,//总行数和总列数
        arr: [
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0],
          [0,0,0,0]
        ],//保存游戏格子数据的二维数组
        score: 0,//保存游戏得分
        state: 1,//保存游戏状态
        GAMEOVER: 0,//表示游戏结束状态
        RUNNING: 1,//表示游戏运行中
      };
    },
    created() {
      this.start()
    },
    methods: {
      start() {
        //重置游戏状态为RUNNING
        this.state = this.RUNNING;
        this.score = 0;//重置分数为0
        //初始化二维数组
//        this.arr = [];//创建空数组保存在data属性中
//        for (let r = 0; r < this.RN; r++) {
//          this.arr[r] = []
//          for (let c = 0;
//               c < this.CN;
//               c++) {
//            this.arr[r][c] = 0
//          }
//        }
        //在二维数组中生成两个随机数:
        this.randomNum();
        this.randomNum();
        document.onkeydown = (e) => {
          e.preventDefault()
          console.log(e)
          switch (e.keyCode) {
            case 37:
              this.moveLeft();
              break;
            case 38:
              this.moveUp();
              break;
            case 39:
              this.moveRight();
              break;
            case 40:
              this.moveDown();
              break;
          }
        }
      },
      move(callback) {
        //为data拍照保存在before中
        let before = String(this.arr);
        console.log(before, 'before')
        callback();//this->window
        //为data拍照保存在after中
        let after = String(this.arr);
        console.log(after, 'after')
        //如果before不等于after
        if (before != after) {
          this.randomNum();//随机生成数
          //如果游戏结束
          if (this.isGameOver()) {
            //修改游戏状态为GAMEOVER
            this.state = this.GAMEOVER;
          }
        }
      },
      isGameOver() {
        //遍历data中每个元素
        for (var r = 0; r < this.RN; r++) {
          for (var c = 0; c < this.CN; c++) {
            //如果当前元素是0，就返回false
            if (this.arr[r][c] == 0) {
              return false;
            }
            //否则，如果c<CN-1&&当前元素等于右侧元素
            else if (c < this.CN - 1
              && this.arr[r][c] == this.arr[r][c + 1]) {
              return false;//就返回false
            }
            else if (r < this.RN - 1
              && this.arr[r][c] == this.arr[r + 1][c]) {
              //否则，如果r<RN-1&&当前元素等于下方元素
              return false;//就返回false
            }
          }
        }//(遍历结束)
        return true;//返回true
      },
      moveDown() {
        this.move(() => {
          //遍历data中每一列
          for (var c = 0; c < this.CN; c++) {
            //调用moveDownInCol下移第c列
            this.moveDownInCol(c);
          }
        });
      },
      moveDownInCol(c) {
        //r从RN-1开始，到r>0结束，r每次递减1
        for (var r = this.RN - 1; r > 0; r--) {
          //查找r位置c列上方前一个不为0的位置prevr
          var prevr = this.getPrevInCol(r, c);
          //如果没找到,就退出循环
          if (prevr == -1) {
            break;
          }
          else {//否则
            //如果r位置c列的值为0
            if (this.arr[r][c] == 0) {
              //将prevr位置c列的值赋值给r位置
              this.arr[r][c] = this.arr[prevr][c];
              //将prevr位置c列置为0
              this.arr[prevr][c] = 0;
              r++;//r留在原地
            } else if (this.arr[r][c]
              == this.arr[prevr][c]) {
              //否则，如果r位置c列的值等于prevr位置的值
              this.arr[r][c] *= 2;//将r位置c列的值*2
              //将r行c列的新值累加到score属性上
              this.score += this.arr[r][c];
              //将prevr位置c列置为0
              this.arr[prevr][c] = 0;
            }
          }
        }
      },
      getPrevInCol(r, c) {
        r--;//r-1
        //循环，r到>=0结束，每次递减1
        for (; r >= 0; r--) {
          //如果r位置c列不等于0
          if (this.arr[r][c] != 0)
            return r;//返回r
        }//(遍历结束)
        return -1;//返回-1
      },
      moveUp() {
        this.move(() => {
          //遍历data中每一列
          for (var c = 0; c < this.CN; c++) {
            //调用moveUpInCol上移第c列
            this.moveUpInCol(c);
          }
        });
      },
      moveUpInCol(c) {
        //r从0开始,到r<RN-1结束，r每次递增1
        for (var r = 0; r < this.RN - 1; r++) {
          //查找r行c列下方下一个不为0的位置nextr
          var nextr = this.getNextInCol(r, c);
          //如果没找到,就退出循环
          if (nextr == -1) {
            break;
          }
          else {//否则
            //如果r位置c列的值为0
            if (this.arr[r][c] == 0) {
              //将nextr位置c列的值赋值给r位置
              this.arr[r][c] = this.arr[nextr][c];
              //将nextr位置c列置为0
              this.arr[nextr][c] = 0;
              r--;//r留在原地
            } else if (this.arr[r][c]
              == this.arr[nextr][c]) {
              //否则，如果r位置c列的值等于nextr位置的值
              //将r位置c列的值*2
              this.arr[r][c] *= 2;
              //将r行c列的新值累加到score属性上
              this.score += this.arr[r][c];
              //将nextr位置c列的值置为0
              this.arr[nextr][c] = 0;
            }
          }
        }
      },
      getNextInCol(r, c) {
        r++;//r+1
        //循环，到<RN结束，r每次递增1
        for (; r < this.RN; r++) {
          //如果r位置c列不等于0
          if (this.arr[r][c] != 0) {
            return r;//返回r
          }
        }//(遍历结束)
        return -1;//返回-1
      },
      moveRight() {//左移所有行
        this.move(() => {
          //遍历data中每一行
          for (var r = 0; r < this.RN; r++) {
            //调用moveRightInRow右移第r行
            this.moveRightInRow(r);
          }//(遍历后)
        });
      },
      moveRightInRow(r) {//左移第r行
        //c从CN-1开始，到>0结束,c每次递减1
        for (var c = this.CN - 1; c > 0; c--) {
          //调用getPrevInRow方法，查找r行c列前一个不为0的位置，保存在prevc中
          var prevc = this.getPrevInRow(r, c);
          //如果prevc等于-1，就退出循环
          if (prevc == -1) {
            break;
          }
          else {//否则
            //如果r行c位置的值为0
            if (this.arr[r][c] == 0) {
              //将r行c位置的值替换为prevc位置的值
              this.arr[r][c] = this.arr[r][prevc];
              //将prevc位置的值置为0
              this.arr[r][prevc] = 0;
              c++;//c留在原地
            } else if (this.arr[r][c]
              == this.arr[r][prevc]) {
              //否则，如果r行c位置的值等于r行prevc位置的值
              //将r行c位置的值*2
              this.arr[r][c] *= 2;
              //将r行c列的新值累加到score属性上
              this.score += this.arr[r][c];
              //将prevc位置的值置为0
              this.arr[r][prevc] = 0;
            }
          }
        }
      },
      //查找r行c列右侧下一个不为0的位置
      getPrevInRow: function (r, c) {
        c--;//c-1
        //循环,c>=0,c每次递减1
        for (; c >= 0; c--) {
          //如果c位置的值不为0
          if (this.arr[r][c] != 0) {
            return c;//返回c
          }
        }//(遍历结束)
        return -1;//返回-1
      },
      moveLeft: function () {//左移所有行
        this.move(() => {
          //遍历data中每一行
          for (var r = 0; r < this.RN; r++) {
            //调用moveLeftInRow方法，传入r
            this.moveLeftInRow(r);
          }
        });
      },
      moveLeftInRow(r) {//左移第r行
        //c从0开始，到<CN-1结束
        for (var c = 0; c < this.CN - 1; c++) {
          //调用getNextInRow方法,传入参数r,c, 将返回值保存在变量nextc中
          var nextc = this.getNextInRow(r, c);
          //如果nextc是-1,退出循环
          if (nextc == -1) {
            break;
          }
          else {//否则
            //如果r行c位置的值是0
            if (this.arr[r][c] == 0) {
              //就将r行c位置的值替换为nextc位置的值
              this.arr[r][c] = this.arr[r][nextc];
              //将nextc位置的值置为0
              this.arr[r][nextc] = 0;
              c--;//c留在原地
            } else if (this.arr[r][c]
              == this.arr[r][nextc]) {
              //否则,如果r行c位置的值等于r行nextc位置的值
              this.arr[r][c] *= 2;//将r行c位置的值*2
              //将r行c列的新值累加到score属性上
              this.score += this.arr[r][c];
              //将nextc位置的值置为0
              this.arr[r][nextc] = 0;
            }
          }
        }
      },
      //获得r行c列右侧下一个不为0的位置
      getNextInRow(r, c) {
        c++;//c+1
        for (; c < this.CN; c++) {//c<CN结束,c++
          if (this.arr[r][c] != 0) {//如果r行c位置不是0
            return c;//返回c
          }
        }//(遍历结束)
        return -1;//返回-1
      },
      //在一个随机位置生成一个2或4
      randomNum() {
        while (true) {//反复:
          //在0~RN-1之间生成一个随机整数r
          var r = Math.floor(Math.random() * (this.RN));
          //在0~CN-1之间生成一个随机整数c
          var c = Math.floor(Math.random() * (this.CN));
          //如果data中r行c列的值是0
          if (this.arr[r][c] == 0) {
            //设置data中r行c列的值为:
            //随机生成一个0~1的小数,如果<0.5,就赋值为2，否则赋值为4
            this.arr[r][c] = Math.random() < 0.5 ? 2 : 4;
            break;//退出循环
          }
        }
      }
    }
  };

</script>

<style scoped>
  #playground {
    width: 480px;
    height: 480px;
    margin: 0 auto;
    background: #bbada0;
    border-radius: 10px;
    position: relative;
  }

  .grid, .cell {
    width: 100px;
    height: 100px;
    border-radius: 6px;
  }

  .grid {
    background: #ccc0b3;
    float: left;
    margin: 16px 0 0 16px;
  }

  .cell {
    background: #fff;
    position: absolute;
    font-size: 60px;
    text-align: center;
    line-height: 100px;
  }

  [data-id^="c0"] {
    top: 16px
  }

  [data-id^="c1"] {
    top: 132px
  }

  [data-id^="c2"] {
    top: 248px
  }

  [data-id^="c3"] {
    top: 364px
  }

  [data-id$="0"] {
    left: 16px
  }

  [data-id$="1"] {
    left: 132px
  }

  [data-id$="2"] {
    left: 248px
  }

  [data-id$="3"] {
    left: 364px
  }

  .n2 {
    background-color: #eee3da
  }

  .n4 {
    background-color: #ede0c8
  }

  .n8 {
    background-color: #f2b179
  }

  .n16 {
    background-color: #f59563
  }

  .n32 {
    background-color: #f67c5f
  }

  .n64 {
    background-color: #f65e3b
  }

  .n128 {
    background-color: #edcf72
  }

  .n256 {
    background-color: #edcc61
  }

  .n512 {
    background-color: #9c0
  }

  .n1024 {
    background-color: #33b5e5
  }

  .n2048 {
    background-color: #09c
  }

  .n4096 {
    background-color: #a6c
  }

  .n8192 {
    background-color: #93c
  }

  .n2, .n4 {
    color: #776e65
  }

  .n1024, .n2048, .n4096, .n8192 {
    font-size: 40px
  }

  p {
    width: 480px;
    margin: 0 auto;
    padding-top: 15px;
    font-size: 30px;
    font-weight: bold;
    font-family: Arial;
  }

  #gameOver {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }

  #gameOver > div {
    width: 100%;
    height: 100%;
    background: #555;
    opacity: 0.5;
  }

  #gameOver > p {
    position: absolute;
    width: 300px;
    height: 200px;
    /*鄙视题: 让块元素居中显示*/
    top: 50%;
    left: 50%;
    margin-top: -100px;
    margin-left: -150px;

    background: #fff;
    border: 1px solid #edcf72;
    border-radius: 10px;
    text-align: center;
    line-height: 2em;
  }

  #gameOver .btn {
    background: #9f8d77;
    color: #fff;
    padding: 10px;
    border-radius: 6px;
    cursor: pointer;
  }
</style>
