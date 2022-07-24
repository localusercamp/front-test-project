export default {
    data() {
        return {
            schedule_all: [],
            schedule_item_index: 0,
            groups: [],
            unique_dates: [],
        }
    },
    methods: {
        separateTrainings(new_trainings) {
            let subarray = [];
            this.unique_dates = [...new Set(new_trainings.map(new_training => new_training.date))].sort((a, b) => this.convertStringToDate(a) - this.convertStringToDate(b));
            this.unique_dates.forEach(date => {
              subarray = new_trainings.filter(new_training => new_training.date === date);
              subarray.forEach(training => delete training.date);
              this.schedule_all.push({
                date: date,
                trainings: subarray
              });
            });
        },
        async fetchTrainings() {
            try {
                const response = await this.$axios.get('trainings');
                this.separateTrainings(response.data);
            } catch (error) {
                alert("Ошибка! " + error);
            }
        },
        async fetchGroups() {
            try {
                const response = await this.$axios.get('groups');
                this.groups = response.data;
            } catch (error) {
                alert("Ошибка! " + error);
            }
        },
    },
    mounted() {
        this.fetchTrainings();
        this.fetchGroups();
    },
}