<template>
  <div class="">
    <input type="text" v-model="carPlateNumber" @click="show = true" />

    <license-plate-keyboard
      ref="xxx"
      v-model="carPlateNumber"
      :showKeyboard.sync="show">
    </license-plate-keyboard>
    {{ carPlateNumber }}
    <br>
    <button @click="show = true">open</button>
    <button @click="show = false">close</button>
    <button @click="carPlateNumber = '粤A10086'">test1</button>
    <button @click="carPlateNumber = '粤A20096'">test2</button>
    <button @click="$refs.xxx.reset()">test3</button>
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
      carPlateNumber: '贵A30888',
    };
  },
};
</script>

<style>

</style>
