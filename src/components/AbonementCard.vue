<template>
    <div class="abonement-widget">
        <div class="card">
            <div class="card-content">
                <span class="card-content-title">Абонемент</span>
                <div v-if="subscription" class="card-content-body">
                    <span>Посещений: {{ subscription.visited }}/{{ subscription.max_visits }}</span>
                    <span>Дней: {{ leftAbonementDays }}/{{ dateDiff(createdAt, expiresAt) }}</span>
                    <span>Приобретен: {{ subscription.created_at }}</span>
                </div>
                <div v-else class="card-content-body">
                    <h4>Нет абонемента</h4>
                </div>
            </div>
            <div class="edge">
                <div class="circle"></div>
            </div>
        </div>
    </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin'

export default {
  name: 'AbonementCard',
  mixins: [dateMixin],
  props: {
    subscription: {
        type: Object
    }
  },
  computed: {
    expiresAt() {
        return this.subscription ? this.convertStringToDate(this.subscription.expires_at) : '';
    },
    createdAt() {
        return this.subscription ? this.convertStringToDate(this.subscription.created_at) : '';
    },
    leftAbonementDays() {
        if(this.subscription) {
            let days = this.dateDiff(this.currentDate, this.expiresAt);
            return days > 0 ? days : 0;
        } else return 0;
    }
  }
}
</script>

<style lang="scss" scoped>
    @import '@/styles/colors';
    
    .abonement-widget {
        min-height: 110px;
    }

    .card {
        display: flex;
        justify-content: space-between;
        background: #E1E7EB;
        height: 100%;
        border-radius: 15px;
    }

    .card-content {
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        font-size: 14px;
    }

    .card-content-title {
        margin-bottom: 10px;
        color: $box-title;
    }

    .card-content-body {
        display: flex;
        flex-direction: column;
        font-weight: bold;
    }

    .edge {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        background: #CCD6DC;
        width: 40px;
        border-radius: 0 15px 15px 0;
    }

    .circle {
        width: 16px;
        height: 32px;
        border-radius: 100% 0 0 100% / 50% 0 0 50%;
        background: #FFFFFF;
    }
</style>