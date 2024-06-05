# Vue 2.x

## 1.VUEX

- 直接使用

  ```jsx
  this.$store.state.count 
  this.$store.getters.info
  this.$store.commit('updated',{
  name:"名字",
  age:100,
  })
  this.$store.dispatch('updated',{
  name:"名字",
  age:100,
  })
  ```

  ```jsx
  this.$store.state.moduleA.sum
  this.$store.getters['moduleB/firstName']
  this.$store.dispatch('moduleB/addZhang',{name:'小明',age:18})
  this.$store.commit('moduleB/addZhang',{name:'小明',age:18})
  ```

- 辅助函数

  ```jsx
  computed:{
    ...mapState(['userName'])
      userName (){
    return this.$store.state.userName
    }
    }
    methods:{
      //简写获取store中的mutations
      ...mapMutations(['tip'])
      }
  ```

  ```jsx
  computed: {
    ...mapState('some/nested/module', {
      a: state => state.a,
      b: state => state.b
    })
  },
  methods: {
    ...mapActions('some/nested/module', [
      'foo', // -> this.foo()
      'bar' // -> this.bar()
    ])
  }
  ```

- 模块化命名

  ```jsx
  // 以下写法是固定，所有的项目里的modules的引入都是这样的
  const modules = {}
  const files = require.context('./modules', true, /\.js$/) // 引入对应的资源
  //路径和正则需要修改，其他不动！！！！！
  // console.log(files.keys()) // [所有文件的路径]
  // console.log(files(路径)) // 对应路径的文件的模块内容
  files.keys().forEach(path => {
    // path是一个 ./xxx.js
    const module = files(path).default || {} // 获取到对应的模块的内容
    
    // 给modules中设置模块名为文件名的名字（./文件名.js 所以要裁切一下）  把导入的内容作为文件名的对应的值
    modules[path.slice(2, -3)] = { 
      namespaced: true,
      ...module
    }
  })
  ```

  ```jsx
  import { createNamespacedHelpers } from 'vuex'
  const { mapState, mapActions } = createNamespacedHelpers('some/nested/module') //给定路径
  //使用方法与之前相同
  export default {
    computed: {
      // 在 `some/nested/module` 中查找
      ...mapState({
        a: state => state.a,
        b: state => state.b
      })
    },
    methods: {
      // 在 `some/nested/module` 中查找
      ...mapActions([
        'foo',
        'bar'
      ])
    }
  }
  ```

  namespaced: true,

## 2.指令

- v-once：只渲染一次
- v-cloak：

```jsx
[v-cloak]{
            display: none !important;
        }
```

- v-pre: 渲染无指令节点。
- 复制粘贴指令 `v-copy`(自定义)
- 长按指令 `v-longpress`（自定义）
- 输入框防抖指令 `v-debounce`
- 禁止表情及特殊字符 `v-emoji`
- 图片懒加载 `v-LazyLoad`
- 权限校验指令 `v-premission`
- 实现页面水印 `v-waterMarker`
- 拖拽指令 `v-draggable`
- axios的深层实现和封装
- vue自定义指令的手动实现。

## 3.组件传参

1. hook

   如何监听实例的某个生命周期，并执行相应的操作？简单语法如下：

   ```jsx
   this.on/once('hook:生命周期'，callback)
   ```

   ### 1，除了文档中的例子，我们最常用到的是定时器的使用与销毁。

   ```jsx
   export default{
     methods:{
       fn(){
         const timer = setInterval(()=>{
           //具体执行代码
           console.log('1');
         },1000);
         this.$once('hook:beforeDestory',()=>{
           clearInterval(timer);
           timer = null;
         })
       }
     }
   }
   
   ```

   ### 2，在父组件监听子组件的生命周期方法

   ```jsx
   //父组件
   <rl-child
     :value="40"
     @hook:mounted="childMountedHandle"
   />
   method () {
     childMountedHandle() {
     // do something...
     }
   },
   ```

