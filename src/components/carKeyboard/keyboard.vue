<template>
  <div class="car-keyboard-box" v-if="show" tabindex="1" @blur="onBlur">
    <div class="car-template" v-show="showDisplay">
      <span @click="changeToEnergy" class="energy-button">
        <span class="button-bg" :class="{'enable-energy': isEnergyCar}"></span>
        <span class="lock" v-show="currentValue.length > 0"></span>
        <span class="unlock" v-show="currentValue.length === 0"></span>
      </span>
      <template v-for="item in template" >
        <span class="car-template-item flex-center" :key="item.id">
          {{ item.value }}
        </span>
      </template>
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
                :class="{'key-disable': currentValue.length === displayLength || englishKey.value === 'I' || englishKey.value === 'O'}"
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
      default: '',
    },
    show: {
      type: Boolean,
      default: false,
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
        console.log('xxx');
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
      console.log(this.template);
    },
  },
  beforeMount() {
    this.init();
  },
  methods: {
    init() {
      this.showProvinesKeyboard = this.value.length < 1;
      this.showNumberKeyboard = this.value.length >= 2;
      console.log(this.value.length);
      this.isEnergyCar = this.value.length === 8;
      for (let i = 0; i < this.value.length; i++) {
        this.template[i] = { value: this.value[i] };
      }
    },
    onSelect(value) {
      if (this.currentValue.length >= this.displayLength) return;
      if (value === 'I' || value === 'O') return;
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
    onBlur(e) {
      console.log(e, 'blur');
      this.$emit('input', this.currentValue);
      this.$emit('update:show', false);
    },
    changeToEnergy(e) {
      console.log(e);
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
  animation: 150ms move ease-in-out;
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
  width: 8vw;
  height: 8vw;
  padding: 0;
  .button-bg {
    display: block;
    width: 8vw;
    height: 8vw;
    background-image: url('../../assets/image/energyCar.jpg');
    border-radius: 50%;
    background-size: contain;
    filter: grayscale(1);
    &.enable-energy {
      filter: grayscale(0);
    }
  }
  .lock {
    position: absolute;
    display: block;
    right: -2px;
    bottom: -2px;
    width: 10px;
    height: 10px;
    background-image: url('../../assets/image/lock.svg');
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
    background-image: url('../../assets/image/unlock.svg');
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
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 6vw;
  min-height: 6vw;
  text-align: center;
  font-family: Arial, Helvetica, sans-serif;
  padding: 3px;
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
