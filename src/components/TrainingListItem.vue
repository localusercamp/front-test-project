<template>
  <div class="list-item">
    <span id="training-time" class="list-item-left">{{training?.start_time}} - {{training?.finish_time}}</span>
    <div class="group-info">
      <span id="group-title">{{group?.title}}</span>
      <span id="group-address">{{group?.address}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TrainingListItem',
  props: {
    training: {
      type: Object,
      required: true
    },
    group: {
      type: Object,
      required: true
    }
  }
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

  .group-info {
    display: flex;
    flex-direction: column;
  }
</style>