2. eventBus

   ```jsx
   //在已经创建好的Vue实例原型中创建一个EventBus
   Vue.prototype.$EventBus = new Vue()
   ```

   ```jsx
   <!-- A.vue 这里是以模块化的方式讲解的，即A组件和B组件分别各自
   一个.vue文件,所以代码中会有导入的语法-->
   
   <template>
       <button @click="sendMsg">发送MsgA</button>
   </template>
   
   <script>
   export default {
     data(){
       return{
           MsgA: 'A组件中的Msg'
       }
     },
     methods: {
       sendMsg() {
         /*调用全局Vue实例中的$EventBus事件总线中的$emit属性，发送事
         件"aMsg",并携带A组件中的Msg*/
         this.$EventBus.$emit("aMsg", this.MsgA);
       }
     }
   };
   </script>
   ```

   ```jsx
   <!-- B.vue -->
   <template>
     <!-- 展示msgB -->
     <p>{{msgB}}</p>
   </template>
   <script>
   export default {
     data(){
       return {
         //初始化一个msgB
         msgB: ''
       }
     },
     mounted() {
       /*调用全局Vue实例中的$EventBus事件总线中的$on属性,监听A组件发送
       到事件总线中的aMsg事件*/
       this.$EventBus.$on("aMsg", (data) => {
         //将A组件传递过来的参数data赋值给msgB
         this.msgB = data;
       });
     },
     beforeDestroy(){
       //移除监听事件"aMsg"
       this.$EventBus.$off("aMsg")
     }
   };
   </script>
   ```

3. provide,inject

   ```jsx
   <template>
     <div>
     <!-- 父组件 -->
     <router-view></router-view>
     </div>
   </template>
   <script>
     export default {
         name:'layout',
       provide(){
         return {
           layout:this //这里的this值当前layout组件实例
           box:'world'
         }
       },
       data() {
         return {
           test:'hello'
         }
       },
   }
   </script>
   ```

   ```jsx
       export default {
       name:'order',
       inject:['layout','box'],
       created(){
        console.log(this.layout.test); //hello
        console.log(this.box);// world
       }
   }
   ```

## 4.FUNCTION





- filter

```
const nums = [10,20,30,40,666,980]

//返回true 就把 内容加到 newNums数组中
let newNums = nums.filter(function(n){
    return n < 100
})

```

- map

```
let new2Nums=  newNums.map(function(n){
    return n * 2
})
console.log(new2Nums);

```

- reduce

```
let total =new2Nums.reduce(function(preValue,n){
    return preValue + n
 },0)
console.log(total);

```

- **字体**

  1. 下载字体包

  2. 存放字体

     ![image](/Users/zhangzhen/Downloads/image.png)

  3. css文件夹 创建一个font.css文件，文件用于声明引入的字体，定义字体名称

     ```jsx
     @font-face {
       font-family: 'Source Han Sans CN-Medium';
       src: url('../font/SourceHanSansSC-Medium.otf');
       font-weight: normal;
       font-style: normal;
     }
     @font-face {
       font-family: 'Source Han Serif SC-Bold';
       src: url('../font/SourceHanSansSC-Bold.otf');
       font-weight: normal;
       font-style: normal;
     }
     ```

  4. main.js中引入font.css文件

     ![](/Users/zhangzhen/Downloads/image.png)

  5. 使用字体

     ![](/Users/zhangzhen/Downloads/image (1).png)

     

## 5.SCSS

- 1.使用变量

```scss
$border-color:#aaa; //声明变量
.container {
$border-width:1px;
    border:$border-width solid $border-color; //使用变量
}
```

- 2.嵌套规则

- 3.导入SCSS文件

```scss
/*App1.scss*/
$border-color:#aaa; //声明变量
.container {
    @import App2.scss;  //引入另一个SCSS文件
    border:1px solid $border-color; //使用变量
}
/*App2.scss*/
$border-color:#ccc !default; //声明变量
p {
    margin:0;
}
/*生成的css文件*/
.container {
    border:1px solid #aaa; //使用变量
}
.container p {
    margin:0;
}
```

- 4.混合器（函数）

- 5.继承


## 6.插槽

- 匿名插槽
- 具名插槽
- 作用域插槽

## 7.BASE64

- **btoa 和 atob**
- **npm install --save js-base64**
- **js实现**

## 8.import，export

- export

```jsx
// 写法一
export var m = 1;

// 写法二
var m = 1;
export { m };

// 写法三
var n = 1;
export { n as m }
```

- import

```jsx
// import.js
import { firstName , lastName } from './export.js'
function setName(element) {
    element.textContent = fitstName + ' ' + lastName;
}
```

- export default

```jsx
// export-default.js
export default function foo(){
    console.log('foo');
}

// 或者写成

function foo(){
    console.log('foo')
};
export default foo;
```