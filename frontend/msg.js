import Vue from 'vue'
import Toasted from 'vue-toasted'
Vue.use(Toasted, {
    iconPack: 'fontawesome',
    duration: 3000
})

Vue.toasted.register(
    'defaultSuccess',
    'Operação realizada com sucesso!',
    {type: 'success', icon: 'check'}
)
Vue.toasted.register(
    'defaultError',
    payload => !payload.msg ? 'Erro na operação!' : payload.msg,
    {type: 'error', icon: 'times'}
)