export default {
    data() {
        return {
            observer: null
        }
    },
    mounted() {
        const options = {};
        const callback = (entries) => {
            if(entries[0].isIntersecting) {
                this.loadMoreTrainings();
            }
        };
        this.observer = new IntersectionObserver(callback, options);
    },
    updated() {
        this.observer.observe(this.$refs.observer);
    }
}