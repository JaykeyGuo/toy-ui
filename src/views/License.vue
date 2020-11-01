<template>
  <div class="">
    <license-plate-keyboard
      v-model="carPlateNumber"
      :showKeyboard.sync="show">
    </license-plate-keyboard>
    {{ carPlateNumber }}
    <button @click="show = true">open</button>
    <button @click="show = false">close</button>
  </div>
</template>

<script>
import LicensePlateKeyboard from '../components/licensePlateKeyboard/licensePlateKeyboard.vue';

export default {
  name: 'License',
  components: { LicensePlateKeyboard },
  data() {
    return {
      show: false,
      carPlateNumber: '',
    };
  },
};
</script>

<style>

</style>
