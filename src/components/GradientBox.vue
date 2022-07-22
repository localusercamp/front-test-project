<template>
    <div class="gradient-box">
        <slot>
            <span class="value">{{ value }}</span>
            <span class="title">{{ title }}</span>
        </slot>
    </div>
</template>

<script>
export default {
  name: 'GradientBox',
  props: {
    value: {
        type: Number,
    },
    title: {
        type: String
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/colors';
    
    .gradient-box {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100px;
        width: 100px;
        background: linear-gradient(#20A3DD, #008BD1);
        border-radius: 18px;
        color: white;

        .value {
            font-size: 44px;
        }

        .title {
            font-size: 12px;
        }
    }
</style>