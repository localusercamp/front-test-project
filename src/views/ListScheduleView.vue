<template>
  <div>
    <div class="header" :class="{ header_scroll: isScroll }">
      <router-link :to="{name: 'calendar_schedule'}">
        <img id="calendar-icon" src="@/assets/icons/Calendar.svg">
      </router-link>
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
  name: 'ListScheduleView',
  mixins: [dateMixin, observerMixin],
  components: {
    TrainingList
  },
  props: {
    schedule_all: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      sсhedule_visible: [],
      schedule_item_index: 0,
    }
  },
  methods: {
    loadMoreTrainings() {
      if(this.schedule_item_index < this.schedule_all.length - 1) {
        this.sсhedule_visible = this.sсhedule_visible.concat(this.schedule_all.slice(this.schedule_item_index, this.schedule_item_index + 4));
        this.schedule_item_index += 4;
      }
    },
  },
  created() {
    this.loadMoreTrainings();
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
