<template>
<div id="app">
  <v-header :seller="seller"></v-header>
  <div class="tab border-1px">
    <div class="tabItem">
      <router-link to="goods">商品</router-link>
    </div>
    <div class="tabItem">
      <router-link to="ratings">评价</router-link>
    </div>
    <div class="tabItem">
      <router-link to="seller">商家</router-link>
    </div>
  </div>
  <router-view :seller="seller"></router-view>
</div>
</template>

<script>
import vHeader from './components/vHeader/vHeader'

const ERR_OK = 0

export default {
  name: 'app',
  data() {
    return {
      seller: {}
    }
  },
  created() {
    // created后请求seller数据
    this.$api.get('seller', (res) => {
        let response = res.data
        if (response.errno === ERR_OK) {
          this.seller = response.data
          console.log(this.seller.name)
        }
      },
      (err) => {
        console.log(err)
      })
  },
  components: {
    vHeader
  }
}
</script>

<style lang="stylus">
  @import './common/styles/mixin.styl'
  #app
    height:100%
    .tab
      display:flex
      height:44px
      line-height:44px
      border-1px(rgba(7,17,27,.1))
      background-color:rgba(255,255,255,.7)
      backdrop-filter:blur(10px)
      z-index:99
      .tabItem
        flex:1
        text-align:center
        & > a
          display:block
          font-size:16px
          color:rgb(77,85,93)
          &.active
            color:rgb(240,80,80)
</style>
