<template>
  <div class="licensePlateKeyboard" v-if="showKeyboard">
    <div class="show-template">
      <button @click="newEnergy()">新能源</button>
      <template v-for="item in template" >
        <span class="container-box flex-center" :key="item.id">
          {{ item.value }}
        </span>
      </template>
      <span class="container-box flex-center" v-if="isNewEnergy">
        {{ newTemplateValue }}
      </span>
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
    value(val) {
      this.currentValue = val;
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

      provincesList: [
        { code: 31908, value: '粤' },
        { code: 20140, value: '京' },
        { code: 27941, value: '津' },
        { code: 27818, value: '沪' },
        { code: 28189, value: '渝' },
        { code: 20864, value: '冀' },
        { code: 35947, value: '豫' },
        { code: 20113, value: '云' },
        { code: 36797, value: '辽' },
        { code: 40657, value: '黑' },
        { code: 28248, value: '湘' },
        { code: 30358, value: '皖' },
        { code: 40065, value: '鲁' },
        { code: 26032, value: '新' },
        { code: 33487, value: '苏' },
        { code: 27993, value: '浙' },
        { code: 36195, value: '赣' },
        { code: 37122, value: '鄂' },
        { code: 26690, value: '桂' },
        { code: 29976, value: '甘' },
        { code: 26187, value: '晋' },
        { code: 33945, value: '蒙' },
        { code: 38485, value: '陕' },
        { code: 21513, value: '吉' },
        { code: 38397, value: '闽' },
        { code: 36149, value: '贵' },
        { code: 38738, value: '青' },
        { code: 34255, value: '藏' },
        { code: 24029, value: '川' },
        { code: 23425, value: '宁' },
        { code: 29756, value: '琼' },
      ],
      numberKeyboard: [
        { code: 49, value: '1' },
        { code: 50, value: '2' },
        { code: 51, value: '3' },
        { code: 52, value: '4' },
        { code: 53, value: '5' },
        { code: 54, value: '6' },
        { code: 55, value: '7' },
        { code: 56, value: '8' },
        { code: 57, value: '9' },
        { code: 48, value: '0' },
      ],
      englishKeyboard: [
        [
          { code: 81, value: 'Q' },
          { code: 87, value: 'W' },
          { code: 69, value: 'E' },
          { code: 82, value: 'R' },
          { code: 84, value: 'T' },
          { code: 89, value: 'Y' },
          { code: 85, value: 'U' },
          { code: 73, value: 'I' },
          { code: 79, value: 'O' },
          { code: 80, value: 'P' },
        ],
        [
          { code: 65, value: 'A' },
          { code: 83, value: 'S' },
          { code: 68, value: 'D' },
          { code: 70, value: 'F' },
          { code: 71, value: 'G' },
          { code: 72, value: 'H' },
          { code: 74, value: 'J' },
          { code: 75, value: 'K' },
          { code: 76, value: 'L' },
        ],
        [
          { code: 90, value: 'Z' },
          { code: 88, value: 'X' },
          { code: 67, value: 'C' },
          { code: 86, value: 'V' },
          { code: 66, value: 'B' },
          { code: 78, value: 'N' },
          { code: 77, value: 'M' },
        ],
      ],
    };
  },
  methods: {
    onClick(value) {
      if (!this.isNewEnergy) {
        if (this.currentValue.length >= 7) return;
        this.currentValue += value;
        this.template[this.currentValue.length - 1] = { value };
        this.$emit('input', this.currentValue);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.currentValue.length < 7) {
          this.currentValue += value;
          this.template[this.currentValue.length - 1] = { value };
          this.$emit('input', this.currentValue);
        } else if (this.currentValue.length === 7) {
          this.newTemplateValue = value;
          this.$emit('input', this.currentValue + this.newTemplateValue);
        } else if (this.currentValue.length > 8) {
          this.$emit('input', this.currentValue + this.newTemplateValue);
        }
      }

      console.log(value);
    },
    deleteInput() {
      if (!this.isNewEnergy) {
        this.currentValue = this.currentValue.slice(0, this.currentValue.length - 1);
        this.template[this.currentValue.length] = {};
        this.$emit('input', this.currentValue);
      } else {
        // eslint-disable-next-line no-lonely-if
        if (this.currentValue.length < 7) {
          this.currentValue = this.currentValue.slice(0, this.currentValue.length - 1);
          this.template[this.currentValue.length] = {};
          this.$emit('input', this.currentValue);
        } else if (this.currentValue.length === 7) {
          // this.template[this.currentValue.length] = {};
          this.newTemplateValue = '';
          this.$emit('input', this.currentValue + this.newTemplateValue);
        } else if (this.currentValue.length > 8) {
          this.$emit('input', this.currentValue + this.newTemplateValue);
        }
      }
    },
    emitInput() {
      this.$emit('input', this.currentValue);
      console.log(this.currentValue);
      this.$emit('update:showKeyboard', false);
      // this.showKeyboard = false;
    },
    newEnergy() {
      console.log(this.templateLength, 'before');
      if (this.templateLength === 7) {
        this.templateLength = 8;
        this.isNewEnergy = true;
      } else {
        this.templateLength = 7;
        this.isNewEnergy = false;
      }
      // this.templateLength = 8;
      // this.currentValue = '';
      console.log(this.templateLength, 'after');
      // if (this.length === 7) {
      //   this.length = 8;
      //   this.template[7] = '';
      // } else {
      //   this.length = 7;
      //   delete this.template[7];
      // }
      // if (this.templateLength === 8) {
      //   this.template[this.templateLength - 1] = '';
      // }
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
