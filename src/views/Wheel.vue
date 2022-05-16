<template>
  <div class="wheel d-flex align-center justify-center">
    <LuckyWheel
    ref="LuckyWheel"
    :width="weight"
    :height="weight"
    :prizes="prizes"
    :blocks="blocks"
    :buttons="buttons"
    :defaultConfig="defaultConfig"
    @start="startCallback"
    @end="endCallback"/>
    <v-btn v-if="exclude" class="reset" fab color="success" @click="reset()">
      <font-awesome-icon class="icon-size" :icon="['fa','rotate']"></font-awesome-icon>
    </v-btn>
  </div>
</template>
<style lang="scss">
  .wheel {
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
      exclude: store.getters.exclude,
      blocks: [{ padding: '13px', background: '#334257' }],
      defaultConfig: {
        stopRange: 0.7,
        speed: 10
      },
      buttons: [
        {
          radius: '30%',
          background: '#f8666b',
          imgs: [{
            src: require('../assets/pointer.png'),
            width: '100%',
            top: '-150%'
          }]
        }
      ]
    }
  },
  computed: {
    weight () {
      let width = 500
      if (window.innerWidth < 500) {
        width = window.innerWidth - 30
      }
      return width + 'px'
    },
    prizes () {
      const arr = []
      const items = store.getters.checkedItem
      if (items.length > 1) {
        for (const key in items) {
          let background = '#CAF0F8'
          if (items.length % 2 === 0) {
            if (key % 2 === 0) { background = '#90E0EF' }
          } else {
            if (key % 2 === 0) { background = '#90E0EF' }
            if (key % 3 === 0) { background = '#00B4D8' }
            if (items.length === 7 && parseInt(key) === 6) {
              background = '#90E0EF'
            }
          }
          arr.push({
            fonts: [{
              text: items[key].item,
              top: '25%',
              fontSize: '24px',
              fontWeight: 600,
              lineClamp: 3
            }],
            background: background
          })
        }
      }
      return arr
    }
  },
  methods: {
    startCallback () {
      if (store.getters.checkedItem.length !== 0) {
        this.$refs.LuckyWheel.play()
        this.buttons[0].imgs[0].src = require('../assets/pointer-click.png')
        setTimeout(() => {
          this.$refs.LuckyWheel.stop(Math.floor(Math.random() * this.prizes.length))
        }, 1000)
      }
    },
    endCallback (prize) {
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
        this.buttons[0].imgs[0].src = require('../assets/pointer.png')
        store.commit('unChecked', prize.fonts[0].text)
        store.commit('record', prize.fonts[0].text)
        if (store.getters.checkedItem.length < 2) {
          router.push('/')
        }
      })
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
