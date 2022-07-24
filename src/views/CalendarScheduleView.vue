<template>
    <div class="header" :class="{ header_scroll: isScroll }">
        <img src="@/assets/icons/Back.svg" class="back-icon" @click='$router.back'>
        <h4 class="header-text">Календарь тренировок</h4>
    </div>
    <div class="content">
        <MyCalendar
            class="calendar"
            :date="current_date"
            :checked_dates="unique_dates"
            @selectDate="selectDate"
        />
        <div class="trainings">
            <h4 v-if="selected_date !== currentDate.toLocaleDateString()" class="day-header">{{ getDayAndMonth(selected_date) }}</h4>
            <h4 v-else-if="selected_date !== tomorrow.toLocaleDateString()" class="day-header">Сегодня</h4>
            <h4 v-else class="day-header">Завтра</h4>
            <TrainingList v-if="index > -1" :trainings="scheduleAll[index].trainings" :groups="groups" />
            <h4 v-else>Нет тренировок</h4>
        </div>
    </div>
</template>

<script>
import MyCalendar from '@/components/UI/MyCalendar.vue'
import TrainingList from '@/components/TrainingList.vue'
import dateMixin from '@/mixins/dateMixin'
import scheduleMixin from '@/mixins/scheduleMixin';

export default {
    name: 'CalendarScheduleView',
    mixins: [dateMixin, scheduleMixin],
    components: {
        MyCalendar,
        TrainingList
    },
    data() {
        return {
            selected_date: new Date(),
            index: -1
        }
    },
    computed: {
        scheduleAll() {
            return this.schedule_all;
        }
    },
    methods: {
        selectDate(data) {
            this.selected_date = data;
            this.indexSchedule();
        },
        indexSchedule() {
            if(this.scheduleAll?.length > 0) {
                this.index = this.scheduleAll?.findIndex(schedule => schedule.date == this.selected_date.toLocaleDateString());                
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  h4 {
    text-align: center;
  }
  
  .header-text {
    width: 100%;
  }

  .content {
    .calendar {
        margin: 0 12px;
    }

    .trainings {
        margin-top: 20px;
    }
  }
</style>