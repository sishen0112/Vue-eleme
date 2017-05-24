<template lang="html">
<div class="shopcart" id="shopcart">
  <div class="content">
    <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount>0}">
            <img src="./basket.svg" alt="" ref="logo">
          </div>
          <div class="num" v-show="totalCount>0">
            {{totalCount}}
          </div>
        </div>
        <div class="price" :class="{'highlight':totalPrice>0}">
          {{totalPrice}} 元
        </div>
        <div class="desc">
          另需配送费￥{{deliveryPrice}}元
        </div>
    </div>
    <div class="content-right">
      <div class="pay" :class="payClass">
        {{payDesc}}
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    selectFoods: {
      type: Array,
      default () {
        return [{
          price: 10,
          count: 10
        }]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {}
  },
  computed: {
    totalPrice() {
      let total = 0
      this.selectFoods.forEach((food) => {
        total += food.price * food.count
      })
      return total
    },
    totalCount() {
      let count = 0
      this.selectFoods.forEach((food) => {
        count += food.count
      })
      return count
    },
    payDesc() {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice // 差额
        return `还差￥${diff}元起送`
      } else {
        return '去结算'
      }
    },
    payClass() {
      return (this.totalPrice < this.minPrice) ? 'not-enough' : 'enough'
    }
  },
  methods: {
    drop(event) {
      console.log(event.event.offsetX + ',' + event.event.offsetY)
      // 在点击位置初始化一个小球
      var ball = document.createElement('span')
      ball.setAttribute('class', 'ball')
      // 设置小球的初始位置为点击时位置
      ball.style.top = Math.abs(event.event.offsetY) + 'px'
      ball.style.left = Math.abs(event.event.offsetX) + 'px'
      document.getElementById('shopcart').appendChild(ball)
      // 创建小球完毕
      setTimeout(() => {
        // 设置小球的移动结束位置
        var logoRect = this.$refs.logo.getBoundingClientRect()
        ball.style.top = (logoRect.top + 20) + 'px'
        ball.style.left = logoRect.left + 'px'
        ball.setAttribute('class', 'ball drop-ball')
      }, 0)
      setTimeout(() => {
        document.getElementById('shopcart').removeChild(ball)
      }, 500)
    }
  }
}
</script>

<style lang="stylus" scoped>
.shopcart
  position:fixed
  bottom:0
  left:0
  z-index:50
  width:100%
  height:48px
  .content
    display:flex
    background:#141d27
    height:100%
    font-size:0
    .content-left
      flex:1
      .logo-wrapper
        display:inline-block
        position:relative
        top:-10px
        margin:0 12px
        padding:6px
        height:56px
        width:56px
        border-radius:50%
        box-sizing:border-box
        background:#141d27
        color:rgba(255,255,255,.1)
        .logo
          display:inline-block
          z-index:60
          border-radius:50%
          height:44px
          width:44px
          background:rgba(255,255,255,.1)
          text-align:center
          &.highlight
            background:rgb(0,160,220)
          img
            width:24px
            margin:10px
        .num
          position:absolute
          top:0
          right:0
          width:24px
          height:16px
          line-height:16px
          text-align:center
          border-radius:16px
          background:rgb(240,20,20)
          box-shadow:0 4px 8px 0 rgba(0,0,0,.4)
          color:white
          font-size:10px
          font-weight:700
      .price
        display:inline-block
        vertical-align:top
        margin-top:12px
        line-height:24px
        padding-right:12px
        box-sizing:border-box
        border-right:1px solid rgba(255,255,255,.1)
        font-size:16px
        font-weight:700
        color:rgba(255,255,255,.4)
        &.highlight
          color:white
      .desc
        display:inline-block
        vertical-align:top
        margin:12px 0 0 12px
        line-height:24px
        padding-right:12px
        color:rgba(255,255,255,.4)
        line-height:24px
        font-size:12px
    .content-right
      flex:0 0 105
      width:105px
      .pay
        height:48px
        line-height:48px
        text-align:center
        font-size:12px
        color:rgba(255,255,255,.4)
        font-weight:700
        &.not-enough
          background:#2b333b
        &.enough
          background:#00b43c
          color:white

.drop-enter-active
  transition:all .4s
  .inner
    width:16px
    height:16px
    border-radius:50%
    // background:rgb(0,160,220)
    background:red
    transition:all .4s
</style>
