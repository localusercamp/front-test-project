export default {
    data() {
        return {
            isScroll: false,
        }
    },
    mounted() {
        window.addEventListener('scroll', () => this.isScroll = window.scrollY > 20);
    }
}