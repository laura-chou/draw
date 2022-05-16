<template>
  <div class="jiugongge d-flex align-center justify-center flex-column">
    <LuckyGrid
      :width='weight'
      :height="height"
      ref="LuckyGrid"
      :rows= rows
      cols= 4
      :blocks="blocks"
      :prizes="prizes"
      :defaultConfig="defaultConfig"
      :defaultStyle="defaultStyle"
      :activeStyle="activeStyle"
      @end="endCallBack"
    />
    <v-btn
      class="ma-3"
      :width='weight'
      x-large
      color="warning"
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
  .jiugongge {
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
  inject: ['reload'],
  data () {
    return {
      loading: false,
      exclude: store.getters.exclude,
      blocks: [
        { borderRadius: '5px', padding: '10px', background: '#004A2F' },
        { borderRadius: '5px', padding: '10px', background: '#F8F1F1' }
      ],
      activeStyle: {
        fontColor: '#000000',
        background: '#F6F078',
        shadow: '0 1px 3px #3C3C3C'
      },
      defaultStyle: {
        borderRadius: '10px',
        fontColor: '#fff',
        fontWeight: 700,
        background: '#084177',
        shadow: '0 1px 3px #000',
        fontSize: '22px'
      },
      defaultConfig: {
        speed: 10
      }
    }
  },
  computed: {
    rows () {
      let row = 1
      if (store.getters.checkedItem.length >= 5) {
        row++
      }
      if (store.getters.checkedItem.length >= 9) {
        row++
      }
      return row
    },
    prizes () {
      const arr = []
      const items = store.getters.checkedItem
      if (items.length > 1) {
        for (const key in items) {
          let top = '40%'
          if (items[key].item.length > 5) top = '35%'
          if (window.innerWidth < 500) {
            top = '35%'
            if (items[key].item.length > 5) top = '30%'
          }
          arr.push({
            index: key,
            x: key % 4,
            y: parseInt(key / 4),
            fonts: [{
              text: items[key].item,
              top: top,
              lineClamp: 2
            }]
          })
        }
      }
      return arr
    },
    weight () {
      let width = 500
      if (window.innerWidth < 500) {
        width = window.innerWidth - 30
      }
      return width + 'px'
    },
    height () {
      let height = 150
      if (store.getters.checkedItem.length >= 5) {
        height += 120
      }
      if (store.getters.checkedItem.length >= 9) {
        height += 120
      }
      if (window.innerWidth < 500) {
        height -= 20
        if (store.getters.checkedItem.length >= 5) {
          height -= 20
        }
        if (store.getters.checkedItem.length >= 9) {
          height -= 30
        }
      }
      return height + 'px'
    }
  },
  methods: {
    startCallBack () {
      if (store.getters.checkedItem.length !== 0) {
        this.loading = true
        this.$refs.LuckyGrid.play()
        setTimeout(() => {
          this.$refs.LuckyGrid.stop(Math.floor(Math.random() * this.prizes.length))
        }, 1000)
      }
    },
    endCallBack (prize) {
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
        switch (store.getters.checkedItem.length) {
          case 4:
          case 8:
            this.reload()
            break
          case 1:
            router.push('/')
            break
          default:
            this.loading = false
            break
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
          this.reload()
        }
      })
    }
  }
})
</script>
