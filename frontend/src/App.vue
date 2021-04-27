<template>
  <div id="app">
  <v-app>
    <div>
      <div v-if="isMenuVisible">
        <v-navigation-drawer :hide-overlay="true"  :disable-resize-watcher="true" v-model="menu" app>
          <Menu @toggleMenu="menu = !menu"/>
        </v-navigation-drawer>
      </div>
    </div>
    <Header @toggleMenu="menu = !menu"/>
    <v-main>
      <v-container fluid>
        <Loading v-if="loading"/>
        <router-view>
          <Content/>
        </router-view>
      </v-container>
    </v-main>

    <v-footer  id="app-footer" app>
      <Footer/>
    </v-footer>
  </v-app>
  </div>
</template>

<script>
import Header from './components/template/Header'
import Menu from './components/template/Menu'
import Footer from './components/template/Footer'
import Content from './components/template/Content'
import Loading from './components/template/Loading'
export default {
  name: 'App',
  components: {
    Header,
    Menu,
    Footer,
    Content,
    Loading
  },
  watch: {
    '$store.getters.getLoading': {
      handler () {
        this.loading = this.$store.getters.getLoading
      }
    }
  },
  data() {
    return {
      menu: false,
      isMenuVisible: this.$store.state.isMenuVisible,
      loading: this.$store.getters.getLoading
    }
  }
}
</script>

<style>
  #app-footer {
    background-color: rgba(0, 0, 0, 0.7);
  }

</style>
