import Alert from './alert/alert';

const components = [
  // Alert,
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
};
