<template>
  <div>
    <div class="header">
      <img id="calendar-icon" src="@/assets/icons/Calendar.svg">
      <h4 class="header-text">Расписание</h4>
    </div>
    <div v-for="(item, index) in shedule" :key="index" class="trainings">
      <h4 v-if="item.date === currentDate.toLocaleDateString()" class="day-header">Сегодня</h4>
      <h4 v-else-if="item.date === tomorrow.toLocaleDateString()" class="day-header">Завтра</h4>
      <h4 v-else class="day-header">{{getDayAndMonth(convertStringToDate(item.date))}}</h4>
      <TrainingList :trainings="item.trainings" :groups="groups" />
    </div>
  </div>
</template>

<script>
import TrainingList from '@/components/TrainingList.vue';
import dateMixin from '@/mixins/dateMixin';
import axios from 'axios';

export default {
  name: 'ScheduleView',
  mixins: [dateMixin],
  components: {
    TrainingList
  },
  data() {
    return {
      shedule: [],
      groups: []
    }
  },
  methods: {
    separateTrainings(new_trainings) {
      let subarray = [];
      const unique_dates = [...new Set(new_trainings.map(new_training => new_training.date))];
      unique_dates.forEach(date => {
        subarray = new_trainings.filter(new_training => new_training.date === date);
        subarray.forEach(training => delete training.date);
        this.shedule.push({
          date: date,
          trainings: subarray
        });
      });
    },
    async fetchTrainings() {
      try {
        const response = await axios.get('http://localhost:8000/trainings');
        this.separateTrainings(response.data);
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchGroups() {
      try {
        const response = await axios.get('http://localhost:8000/groups');
        this.groups = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    }
  },
  mounted() {
    this.fetchTrainings();
    this.fetchGroups();
  }
}
</script>

<style scoped lang="scss">
  h4 {
    text-align: center;
  }

  .trainings {
    margin-bottom: 25px;
  }

  .header-text {
    width: -webkit-fill-available;
  }
</style>
