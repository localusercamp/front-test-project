import { createStore } from 'vuex'

export default createStore({
  state: {
    saved_trainings: [],
  },
  getters: {
  },
  mutations: {
    addTraining(state, training) {
      let index = state.saved_trainings.findIndex(saved_training => training.training.id == saved_training.training.id);
      if(index > -1) {
        state.saved_trainings[index] = training;
      } else {
        state.saved_trainings.push(training);   
      }
    }
  },
  actions: {
  },
  modules: {
  }
})
