<template>
  <MyDialog v-model:show="dialogVisible">
    <template #header>
      <h4>Тип тренировки</h4>
    </template>
    <template #default>
      <SelectItemTypeForm url="types" :itemId="training.typeId" @saveForm="saveTrainingType"/>
    </template>
    <template #footer>
      <MyButton @click="closeTrainingTypeForm" class="secondary">Отменить</MyButton>
    </template>
  </MyDialog>
  <div class="header" :class="{ header_scroll: isScroll }">
    <router-link to="/" id="back-icon">
      <img src="@/assets/icons/Back.svg">
    </router-link>
    <div class="group-info">
      <h4 id="group-title">{{group?.title}}</h4>
      <div v-if="training?.date">
        <span v-if="training?.date !== currentDate.toLocaleDateString()">{{getFullDate(convertStringToDate(training.date))}}, {{training.start_time}}</span>
        <span v-else-if="training?.date !== tomorrow.toLocaleDateString()">Сегодня, {{training.start_time}}</span>
        <span v-else>Завтра, {{training.start_time}}</span>
      </div>
    </div>
    <img class="clickable" src="@/assets/icons/Filter.svg" @click="showTrainingTypeForm">
  </div>
  <div class="content">
    <div>
      <ProfileListItem
        v-for="(profile, index) in profiles"
        :key="index"
        :profile="profile"
        :subscription="subscriptions.find(subscription => subscription.profileId == profile.id)"
        :trainingId="training.id"
        ref="childComponent"
      />
    </div>
    <div class="btn-list">
      <MyButton @click="saveTrainingVuex">Сохранить тренировку</MyButton>
      <MyButton class="secondary" @click="$router.push('/')">Отмена</MyButton>
    </div>
  </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin';
import ProfileListItem from '@/components/ProfileListItem.vue';
import SelectItemTypeForm from '@/components/SelectItemTypeForm.vue'

export default {
  name: 'TrainingInfoView',
  mixins: [dateMixin],
  components: {
    ProfileListItem,
    SelectItemTypeForm
  },
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      training: null,
      group: null,
      profiles: [],
      subscriptions: [],
      dialogVisible: false
    }
  },
  methods: {
    async fetchTraining() {
      try {
        const response = await this.$axios.get('trainings/' + this.id);
        this.training = response.data;
        if(this.training.completed) {
          this.$router.push('/training_summary/' + this.id);
        }
        this.fetchGroup();
        this.fetchProfiles();
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchGroup() {
      try {
        const response = await this.$axios.get('groups/' + this.training.groupId);
        this.group = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchProfiles() {
      try {
        const response = await this.$axios.get('profiles', { params: { groupId: this.training.groupId, _expand: 'client' } });
        this.profiles = response.data;
        this.fetchSubscriptions();
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchSubscriptions() {
      let profiles_id = this.profiles.map(profile => {
        return profile.id;
      })
      try {
        const response = await this.$axios.get('subscriptions', { params: { profileId: profiles_id } });
        this.subscriptions = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    showTrainingTypeForm() {
      this.dialogVisible = true;
    },
    closeTrainingTypeForm() {
      this.dialogVisible = false;
    },
    saveTrainingType(training_type) {
      this.training.typeId = training_type;
      this.closeTrainingTypeForm();
    },
    saveTrainingVuex() {
      let attendings = [];
      for(let i = 0; i < this.$refs.childComponent.length-1; i++) {
        attendings.push(this.$refs.childComponent[i].saveDataVuex());
      }
      this.$store.commit('addTraining', { training: this.training, attendings });
      this.$router.push('/training_summary/' + this.training.id);
    }
  },
  created() {
    let saved_training = this.$store.state.saved_trainings.find(saved_training => this.id == saved_training.training.id);
    if(saved_training != undefined) {
      this.training = saved_training.training;
      this.fetchGroup();
      this.fetchProfiles();
    } else {
      this.fetchTraining();
    }
  }
}
</script>

<style scoped lang="scss">
  #back-icon {
    position: absolute;
  }

  .group-info {
    text-align: center;
    width: 100%;
  }

  .content {
    padding: 80px 0 15px;
    height: fill-available;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .btn-list {
    padding: 0 15px;
  }
</style>