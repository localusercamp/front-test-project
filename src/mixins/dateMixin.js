export default {
    data() {
        return {
            months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'],
            currentDate: new Date()
        }
    },
    methods: {
        convertStringToDate(date) {
            let d = date.split(".");
            date = new Date(d[2] + '.' + d[1] + '.' + d[0]);
            date.setHours(0, 0, 0, 0);
            return date;
        },
        getDayAndMonth(date) {
            return `${date.getDate()} ${this.months[date.getMonth()]}`;
        },
        getFullDate(date) {
            return `${date.getDate()} ${this.months[date.getMonth()]} ${date.getFullYear()}`;
        },
        dateDiff(a, b) {
            return Math.round((b.getTime() - a.getTime()) / (1000*60*60*24));
        }
    },
    computed: {
        tomorrow() {
          let tomorrow = new Date();
          tomorrow.setDate(tomorrow.getDate() + 1);
          return tomorrow;
        }
    }
}