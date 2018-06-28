v-bind:style = "{color: activeColor,fontSize: fontSize+'px'}"
v-bind


jump: function() {

}
//等价于
jump() {

}


// State数据载体(数据源)
const Counter = {
  template: `<div>{{count}}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
// Getters通过他派生新的状态
const store = new Vuex.Store({
  state: {
    todos: [
      {id: 1, done: true},
      {id: 2, done: false}
    ]
  },
  getters: {
    doneTodos: state => {
      return state.todos.filter(todo => todo.done)
    }
  }
})

// mutations 更改Vuex的store中的状态的唯一方法是提交mutations
const store = new Vue.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      //变更状态
      state.count++
    }
  }
})
//调用mutation内函数实现状态改变
store.commit('increment')

// Action提交的是mutations而不是直接改变状态
const store = new Vue.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      state.count++
    }
  },
  actions: {
    increment (context) {
      //通过actions触发mutations里的函数，改变状态
      context.commit('increment')
    }
  }
})


const moduleA = {
  state: { ... },
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: { ... },
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态

'use stric'
console.log(loginFlag.status);



var b = '     ';
var c = b.trim();
if(c == '') {
  console.log("1111")
}
a==b



if(1) {
  if(1) {
    break;
  }
  console.log("11111");
}


//测试JS 返回
let demo = () => {
  if(1) {
    if(1) {
      
    }
    console.log("1111111")
  }
}
demo()
