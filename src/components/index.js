import Alert from './alert/alert';
import Checkbox from './checkbox';
import CheckboxGroup from './checkboxGroup';
import Display from './display';
import Form from './form';
import Input from './input';
import Radio from './radio';
import RadioGroup from './radioGroup';
import TableRender from './table-render';
import TableSlot from './table-slot';
import Tree from './tree';
import CarInput from './carKeyboard';

const components = [
  Checkbox,
  CheckboxGroup,
  Display,
  Form,
  Input,
  Radio,
  RadioGroup,
  TableRender,
  TableSlot,
  Tree,
  CarInput,
];

// eslint-disable-next-line func-names
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component);
  });
};

export default {
  install,
  Alert,
  Checkbox,
  CheckboxGroup,
  Display,
  Form,
  Input,
  Radio,
  RadioGroup,
  TableRender,
  TableSlot,
  Tree,
  CarInput,
};
