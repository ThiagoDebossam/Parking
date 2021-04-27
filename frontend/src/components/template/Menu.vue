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
            <div class="menu">
                <router-link tag="div" to="/dashboard">
                <v-icon>home</v-icon>
                Início
                </router-link>
                <v-icon @click="$emit('toggleMenu')">
                    menu
                </v-icon>
            </div>
        </v-list-item-title>
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
export default {
    name: 'Menu',
    methods: {
        logout () {
            this.$store.commit('setMenu', false)
            this.$emit('toggleMenu')
            this.$router.push({path: '/'})
        }
    }
}
</script>

<style>
    .menu{
        display: flex;
        justify-content: space-between;
    }
</style>