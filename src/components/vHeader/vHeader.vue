<template>
<div id='vHeader' class="header">
  <div class="content-wrapper">
    <div class="avatar">
      <img :src="seller.avatar" alt="">
    </div>
    <div class="content">
      <div class="title">
        <span class="brand">品牌</span>
        <span class="name">{{seller.name}}</span>
      </div>
      <div class="description">
        {{seller.description}} / {{seller.deliveryTime}}分钟送达
      </div>
      <div v-if="seller.supports" class="support">
        <icon :classType="seller.supports[0].type" :version="1"></icon>
        <span class="text">{{seller.supports[0].description}}</span>
      </div>
    </div>
    <div v-if="seller.supports" class="support-count" @click="showDetail">
      <span class="count">{{seller.supports.length}}个</span>
      <i class='icon-keyborad-arrow-right'>&nbsp;>&nbsp;</i>
    </div>
  </div>
  <div class="bulletin-wrapper" @click="showDetail">
    <span class="bulletin-title">公告</span>
    <span class="bulletin-text">{{seller.bulletin}}</span>
    <i class='icon-keyborad-arrow-right'>&nbsp;>&nbsp;</i>
  </div>
  <div class="background">
    <img :src="seller.avatar" alt="">
  </div>
  <transition name="fade">
    <div v-show="detailShow" class="detail" transition="fade">
      <!-- 内容容器 -->
      <div class="detail-wrapper clearfix">
        <!-- 内容主体 -->
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">
              优惠信息
            </div>
            <div class="line"></div>
          </div>
          <ul v-if="seller.supports" class="supports">
            <li class="support-item" v-for="(item,index) of seller.supports">
              <icon :classType="item.type" :version="2"></icon>
              <span class="text">{{item.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">
              商家公告
            </div>
            <div class="line"></div>
          </div>
          <div class="bulletin">
            <p class="content">
              {{seller.bulletin}}
            </p>
          </div>
        </div>
      </div>
      <!-- 底部关闭按钮 -->
      <div class="detail-close" @click="hideDetail">
        ×
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import star from '../star/star'
import icon from '../icon/icon'
export default {
  name: 'vHeader',
  components: {
    // 注册子组件
    star,
    icon
  },
  props: {
    seller: {
      type: Object
    }
  },
  data() {
    return {
      detailShow: false
    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  methods: {
    showDetail() {
      this.detailShow = true
    },
    hideDetail() {
      this.detailShow = false
    }
  }
}
</script>

<style lang="stylus" scoped>
  @import "../../common/styles/mixin"
  .header
    position:relative
    color:white
    background:rgba(0,0,0,.5)
    .content-wrapper
      position:relative
      padding:24px 12px 18px 24px
      font-size:0
      .avatar
        display: inline-block
        vertical-align: top
        img
          width:64px
          height:64px
          border-radius:2px
      .content
        margin-left:16px
        display:inline-block
        font-size:14px
        .title
          margin:2px 0 8px 0
          vertical-align: top
          .brand
            display:inline-block
            height:18px
            width:36px
            font-size:14px
            line-height:18px
            text-align:center
            background-color:orange
            border-radius:3px
          .name
            margin-left:6px
            font-size:18px
            vertical-align:top
            line-height:18px
            font-weight:bold
        .description
          margin-bottom:10px
          line-height:12px
          font-size:12px
        .support
          .icon
            width:14px
            height:14px
            margin-right:4px
            background-size:14px 14px
          .text
            line-height:14px
            font-size:12px
            vertical-align:top
      .support-count
        position:absolute
        right:12px
        bottom:14px
        padding:0 8px
        height:24px
        line-height:24px
        border-radius:14px
        background-color:rgba(0,0,0,.2)
        text-align:center
        .count
          font-size:12px
        .icon-keyborad-arrow-right
          font-size:10px
          line-height:24px
    .bulletin-wrapper
      position:relative
      height:28px
      line-height:28px
      padding:0 22px 0 12px
      white-space:nowrap
      overflow:hidden
      text-overflow:ellipsis
      background:rgba(0,0,0,.2)
      .bulletin-title
        background-color:white
        color:gray
        font-weight:bold
        padding:1px
        font-size:12px
        line-height:28px
      .bulletin-text
        font-size:12px
      .icon-keyborad-arrow-right
        position:absolute
        right:12px
        top:2px
        font-size:12px
        line-height:28px
    .background
      position:absolute
      top:0
      left:0
      width:100%
      height:100%
      z-index:-1
      overflow:hidden
      filter:blur(10px)
      img
        width:100%
    .detail
      top:0
      left:0
      position:fixed
      z-index:100
      width:100%
      height:100%
      overflow:auto
      background-color:rgba(7,17,27,.8)
      .detail-wrapper
        // 最小高度
        min-height:100%
        width:100%
        .detail-main
          margin-top:64px
          // 给底部层留空间
          padding-bottom:64px
          .name
            line-height:16px
            text-align:center
            font-size:16px
            font-weight:700
          .star-wrapper
            margin-top:18px
            padding:2px 0
            text-align:center
          .title
            display:flex
            width:80%
            margin:28px auto 24px auto
            text-align:center
            .line
              flex:1
              position:relative
              top:-6px
              border-bottom:1px solid rgba(255,255,255,.2)
            .text
              padding:0 12px
              font-weight:700
              font-size:14px
          .supports
            width:80%
            margin:0 auto
            .support-item
              padding: 0 12px
              margin-bottom:12px
              font-size: 0
              &:last-child
                margin-bottom:0
              .icon
                width:16px
                height:16px
                vertical-align:top
                margin-right:6px
                background-size:16px 16px
              .text
                line-height:16px
                font-size:12px
          .bulletin
            width:80%
            margin:0 auto
            .content
              padding:0 12px
              line-height:24px
              font-size:12px
      .detail-close
        position:relative
        width:32px
        height:32px
        font-size:32px
        line-height:32px
        // 底部层空间
        margin:-64px auto 0 auto
        clear:both
</style>
