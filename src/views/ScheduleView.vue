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
      <div class="observer" ref="observer"></div>
    </div>
  </div>
</template>

<script>
import TrainingList from '@/components/TrainingList.vue';
import observerMixin from '@/mixins/observerMixin';
import dateMixin from '@/mixins/dateMixin';

export default {
  name: 'ScheduleView',
  mixins: [dateMixin, observerMixin],
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
      const unique_dates = [...new Set(new_trainings.map(new_training => new_training.date))].sort((a, b) => this.convertStringToDate(a) - this.convertStringToDate(b));
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
        const response = await this.$axios.get('trainings');
        this.separateTrainings(response.data);
        this.loadMoreTrainings();
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
    }
  },
  created() {
    this.fetchTrainings();
    this.fetchGroups();
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
