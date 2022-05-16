<template>
  <div class="slot d-flex align-center justify-center flex-column">
    <SlotMachine
        ref="SlotMachine"
        :width="weight"
        height="240px"
        :prizes="prizes"
        :blocks="blocks"
        :slots="slots"
        :defaultStyle="defaultStyle"
        :defaultConfig="defaultConfig"
        @end="end"/>
      <v-btn
        class="ma-3"
        :width='weight'
        x-large
        color="error"
        :loading="loading"
        :disabled="loading"
        @click="startCallBack"
      >
        START
      </v-btn>
      <v-btn v-if="exclude" class="reset" fab color="success" @click="reset()">
        <font-awesome-icon class="icon-size" :icon="['fa','rotate']"></font-awesome-icon>
      </v-btn>
  </div>
</template>
<style lang="scss">
  .slot {
    height: 100%;
    position: relative;
    .reset {
      position: absolute;
      right: 3%;
      bottom: 3%;
      .icon-size {
        font-size: 24px;
      }
    }
  }
</style>
<script>
import router from '../router/index.js'
import store from '../store/index.js'
export default ({
  data () {
    return {
      loading: false,
      exclude: store.getters.exclude,
      blocks: [
        { borderRadius: '10px', padding: '10px', background: '#001E6C' },
        { borderRadius: '30px', padding: '10px', background: '#F7F7F7' }
      ],
      defaultStyle: {
        borderRadius: '30px',
        fontColor: '#fff',
        fontWeight: 700,
        background: '#035397',
        fontSize: '22px'
      },
      defaultConfig: {
        rowSpacing: '10px',
        colSpacing: '30px'
      }
    }
  },
  computed: {
    slots () {
      let order1 = []
      let order2 = []
      const items = store.getters.checkedItem
      if (items.length > 1) {
        for (const key in items) {
          order1.push(parseInt(key))
          order2.push(parseInt(key))
        }
      }
      order1 = this.shuffle(order1)
      order2 = this.shuffle(order2)
      const arr = [
        { order: order1, direction: 1 },
        { order: order2, direction: -1 }
      ]
      return arr
    },
    prizes () {
      const arr = []
      const items = store.getters.checkedItem
      if (items.length > 1) {
        for (const key in items) {
          arr.push({
            index: key,
            fonts: [{
              text: items[key].item,
              top: '40%',
              lineClamp: 2
            }]
          })
        }
      }
      return arr
    },
    weight () {
      let width = 400
      if (window.innerWidth < 500) {
        width = window.innerWidth - 30
      }
      return width + 'px'
    },
    height () {
      let height = 150
      if (store.getters.checkedItem.length >= 5) {
        height += 150
      }
      if (store.getters.checkedItem.length >= 9) {
        height += 150
      }
      if (window.innerWidth < 500) {
        height -= 30
      }
      return height + 'px'
    }
  },
  methods: {
    startCallBack () {
      if (store.getters.checkedItem.length !== 0) {
        this.loading = true
        this.$refs.SlotMachine.play()
        setTimeout(() => {
          const index = Math.floor(Math.random() * this.prizes.length)
          this.$refs.SlotMachine.stop([index, index])
        }, 1000)
      }
    },
    end (prize) {
      const audio = new Audio()
      audio.src = './alarms/bonus.mp3'
      audio.play()
      const html = `<div class='alert-border'>
                      <img src='${require('../assets/winner.png')}' />
                      <h1>${prize.fonts[0].text}</h1>
                    </div>`
      this.$swal.fire({
        html: html
      }).then((result) => {
        store.commit('unChecked', prize.fonts[0].text)
        store.commit('record', prize.fonts[0].text)
        this.loading = false
        if (store.getters.checkedItem.length < 2) {
          router.push('/')
        }
      })
    },
    shuffle (array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]
      }
      return array
    },
    reset () {
      this.$swal.fire({
        icon: 'warning',
        title: '確定要重置嗎？',
        showCancelButton: true
      }).then((result) => {
        if (result.isConfirmed) {
          store.commit('checkAll', true)
        }
      })
    }
  }
})
</script>
