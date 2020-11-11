<template>
  <div class="toy--car-input">
    <div class="toy--car-input-box" @touchend="onTouchend">
      <span class="car-license-no">{{ carPlateNumber }}</span>
      <span v-show="showCursor" class="toy--number-input-cursor"></span>
      <span v-if="!carPlateNumber.length" class="toy--number-input-placeholder">{{ $attrs.placeholder }}</span>
    </div>

    <car-keyboard
      ref="carKeyboard"
      v-model="carPlateNumber"
      :showDisplay.sync="showDisplay"
      :show.sync="show">
    </car-keyboard>
  </div>
</template>

<script>
import '@/assets/scss/carKeyboard.scss';

import Emitter from '@/mixins/emitter';
import CarKeyboard from './keyboard.vue';

export default {
  name: 'CarInput',
  mixins: [Emitter],
  components: {
    CarKeyboard,
  },
  props: {
    value: {
      type: String,
      default: () => '',
    },
    showDisplay: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      carPlateNumber: this.value,
      show: false,
      showCursor: false,
    };
  },
  watch: {
    value(newValue) {
      this.carPlateNumber = newValue;
      this.$emit('input', this.carPlateNumber);
    },
    carPlateNumber(newValue) {
      this.$emit('input', newValue);
    },
    show(newValue) {
      this.showCursor = newValue;
      this.$emit('input', this.carPlateNumber);
    },
  },
  methods: {
    onTouchend(e) {
      e.preventDefault();
      e.stopPropagation();
      this.show = true;
      this.$nextTick(() => {
        this.$refs.carKeyboard.$el.focus();
      });
    },
  },
};
</script>
