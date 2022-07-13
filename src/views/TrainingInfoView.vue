<template>
  <div>
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
    </div>
    <div class="content">
      <ProfileList :profiles="profiles" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dateMixin from '@/mixins/dateMixin';
import ProfileList from '@/components/ProfileList.vue';

export default {
  name: 'TrainingInfoView',
  mixins: [dateMixin],
  components: {
    ProfileList
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
      attendings: []
    }
  },
  methods: {
    async fetchTraining() {
      try {
        const response = await axios.get('http://localhost:8000/trainings/' + this.id);
        this.training = response.data;
        this.fetchGroup();
        this.fetchProfiles();
        this.fetchAttendings();
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchGroup() {
      try {
        const response = await axios.get('http://localhost:8000/groups/' + this.training.groupId);
        this.group = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchProfiles() {
      try {
        const response = await axios.get('http://localhost:8000/profiles?groupId=' + this.training.groupId);
        this.profiles = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    async fetchAttendings() {
      try {
        const response = await axios.get('http://localhost:8000/attendings?trainingId=' + this.id);
        this.attendings = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    }
  },
  mounted() {
    this.fetchTraining();
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
    padding-top: 80px;
}
</style>