<template>
<label>
    <slot></slot>
    <input
        type="radio"
        :checked="isChecked"
        :value="value"
        @change="$emit('update:modelValue', $event.target.value)"
    />
    <svg width="32" height="32" viewBox="0 0 32 32" :fill="currentColor" class="clickable">
        <path
          d="M10.22 4.66667C6.84666 4.66667 4.66666 6.97734 4.66666 10.5547V21.4453C4.66666 25.0227 6.84666 27.3333 10.22 27.3333H21.7773C25.152 27.3333 27.3333 25.0227 27.3333 21.4453V10.5547C27.3333 6.97734 25.152 4.66667 21.7787 4.66667H10.22ZM21.7773 29.3333H10.22C5.70133 29.3333 2.66666 26.1627 2.66666 21.4453V10.5547C2.66666 5.83734 5.70133 2.66667 10.22 2.66667H21.7787C26.2973 2.66667 29.3333 5.83734 29.3333 10.5547V21.4453C29.3333 26.1627 26.2973 29.3333 21.7773 29.3333Z"
        />
        <path
          v-if="isChecked"
          d="M14.418 20.164C14.1633 20.164 13.906 20.0666 13.7113 19.8706L10.546 16.7066C10.1553 16.316 10.1553 15.684 10.546 15.2933C10.9366 14.9026 11.5686 14.9026 11.9593 15.2933L14.418 17.7493L20.0393 12.1293C20.43 11.7386 21.062 11.7386 21.4526 12.1293C21.8433 12.52 21.8433 13.152 21.4526 13.5426L15.1246 19.8706C14.93 20.0666 14.674 20.164 14.418 20.164Z"
        />
    </svg>
</label>
</template>

<script>
export default {
    name: 'MyRadioButton',
    props: {
        modelValue: {
            default: ''
        },
        value: { 
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        currentColor() {
            if(!this.disabled) {
                return this.isChecked ? '#0E77BA' : '#BBCBD3';
            } else {
                return '#E1E7EB';
            }
        },
        isChecked() {
            return this.modelValue == this.value;
        }
    }
}
</script>

<style scoped lang="scss">
    input[type=radio] {
        display: none;
        pointer-events: none;
    }
</style>