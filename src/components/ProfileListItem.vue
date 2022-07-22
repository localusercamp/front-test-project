<template>
  <MyDialog v-model:show="equipmentsDialogVisible" ref='dialogEquipments'>
    <template #header>
      <h4>Тип инвентаря</h4>
    </template>
    <template #default>
      <SelectItemTypeForm url="equipments" :itemId="equipmentId" @saveForm="saveEquipments"/>
    </template>
    <template #footer>
      <MyButton @click="closeEquipmentsForm" class="secondary">Отменить</MyButton>
    </template>
  </MyDialog>
  <MyDialog v-model:show="profileDialogVisible" ref='dialogProfile'>
    <ProfileInfo :profile="profile" :subscription="subscription"/>
  </MyDialog>
  <div class="list-item" :class="visitClasses">
    <span class="clickable" @click="showProfileInfo">
      {{profile?.last_name}} {{profile?.first_name[0]}}. {{profile?.patronymic[0]}}.
    </span>
    <div class="list-item-icons">
      <MyCheckIcon :disabled="disabled" :checked="visited" @click="setMark">
        <path
          d="M10.22 4.66667C6.84666 4.66667 4.66666 6.97734 4.66666 10.5547V21.4453C4.66666 25.0227 6.84666 27.3333 10.22 27.3333H21.7773C25.152 27.3333 27.3333 25.0227 27.3333 21.4453V10.5547C27.3333 6.97734 25.152 4.66667 21.7787 4.66667H10.22ZM21.7773 29.3333H10.22C5.70133 29.3333 2.66666 26.1627 2.66666 21.4453V10.5547C2.66666 5.83734 5.70133 2.66667 10.22 2.66667H21.7787C26.2973 2.66667 29.3333 5.83734 29.3333 10.5547V21.4453C29.3333 26.1627 26.2973 29.3333 21.7773 29.3333Z"
        />
        <path
          v-if="visited"
          d="M14.418 20.164C14.1633 20.164 13.906 20.0666 13.7113 19.8706L10.546 16.7066C10.1553 16.316 10.1553 15.684 10.546 15.2933C10.9366 14.9026 11.5686 14.9026 11.9593 15.2933L14.418 17.7493L20.0393 12.1293C20.43 11.7386 21.062 11.7386 21.4526 12.1293C21.8433 12.52 21.8433 13.152 21.4526 13.5426L15.1246 19.8706C14.93 20.0666 14.674 20.164 14.418 20.164Z"
        />
      </MyCheckIcon>
      <MyCheckIcon :disabled="disabled" :checked="equipmentId !== null" @click="showEquipmentsForm">
        <path 
          d="M10.22 4.66667C6.84667 4.66667 4.66667 6.97733 4.66667 10.5547V21.4453C4.66667 25.0227 6.84667 27.3333 10.22 27.3333H21.7773C25.152 27.3333 27.3333 25.0227 27.3333 21.4453V10.5547C27.3333 6.97733 25.152 4.66667 21.7787 4.66667H10.22ZM21.7773 29.3333H10.22C5.70133 29.3333 2.66667 26.1627 2.66667 21.4453V10.5547C2.66667 5.83733 5.70133 2.66667 10.22 2.66667H21.7787C26.2973 2.66667 29.3333 5.83733 29.3333 10.5547V21.4453C29.3333 26.1627 26.2973 29.3333 21.7773 29.3333Z"
        />
        <path
          d="M7.94999 20.9002C7.0092 20.3984 7.72869 17.5862 8.93295 17.4981C12.8349 17.2127 16.4519 14.5551 16.4519 10.6452C16.4519 10.3529 16.6741 10.1159 16.948 10.1159H22.9676C23.2416 10.1159 23.4638 10.3529 23.4638 10.6452C23.4638 15.8728 24.4138 16.581 24.4138 20.9002L23.0663 21.0108C22.0619 21.1035 19.4176 21.2581 19.1436 21.2581L16.8246 21.3205C16.5507 21.3205 15.3926 21.3333 15.3926 21.3333L14.2505 21.3287L12.2216 21.3333C12.2216 21.3333 8.00546 21.1495 7.94999 20.9002ZM8.514 19.603V19.7189C11.4905 20.185 15.389 20.1614 18.5186 20.0238C18.5079 19.8973 18.5026 19.77 18.5026 19.6426C18.5026 17.3079 20.283 15.4085 22.4715 15.4085C22.6085 15.4085 22.7448 15.4166 22.8801 15.4314C22.761 14.8242 22.6504 14.1553 22.5744 13.2915H16.9913C16.9242 13.4803 16.8497 13.6655 16.7686 13.8468L18.0114 14.6415C18.2464 14.7918 18.3227 15.1169 18.1818 15.3676C18.041 15.6183 17.7362 15.6997 17.5013 15.5494L16.2771 14.7666C16.1795 14.9215 16.0763 15.0721 15.9677 15.2179L17.0029 16.2528C17.2028 16.4527 17.213 16.7876 17.0256 17.0009C16.838 17.2144 16.5241 17.2248 16.3244 17.0252L15.2934 15.9944C15.162 16.1241 15.0258 16.2485 14.8842 16.3661L15.6995 17.6018C15.8572 17.8408 15.8034 18.171 15.5793 18.3392C15.3547 18.5079 15.0454 18.4495 14.8881 18.211L14.0553 16.9488C13.8967 17.0437 13.7345 17.1339 13.5688 17.2193L14.1691 18.6451C14.2814 18.9118 14.1698 19.225 13.9199 19.3448C13.67 19.4645 13.3763 19.3455 13.2641 19.0788L12.6538 17.6295C11.7437 17.98 10.7581 18.1991 9.73713 18.2738C9.0513 18.324 8.514 18.9078 8.514 19.603ZM23.459 19.6892C23.431 18.2859 23.2817 17.3926 23.1084 16.5404C22.9003 16.492 22.6871 16.467 22.4715 16.467C20.8302 16.467 19.4948 17.8916 19.4948 19.6426C19.4948 19.754 19.5006 19.8651 19.5113 19.9753C21.3163 19.8785 22.7623 19.7542 23.459 19.6892ZM17.4267 11.1744C17.403 11.5334 17.355 11.887 17.2848 12.2329H22.5049C22.4901 11.9062 22.4798 11.555 22.4749 11.1744H17.4267Z"
        />
      </MyCheckIcon>
    </div>
  </div>
