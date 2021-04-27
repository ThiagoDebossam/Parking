<template>
  <div class="history-list">
    <v-container>
        <h2 v-if="cars.length === 0" class="title-no-trasictions">Nenhuma transição finalizada :(</h2>
        <ul v-else v-for="car in cars" :key="car.id" class="history-content">
            <li>Modelo: {{car.model}} | Placa: {{car.score}} | Data e hora: {{car.dateAndHour}} | Finalizado em: {{car.deletedAt}}</li>
        </ul>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '../../../global'
import moment from 'moment'
export default {
  name: 'HistoryList',
  data() {
    return {
      cars: [],
      user: {}
    }
  },
  mounted () {
    this.user = JSON.parse(localStorage.getItem('parking_user'))
    this.getHistory()
  },
  methods: {
    getHistory() {
        this.$store.commit('setLoading', true)
        axios.get(`${baseApiUrl}/cars/carsDeleted/${this.user.id}`)
            .then(ret => {
                this.cars = ret.data
                this.cars.forEach(car => {
                    car.dateAndHour = moment(car.dateAndHour).format('DD/MM/YYYY hh:mm a')
                    car.deletedAt = moment(car.deletedAt).format('DD/MM/YYYY hh:mm a')
                })
                this.cars = this.cars.reverse()
                this.$store.commit('setLoading', false)
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
  .history-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .history-content li{
    background-color: orange;
    list-style-type: none;
    padding: 15px;
    color: #fff;
    margin-top: 10px;
  }

  .title-no-trasictions {
    font-weight: 200;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 10%;
  }
</style>