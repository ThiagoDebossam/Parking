<template>
  <div class="car-list">
    <v-card>
        <v-card-title>
        <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Pesquisar"
            single-line
            hide-details
        ></v-text-field>
        <v-btn
            class="btn-car-list ml-4 mt-4"
            @click="$emit('openForm')"
            color="success"
            >
            Adicionar
        </v-btn>
        </v-card-title>
        <v-data-table
        :items-per-page="5"
        :headers="headers"
        :items="carList"
        :search="search"
        no-data-text="Nada por aqui. Que tal adicionarmos algo?"
        >
            <template v-slot:item.actions="{ item }">
                <v-icon
                    small
                    @click="deleteItem(item)"
                >
                    mdi-delete
                </v-icon>
            </template>
        </v-data-table>
    </v-card>
    <ModalCarDelete 
        @cancelForm="dialog = !dialog"
        @deleteCar="deleteCar"
        :car="car"    
        :dialog="dialog"/>
  </div>
</template>
<script>
import moment from 'moment'
import axios from 'axios'
import ModalCarDelete from './ModalCarDelete'
import {baseApiUrl, showError} from '../../../global.js'
export default {
    name: 'CarList',
    components: {
        ModalCarDelete
    },
    props: {
        renderList: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        renderList: {
            handler () {
                this.getCars()
            },
            deep: true
        }
    },
    data () {
      return {
        search: '',
        headers: [
          { text: 'Modelo', value: 'model' },
          { text: 'Placa', value: 'score' },
          { text: 'Data e hora', value: 'dateAndHour' },
          { text: 'Ações', value: 'actions', sortable: false },
        ],
        carList: [],
        car: {},
        user: {},
        dialog: false
      }
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem('parking_user'))
        this.$store.commit('setMenu', true)
        this.getCars()
    },
    methods: {
        deleteItem (item) {
            this.dialog = !this.dialog
            this.car = item
            
        },
        deleteCar () {
            this.$store.commit('setLoading', true)
            axios.delete(`${baseApiUrl}/cars/${this.car.id}`)
            .then(() => {
                this.$toasted.global.defaultSuccess()
                this.$store.commit('setLoading', false)
                this.getCars()
            })
            .catch(msg => {
                showError(msg)
                this.$store.commit('setLoading', false)
            })
            this.dialog = !this.dialog
        },
        getCars() {
            this.$store.commit('setLoading', true)
            axios.get(`${baseApiUrl}/cars/${this.user.id}`)
            .then(ret => {
                this.$store.commit('setLoading', false)
                this.carList = ret.data
                this.carList.forEach(car => {
                    car.dateNow = new Date(car.dateAndHour)
                    car.dateAndHour = moment(car.dateAndHour).format('DD/MM/YYYY hh:mm a')
                })
            })
            .catch(msg => {
                this.$store.commit('setLoading', false)
                showError(msg)
            })
        }
    }
  }
</script>

<style>
</style>