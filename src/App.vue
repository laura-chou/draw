<template>
  <div>
    <v-app-bar dark src="./assets/banner.png">
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>抽獎</v-toolbar-title>
    </v-app-bar>
    <v-navigation-drawer
      src="./assets/navigation.png"
      v-model="drawer"
      absolute
      temporary
      dark
    >
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/wheel">
            <img src="./assets/wheel-of-fortune.png">
            &ensp;
            <v-list-item-title>轉盤</v-list-item-title>
          </v-list-item>

          <v-list-item to="/jiugongge">
            <img src="./assets/squares.png">
            &ensp;
            <v-list-item-title>九宮格</v-list-item-title>
          </v-list-item>
          <v-list-item to="/slot">
            <img src="./assets/jackpot-machine.png">
            &ensp;
            <v-list-item-title>老虎機</v-list-item-title>
          </v-list-item>
          <v-list-item to="/records">
            <img src="./assets/winner.png" width="16px">
            &ensp;
            <v-list-item-title>中獎記錄</v-list-item-title>
          </v-list-item>
          <v-list-item to="/">
            <img src="./assets/settings.png">
            &ensp;
            <v-list-item-title>設定</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
    <v-app>
      <router-view v-if="isRouterActive"/>
    </v-app>
  </div>
</template>
<style lang="scss">
  $height: 56px;
  .v-application--wrap {
    min-height: calc(100vh - #{$height}) !important;
    background-image: url('./assets/background.png');
    background-size: 100% 100%;
  }
</style>
<script>

export default ({
  name: 'App',
  provide () {
    return {
      reload: this.reload
    }
  },
  data: () => ({
    drawer: false,
    group: null,
    isRouterActive: true
  }),
  methods: {
    reload () {
      this.isRouterActive = false
      this.$nextTick(() => {
        this.isRouterActive = true
      })
    }
  }
})
</script>
