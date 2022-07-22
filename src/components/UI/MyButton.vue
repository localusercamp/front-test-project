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

        &:hover {
            background-color: $blue-hover;
        }

        &:active {
            border-color: $blue-active;
        }
    }

    .secondary {
        background-color: white;
        color: $blue-base;
        
        &:hover {
            background-color: $secondary-hover;
        }

        &:active {
            border-color: $secondary-active;
        }
    }

    .outlined {
        background-color: white;
        color: $blue-base;
        border-color: $blue-base;
        
        &:hover {
            background-color: $secondary-hover;
        }

        &:active {
            border-color: $secondary-active;
        }
    }
</style>