</template>

<script>
import dateMixin from '@/mixins/dateMixin'
import SelectItemTypeForm from '@/components/SelectItemTypeForm.vue'
import ProfileInfo from '@/components/ProfileInfo.vue'

export default {
  name: 'ProfileListItem',
  mixins: [dateMixin],
  components: {
    SelectItemTypeForm,
    ProfileInfo
  },
  props: {
    profile: {
      type: Object,
      required: true
    },
    trainingId: {
      required: true
    },
    subscription: {
      type: Object
    }
  },
  data() {
    return {
      equipmentId: null,
      attendingId: null,
      visited: false,
      equipmentsDialogVisible: false,
      profileDialogVisible: false
    }
  },
  computed: {
    disabled() {
      return this.visitsLeft === 0 || this.leftAbonementDays === 0;
    },
    leftAbonementDays() {
      if(this.subscription) {
        let days = this.dateDiff(this.currentDate, this.convertStringToDate(this.subscription.expires_at));
        return days > 0 ? days : 0;
      } else return 0;
    },
    visitsLeft() {
      if(this.subscription) {
        return this.subscription?.max_visits - this.subscription?.visited;
      } else return 0;
    },
    visitClasses() {
      return {
        'one-visit': this.visitsLeft === 1,
        'disabled': this.disabled
      }
    }
  },
  methods: {
    setMark() {
      if(!this.disabled) {
        this.visited =! this.visited;
      }

      if(!this.visited) {
        this.equipmentId = null;
      }
    },
    showEquipmentsForm() {
      if(!this.disabled) {
        this.equipmentsDialogVisible = true;
      }
    },
    closeEquipmentsForm() {
      this.$refs.dialogEquipments.hideBody();
    },
    showProfileInfo() {
      this.profileDialogVisible = true;
    },
    closeProfileInfo() {
      this.$refs.dialogProfile.hideBody();
    },
    saveEquipments(equipment_id) {
      this.equipmentId = equipment_id;
      this.visited = true;
      this.closeEquipmentsForm();
    },
    async fetchAttending() {
      try {
        const response = await this.$axios.get('attendings', { params: { trainingId: this.trainingId, profileId: this.profile.id } });
        if (response.data[0] !== undefined) {
          this.attendingId = response.data[0].id;
          this.equipmentId = response.data[0].equipmentId;
          this.visited = true;
        }
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    saveDataVuex() {
      return { id: this.attendingId, profileId: this.profile.id, equipmentId: this.equipmentId, visited: this.visited };
    }
  },
  created() {
    let saved_training = this.$store.state.saved_trainings.find(saved_training => this.trainingId == saved_training.training.id);
    if(saved_training != undefined) {
      let attending = saved_training.attendings.find(attending => attending.profileId == this.profile.id);
      if(attending != undefined) {
        this.attendingId = attending.id;
        this.equipmentId = attending.equipmentId;
        this.visited = attending.visited;
      }
    } else {
      this.fetchAttending();
    }
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
    
    .list-item-icons {
      display: flex;
      align-items: center;
    }
  }

  .one-visit {
    color: red;
  }
</style>
