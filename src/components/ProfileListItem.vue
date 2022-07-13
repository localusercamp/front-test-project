<template>
  <div class="list-item" :class="visitClasses">
    <span>
      {{profile?.last_name}} {{profile?.first_name[0]}}. {{profile?.patronymic[0]}}.
    </span>
    <div class="list-item-icons">
      <MyCheckbox :disabled="visitsLeft === 0 ? true : false" />
      <MyEquipmentsIcon :disabled="visitsLeft === 0 ? true : false" />
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import MyCheckbox from '@/components/UI/MyCheckbox.vue'
import MyEquipmentsIcon from '@/components/UI/MyEquipmentsIcon.vue'
export default {
  name: 'ProfileListItem',
  components: {
    MyCheckbox,
    MyEquipmentsIcon
  },
  props: {
    profile: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      subscription: null
    }
  },
  computed: {
    visitsLeft() {
      return this.subscription?.max_visits - this.subscription?.visited;
    },
    visitClasses() {
      return {
        'one-visit': this.visitsLeft === 1,
        'disabled': this.visitsLeft === 0
      }
    }
  },
  methods: {
    async fetchSubscription() {
      try {
        const response = await axios.get('http://localhost:8000/subscriptions/?profileId=' + this.profile.id);
        this.subscription = response.data?.[0];
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
  },
  mounted() {
    this.fetchSubscription();
  }
}
</script>

<style scoped lang="scss">
  #tick-icon {
    margin-right: 5px;
  }
  .list-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  
  .list-item-icons {
    display: flex;
    align-items: center;
  }

  .one-visit {
    color: red;
  }
</style>
