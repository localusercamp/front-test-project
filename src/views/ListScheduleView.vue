<template>
  <div>
    <div class="header" :class="{ header_scroll: isScroll }">
      <router-link :to="{name: 'calendar_schedule'}">
        <img id="calendar-icon" src="@/assets/icons/Calendar.svg">
      </router-link>
      <h4 class="header-text">Расписание</h4>
    </div>
    <div class="content" v-if="sсhedule_visible.length > 0">
      <div v-for="(item, index) in sсhedule_visible" :key="index" class="trainings">
        <h4 v-if="item.date !== currentDate.toLocaleDateString()" class="day-header">{{getDayAndMonth(convertStringToDate(item.date))}}</h4>
        <h4 v-else-if="item.date !== tomorrow.toLocaleDateString()" class="day-header">Сегодня</h4>
        <h4 v-else class="day-header">Завтра</h4>
        <TrainingList :trainings="item.trainings" :groups="groups" />
      </div>
      <MyObserver @intersect="loadMoreTrainings" />
    </div>
    <div v-else class="content">
      <h4>Нет тренировок</h4>
    </div>
  </div>
</template>

<script>
import TrainingList from '@/components/TrainingList.vue';
import MyObserver from '@/components/MyObserver.vue'
import dateMixin from '@/mixins/dateMixin';
import scheduleMixin from '@/mixins/scheduleMixin';

export default {
  name: 'ListScheduleView',
  mixins: [dateMixin, scheduleMixin],
  components: {
    TrainingList,
    MyObserver
  },
  data() {
    return {
      sсhedule_visible: [],
    }
  },
  methods: {
    loadMoreTrainings() {
      if(this.schedule_item_index < this.schedule_all?.length - 1) {
        this.sсhedule_visible = this.sсhedule_visible.concat(this.schedule_all?.slice(this.schedule_item_index, this.schedule_item_index + 4));
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

  .header {
    display: block;
  }

  .header-text {
    width: 100%;
  }

  .trainings {
    margin-bottom: 25px;
  }
</style>
