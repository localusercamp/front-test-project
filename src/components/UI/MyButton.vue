<template>
    <button class="my-button">
        <slot></slot>
    </button>
</template>

<script>
export default {
  name: 'MyButton'
}
</script>

<style lang="scss" scoped>
    @import '@/styles/colors';

    .my-button {
        cursor: pointer;
        padding: 15px 22px;
        color: white;
        font-size: 16px;
        background-color: $blue-base;
        border: 1px solid white;
        border-radius: 15px;
        font-family: 'Cera Pro';
    }

    .my-button:hover {
        background-color: $blue-hover;
    }
    
    .my-button:active {
        border-color: $blue-active;
    }

    .secondary {
        background-color: white;
        color: $blue-base;
    }

    .secondary:hover {
        background-color: $secondary-hover;
    }

    .secondary:active {
        border-color: $secondary-active;
    }

    .outlined {
        background-color: white;
        color: $blue-base;
        border-color: $blue-base;
    }

    .outlined:hover {
        background-color: $secondary-hover;
    }

    .outlined:active {
        border-color: $secondary-active;
    }
</style>