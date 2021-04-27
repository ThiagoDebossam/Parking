<template>
  <div class="content">
      <v-container>
        <CarList
            v-if="permission"
            @openForm="dialog = !dialog"
            :renderList="renderList"
            />
        <v-dialog class="dialog" v-model="dialog">
            <CarForm 
            @cancelForm="cancelForm"
            />
        </v-dialog>
      </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import { baseApiUrl } from '../../../global'
import CarList from '../cars/CarList'
import CarForm from '../cars/CarForm'
export default {
    name: 'Content',
    components: {
        CarList,
        CarForm
    },
    data() {
        return {
            dialog: false,
            renderList: false,
            permission: false
        }
    },
    mounted() {
        this.validateToken()
    },
    methods: {
        cancelForm () {
            this.renderList = !this.renderList
            this.dialog = !this.dialog
        },
        validateToken () {
            this.user = JSON.parse(localStorage.getItem('parking_user'))
            if (!this.user) {
                this.$router.push({path: '/'})
            } else {
                axios.post(`${baseApiUrl}/validateToken`, this.user)
                .then(() => {
                    axios.defaults.headers.common['Authorization'] = 'bearer ' + this.user.token
                    this.permission = true
                })
            }
        }
    }
}
</script>

<style>
</style>