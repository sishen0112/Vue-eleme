<template lang="html">
  <div class="cart-control">
    <transition name="move">
      <div v-show="food.count>0" class="cart-decrease"
         @click="minusCart">
        <i class="inner fa fa-minus-circle"></i>
      </div>
    </transition>
      <div v-show="food.count>0" class="cart-count">
        {{food.count}}
      </div>
    <div class="cart-increase" @click="addCart" ref="addCartBtn">
      <i class="fa fa-plus-circle"></i>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props: {
    food: {
      type: Object
    }
  },
  methods: {
    addCart(event) {
      if (!event._constructed) {
        return
      }
      if (!this.food.count) {
        // this.food.count = 1  // 新增,删除字段时候, 需要用Vue.set()
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
      this.$eventHub.$emit('add-cart', {
        event
      })
    },
    minusCart(event) {
      if (!event._constructed) {
        return
      }
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>

<style lang="stylus">
.cart-control
  font-size:0
  .cart-decrease,.cart-increase
    display:inline-block
    padding:6px
    font-size:22px
    line-height:24px
    color:rgb(0,160,220)
  .cart-count
    display:inline-block
    padding-top:6px
    // width:20px
    line-height:24px
    text-align:center
    font-size:18px
    font-weight:300
    color:rgb(147,153,159)
  .move-enter-active,.move-leave-active
    transition:all .4s linear
    opacity:1
    transform: translate3D(0,0,0)
    i
      transition:all .4s linear
      transform: rotate(0)
  .move-enter,.move-leave-to
    opacity: 0
    transform: translate3D(24px,0,0)
    i
      transform: rotate(180deg)
</style>
