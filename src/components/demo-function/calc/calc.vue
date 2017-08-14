<template>
  <div class="box">
    <h1>2017/8/15 仿iphone计算器   </h1>
    <div class="content">
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
          <li class="num">.</li>
          <li class="operator">=</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'calc',
    data() {
      return {
        res: 0,
        process:[],
        start:false

      }
    },
    created() {
    },
    methods: {
      returnZero(){
        this.res = 0
        this.process = []
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
  }

  .result {
    width: 100%;
    height: 140px;
    position: relative;
    background-color: #202020;
  }

  .result-num {
    font-size:50px;
    color:#fff;
    position:absolute;
    bottom: 0;
    width:95%;
    text-align: right;
    height:70px;
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
    font-size:20px;
  }

  .num {
    background-color: #D4D5D9;
  }

  .zero {
    width: 140px;
  }

  .operator {
    color:#fff;
    font-size:40px;
    background-color: #F88A11;
  }
</style>
