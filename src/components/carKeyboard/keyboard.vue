<template>
  <div class="car-keyboard-box" v-if="showKeyboard">
    <div class="car-template" v-show="showTemplate">
      <!-- <button @click="newEnergy()">新能源</button> -->
      <template v-for="item in template" >
        <span class="car-template-item flex-center" :key="item.id">
          {{ item.value }}
        </span>
      </template>
      <!-- <span class="car-template-item flex-center" v-if="isNewEnergy">
        {{ newTemplateValue }}
      </span> -->
      <!-- {{ currentValue }} -->
    </div>
    <div class="keyboard">
      <!-- 省份 -->
      <div class="provinces-keyboard" v-show="showProvinesKeyboard">
        <template v-for="(provinceRow, index) in provincesList" >
          <div class="provinces-keyboard-row" :key="index">
            <template  v-for="(province) in provinceRow">
              <span
                class="province-key key flex-center"
                :key="province.code"
                @click="onClick(province.value)">
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
              :class="{'key-disable': !showNumberKeyboard || currentValue.length === 7}"
              :key="numberKey.code"
              @click="showNumberKeyboard && onClick(numberKey.value)">
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
              :class="{'key-disable': currentValue.length === 7}"
                :key="englishKey.code"
                @click="onClick(englishKey.value)">
                {{ englishKey.value }}
              </span>
            </template>
          </div>
        </template>
      </div>
      <!-- Fixed Keyboard -->
      <div class="fixed-keyboard-row">
        <!-- Special Keyboard -->
        <template v-for="specialKey in specialKeyboard" >
          <span
            :key="specialKey.code"
            v-show="currentValue.length >= 6"
            class="english-key key flex-center"
            :class="{'key-disable': currentValue.length === 7}"
            @click="onClick(specialKey.value)">
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
    showKeyboard: {
      type: Boolean,
      default: false,
    },
    showTemplate: {
      type: Boolean,
      default: () => true,
    },
  },
  data() {
    return {
      // showKeyboard: this.show,
      template: {
        0: '',
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        6: '',
      },
      templateLength: 7,
      isNewEnergy: false,
      // newTemplateValue: '',
      currentValue: this.value,
      showProvinesKeyboard: true,
      showNumberKeyboard: false,

      provincesList: provinces,
      numberKeyboard: numbers,
      englishKeyboard: englishKeys,
      specialKeyboard: specialKeys,
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
  },
  beforeMount() {
    this.showProvinesKeyboard = this.value.length < 1;
    this.showNumberKeyboard = this.value.length >= 2;
    for (let i = 0; i < this.value.length; i++) {
      this.template[i] = { value: this.value[i] };
    }
  },
  methods: {
    onClick(value) {
      if (this.currentValue.length >= 7) return;
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
      this.$emit('update:showKeyboard', false);
    },
    reset() {
      this.currentValue = '';
      this.$emit('input', this.currentValue);
    },
    newEnergy() {
      if (this.templateLength === 7) {
        this.templateLength = 8;
      } else {
        this.templateLength = 7;
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
  animation: 100ms move;
}
@keyframes move {
  from {
    bottom: -35vh;
  }
  to {
    bottom: 0;
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
}
.key {
  background-color: #fff;
  border-radius: 4px;

  color: #333;
  font-size: 1.25rem;
  box-shadow: 0.125rem 0.25rem 0.375rem rgba(0,0,0,.1);
  width: 7vw;
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
}

</style>
