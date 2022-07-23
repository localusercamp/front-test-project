<template>
    <div class="my-calendar">
        <div class="my-calendar-header">
            <h4>{{ monthName }} {{ current_year }}</h4>
            <div class="switch-month">
                <MyButton class="light round left-item" @click="previousMonth">
                    <svg width="7" height="10" fill="#122A36">
                        <path d="M6.0092 1.5364C6.36067 1.18492 6.36067 0.615076 6.0092 0.263604C5.65773 -0.087868 5.08788 -0.087868 4.7364 0.263604L3.8147e-06 5L4.7364 9.73641C5.08788 10.0879 5.65773 10.0879 6.0092 9.73641L6.08974 9.64424C6.35823 9.29148 6.33138 8.7858 6.0092 8.46362L2.54579 5L6.0092 1.5364Z"/>
                    </svg>
                </MyButton>
                <MyButton class="light round" @click="nextMonth">
                    <svg width="7" height="10" fill="#122A36">
                        <path d="M0.2636 8.4636C-0.0878724 8.81508 -0.0878725 9.38492 0.263599 9.7364C0.615071 10.0879 1.18492 10.0879 1.53639 9.7364L6.27279 5L1.53639 0.263591C1.18492 -0.0878806 0.615072 -0.0878806 0.2636 0.263591L0.183055 0.355756C-0.0854308 0.708521 -0.0585825 1.2142 0.2636 1.53638L3.72701 5L0.2636 8.4636Z"/>
                    </svg>
                </MyButton>
            </div>
        </div>
        <div class="my-calendar-content">
            <div v-for="(day, index) in days" :key="index" class="my-calendar-content-item">
                <MyButton class="light round" :class="dayClasses(day)" :value="day.getDate()" @click="selectDate(day)" :badge="checkDay(day)"/>
            </div>
        </div>
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue'

export default {
    name: 'MyCalendar',
    components: {
        MyButton
    },
    props: {
        date: {
            type: Date,
            default() {
                return new Date();
            }
        },
        checked_dates: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    data() {
        return {
            today: new Date(),
            current_date: this.date,
            current_month: this.date.getMonth(),
            current_year: this.date.getFullYear(),
            i: 0,
            days: [],
            months: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь",
            ],
        }
    },
    computed: {
        monthName() {
            return this.months[this.current_month];
        }
    },
    methods: {
        getWeeks(year, month) {
            let l = new Date(year, month + 1, 0);
            return Math.ceil((l.getDate() - (l.getDay() ? l.getDay() : 7)) / 7 ) + 1;
        },
        previousMonth() {
            if(this.current_month == 0) {
                this.current_month = 11;
                this.current_year -= 1;
            } else {
                this.current_month -= 1;
            }
            this.setDays();
        },
        nextMonth() {
            if(this.current_month == 11) {
                this.current_month = 0;
                this.current_year += 1;
            } else {
                this.current_month += 1;
            }
            this.setDays();
        },
        dayClasses(day) {
            return {
                'selected': day.toLocaleDateString() == this.current_date.toLocaleDateString() && day.getMonth() == this.current_month,
                'light-primary': day.toLocaleDateString() == this.today.toLocaleDateString(),
                'disabled': day.getMonth() != this.current_month,
            };
        },
        checkDay(day) {
            return this.checked_dates.includes(day.toLocaleDateString())
        },
        selectDate(day) {
            this.current_date = new Date(this.current_year, this.current_month, day.getDate());
            this.$emit('selectDate', this.current_date);
        },
        setDays() {
            let days = [];
            for (let i = 1; i <= new Date(this.current_year, this.current_month + 1, 0).getDate(); i++) {
                days.push(new Date(this.current_year, this.current_month, i));
            }
            let lastMonth = [];
            let limit = (new Date(this.current_year, this.current_month, 1).getDay() + 6) % 7;
            for (let i = 1; i <= limit; i++) {
                lastMonth.unshift(new Date(this.current_year, this.current_month, 1 - i));
            }
            lastMonth = lastMonth.concat(days);
            let nextMonth = [];
            for (let i = 1; i <= this.getWeeks(this.current_year, this.current_month) * 7 - lastMonth.length; i++) {
                nextMonth.push(new Date(this.current_year, this.current_month + 1, i));
            }
            this.days = lastMonth.concat(nextMonth);
        }
    },
    mounted () {
        this.setDays();
    }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/colors';

    .my-calendar {
        padding: 18px;
        border: 1px solid #B4C9D6;
        border-radius: 15px;

        .my-calendar-header {
            display: flex;
            justify-content: space-between;
            margin-bottom: 23px;

            .switch-month {
                display: flex;
            }

            .my-button {
                height: 24px;
                width: 24px;
                padding: 0 7px;
            }

            .left-item {
                margin-right: 8px;
            }
        }

        .my-calendar-content {
            display: grid;
            grid-template-columns: repeat(7, 1fr);

            .my-calendar-content-item {
                margin: 15px 0;
            }

            .my-button {
                height: 32px;
                width: 32px;
                padding: 0 7px;
                font-size: 14px;
            }

            .selected {
                background-color: #677982;
                color: white;
            }
        }
    }
</style>