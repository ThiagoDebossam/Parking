<template>
  <div class="loading">
    <v-dialog :persistent="true" :value="true">
      <v-progress-circular
      id="loader"
      :size="100"
      color="primary"
      indeterminate
    ></v-progress-circular>
    </v-dialog>
  </div>
</template>

<script>
export default {

}
</script>

<style>
    .loading {
        background-color: rosybrown;
    }
    #loader {
        position: absolute;
        top: 186px;
        left: 45%;
        z-index: 10;
    }
</style>
    