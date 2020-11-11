<template>
  <div class="toy--keyboard-box" v-if="show" tabindex="1" @blur="onBlur">
    <div class="toy--car-template" v-show="showDisplay">
      <template v-for="(item, index) in template" >
        <span class="toy--car-template-item flex-center" :class="{ 'energy-item': index === 7 }" :key="item.id">
          {{ item.value }}
        </span>
      </template>
      <span @click="changeToEnergy" class="toy--energy-button">
        <!-- <img
          class="toy--energy-button-bg"
          :class="{'toy--energy-button-enable': isEnergyCar}"
          :src="energyBtnImg"
          alt="新能源车牌"
        /> -->
        <span
          class="toy--energy-button-bg"
          :class="{'toy--energy-button-enable': isEnergyCar}">
          新能源
        </span>
        <!-- <img
          v-show="currentValue.length > 0"
          class="toy--lock-img"
          :src="require('@/assets/image/toy--lock-img.svg')"
          alt="锁定"
        />
        <img
          v-show="currentValue.length === 0"
          class="toy--unlock-img"
          :src="require('@/assets/image/untoy--lock-img.svg')"
          alt="解锁"> -->
      </span>
    </div>
    <div class="toy--keyboard-main">
      <!-- Provines Keyboard -->
      <div class="toy--provinces-keyboard" v-show="showProvinesKeyboard">
        <template v-for="(provinceRow, index) in provincesList" >
          <div class="toy--provinces-keyboard-row" :key="index">
            <template  v-for="(province) in provinceRow">
              <span
                class="toy--provinces-key toy--keyboard-key flex-center"
                :key="province.code"
                @click="onSelect(province.value)">
                {{ province.value }}
              </span>
            </template>
          </div>
        </template>
      </div>
      <!-- Normal Keyboard -->
      <div class="toy--normal-keyboard" v-show="!showProvinesKeyboard">
        <!-- Number Keyboard -->
        <div class="toy--number-keyboard-row">
          <template v-for="numberKey in numberKeyboard" >
            <span
              class="toy--number-key toy--keyboard-key flex-center"
              :class="{'toy--keyboard-key-disable': !showNumberKeyboard || currentValue.length === displayLength}"
              :key="numberKey.code"
              @click="showNumberKeyboard && onSelect(numberKey.value)">
              {{ numberKey.value }}
            </span>
          </template>
        </div>
        <!-- English Keyboard -->
        <template v-for="(englishKeyRow, index) in englishKeyboard" >
          <div class="toy--english-keyboard-row" :key="index">
            <template  v-for="(englishKey) in englishKeyRow">
              <span
                class="toy--english-key toy--keyboard-key flex-center"
                :class="{'toy--keyboard-key-disable': currentValue.length === displayLength
                                        || englishKey.value === 'I'
                                        || (currentValue.length < 2 && englishKey.value === 'O')}"
                :key="englishKey.code"
                @click="onSelect(englishKey.value)">
                {{ englishKey.value }}
              </span>
            </template>
          </div>
        </template>
      </div>
      <!-- Fixed Keyboard -->
      <div class="toy--fixed-keyboard-row">
        <!-- Special Keyboard -->
        <template v-for="specialKey in specKeyboard" >
          <span
            :key="specialKey.code"
            v-show="currentValue.length >= displayLength - 1 && !isEnergyCar"
            class="toy--english-key toy--keyboard-key flex-center"
            :class="{'toy--keyboard-key-disable': currentValue.length === displayLength}"
            @click="onSelect(specialKey.value)">
            {{ specialKey.value }}
          </span>
        </template>
        <span class="toy--delete-key flex-center"
          @click="deleteInput()">
          删除
        </span>
        <span class="toy--confirm-key flex-center"
          @click="emitInput()">
          确定
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/scss/carKeyboard.scss';

import {
  provinces, numbers, englishKeys, specialKeys,
} from './keyboardData';

export default {
  name: 'CarKeyboard',
  props: {
    value: {
      type: String,
      default: () => '',
    },
    show: {
      type: Boolean,
      default: () => false,
    },
    showDisplay: {
      type: Boolean,
      default: () => false,
    },
  },
  data() {
    return {
      template: new Array(8).fill(''),
      displayLength: 7,
      isEnergyCar: true,
      currentValue: this.value,
      showProvinesKeyboard: true,
      showNumberKeyboard: false,
      // Keyboard Data: include provinces, numbers, english and some special keys.
      provincesList: provinces,
      numberKeyboard: numbers,
      englishKeyboard: englishKeys,
      specKeyboard: specialKeys,
    };
  },
  watch: {
    value(newValue) {
      this.currentValue = newValue;
      if (this.currentValue.length) {
        for (let i = 0; i < this.currentValue.length; i++) {
          this.template[i] = { value: this.currentValue[i] };
        }
      } else {
        for (let i = 0; i < 7; i++) {
          this.template[i] = { value: '' };
        }
      }
      this.showProvinesKeyboard = this.currentValue.length < 1;
      this.showNumberKeyboard = this.currentValue.length >= 2;
    },
    isEnergyCar(newStatus) {
      if (newStatus) {
        this.$nextTick(() => {
          this.template.push('');
          this.displayLength = 8;
        });
      } else {
        this.template.pop();
        this.displayLength = 7;
      }
    },
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.showProvinesKeyboard = this.value.length < 1;
      this.showNumberKeyboard = this.value.length >= 2;
      this.isEnergyCar = this.value.length === 8;
      for (let i = 0; i < this.value.length; i++) {
        this.template[i] = { value: this.value[i] };
      }
    },
    onSelect(value) {
      if (this.currentValue.length >= this.displayLength) return;
      if (this.currentValue.length >= 2 && value === 'O') return;
      if (value === 'I') return;
      this.currentValue += value;
      this.$emit('input', this.currentValue);
    },
    deleteInput() {
      if (this.currentValue.length) {
        this.currentValue = this.currentValue.slice(0, this.currentValue.length - 1);
        this.template[this.currentValue.length] = {};
      }
      this.$emit('input', this.currentValue);
    },
    emitInput() {
      this.$emit('input', this.currentValue);
      this.$emit('update:show', false);
    },
    reset() {
      this.currentValue = '';
      this.$emit('input', this.currentValue);
    },
    onBlur() {
      this.$emit('input', this.currentValue);
      this.$emit('update:show', false);
    },
    changeToEnergy(e) {
      e.preventDefault();
      if (!this.currentValue.length) {
        this.isEnergyCar = !this.isEnergyCar;
      }
    },
  },
};
</script>

<style lang="scss">
.flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
