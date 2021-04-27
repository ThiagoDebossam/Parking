<template>
    <div class="car-form">
        <v-form ref="form" v-model="valid" lazy-validation>
            <v-card>
                <div class="title-car">
                    <span>Adicionar Carro</span>
                </div>
                <v-container>
                    <v-text-field
                        v-model="car.model"
                        :messages="messageModel"
                        :rules="rules"
                        label="Modelo"
                        required
                    ></v-text-field>
                    <v-text-field
                        :messages="messageScore"
                        v-model="car.score"
                        :rules="rules"
                        v-mask="mask"
                        label="Placa"
                        required
                    ></v-text-field>
                     <v-checkbox
                        v-model="mercosul"
                        label="Placa mercosul"
                        @click="chooseMaks"
                        required
                    ></v-checkbox>
                    <v-btn
                        large
                        @click="save"
                        :disabled="!valid"
                        color="success"
                        class="mr-4 mt-2"
                        >
                        Salvar
                    </v-btn>
                    <v-btn
                        large
                        @click="$emit('cancelForm')"
                        color="error"
                        class="mr-4 mt-2"
                    >Cancelar</v-btn>
                </v-container>
            </v-card>
        </v-form>
    </div>
</template>

<script>
import { baseApiUrl, showError } from '../../../global'
import axios from 'axios'
export default {
name: 'CarForm',
data: () => ({
    valid: true,
    messageScore: '',
    messageModel: '',
    car: {},
    rules: [v => !!v || 'Campo obrigatório'],
    mask: 'NNNNNNN',
    mercosul: true,
    user: {}
}),
mounted() {
    this.user = JSON.parse(localStorage.getItem('parking_user'))
},
methods: {
        save () {
            this.$refs.form.validate()
            if (this.car.score.length < 7) {
                this.messageScore = 'A placa deve conter no minímo 7 caracteres'
                return false
            } else {
                this.messageScore = ''
            }

            if (this.car.model.length < 3) {
                this.messageModel = 'O modelo deve conter no minímo 3 caracteres'
                return false
            } else {
                this.messageModel = ''
            }
            this.car.dateAndHour = new Date()
            this.car.model = this.car.model.toUpperCase()
            this.car.score = this.car.score.toUpperCase()
            this.car.userId = this.user.id
            this.$store.commit('setLoading', true)
            axios.post(`${baseApiUrl}/cars`, this.car)
                .then(() => {
                    this.$toasted.global.defaultSuccess()
                    this.car = {}
                    this.messageModel = ''
                    this.messageScore = ''
                    this.$emit('cancelForm')
                    this.$store.commit('setLoading', false)
                })
                .catch(msg => {
                    showError(msg)
                    this.messageModel = ''
                    this.messageScore = ''
                    this.$store.commit('setLoading', false)
                })
            
        },
        chooseMaks () {
            this.mask = this.mercosul ? 'NNNNNNN' : 'AAA-####'
        }
    }
}
</script>

<style>
    .title-car{
        color: #fff;
        display: flex;
        font-size: 1.2rem;
        padding: 10px;
        justify-content: center;
        align-items: center;
        background-color: orange;
    }
</style>