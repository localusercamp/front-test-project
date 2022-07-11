<template>
  <div class="training-list">
    <TrainingListItem
      v-for="(training, index) in trainings"
      :key="index"
      :training="training"
      :group="groups.find(group => training.groupId === group.id)"
    />
  </div>
</template>

<script>
import TrainingListItem from './TrainingListItem.vue';
export default {
  name: 'TrainingList',
  components: {
    TrainingListItem
  },
  props: {
    trainings: {
      type: Array,
      required: true
    },
    groups: {
      type: Array,
      required: true
    }
  },
}
</script>

<style scoped lang="scss">
  .training-list {
    display: flex;
    flex-direction: column;
  }
</style>
