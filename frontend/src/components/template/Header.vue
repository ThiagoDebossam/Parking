<template>
  <div class="header">
      <div class="icon-menu" @click="$emit('toggleMenu')" v-if="$store.state.isMenuVisible">
        <v-icon>menu</v-icon>
      </div>
      <div class="title">
        <router-link tag="span" to="/">Estacionamento</router-link>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style>
    .header {
        height: 50px;
        color: #fff;
        font-size: 1.2rem;
        display: flex;
        align-items: center;
        font-weight: bold;
        font-family: sans-serif;
        background-color: orange;
        box-shadow: 0 3px 5px rgba(0,0,0,0.2);
    }

    .header .icon-menu {
      margin-left: 5px;
      cursor: pointer;
    }
    .header .icon-menu:hover {
        background-color: rgba(0,0,0,0.2);
        border-radius: 8px;
    }

    .header .title {
      cursor: pointer;
      width: 100%;
      display: flex;
      justify-content: center;
    }
</style>