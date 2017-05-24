<template lang="html">
  <div class="cart-control">
      <transition name="minus">
        <div v-show="food.count>0" class="cart-decrease" @click="minusCart">
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
        // 新增,删除字段时候, 需要用Vue.set() 才能相应数据
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
  .cart-decrease
    // 最终状态
    transition: all .3s ease
    position:relative
    right:0px
    &.minus-enter-active, &.minus-leave-active {
      // 过渡中状态
    }
    &.minus-enter, &.minus-leave-active {
      // 初始状态
      opacity: 0
      right:-22px
      transform:rotate(-180deg)
    }
  .cart-count
    display:inline-block
    padding-top:6px
    width:20px
    line-height:24px
    text-align:center
    font-size:20px
    font-weight:300
    color:rgb(147,153,159)
</style>
