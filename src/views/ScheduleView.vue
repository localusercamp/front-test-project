<template>
  <div>
    <div class="header" :class="{ header_scroll: isScroll }">
      <img id="calendar-icon" src="@/assets/icons/Calendar.svg">
      <h4 class="header-text">Расписание</h4>
    </div>
    <div class="content">
      <div v-for="(item, index) in sсhedule_visible" :key="index" class="trainings">
        <h4 v-if="item.date !== currentDate.toLocaleDateString()" class="day-header">{{getDayAndMonth(convertStringToDate(item.date))}}</h4>
        <h4 v-else-if="item.date !== tomorrow.toLocaleDateString()" class="day-header">Сегодня</h4>
        <h4 v-else class="day-header">Завтра</h4>
        <TrainingList :trainings="item.trainings" :groups="groups" />
      </div>
    </div>
    <div ref="observer"></div>
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
      schedule_all: [],
      sсhedule_visible: [],
      schedule_item_index: 0,
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
        this.schedule_all.push({
          date: date,
          trainings: subarray
        });
      });
    },
    loadMoreTrainings() {
      if(this.schedule_item_index < this.schedule_all.length - 1) {
        this.sсhedule_visible = this.sсhedule_visible.concat(this.schedule_all.slice(this.schedule_item_index, this.schedule_item_index + 4));
        this.schedule_item_index += 4;
      }
    },
    async fetchTrainings() {
      try {
        const response = await axios.get('http://localhost:8000/trainings');
        this.separateTrainings(response.data);
        this.loadMoreTrainings();
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
    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }
    const callback = (entries) => {
      if(entries[0].isIntersecting) {
        this.loadMoreTrainings();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(this.$refs.observer);
  }
}
</script>

<style scoped lang="scss">
  h4 {
    text-align: center;
  }

  #calendar-icon {
    position: absolute;
  }

  .header-text {
    width: 100%;
  }

  .trainings {
    margin-bottom: 25px;
  }
</style>
