<template>
    <form @submit.prevent>
      <div v-for="(item, index) in items" :key="index" class="list-item">
        <span class="title">{{item.title}}</span>
        <MyRadioButton :value="item.id" v-model="selectedValue"/>
      </div>
      <MyButton type="submit" class="btn-save" @click="saveForm">Сохранить</MyButton>
    </form>
</template>

<script>
export default {
  name: 'SelectItemTypeForm',
  props: {
    url: {
      type: String,
      required: true
    },
    itemId: {
      default: null
    }
  },
  data() {
    return {
      items: [],
      selectedValue: this.itemId
    }
  },
  methods: {
    async fetchItems() {
      try {
        const response = await this.$axios.get(this.url);
        this.items = response.data;
      } catch (error) {
        alert("Ошибка! " + error);
      }
    },
    saveForm() {
      this.$emit('saveForm', this.selectedValue);
    }
  },
  mounted() {
    this.fetchItems();
  }
}
</script>

<style scoped lang="scss">
  .list-item {
    align-items: center;
    justify-content: space-between;
  }

  .btn-save {
    width: fill-available;
    margin: 25px 15px 0;
  }
</style>