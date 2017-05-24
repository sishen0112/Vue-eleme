<template lang="html">
<div class="shopcart" id="shopcart">
  <div class="content">
    <div class="content-left" @click="toggleList">
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
  <transition name="slideup">
    <div class="cart-list" v-show="listShow">
      <div class="list-header">
        <h1 class="title">购物车</h1>
        <span class="empty" @click="clearCart">清空</span>
      </div>
      <div class="list-content" ref="listCount">
        <ul>
          <li class="food" v-for="(food,index) of selectFoods">
            <span class="name">{{food.name}}</span>
            <div class="price">
              <span>￥{{food.price*food.count}}</span>
            </div>
            <div class="cart-control-wrapper">
              <cartControl :food="food"></cartControl>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import BScroll from 'better-scroll'
import cartControl from '../cartControl/cartControl'
export default {
  components: {
    cartControl
  },
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
    return {
      fold: true
    }
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
    },
    listShow() {
      if (!this.totalCount > 0) {
        // 没有购买任何商品, 购物车为折叠状态
        this.fold = true
        return false
      }
      let show = !this.fold // 折叠状态
      if (show) {
        // 如果显示购物车列表, 则用better-scroll
        if (!this.scroll) {
          this.$nextTick(() => {
            this.scroll = new BScroll(this.$refs.listCount, {
              click: true
            })
          })
        } else {
          this.scroll.refresh()
        }
      }
      return show
    }
  },
  methods: {
    drop(event) {
      // 在点击位置初始化一个小球
      var ball = document.createElement('span')
      ball.setAttribute('class', 'ball')
      // 设置小球的初始位置为点击时位置
      ball.style.top = Math.abs(event.event.offsetY) + 'px'
      ball.style.left = Math.abs(event.event.offsetX) + 'px'
      document.getElementById('shopcart').appendChild(ball)
      // 创建小球完毕

      // 获取logo的位置
      var logoRect = this.$refs.logo.getBoundingClientRect()
      // 移动小球
      ball.style.top = (logoRect.top) + 'px'
      ball.style.left = logoRect.left + 'px'
      setTimeout(() => {
        // 销毁小球
        document.getElementById('shopcart').removeChild(ball)
      }, 1000)
    },
    toggleList() {
      // 如果购物车里没东西, 就不展开, 否则就开或者关
      this.fold = !this.totalCount ? false : !this.fold
    },
    clearCart() {
      for (let i = 0; i < this.selectFoods.length; i++) {
        console.log(this.selectFoods[i].name)
        this.selectFoods.shift()
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "../../common/styles/mixin.styl"
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
  .cart-list
    // 过渡后状态
    position:absolute
    left:0
    bottom:48px
    z-index:-1
    width:100%
    transition: all .5s ease
    &.slideup-enter-active, &.slideup-leave-active
      // 过渡中状态
    &.slideup-enter, &.slideup-leave-active
      // 起始状态
      // opacity:0
      transform:translate3d(0,100%,0)
    .list-header
      height:40px
      line-height:40px
      padding:0 18px
      background:#f3f5f7
      border-bottom:1px solid rgba(7,17,27,.1)
      .title
        float:left
        font-size:14px
        color:rgb(7,17,27)
      .empty
        float:right
        font-size:12px
        color:rgb(0,160,220)
    .list-content
        padding:0 18px
        max-height:217px
        background:white
        overflow:hidden
        .food
          position:relative
          padding:12px 0
          box-sizing:border-box
          border-1px(rgba(7,17,27,.1))
          .name
            line-height:24px
            font-size:14px
            color:rgb(7,17,27)
          .price
            position:absolute
            right:90px
            bottom:12px
            line-height:24px
            font-weight:700
            color:rgb(240,20,20)
          .cart-control-wrapper
            position:absolute
            right:0
            bottom:6px
</style>
