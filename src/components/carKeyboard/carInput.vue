<template>
  <div class="car-input">
    <div class="car-input-box" @touchend="onTouchend">
      <span class="car-license-no">{{ carPlateNumber }}</span>
      <span v-show="showCursor" class="number-input-cursor"></span>
      <span v-if="!carPlateNumber.length" class="number-input-placeholder">{{ $attrs.placeholder }}</span>
    </div>

    <car-keyboard
      v-model="carPlateNumber"
      :showTemplate="showTemplate"
      :showKeyboard.sync="show">
    </car-keyboard>
  </div>
</template>

<script>
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
    showTemplate: {
      type: Boolean,
      default: () => true,
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
  mounted() {
    console.log(this.$attrs);
  },
  methods: {
    onTouchend(e) {
      e.preventDefault();
      e.stopPropagation();
      this.show = true;
    },
  },
};
</script>

<style lang="scss">
.car-input {
  width: 100vw;
  position: relative;
}
.car-input-box {
  border: 1px solid black;
  // min-width: 30vw;
  height: 20px;
  padding: 4px;
  display: flex;
  border-radius: 4px;
  align-items: center;
}
.number-input-cursor {
  pointer-events: none;
  width: 1px;
  height: 100%;
  animation: numeric-input-cursor 1s infinite;
  background-color: black;
}
@keyframes numeric-input-cursor {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.number-input-placeholder {
  color: #aaa;
}
</style>
