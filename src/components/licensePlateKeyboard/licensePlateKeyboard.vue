<template>
  <div class="licensePlateKeyboard" v-if="showKeyboard">
    <div class="show-template">
      <!-- <button @click="newEnergy()">新能源</button> -->
      <template v-for="item in template" >
        <span class="container-box flex-center" :key="item.id">
          {{ item.value }}
        </span>
      </template>
      <!-- <span class="container-box flex-center" v-if="isNewEnergy">
        {{ newTemplateValue }}
      </span> -->
      <!-- {{ currentValue }} -->
    </div>
    <div class="provinces-keyboard keyboard" v-show="showProvinesKeyboard">
      <template v-for="province in provincesList" >
        <span
          class="province-key key flex-center"
          :key="province.code"
          @click="onClick(province.value)">
          {{ province.value }}
        </span>
      </template>
      <span class="delete-key key flex-center"
        @click="deleteInput()">
        删除
      </span>
      <span class="confirm-key key flex-center"
        @click="emitInput()">
        确定
      </span>
    </div>
    <div class="normal-keyboard keyboard" v-show="!showProvinesKeyboard">
      <div class="number-keyboard">
        <template v-for="numberKey in numberKeyboard" >
          <span
            class="number-key key flex-center"
            :class="{'number-key-disable': !showNumberKeyboard}"
            :key="numberKey.code"
            @click="showNumberKeyboard && onClick(numberKey.value)">
            {{ numberKey.value }}
          </span>
        </template>
      </div>
      <template v-for="(englishKeyRow, index) in englishKeyboard" >
        <div class="english-keyboard-row" :key="index">
          <template  v-for="(englishKey) in englishKeyRow">
            <span
              class="english-key key flex-center"
              :key="englishKey.code"
              @click="onClick(englishKey.value)">
              {{ englishKey.value }}
            </span>
          </template>
        </div>
      </template>
      <span class="delete-key key flex-center"
        @click="deleteInput()">
        删除
      </span>
      <span class="confirm-key key flex-center"
        @click="emitInput()">
        确定
      </span>
    </div>
  </div>
</template>

<script>
// 京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领
import Emitter from '@/mixins/emitter';
import { provinces, numbers, englishKeys } from './basicData';

export default {
  name: 'LicensePlateKeyboard',
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
      newTemplateValue: '',
      currentValue: this.value,
      showProvinesKeyboard: true,
      showNumberKeyboard: false,

      // provincesList: [],
      // numberKeyboard: [],
      // englishKeyboard: [],
      provincesList: provinces,
      numberKeyboard: numbers,
      englishKeyboard: englishKeys,
    };
  },
  beforeMount() {
    console.log(this.value);
    this.showProvinesKeyboard = this.value.length < 1;
    this.showNumberKeyboard = this.value.length >= 2;
    for (let i = 0; i < this.value.length; i++) {
      console.log(this.value[i]);
      this.template[i] = { value: this.value[i] };
    }
  },
  methods: {
    onClick(value) {
      if (this.currentValue.length >= 7) return;
      this.currentValue += value;
      this.$emit('input', this.currentValue);

      console.log(value);
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
      console.log(this.currentValue);
      this.$emit('update:showKeyboard', false);
      // this.showKeyboard = false;
    },
    reset() {
      this.currentValue = '';
      this.$emit('input', this.currentValue);
    },
    newEnergy() {
      console.log(this.templateLength, 'before');
      if (this.templateLength === 7) {
        this.templateLength = 8;
      } else {
        this.templateLength = 7;
      }
      console.log(this.templateLength, 'after');
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

.licensePlateKeyboard {
  position: absolute;
  bottom: 0;
  // min-height: 30vh;
  background-color: #eee;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;
  border-top: 1px solid #aaa;
  // TODO: will-change: bottom;
  animation: 100ms move;
}

@keyframes move {
  from {
    // margin-top: 100%;
    // transform: -30vh;
    bottom: -30vh;
    // height: 300%;
  }

  to {
    // transform: 0;
    bottom: 0;
    // height: 100%;
  }
}

.show-template {
  display: flex;
  width: 100%;
  justify-content: space-around;
  align-items: center;
  padding: 1vh;
  background: #fff;
  border-bottom: 1px solid #aaa;
  box-sizing: border-box;
}
.container-box {
  border: 1px solid #ccc;
  border-radius: 6px;
  min-width: 6vw;
  min-height: 6vw;
  text-align: center;
  padding: 3px;
}

.keyboard {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  padding: 0 4px;
  margin: 10px 0;
  min-height: 30vh;
}
.provinces-keyboard {
  // display: flex;
  // flex-wrap: wrap;
  // justify-content: space-around;
  // padding: 0 4px;
  // margin: 10px 0 ;
}
.normal-keyboard {
  display: flex;
  flex-wrap: wrap;
}
.key {
  background-color: #fff;
  border-radius: 4px;
  padding: 6px 16px;
  margin: 3px 2px;
  color: #333;
  font-size: 1rem;
  box-shadow: 0.125rem 0.25rem 0.375rem rgba(0,0,0,.1);
}
.number-keyboard {
  display: flex;
  width: 100%;
  justify-content: space-around;
  font-weight: 600;
}
.number-key {
  padding: 1vh 2px;
  flex: 1;
  &-disable {
    color: #aaa;
  }
}
.disable-key {

}
.english-keyboard-row {
  display: flex;
  width: 100%;
  justify-content: center;
}
.english-key {
  padding: 1vh 3vw;
  font-size: 16px;
  font-weight: 600;
  width: 10px;
}
.province-key {
}
.delete-key {
}
</style>
