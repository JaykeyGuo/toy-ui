<template>
  <div class="car-keyboard-box" v-if="show" tabindex="1" @blur="onBlur">
    <div class="car-template" v-show="showDisplay">
      <template v-for="(item, index) in template" >
        <span class="car-template-item flex-center" :class="{ 'energy-item': index === 7 }" :key="item.id">
          {{ item.value }}
        </span>
      </template>
      <span @click="changeToEnergy" class="energy-button">
        <!-- <img
          class="button-bg"
          :class="{'enable-energy': isEnergyCar}"
          :src="energyBtnImg"
          alt="新能源车牌"
        /> -->
        <span
          class="button-bg"
          :class="{'enable-energy': isEnergyCar}">
          新能源
        </span>
        <!-- <img
          v-show="currentValue.length > 0"
          class="lock"
          :src="require('@/assets/image/lock.svg')"
          alt="锁定"
        />
        <img
          v-show="currentValue.length === 0"
          class="unlock"
          :src="require('@/assets/image/unlock.svg')"
          alt="解锁"> -->
      </span>
    </div>
    <div class="keyboard">
      <!-- Provines Keyboard -->
      <div class="provinces-keyboard" v-show="showProvinesKeyboard">
        <template v-for="(provinceRow, index) in provincesList" >
          <div class="provinces-keyboard-row" :key="index">
            <template  v-for="(province) in provinceRow">
              <span
                class="province-key key flex-center"
                :key="province.code"
                @click="onSelect(province.value)">
                {{ province.value }}
              </span>
            </template>
          </div>
        </template>
      </div>
      <!-- Normal Keyboard -->
      <div class="normal-keyboard" v-show="!showProvinesKeyboard">
        <!-- Number Keyboard -->
        <div class="number-keyboard-row">
          <template v-for="numberKey in numberKeyboard" >
            <span
              class="number-key key flex-center"
              :class="{'key-disable': !showNumberKeyboard || currentValue.length === displayLength}"
              :key="numberKey.code"
              @click="showNumberKeyboard && onSelect(numberKey.value)">
              {{ numberKey.value }}
            </span>
          </template>
        </div>
        <!-- English Keyboard -->
        <template v-for="(englishKeyRow, index) in englishKeyboard" >
          <div class="english-keyboard-row" :key="index">
            <template  v-for="(englishKey) in englishKeyRow">
              <span
                class="english-key key flex-center"
                :class="{'key-disable': currentValue.length === displayLength
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
      <div class="fixed-keyboard-row">
        <!-- Special Keyboard -->
        <template v-for="specialKey in specKeyboard" >
          <span
            :key="specialKey.code"
            v-show="currentValue.length >= displayLength - 1 && !isEnergyCar"
            class="english-key key flex-center"
            :class="{'key-disable': currentValue.length === displayLength}"
            @click="onSelect(specialKey.value)">
            {{ specialKey.value }}
          </span>
        </template>
        <span class="delete-key flex-center"
          @click="deleteInput()">
          删除
        </span>
        <span class="confirm-key flex-center"
          @click="emitInput()">
          确定
        </span>
      </div>
    </div>
  </div>
</template>

<script>
import Emitter from '@/mixins/emitter';
import {
  provinces, numbers, englishKeys, specialKeys,
} from './keyboardData';

export default {
  name: 'CarKeyboard',
  mixins: [Emitter],
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
    // energyBtnImg: {
    //   type: String,
    //   default: () => '',
    // },
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

.car-keyboard-box {
  position: fixed;
  left: 0;
  bottom: 0;
  padding-bottom: 1rem;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  // TODO: will-change: bottom;
  border-top: 1px solid #aaa;
  background-color: #eee;
  overflow: hidden;
  animation: 100ms move ease-in-out;
  z-index: 10;
  &:focus {
    outline: none;
  }
}
@keyframes move {
  from {
    bottom: -35vh;
  }
  to {
    bottom: 0;
  }
}

.energy-button {
  border: none;
  background-color: #fff;
  // filter: grayscale(80%);
  position: relative;
  // width: 14vw;
  // height: 8vw;
  // padding: 0;
  // display: flex;
  // align-items: center;
  // justify-content: center;
  cursor: pointer;
  user-select: none;
  .button-bg {
    border: 1px solid #aaa;
    border-radius: 4px;
    box-shadow: 0.125rem 0.25rem 0.375rem rgba(0,0,0,.1);
    width: 14vw;
    height: 8vw;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    // background-image: '~@/assets/image/energyCar.jpg';
    // background-size: contain;
    color: #fff;
    background-color: #aaa;
    // filter: grayscale(1);
    &.enable-energy {
      color: #fff;
      background-color: #A7D7B2;
      border-color: #A7D7B2;
      // filter: grayscale(0);
    }
  }
  .lock {
    position: absolute;
    display: block;
    right: -2px;
    bottom: -2px;
    width: 10px;
    height: 10px;
    z-index: 999999999;
    background-size: contain;
  }
  .unlock {
    position: absolute;
    display: block;
    right: -2px;
    bottom: -2px;
    width: 10px;
    height: 10px;
    z-index: 999999999;
    background-size: contain;
  }
  &:focus {
    outline: none;
  }
}

.car-template {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 1vh;
  background: #fff;
  border-bottom: 1px solid #aaa;
  box-sizing: border-box;
}
.car-template-item {
  border: 1px solid #aaa;
  border-radius: 6px;
  min-width: 6vw;
  min-height: 8vw;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  padding: 3px;
  &.energy-item {
    border-color: #83ce95;
    box-shadow: 0.1rem 0.2rem 0.25rem #83ce9530;
  }
}

.keyboard {
  display: flex;
  flex-direction: column;
  margin: 10px 3vw 1rem 3vw;
  width: 96vw;
  height: 40vh;
}
.key {
  background-color: #fff;
  border-radius: 4px;

  color: #333;
  font-size: 1.25rem;
  box-shadow: 0.125rem 0.25rem 0.375rem rgba(0,0,0,.1);
  width: 7vw;
  user-select: none;
  &-disable {
    color: #999;
  }
}

.provinces-keyboard {
  display: flex;
  flex-direction: column;
}
.provinces-keyboard-row {
  display: flex;
  justify-content: center;
}
.province-key {
  padding: 2vh 1vw;
  margin: 4px 1vw;
}

.normal-keyboard {
  display: flex;
  flex-direction: column;
}
.number-keyboard-row {
  display: flex;
  justify-content: center;
  font-weight: 600;
}
.number-key {
  padding: 1.5vh 1vw;
  margin: 4px 1vw;
}

.english-keyboard-row {
  display: flex;
  justify-content: center;
}
.english-key {
  font-family: Arial, Helvetica, sans-serif;
  padding: 2vh 0.5vw;
  margin: 4px 1vw;
}
.fixed-keyboard-row {
  display: flex;
  justify-content: flex-end;
}

.delete-key {
  background-color: #fff;
  border-radius: 4px;
  color: #333;
  font-size: 1.25rem;
  padding: 2vh 2vw;
  margin: 4px 1vw;
  box-shadow: 0.125rem 0.25rem 0.375rem rgba(0,0,0,.1);
  width: 10vw;
  user-select: none;
}
.confirm-key {
  width: 10vw;
  background-color: #fff;
  border-radius: 4px;
  color: #333;
  font-size: 1.25rem;
  padding: 2vh 2vw;
  margin: 4px 1vw;
  box-shadow: 0.125rem 0.25rem 0.375rem rgba(0,0,0,.1);
  user-select: none;
}

</style>
