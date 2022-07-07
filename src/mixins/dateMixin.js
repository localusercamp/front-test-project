export default {
    data() {
        return {
            months: ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'декабря'],
            currentDate: new Date()
        }
    },
    methods: {
        convertStringToDate(date) {
            let d = date.split(".");
            date = new Date(d[2] + '.' + d[1] + '.' + d[0]);
            return date;
        },
        getDayAndMonth(date) {
            return `${date.getDate()} ${this.months[date.getMonth()]}`;
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