<template>
    <div class="header" :class="{ header_scroll: isScroll }">
        <img src="@/assets/icons/Back.svg" class="back-icon" @click='$router.back'>
        <h4 class="header-text">Календарь тренировок</h4>
    </div>
    <div class="content">
        <MyCalendar
            v-if="sсhedule_all[0]"
            class="calendar"
            :date="current_date"
            :checked_dates="unique_dates"
            @selectDate="selectDate"
        />
        <div class="trainings">
            <h4 v-if="selected_date !== currentDate.toLocaleDateString()" class="day-header">{{ getDayAndMonth(selected_date) }}</h4>
            <h4 v-else-if="selected_date !== tomorrow.toLocaleDateString()" class="day-header">Сегодня</h4>
            <h4 v-else class="day-header">Завтра</h4>
            <TrainingList :trainings="sсhedule_all[index]?.trainings" :groups="groups" />
        </div>
    </div>
</template>

<script>
import MyCalendar from '@/components/UI/MyCalendar.vue'
import TrainingList from '@/components/TrainingList.vue'
import dateMixin from '@/mixins/dateMixin'

export default {
    name: 'CalendarScheduleView',
    mixins: [dateMixin],
    components: {
        MyCalendar,
        TrainingList
    },
    data() {
        return {
            selected_date: new Date(),
            index: null
        }
    },
    computed: {
        sсhedule_all() {
            return this.$attrs.schedule_all;
        },
        groups() {
            return this.$attrs.groups;
        },
        unique_dates() {
            return this.$attrs.unique_dates;
        },
    },
    methods: {
        selectDate(data) {
            this.selected_date = data;
            this.index = this.indexSchedule();
        },
        indexSchedule() {
            return this.sсhedule_all.findIndex(schedule => this.convertStringToDate(schedule.date).toLocaleDateString() == this.selected_date.toLocaleDateString());
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