<template>
<div id="goods" class="goods">
  <div class="menu-wrapper">
    <ul>
      <li v-for="(item,index) of goods" class="menu-item flexVerticalCenter">
        <icon v-show="item.type>=0" :version="3" :classType="item.type"></icon>
        <span class="text">
             {{item.name}}
        </span>
      </li>
    </ul>
  </div>
  <div class="foods-wrapper">
    <ul>
      <li v-for="item of goods" class="food-list">
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
            </div>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</div>
</template>

<script>
const ERR_OK = 0

import icon from '../icon/icon'
export default {
  components: {
    icon
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      goods: []
    }
  },
  created() {
    this.$api.get('goods', (res) => {
        let response = res.data
        if (response.errno === ERR_OK) {
          this.goods = response.data
        }
      },
      (err) => {
        console.log(err)
      })
  }
}
</script>

<style lang='stylus' scoped>
@import "../../common/styles/mixin"
  .goods
    display:flex
    // position:absolute
    top:178px
    bottom:46px
    width:100%
    overflow:hidden
    .menu-wrapper
      flex:0 0 80px // 80px为占位空间
      width:80px
      background:#f3f5f7
      .menu-item
        height:54px
        padding:0 8px
        line-height:14px
        border-1px(rgba(7,17,27,.1))
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
</style>
