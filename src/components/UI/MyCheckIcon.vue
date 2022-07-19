<template>
  <svg width="32" height="32" viewBox="0 0 32 32" :fill="currentColor" :class="{ 'clickable': !disabled }">
    <slot></slot>
  </svg>
</template>

<script>
export default {
  name: 'MyCheckIcon',
  props: {
    checked: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    currentColor() {
      if(!this.disabled) {
        return this.checked ? '#0E77BA' : '#BBCBD3';
      } else {
        return '#E1E7EB';
      }
    }
  }
}
</script>