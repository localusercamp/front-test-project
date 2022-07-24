<template>
  <div class="observer"></div>
</template>

<script>
export default {
    name: 'MyObserver',
    props: ['options'],
    data() {
        return {
            observer: null,
        }
    },
    mounted() {
        const options = this.options || {};

        this.observer = new IntersectionObserver(([entry]) => {
        if (entry && entry.isIntersecting) {
            this.$emit('intersect');
        }
        }, options);

        this.observer.observe(this.$el);
    },
    unmounted() {
        this.observer.disconnect();
    }
}
</script>
