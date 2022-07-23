<template>
    <button class="my-button">
        <slot>
            <span>{{ value }}</span>
            <div v-if="badge" class="badge"></div>
        </slot>
    </button>
</template>

<script>
export default {
  name: 'MyButton',
  props: ['value', 'badge']
}
</script>

<style lang="scss" scoped>
    @import '@/styles/colors';

    .my-button {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
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

        .badge {
            background-color: #DBEFFC;
            width: 4px;
            height: 4px;
            border-radius: 100%;
        }
    }

    .round {
        border-radius: 100%;
    }

    .badge {
        background-color: #3AB2E7;
        width: 4px;
        height: 4px;
        border-radius: 100%;
    }
</style>