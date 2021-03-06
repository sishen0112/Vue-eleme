<template>
<div id="goods" class="goods">
  <div class="menu-wrapper" ref="menuWrapper">
    <ul>
      <li v-for="(item,index) of goods" class="menu-item flexVerticalCenter" :class="{'current':currentIndex===index}" @click="selectMenu(index,$event)">
        <icon v-show="item.type>=0" :version="3" :classType="item.type"></icon>
        <span class="text">
             {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper" ref="foodsWrapper">
    <ul>
      <li v-for="item of goods" class="food-list food-list-hook">
        <h1 class="title">{{item.name}}</h1>
        <ul>
          <li v-for="food in item.foods" class="food-item">
            <div class="icon">
              <img :src="food.icon" alt="">
            </div>
            <div class="content">
              <h2 class="name">{{food.name}}</h2>
              <p class="desc">{{food.description}}</p>
              <div class="extra">
                <span class="count">月售{{food.sellCount}}份</span>
                <span class="">好评率{{food.rating}}%</span>
              </div>
              <div class="price">
                <span class="now">￥{{food.price}}</span>
                <span class="old" v-show="food.oldPrice">{{food.oldPrice}}</span>
              </div>
              <div class="cart-control-wrapper">
                <cartControl :food="food"></cartControl>
              </div>
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
  <cart ref="cart" :select-foods="selectFoods" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></cart>
</div>
</template>

<script>
const ERR_OK = 0

import BScroll from 'better-scroll'
import icon from '../icon/icon'
import cart from '../cart/cart'
import cartControl from '../cartControl/cartControl'

export default {
  components: {
    icon,
    cart,
    cartControl
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  created() {
    this.$api.get('goods', (res) => {
        let response = res.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
          // Vue是异步更新dom
          // 在下次 DOM 更新循环结束之后执行延迟回调。
          // 在修改数据之后立即使用这个方法
          // 获取更新后的 DOM。
          this.$nextTick(() => {
            // 下划线开头的为初始化方法
            this._initScroll()
            // 计算高度
            this._calculateHeight()
          })
        }
      },
      (err) => {
        console.log(err)
      })
    // 监听事件 add-cart
    this.$eventHub.$on('add-cart', (event) => {
      this._drop(event) // 调用_drop方法
    })
  },
  methods: {
    _drop(event) {
      // 调用子组件的drop方法
      this.$refs.cart.drop(event)
    },
    _initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuWrapper, {
        click: true
      })
      this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
        probeType: 3,
        click: true
      })

      this.foodsScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    _calculateHeight() {
      // 计算每个区间的高度
      let foodList = this.$refs.foodsWrapper.getElementsByClassName('food-list-hook')
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    selectMenu(index, event) {
      if (!event._constructed) {
        // 浏览器原生点击事件
        return
      }
      this.foodsScroll.scrollTo(0, -this.listHeight[index], 500)
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFoods() {
      // 选择过的foods
      let foods = []
      this.goods.forEach((good) => {
        good.foods.forEach((food) => {
          if (food.count) {
          foods.push(food)
          }
        })
      })
      return foods
    }
  }
}
</script>

<style lang='stylus' scoped>
@import "../../common/styles/mixin"
  .goods
    display:flex
    position:absolute
    top:178px
    bottom:46px
    width:100%
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px // 80px为占位空间
      width:80px
      height:calc(100%)
      background:#f3f5f7
      .menu-item
        height:54px
        padding:0 8px
        line-height:14px
        border-1px(rgba(7,17,27,.1))
        &.current
          margin-top:-1px
          z-index:10
          background-color:white
          font-weight:700
          border-left:3px solid rgb(0,160,220)
          .text
            border-none()
        .icon
          height:14px
          width:14px
          background-size:14px 14px
        .text
          font-size:12px
    .foods-wrapper
      flex:1
      .title
        padding-left:14px
        height:26px
        line-height:26px
        border-left:2px solid #d9dd1
        font-size:12px
        color:rgb(147,153,159)
        background:#f3f5f7
      .food-item
        display:flex
        margin:18px
        padding-bottom:18px
        border-1px(rgba(7,17,27,.1))
        &:last-child
          border-none()
          margin-bottom:0
        .icon
          flex:0 0 57px
          margin-right:10px
          img
            width:57px
        .content
          flex:1
          .name
            margin:2px 0 8px 0
            height:14px
            line-height:14px
            font-size:14px
            color:rgb(7,17,27)
          .desc, .extra
            line-height:10px
            font-size:10px
            color:rgb(147,153,159)
          .desc
            margin-bottom:8px
          .extra
            &.count
              margin-right:12px
          .price
            font-weight:700
            line-height:24px
            .now
              margin-right:8px
              font-size:14px
              color:rgb(240,20,20)
            .old
              text-decoration:line-through
              font-size:10px
              color:rgb(147,153,159)
          .cart-control-wrapper
            position:absolute
            right:0
            bottom:12px
</style>
