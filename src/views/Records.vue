<template>
  <div class="winner">
    <v-container id="input-usage" fluid>
      <v-row>
        <v-col cols="12">
          <v-simple-table>
            <template v-slot:default>
              <thead>
                <tr>
                  <th class="text-center">次數</th>
                  <th class="text-center">名稱</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="record in records"
                  :key="record.item"
                >
                  <td class="text-center">
                    <h3>第 {{ record.number }} 次</h3>
                  </td>
                  <td class="text-center">
                    <h3>{{ record.item }}</h3>
                  </td>
                </tr>
                <tr v-if="records.length === 0">
                  <td colspan="2">
                    <h2 class="text-center">未有紀錄</h2>
                  </td>
                </tr>
              </tbody>
            </template>
          </v-simple-table>
        </v-col>
      </v-row>
    </v-container>
    <v-btn v-if="records.length > 0" class="clear" dark fab color="success" @click="clear()">
      <font-awesome-icon class="icon-size" :icon="['fa','eraser']"></font-awesome-icon>
    </v-btn>
  </div>
</template>
<style lang="scss">
  .winner {
    height: 100%;
    position: relative;
    .clear {
      position: absolute;
      right: 3%;
      bottom: 3%;
      .icon-size {
        font-size: 24px;
      }
    }
    table tr{
      th {
        font-size: 20px !important;
        background: #FFFFB9;
        color: #5B5B5B !important;
        &:nth-child(1) {
          width: 50%;
        }
        &:nth-child(2) {
          width: 50%;
        }
      }
      td {
        color: #000
      }
    }
  }
</style>
<script>
import store from '../store/index.js'
export default ({
  data () {
    return {
      records: store.getters.records
    }
  },
  methods: {
    clear () {
      this.$swal.fire({
        icon: 'warning',
        title: '確定要清除紀錄嗎？',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          store.commit('clearRecord')
          this.records = []
        }
      })
    }
  }
})
</script>
