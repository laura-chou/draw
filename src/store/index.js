import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersist from 'vuex-persist'

Vue.use(Vuex)
const vuexPersist = new VuexPersist({
  key: 'vuex-persist',
  storage: window.sessionStorage
})
export default new Vuex.Store({
  state: {
    // 項目清單
    items: [],
    // 是否排除中獎者
    exclude: true,
    // 中獎紀錄
    records: []
  },
  getters: {
    items (state) {
      return state.items
    },
    checkedItem (state) {
      const newItems = []
      state.items.forEach(element => {
        if (element.checked) {
          newItems.push(element)
        }
      })
      return newItems
    },
    exclude (state) {
      return state.exclude
    },
    records (state) {
      return state.records
    }
  },
  mutations: {
    addData (state, data) {
      state.items.push(data)
    },
    editData (state, index) {
      state.items[index].edit = true
    },
    updateData (state, data) {
      state.items[data.index].edit = false
      state.items[data.index].item = data.editItem
      state.items[data.index].editItem = data.editItem
    },
    deleteData (state, index) {
      state.items.splice(index, 1)
    },
    cancellData (state, index) {
      state.items[index].edit = false
      state.items[index].editItem = state.items[index].item
    },
    checkBox (state, data) {
      state.items[data.index].checked = data.check
    },
    checkAll (state, check) {
      state.items.forEach(element => {
        element.checked = check
      })
    },
    unChecked (state, text) {
      if (state.exclude) {
        for (const key in state.items) {
          if (state.items[key].item === text) {
            state.items[key].checked = false
          }
        }
      }
    },
    exclude (state, data) {
      state.exclude = data
    },
    record (state, item) {
      const number = state.records.length + 1
      state.records.push({
        number: number,
        item: item
      })
    },
    clearRecord (state) {
      state.records.length = 0
    }
  },
  actions: {
  },
  modules: {
  },
  plugins: [vuexPersist.plugin]
})
