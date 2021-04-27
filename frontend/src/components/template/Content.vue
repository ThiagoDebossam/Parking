<template>
  <div class="content">
      <v-container>
        <CarList 
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
            renderList: true
        }
    },
    methods: {
        cancelForm () {
            this.renderList = !this.renderList
            this.dialog = !this.dialog
        }
    }
}
</script>

<style>
</style>