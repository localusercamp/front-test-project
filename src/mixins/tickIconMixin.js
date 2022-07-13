export default {
    props: {
        disabled: {
          type: Boolean,
          default: false
        }
    },
    data() {
        return {
            checked: false,
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