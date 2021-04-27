<template>
  <v-dialog :persistent="true" v-model="dialog">
    <div class="title-modal-delete">
        <h1>Finalizar transição</h1>
    </div>
    <v-card class="modal-delete">
        <v-container>
            <v-card>
                <v-card-title id="title-info-modal-delete">
                    Dados: 
                </v-card-title>
                <div class="info-car-modal-delete">
                    <div>
                        Modelo: <span>{{car.model}}</span>
                    </div>
                    <div>
                        Placa: <span>{{car.score}}</span>
                    </div>
                    <div>
                        Data e hora: <span>{{car.dateAndHour}}</span>
                    </div>
                    <div>
                        Tempo de uso: <span>{{usedTime}}</span>
                    </div>
                    <div>
                        Finalizar em : <span>{{date}}</span>
                    </div>
                </div>
            </v-card>
            <v-btn
                id="btn-modal-delete"
                large
                @click="$emit('deleteCar')"
                color="red"
                class="mr-4 mt-2"
            >Finalizar</v-btn>
            <v-btn
                id="btn-modal-delete"
                large
                @click="$emit('cancelForm')"
                color="orange"
                class="mr-4 mt-2"
            >Cancelar</v-btn>
        </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import moment from 'moment'
export default {
    name: 'ModalCarDelete',
    props: {
        dialog: {
            type: Boolean,
            default: null
        },
        car: {
            type: Object,
            default: () => {}
        }
    },
    computed: {
        usedTime () {
            moment.locale()
            const initialTime = moment((this.car.dateNow))
            const endTime = moment((new Date()))
            let time = moment(endTime,"HH:mm").diff(moment(initialTime,"HH:mm"))
            let duration = moment.duration(time)
            time = Math.floor(duration.asHours()) + "h" + moment.utc(time).format(" mm") +"m"
            return time
        }
    },
    data() {
        return {
            date: this.dateRealTime()
        }
    },
    methods : {
        dateRealTime () {
            setInterval(() => {
                this.date = moment(new Date()).format('hh:mm:ss')
            }, 1000)
        }
    }

}
</script>

<style>
    .modal-delete {
        padding: 20px;
    }

    .title-modal-delete {
        display: flex;
        justify-content: center;
        align-items: center;
        font-weight: 200;
        width: 100%;
        background-color: orange;
    }
    .title-modal-delete h1 {
        font-size: 1.8rem;
        font-weight: 200;
        color: #fff;
    }

    #btn-modal-delete {
        color: #fff;
    }

    .info-car-modal-delete {
        padding: 5px 25px 10px 25px;
        font-weight: 300;
    }

    #title-info-modal-delete {
        font-weight: 200;
    }
</style>