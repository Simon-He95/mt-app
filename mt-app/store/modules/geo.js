const state = () => ({position:{}})

const mutations = {
  setPosition(state, val) {
    state.position = val
  },
  changeCity: (state, city) => {
    state.position.city = city
  }
}

const actions = {
  setPosition: ({commit}, position) => {
    commit('setPosition', position)
  },
  changeCity: ({commit}, city) => {
    commit('changeCity', city)
  }
}

export default {namespaced: true, state, mutations, actions}
