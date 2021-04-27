<template>
  <v-list
    nav
    dense
    >
    <v-list-item-group
        active-class="deep-purple--text text--accent-4"
    >
        <v-list-item>
        <v-list-item-title>
            <div>
                <router-link tag="div" to="/dashboard">
                <v-icon>home</v-icon>
                Início
                </router-link>
            </div>
        </v-list-item-title>
        <v-icon class="menu" @click="$emit('toggleMenu')">
            menu
        </v-icon>
        </v-list-item>
        <hr>
        <v-list-item>
        <v-list-item-title>
            <router-link tag="div" to="/history">
                <v-icon>history</v-icon>
                Histórico
            </router-link>
        </v-list-item-title>
        </v-list-item>
        <v-list-item>
        <v-list-item-title @click="logout">
                <v-icon>logout</v-icon>
                Sair
        </v-list-item-title>
        </v-list-item>
    </v-list-item-group>
    </v-list>
</template>

<script>
import axios from 'axios'
export default {
    name: 'Menu',
    methods: {
        logout () {
            this.$store.commit('setMenu', false)
            axios.defaults.headers.common['Authorization'] = ''
            localStorage.removeItem('parking_user')
            this.$emit('toggleMenu')
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style>
    .menu{
        float: right;
    }
</style>