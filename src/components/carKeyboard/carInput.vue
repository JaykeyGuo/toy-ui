<template>
  <div>
    <input
      @focus="onFocus"
      @touchend="onTouchend"
      @input="onInput"
      @blur="onBlur"
      v-model="carPlateNumber"
    />
    <license-plate-keyboard
      ref="xxx"
      v-model="carPlateNumber"
      :showKeyboard.sync="show">
    </license-plate-keyboard>
  </div>
</template>

<script>
import LicensePlateKeyboard from '@/components/licensePlateKeyboard/licensePlateKeyboard.vue';

export default {
  name: 'CarInput',
  components: {
    LicensePlateKeyboard,
  },
  data() {
    return {
      carPlateNumber: '',
      show: false,
    };
  },
  methods: {
    onBlur(e) {
      console.log(e, 'blur');
    },
    onFocus(e) {
      // e.preventDefault();
      // e.stopPropagation();
      console.log(e, 'focus');
    },
    onInput(e) {
      console.log(e, 'input');
    },
    onTouchend(e) {
      e.preventDefault();
      e.stopPropagation();
      this.show = true;
      console.log(e, 'touch end');
    },
  },
};
</script>

<style>

</style>
