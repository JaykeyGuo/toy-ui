<template>
  <div ref="display"></div>
</template>
<script>
import Vue from 'vue';
import randomStr from '@/utils/randomStr';

export default {
  name: 'toyDisplay',
  props: {
    code: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      html: '',
      js: '',
      css: '',

      component: null,
      id: randomStr(),
    };
  },
  watch: {
    code() {
      this.destroyCode();
      this.renderCode();
    },
  },
  mounted() {
    this.renderCode();
  },
  beforeDestroy() {
    this.destroyCode();
  },
  methods: {
    getSource(source, type) {
      const regex = new RegExp(`<${type}[^>]*>`);
      let openingTag = source.match(regex);

      if (!openingTag) {
        return '';
      }
      // eslint-disable-next-line prefer-destructuring
      openingTag = openingTag[0];

      return source.slice(source.indexOf(openingTag) + openingTag.length, source.lastIndexOf(`</${type}>`));
    },
    splicCode() {
      const script = this.getSource(this.code, 'script').replace(/export default/, 'return ');
      const style = this.getSource(this.code, 'style');
      const template = `<div id="app">${this.getSource(this.code, 'template')}</div>`;

      this.js = script;
      this.css = style;
      this.html = template;
    },
    renderCode() {
      this.splicCode();

      console.log(this.js);
      console.log(this.html);
      console.log(this.css);
      if (this.html !== '' && this.js !== '') {
        // eslint-disable-next-line no-new-func
        const parseStrToFunc = new Function(this.js)();

        // parseStrToFunc.template = this.html;
        // const Component = Vue.extend(parseStrToFunc);
        // this.component = new Component().$mount();
        parseStrToFunc.template = this.html;
        const Component = Vue.extend(parseStrToFunc);
        this.component = new Component().$mount();

        this.$refs.display.appendChild(this.component.$el);

        if (this.css !== '') {
          const style = document.createElement('style');
          style.type = 'text/css';
          style.id = this.id;
          style.innerHTML = this.css;
          document.getElementsByTagName('head')[0].appendChild(style);
        }
      }
    },
    destroyCode() {
      const $target = document.getElementById(this.id);
      if ($target) $target.parentNode.removeChild($target);

      if (this.component) {
        this.$refs.display.removeChild(this.component.$el);
        this.component.$destroy();
        this.component = null;
      }
    },
  },
};
</script>
