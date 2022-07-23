<template>
    <button class="my-button">
        <slot>{{ value }}</slot>
    </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['value']
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

    .light {
        background-color: #F3F5F4;
        color: #122A36;

        &:hover {
            background-color: #CBCDCC;
        }

        &:active {
            border-color: #677982;
        }
    }

    .light-primary {
        background-color: #DBEFFC;
        color: #1B4361;

        &:hover {
            background-color: #BDD9EC;
        }

        &:active {
            border-color: #93B0C3;
        }
    }

    .disabled {
        background-color: white;
        color: #E2E2E2;
        pointer-events: none;
    }

    .round {
        border-radius: 100%;
    }
</style>