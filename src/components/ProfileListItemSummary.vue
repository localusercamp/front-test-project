<template>
  <MyDialog v-model:show="profileDialogVisible" ref='dialog'>
    <ProfileInfo :profile="profile" :subscription="subscription"/>
  </MyDialog>
  <div class="list-item clickable" @click="showProfileInfo">
    <span class="index">{{ index + 1 }}</span>
    <div>
      <p>{{ profile?.last_name }} {{ profile?.first_name[0] }}. {{ profile?.patronymic[0] }}.</p>
      <p class='equipment-title'>{{ attending?.equipmentTitle }}</p>
    </div>
  </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin'
import ProfileInfo from '@/components/ProfileInfo.vue'

export default {
  name: 'ProfileListItem',
  mixins: [dateMixin],
  components: {
    ProfileInfo
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    trainingId: {
      type: Number,
      required: true
    },
    profile: {
      type: Object,
      required: true
    },
    subscription: {
      type: Object,
      required: true
    },
    attending: {
      type: Object,
      required: true
    },
  },
  data() {
    return {
      profileDialogVisible: false
    }
  },
  methods: {
    showProfileInfo() {
      this.profileDialogVisible = true;
    },
    closeProfileInfo() {
      this.$refs.dialog.hideBody();
    },
    async saveData() {
      try {
        if(this.attending.visited) {
          await this.$axios.post('attendings', { 
              trainingId: this.trainingId,
              profileId: this.profile.id,
              equipmentId: this.attending.equipmentId
            }
          )
        }
        if(this.subscription) {
          await this.$axios.patch('subscriptions/' + this.subscription.id, { 
              visited: parseInt(this.subscription.visited) + 1
            }
          )
        }
      } catch (error) {
        alert("Ошибка! " + error);
      }
    }
  }
}
</script>

<style scoped lang="scss">
  @import '@/styles/colors';

  .index {
    margin-right: 18px;
    color: #B4C9D6;
  }
  
  .equipment-title {
    font-size: 14px;
    color: $blue-base;
    margin-top: 4px;
  }
</style>
