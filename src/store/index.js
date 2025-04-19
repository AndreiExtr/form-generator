import { createStore } from 'vuex'

export default createStore({
  state: {
    formData: {}
  },
  mutations: {
    setFormData (state, payload) {
      state.formData = payload
    }
  },
  actions: {
    saveForm ({ commit }, data) {
      commit('setFormData', data)
    }
  },
  getters: {
    getFormData: (state) => state.formData
  }
})
