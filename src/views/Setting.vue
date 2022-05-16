<template>
    <div class="setting">
      <v-container id="input-usage" fluid>
        <v-row>
          <v-col class="pb-0" cols="7" sm="9">
            <v-text-field
              v-model="item"
              label="請輸入項目，Enter 新增"
              outlined
              maxlength="10"
              hide-details
              v-on:keyup.enter="addItem"></v-text-field>
          </v-col>
          <v-col class="pb-0 d-flex justify-center align-center" cols="5" sm="3">
            <v-switch
              class="ma-0 font-weight-bold"
              v-model="switch1"
              color="orange darken-3"
              label="排除中獎"
              inset
              hide-details
              @click="exclude()"
            ></v-switch>
          </v-col>
          <v-col class="pb-0" cols="12" v-if="verify()">
            <v-alert
              class="ma-0"
              elevation="1"
              dense
              type="error"
            >
              {{ validate }}
            </v-alert>
          </v-col>
          <v-col cols="12">
            <v-simple-table>
              <template v-slot:default>
                <thead>
                  <tr>
                    <th>
                      <div class="d-flex justify-center align-center">
                        <v-checkbox
                          v-model="checkedAll"
                          class="ma-0 pa-0"
                          color="indigo"
                          hide-details
                        ></v-checkbox>
                        勾選
                      </div>
                    </th>
                    <th class="text-center">名稱</th>
                    <th class="text-center">編輯</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(item, index) in items"
                    :key="item.item"
                  >
                    <td>
                      <div class="d-flex justify-center align-center" v-if="!item.edit">
                        <v-checkbox
                          class="ma-0 pa-0"
                          hide-details
                          v-model=item.checked
                          @click="checkItem(index, item.checked)">
                        </v-checkbox>
                      </div>
                    </td>
                    <td class="text-center">
                      <h3 v-if="!item.edit">{{ item.item }}</h3>
                      <v-text-field
                        v-else
                        :rules="itemRules"
                        counter
                        v-model="item.editItem"
                        maxlength="10"
                      ></v-text-field>
                    </td>
                    <td class="text-center">
                      <div v-if="!item.edit">
                        <v-btn class="btn" color="success" icon @click="editItem(index)">
                          <font-awesome-icon class="icon-size" :icon="['fa','pen-to-square']"></font-awesome-icon>
                        </v-btn>
                        &ensp;
                        <v-btn class="btn" color="error" icon @click="deleteItem(index)">
                          <font-awesome-icon class="icon-size" :icon="['fa','trash-alt']"></font-awesome-icon>
                        </v-btn>
                      </div>
                      <div v-else>
                        <v-btn class="btn" color="success" icon @click="updateItem(index)">
                          <font-awesome-icon class="icon-size" :icon="['fa','save']"></font-awesome-icon>
                        </v-btn>
                        &ensp;
                        <v-btn class="btn" color="error" icon @click="cancellItem(index)">
                          <font-awesome-icon class="icon-size" :icon="['fa','undo']"></font-awesome-icon>
                        </v-btn>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-col>
        </v-row>
      </v-container>
    </div>
</template>
<style lang="scss">
  .setting {
    height: 90%;
    table tr{
      th {
        font-size: 20px !important;
        background: #FFFFB9;
        color: #5B5B5B !important;
        &:nth-child(1) {
          width: 30%;
        }
        &:nth-child(2) {
          width: 35%;
        }
        &:nth-child(3) {
          width: 35%;
        }
      }
    }
    .v-input--switch .v-label {
      color: #EA7500
    }
  }
  .btn {
    font-size: 18px !important;
  }
  .v-messages {
    margin: 5px 0;
    font-size: 16px !important;
    text-align: center !important;
  }
</style>
<script>
import store from '../store/index.js'
export default ({
  data () {
    return {
      item: '',
      items: store.getters.items,
      itemRules: [
        v => !!v || '名稱必填'
      ],
      switch1: store.getters.exclude,
      validate: '至少勾選 2 筆項目'
    }
  },
  computed: {
    checkedAll: {
      get () {
        let count = 0
        let ischeck = true
        this.items.forEach(element => {
          if (element.checked) count++
        })
        if (count !== this.items.length) {
          ischeck = false
        }
        return ischeck
      },
      set (check) {
        store.commit('checkAll', check)
      }
    }
  },
  methods: {
    addItem () {
      if (this.item !== '') {
        let repeat = false
        this.items.forEach(element => {
          if (element.item === this.item) {
            repeat = true
            return false
          }
        })
        if (!repeat) {
          if (this.items.length === 12) {
            this.$swal.fire({
              icon: 'error',
              title: '最多只能新增 12 項'
            }).then((result) => {
              if (result.isConfirmed) {
                this.item = ''
              }
            })
          } else {
            const data = { checked: true, item: this.item, edit: false, editItem: this.item }
            store.commit('addData', data)
            this.item = ''
          }
        } else {
          this.$swal.fire({
            icon: 'error',
            title: '已有重複名稱'
          }).then((result) => {
            if (result.isConfirmed) {
              this.item = ''
            }
          })
        }
      }
    },
    editItem (index) {
      store.commit('editData', index)
    },
    updateItem (index) {
      if (this.items[index].editItem !== '') {
        const editItem = this.items[index].editItem
        store.commit('updateData', { index, editItem })
      }
    },
    deleteItem (index) {
      this.$swal.fire({
        icon: 'warning',
        title: '確定要刪除嗎？',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          store.commit('deleteData', index)
        }
      })
    },
    cancellItem (index) {
      store.commit('cancellData', index)
    },
    checkItem (index, check) {
      store.commit('checkBox', { check, index })
    },
    exclude () {
      const ele = document.querySelector('.v-input--switch .v-label')
      if (this.switch1) {
        ele.style.color = '#EA7500'
      } else {
        ele.style.color = 'rgba(0, 0, 0, 0.6)'
      }
      store.commit('exclude', this.switch1)
    },
    verify () {
      let bool = true
      if (store.getters.items.length > 1) {
        if (store.getters.checkedItem.length < 2) {
          this.validate = '至少勾選 2 筆項目'
        } else {
          bool = false
        }
      } else {
        this.validate = '至少新增 2 筆項目'
      }
      return bool
    }
  }
})
</script>
