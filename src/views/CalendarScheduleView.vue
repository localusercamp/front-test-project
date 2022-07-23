<template>
    <div class="header" :class="{ header_scroll: isScroll }">
        <img src="@/assets/icons/Back.svg" class="back-icon" @click='$router.back'>
        <h4 class="header-text">Календарь тренировок</h4>
    </div>
    <div class="content">
        <MyCalendar class="calendar"/>
    </div>
</template>

<script>
import MyCalendar from '@/components/UI/MyCalendar.vue'
import dateMixin from '@/mixins/dateMixin'

export default {
    name: 'CalendarScheduleView',
    mixins: [dateMixin],
    components: {
        MyCalendar
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
  }
</style>