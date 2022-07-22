<template>
    <transition
        name="modal"
        @after-enter="bodyVisible = true"
    >
        <div v-if="show" class="my-dialog" @click="bodyVisible = false">
            <transition name="modal-content" @after-leave="hideDialog">
                <div v-if="bodyVisible" @click.stop class="my-dialog-content">
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
            </transition>
        </div>
    </transition>
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
  data() {
    return {
        bodyVisible: false
    }
  },
  methods: {
    hideDialog() {
        this.$emit('update:show', false);
    },
    hideBody() {
        this.bodyVisible = false;
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
        justify-content: center;
        align-items: center;
        display: flex;
        z-index: 100;
        
        .my-dialog-content {
            margin: auto;
            padding: 20px 0;
            background: white;
            border-radius: 18px;
            width: 90%;
        }
    }

    .modal-enter-active {
        animation: modal .2s ease-out;
    }
 
    .modal-leave-active {
        animation: modal .2s ease-out reverse;
    }

    @keyframes modal {
        from {
            opacity: 0;
        }

        to {
            opacity: 1;
        }
    }

    .modal-content-enter-active {
        animation: modal-content .3s ease-out;
    }

    .modal-content-leave-active {
        animation: modal-content .3s ease-out reverse;
    }

    @keyframes modal-content {
        from {
            opacity: 0;
            transform: translateY(350px);
        }

        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
</style>