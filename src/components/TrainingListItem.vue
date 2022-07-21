<template>
  <router-link v-if="training?.completed" :to="{name: 'training_summary', params: {id: training.id}}" class="list-item">
    <span id="training-time" class="list-item-left">{{training?.start_time}} - {{training?.finish_time}}</span>
    <div class="group-info">
      <div>
        <span id="group-title">{{group?.title}}</span>
        <img id="check-mark" v-if="training.completed" src="@/assets/icons/Check_Mark.svg">
      </div>
      <span id="group-address">{{group?.address}}</span>
    </div>
  </router-link>
  <router-link v-else :to="{name: 'training_info', params: {id: training.id}}" class="list-item">
    <span id="training-time" class="list-item-left">{{training?.start_time}} - {{training?.finish_time}}</span>
    <div class="group-info">
      <div>
        <span id="group-title">{{group?.title}}</span>
        <img id="check-mark" v-if="training.completed" src="@/assets/icons/Check_Mark.svg">
      </div>
      <span id="group-address">{{group?.address}}</span>
    </div>
  </router-link>
</template>

<script>
export default {
    name: "TrainingListItem",
    props: {
        training: {
            type: Object,
            required: true
        },
        group: {
            type: Object,
            required: true
        }
    },
}
</script>

<style scoped lang="scss">
  #training-time {
    align-self: center;
    color: #91A0A9;
  }

  #group-address {
    font-size: 12px;
  }

  #check-mark {
    margin-left: 10px;
  }

  .group-info {
    display: flex;
    flex-direction: column;
  }
</style>
