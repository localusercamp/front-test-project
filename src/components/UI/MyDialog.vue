<template>
    <div v-if="show" class="my-dialog" @click="hideDialog">
        <div @click.stop class="my-dialog-content">
            <header id="header">
                <slot name="header"></slot>
            </header>
            <main id="default">
                <slot></slot>
            </main>
            <footer id="footer">
                <slot name="footer"></slot>
            </footer>
        </div>
    </div>
</template>

<script>
export default {
  name: 'MyDialog',
  props: {
    show: {
        type: Boolean,
        default: false
    }
  },
  methods: {
    hideDialog() {
        this.$emit('update:show', false)
    }
  }
}
</script>

<style scoped lang="scss">
    #header, #footer {
        padding: 0 20px;
    }

    #footer {
        display: flex;
        flex-direction: column;
        width: 100%;
    }

    .my-dialog {
        top: 0;
        bottom: 0;
        right: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.5);
        position: fixed;
        display: flex;
        z-index: 100;
    }

    .my-dialog-content {
        margin: auto;
        padding: 20px 0;
        background: white;
        border-radius: 18px;
        width: 80%;
    }
</style>