<template>
  <div class="training-list">
    <h4 v-if="trainings?.length == 0">Нет тренировок</h4>
    <div v-else>
      <TrainingListItem
        v-for="(training, index) in trainings"
        :key="index"
        :training="training"
        :group="groups.find(group => training.groupId === group.id)"
      />
    </div>
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
      default() {
        return [];
      }
    },
    groups: {
      type: Array,
      default() {
        return [];
      }
    }
  },
}
</script>

<style scoped lang="scss">
  h4 {
    text-align: center;
    margin: 12px;
  }

  .training-list {
    display: flex;
    flex-direction: column;
  }
</style>
