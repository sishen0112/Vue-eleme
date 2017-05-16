<template>
<span class="icon" :class="newClassMap[classType]"></span>
</template>

<script>
export default {
  props: {
    classType: {
      type: Number
    },
    size: {
      type: Number
    },
    version: {
      type: Number
    }
  },
  data() {
    return {

    }
  },
  created() {
    this.classMap = ['decrease', 'discount', 'guarantee', 'invoice', 'special']
  },
  computed: {
    newClassMap() {
      let newClassMap = []
      this.classMap.map(item => {
        newClassMap.push(item + this.version)
      })
      return newClassMap
    }
  }
}
</script>

<style lang="stylus">
@import "../../common/styles/mixin"
  .icon
    display:inline-block
    vertical-align:top
    background-repeat:no-repeat
    &.decrease1
      bg-image('decrease_2')
    &.discount1
      bg-image('discount_2')
    &.guarantee1
      bg-image('guarantee_2')
    &.invoice1
      bg-image('invoice_2')
    &.special1
      bg-image('special_2')
    &.decrease2
        bg-image('decrease_2')
    &.discount2
        bg-image('discount_2')
    &.guarantee2
        bg-image('guarantee_2')
    &.invoice2
        bg-image('invoice_2')
    &.special2
        bg-image('special_2')
    &.decrease3
      bg-image('decrease_3')
    &.discount3
      bg-image('discount_3')
    &.guarantee3
      bg-image('guarantee_3')
    &.invoice3
      bg-image('invoice_3')
    &.special3
      bg-image('special_3')
</style>
