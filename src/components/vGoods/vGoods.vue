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
    position:absolute
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

</style>
