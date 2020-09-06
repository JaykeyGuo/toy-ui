// 由一个组件，向上找到最近的指定组件（向上 最近）
function findComponentUpward(context, componentName) {
  let parent = context.$parent;
  let { name } = parent.$options;

  // TODO: indexOf value condition
  while (parent && (!name || [componentName].indexOf(name) < 0)) {
    parent = parent.$parent;
    if (parent) name = parent.$options.name;
  }
  return parent;
}

// 由一个组件，向上找到所有指定的组件（向上 所有）
// 使用递归的方式来调用向上查找
// 最后一步是一个空数组
// 这个方法主要是在递归组件中使用
function findComponentsUpward(context, componentName) {
  const parents = [];
  const parent = context.$parent;

  if (parent) {
    if (parent.$options.name === componentName) parents.push(parent);
    return parents.concat(findComponentsUpward(parent, componentName));
  }
  return [];
}

// 由一个组件，向下找到最近的指定组件（向下 最近）
function findComponentDownward(context, componentName) {
  const childrenList = context.$children;
  let children = null;

  if (childrenList.length) {
    // eslint-disable-next-line no-restricted-syntax
    for (const child of childrenList) {
      const { name } = child.$options;

      if (name === componentName) {
        children = child;
        break;
      } else {
        children = findComponentDownward(child, componentName);
        if (children) break;
      }
    }
  }
  return children;
}

// 由一个组件，向下找到所有指定的组件（向下 所有）
function findComponentsDownward(context, componentName) {
  return context.$children.reduce((components, child) => {
    if (child.$options.name === componentName) components.push(child);
    const foundChildren = findComponentsDownward(child, componentName);
    return components.concat(foundChildren);
  }, []);
}

// 由一个组件，找到指定组件的兄弟组件
// Vue.js 在渲染组件时，都会给每个组件加一个内置的属性 _uid，这个 _uid 是不会重复的，借此我们可以从一系列兄弟组件中把自己排除掉。
function findBrothersComponents(context, componentName, exceptMe = true) {
  const res = context.$parent.$children.filter((item) => item.$options.name === componentName);
  // eslint-disable-next-line no-underscore-dangle
  const index = res.findIndex((item) => item._uid === context._uid);
  if (exceptMe) res.splice(index, 1);
  return res;
}

function typeOf(obj) {
  const { toString } = Object.prototype;
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regexp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object',
  };
  return map[toString.call(obj)];
}

function deepCopy(data) {
  const t = typeOf(data);
  let o;

  if (t === 'array') {
    o = [];
  } else if (t === 'object') {
    o = {};
  } else {
    return data;
  }

  if (t === 'array') {
    for (let i = 0; i < data.length; i++) {
      o.push(deepCopy(data[i]));
    }
  } else if (t === 'object') {
    for (const i in data) {
      if (Object.prototype.hasOwnProperty.call(data, i)) {
        o[i] = deepCopy(data[i]);
      }
    }
  }
  return o;
}

export {
  findComponentUpward,
  findComponentsUpward,
  findComponentDownward,
  findComponentsDownward,
  findBrothersComponents,
  deepCopy,
};
