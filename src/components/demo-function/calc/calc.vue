<template>
  <div class="box">
    <h1>2017/8/15 仿iphone计算器   </h1>
    <div class="content" onselectstart="return false">
      <div class="expression">
        <span class="result-num">{{process.toString()}}</span>
      </div>
      <div class="result">
        <span class="result-num">{{res}}</span>
      </div>

      <div class="btn">
        <ul>
          <li class="gray" v-if="!start">AC</li>
          <li class="gray" v-if="start" @click="returnZero">C</li>
          <li class="gray">+/-</li>
          <li class="gray">%</li>
          <li class="operator">÷</li>
        </ul>

        <ul>
          <li class="num">7</li>
          <li class="num">8</li>
          <li class="num">9</li>
          <li class="operator">×</li>
        </ul>

        <ul>
          <li class="num">4</li>
          <li class="num">5</li>
          <li class="num">6</li>
          <li class="operator">-</li>
        </ul>

        <ul>
          <li class="num">1</li>
          <li class="num">2</li>
          <li class="num">3</li>
          <li class="operator">+</li>
        </ul>

        <ul>
          <li colspan="2" class="num zero">0</li>
          <li class="num spot">.</li>
          <li class="calculate" @click="calculate">=</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
//  import {test} from '@/../src/common/js/common.js'

  export default {
    name: 'calc',
    data() {
      return {
        res: 0,
        process: [],
        start: false,
        currentNum: '',
        currentSym: ''

      }
    },
    created() {
    },
    mounted() {
      let num = document.querySelectorAll('.num')
      let opreator = document.querySelectorAll('.operator')
      num.forEach(item => {
        item.addEventListener('click', this.numClick)
      })
      opreator.forEach(item => {
        item.addEventListener('click', this.operatorClick)
      })

    },
    methods: {
      //归零
      returnZero() {
        this.res = 0
        this.process = []
        this.currentNum = ''
        this.currentSym = ''
        this.start = false
      },
      //点击数字
      numClick(event) {
        let target = event.target
        if (this.currentNum.length >= 8) return
        this.currentNum += target.innerHTML

        this.res = this.currentNum
        this.start = true
      },
      operatorClick(event) {
        this.currentSym = event.target.innerHTML
        if(this.currentNum){
          this.pushNum(this.currentNum)
          this.pushSym(this.currentSym)
          console.log('return')
        }else{
          let last = this.process[this.process.length - 1]
          let reg = /^\+|\-|\×|\÷$/ig
          console.log(last)
          console.log(reg.test(last))
          if (!(reg.test(last))) {
            console.log(this.process.join(''))
//            this.pushSym(this.currentSym)
          }else{
            console.error('多次运算符')
          }
        }

      },
      pushNum(str) {
        this.process.push(str)
        this.currentNum = ''
        this.res = 0
        console.log('num push in')
      },
      pushSym(str) {
        this.process.push(str)
        this.currentSym = ''
        this.res = 0
        console.log('sym push in')
      },
      calculate() {
        if (this.currentNum) {
          this.pushNum(this.currentNum)
        }
        let express = this.process.join('').replace(/\×/ig, '*').replace(/\÷/ig, '/')
        console.log(express)
        this.res = eval(express)
        this.process = []
        this.process.push(this.res)
      }
    }
  }
</script>

<!-- Add "scoped" atulibute to limit CSS to this component only -->
<style scoped>
  .box {
    height: 100%;
    overflow-x: hidden;
  }

  .content {
    margin: 0px auto;
    width: 281px;
    height: 490px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-left: 1px solid #202020;
    /*取消双击选中文字*/
    -moz-user-select: none;

  }

  .result {
    width: 100%;
    height: 140px;
    position: relative;
    background-color: #202020;
  }

  .result-num {
    font-size: 50px;
    color: #fff;
    position: absolute;
    bottom: 0;
    width: 95%;
    text-align: right;
    height: 70px;
  }

  li {
    width: 70px;
    height: 70px;
    line-height: 70px;
    display: inline-block;
    margin: 0;
    float: left;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    border-right: 1px solid #202020;
    border-bottom: 1px solid #202020;
    font-size: 30px;
    font-weight: lighter;
    text-align: center;
    cursor: pointer;

  }

  .gray {
    background-color: #C4C5C9;
    font-size: 20px;
  }

  .num {
    background-color: #D4D5D9;
  }

  .gray:active,
  .num:active {
    background-color: #eee;
    color: #fff;
  }

  .zero {
    width: 140px;
  }

  .calculate,
  .operator {
    color: #fff;
    font-size: 40px;
    background-color: #F88A11;
  }

  .calculate:active,
  .operator:active {
    background-color: #F87715;
  }
</style>
