<template>
  <div class="header" :class="{ header_scroll: isScroll }">
    <img src="@/assets/icons/Back.svg" class="back-icon" @click='$router.back'>
    <div class="group-info">
      <h4 id="group-title">{{group?.title}}</h4>
      <div v-if="training?.date">
        <span v-if="training?.date !== currentDate.toLocaleDateString()">{{getFullDate(convertStringToDate(training.date))}}, {{training.start_time}}</span>
        <span v-else-if="training?.date !== tomorrow.toLocaleDateString()">Сегодня, {{training.start_time}}</span>
        <span v-else>Завтра, {{training.start_time}}</span>
      </div>
    </div>
  </div>
  <div class="content">
    <div>
      <div class="content-title">
        <span>ИТОГИ ТРЕНИРОВКИ</span>
      </div>
      <ProfileListItemSummary
        v-for="(profile, index) in profiles"
        :key="index"
        :index="index"
        :trainingId="training.id"
        :profile="profile"
        :subscription="subscriptions.find(subscription => subscription.profileId == profile.id)"
        :attending="getProfileAttending(profile.id)"
        ref="childComponent"
      />
      <div class="training-info">
        <span>Всего участников: {{ profiles.length }}</span>
        <span>Тип тренировки: {{ type_name }}</span>
      </div>
    </div>
    <div class="btn-list" v-if="!training?.completed">
      <MyButton @click="saveTraining">Закрыть тренировку</MyButton>
      <MyButton class="secondary" @click="$router.push('/training_info/' + this.id)">Редактировать</MyButton>
    </div>
  </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin';
import ProfileListItemSummary from '@/components/ProfileListItemSummary.vue';

export default {
  name: 'TrainingSummaryView',
  mixins: [dateMixin],
  components: {
    ProfileListItemSummary
  },
  props: {
    id: {
      required: true
    }
  },
  data() {
    return {
      training: null,
      attendings: [],
      group: null,
      profiles: [],
      subscriptions: [],
      equipments: [],
      type_name: '',
    }
  },
  methods: {
    getProfileAttending(profile_id) {
      let attending = this.attendings.find(attending => attending.profileId == profile_id);
      if(attending != undefined) {
        attending.equipmentTitle = this.equipments.find(equipment => equipment.id == attending.equipmentId)?.title;
        return attending;
      }
    },
    async fetchTrainingInfo() {
      try {
        const response = await this.$axios.get('trainings/' + this.id);
        this.training = response.data;
        if(this.training.completed) {
          this.fetchGroup();
          this.fetchAttendingsInfo();
          this.fetchTypeName();
        } else {
          this.$router.push('/');
        }
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchAttendingsInfo() {
      try {
        const response = await this.$axios.get('attendings', { params: { trainingId: this.id } });
        this.attendings = response.data;
        this.fetchProfiles();
        this.fetchEquipments();
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
        this.profiles = response.data.filter(profile => this.attendings.some(attending => profile.id == attending.profileId));
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
    async fetchTypeName() {
      try {
        const response = await this.$axios.get('types', { params: { id: this.training.typeId } });
        this.type_name = response.data[0].title;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchEquipments() {
      let equipments_id = this.attendings.map(attending => {
        if(attending.equipmentId != null) {
          return attending.equipmentId;
        }
      })
      try {
        const response = await this.$axios.get('equipments', { params: { id: equipments_id } });
        this.equipments = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async saveTraining() {
      try {
        for(let i = 0; i < this.$refs.childComponent.length; i++) {
          await this.$refs.childComponent[i].saveData();
        }
        await this.$axios.patch('trainings/' + this.id, { completed: true, typeId: parseInt(this.training.typeId) });
        this.$store.commit('deleteTraining', this.training.id);
        this.$router.push('/');
      } catch (error) {
        alert("Ошибка! " + error);
      }
    }
  },
  created() {
    let saved_training = this.$store.state.saved_trainings.find(saved_training => this.id == saved_training.training.id);
    if(saved_training != undefined) {
      this.training = saved_training.training;
      this.attendings = saved_training.attendings.filter(attending => attending.visited);
      this.fetchGroup();
      this.fetchProfiles();
      this.fetchTypeName();
      this.fetchEquipments();
    } else {
      this.fetchTrainingInfo();
    }
  },
}
</script>

<style scoped lang="scss">
  @import '@/styles/colors';

  .back-icon {
    position: absolute;
    cursor: pointer;
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

    .content-title {
      padding: 10px 0;
      color: white;
      background: #DFE4E8;
      text-align: center;
    }

    .training-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 15px;
      font-size: 14px;
      color: $light-item-list;
    }

    .btn-list {
      padding: 0 15px;
    }
  }
</style>