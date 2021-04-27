<template>
  <div class="auth">
    <v-card class="card-auth">
        <v-form  ref="form" v-model="valid" lazy-validation>
            <div class="auth-car-title">
                <v-icon class="auth-car">directions_car</v-icon>
            </div>
            <hr class="auth-car-divider">
            <v-text-field
                v-if="showSignup"
                v-model="user.name"
                :rules="nameRules"
                label="Nome"
                required
            ></v-text-field>
            <v-text-field
                type="email"
                v-model="user.email"
                :rules="emailRules"
                label="E-mail"
                required
            ></v-text-field>
            <v-text-field
                type="password"
                v-model="user.password"
                :rules="nameRules"
                label="Senha"
                required
            ></v-text-field>
            <v-text-field
                v-if="showSignup"
                type="password"
                v-model="user.confirmPassword"
                :rules="nameRules"
                label="Confirme sua senha"
                required
            ></v-text-field>
            <v-btn
                block
                elevation="2"
                :disabled="!valid"
                color="success"
                class="mr-4"
                @click="save"
                >
                {{showSignup ? 'Cadatrar' : 'Login'}} 
            </v-btn>
            <div class="mt-2">
                <a href @click.prevent="showSignup = !showSignup">
                    <span v-if="showSignup">Já tem cadastro? Acesse o Login</span>
                    <span v-else >Não tem cadastro? Registre-se aqui!</span>
                </a>
            </div>
        </v-form>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios'
import {baseApiUrl, showError} from '../../../global.js'
export default {
    name: 'Auth',
    mounted() {
        this.$store.commit('setMenu', false)
        this.$store.commit('setLoading', false)
    },
    data: () => ({
        showSignup: false,
        valid: true,
        user: {},
        nameRules: [
            v => !!v || 'Campo obrigatório'
        ],
        email: '',
        emailRules: [
            v => !!v || 'E-mail obrigatório',
            v => /.+@.+/.test(v) || 'E-mail inválido',
        ],
    }),
    methods: {
        save () {
            let method = this.showSignup ? 'signup' : 'signin'
            axios.post(`${baseApiUrl}/${method}`, this.user)
                .then(ret => {
                    // if (ret.data.token) require('axios').defaults.headers.common['Authorization'] = 'bearer ' + ret.data.token
                    localStorage.setItem('parking_user', JSON.stringify(ret.data))
                    if (method === 'signin') {
                        this.$router.push({path: '/dashboard'})
                    } else {
                        this.showSignup = false
                    }
                    this.user = {}
                })
                .catch(err => showError(err))
        }
    }
}
</script>

<style>
    .auth {
        margin: 8% auto;
        display: flex;
        width: 80%;
        justify-content: center;
        align-items: center;
    }

    .auth-car-divider {
        border: 0;
        width: 100%;
        height: 1px;
        background-image: linear-gradient(to right, rgba(120, 120, 120, 0),rgba(120, 120, 120, 0.75), rgba(120, 120, 120, 0));
    }

    .card-auth {
        padding: 20px;
    }

    .auth-car-title {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .auth-car {
        font-size: 4rem !important;
    }
</style>