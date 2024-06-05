# Vue 3.x

## 1、前置介绍

在 vue3.2 中，我们只需在script标签中添加setup。就可以做到，组件只需引入不用注册，属性和方法也不用 return 就能在 template 中使用，也不用写setup函数，也不用写export default ，甚至是自定义指令也可以在我们的template中自动获得。

本次我们的学习也将在 setup 语法糖下进行。

## 2、环境搭建

建议照着官网搭建，地址如下：[https://cn.vuejs.org](https://cn.vuejs.org/guide/quick-start.html#creating-a-vue-application)

## 3、生命周期

```javascript
setup() : 开始创建组件之前，在 beforeCreate 和 created 之前执行，创建的是 data 和 method
onBeforeMount() : 组件挂载到节点上之前执行的函数；
onMounted() : 组件挂载完成后执行的函数；
onBeforeUpdate(): 组件更新之前执行的函数；
onUpdated(): 组件更新完成之后执行的函数；
onBeforeUnmount(): 组件卸载之前执行的函数；
onUnmounted(): 组件卸载完成后执行的函数；
onActivated(): 被包含在 <keep-alive> 中的组件，会多出两个生命周期钩子函数，被激活时执行；
onDeactivated(): 比如从 A 组件，切换到 B 组件，A 组件消失时执行；
onErrorCaptured(): 当捕获一个来自子孙组件的异常时激活钩子函数。                  
```



## 4、ref 和 reactive

- ref: 用来给基本数据类型绑定响应式数据，访问时需要通过 .value 的形式， tamplate 会自动解析,不需要 .value
- reactive: 用来给 复杂数据类型 绑定响应式数据，直接访问即可

> ref其实也是内部调用来reactive实现的

```xml
<template>
<div>
<p>{{title}}</p>
<h4>{{userInfo}}</h4>
</div>
</template>
 
<script setup lang="ts">
import { ref, reactive } from "vue";
type Person = {
name: string;
age: number;
gender?: string;
};
const title = ref<string>("彼时彼刻，恰如此时此刻");
const userInfo = reactive<Person>({
name: '树哥',
age: 18
})
</script>
```

## 5、toRef、toRefs、toRaw

### toRef

toRef 如果原始对象是非响应式的,数据会变,但不会更新视图

```xml
<template>
<div>
  <button @click="change">按钮</button>
  {{state}}
</div>
</template>
 
<script setup lang="ts">
import { reactive, toRef } from 'vue'
 
const obj = {
name: '树哥',
age: 18
}
 
const state = toRef(obj, 'age')
 
const change = () => {
state.value++
console.log('obj:',obj,'state:', state);
}
</script>
```

[![img](https://images.cnblogs.com/cnblogs_com/houjl/2234793/o_221028104337_vueImg1.png)](https://images.cnblogs.com/cnblogs_com/houjl/2234793/o_221028104337_vueImg1.png)

可以看到，点击按钮，当原始对象是非响应式时，使用toRef 的数据改变，但是试图并没有更新



```xml
<template>
<div>
<button @click="change">按钮</button>
{{state}}
</div>
</template>
 
<script setup lang="ts">
import { reactive, toRef } from 'vue'
 
const obj = reactive({
name: '树哥',
age: 18
})
 
const state = toRef(obj, 'age')
 
const change = () => {
state.value++
console.log('obj:', obj, 'state:', state);
}
</script>
```

[![img](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104348_vueImg2.png)](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104348_vueImg2.png)

当我们把 obj 用 reactive 包裹，再使用 toRef，点击按钮时，可以看到视图和数据都变了

> toRef返回的值是否具有响应性取决于被解构的对象本身是否具有响应性。响应式数据经过toRef返回的值仍具有响应性，非响应式数据经过toRef返回的值仍没有响应性。

### toRefs

toRefs相当于对对象内每个属性调用toRef，toRefs返回的对象内的属性使用时需要加.value,主要是方便我们解构使用



```xml
<template>
<div>
<button @click="change">按钮</button>
name--{{name}}---age{{age}}
</div>
</template>
 
<script setup lang="ts">
import { reactive, toRefs } from 'vue'
 
const obj = reactive({
name: '树哥',
age: 18
})
 
let { name, age } = toRefs(obj)
 
const change = () => {
age.value++
name.value = '张麻子'
console.log('obj:', obj);
console.log('name:', name);
console.log('age:', age);
}
</script>
```

简单理解就是批量版的toRef,(**其源码实现也正是通过对象循环调用了toRef**)

### toRaw

将响应式对象修改为普通对象



```xml
<template>
<div>
<button @click="change">按钮</button>
{{data}}
</div>
</template>
 
<script setup lang="ts">
import { reactive, toRaw } from 'vue'
 
const obj = reactive({
name: '树哥',
age: 18
})
 
const data = toRaw(obj)
 
const change = () => {
data.age = 19
console.log('obj:', obj, 'data:', data);
}
</script>
```

[![img](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104354_vueImg3.png)](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104354_vueImg3.png)

数据能变化，视图不变化(失去响应式)

## 6、computed



```xml
<template>
<div>
<p>{{title}}</p>
<h4>{{userInfo}}</h4>
<h1>{{add}}</h1>
</div>
</template>
 
<script setup lang="ts">
import { ref, reactive,computed } from "vue";
const count = ref(0)
 
// 推导得到的类型：ComputedRef<number>
const add = computed(() => count.value +1)
 
</script>
```

## 7、watch

vue3 watch 的作用和 Vue2 中的 watch 作用是一样的，他们都是用来监听响应式状态发生变化的，当响应式状态发生变化时，就会触发一个回调函数。



```haskell
watch(data,()=>{},{})
```

- 参数一，监听的数据
- 参数二，数据改变时触发的回调函数（newVal,oldVal）
- 参数三，options配置项，为一个对象
- **1、监听ref定义的一个响应式数据**



```xml
<script setup lang="ts">
import { ref, watch } from "vue";
 
const str = ref('彼时彼刻')
 
//3s后改变str的值
setTimeout(() => { str.value = '恰如此时此刻' }, 3000)
 
watch(str, (newV, oldV) => {
console.log(newV, oldV) //恰如此时此刻 彼时彼刻
})
 
</script>
```

- **2、监听多个ref**

**这时候写法变为数组的形式**



```xml
<script setup lang="ts">
import { ref, watch } from "vue";
 
let name = ref('树哥')
let age = ref(18)
 
//3s后改变值
setTimeout(() => {
name.value = '我叫树哥'
age.value = 19
}, 3000)
 
watch([name, age], (newV, oldV) => {
console.log(newV, oldV) // ['我叫树哥', 19]  ['树哥', 18]
})
 
</script>
```

- **3、监听Reactive定义的响应式对象**



```xml
<script setup lang="ts">
import { reactive, watch } from "vue";
 
let info = reactive({
name: '树哥',
age: 18
})
 
//3s后改变值
setTimeout(() => {
info.age = 19
}, 3000)
 
watch(info, (newV, oldV) => {
console.log(newV, oldV) 
})
 
</script>
```

当 watch 监听的是一个响应式对象时，会隐式地创建一个深层侦听器，即该响应式对象里面的任何属性发生变化，都会触发监听函数中的回调函数。**即当 watch 监听的是一个响应式对象时，默认开启 deep：true**

- **4、监听reactive 定义响应式对象的单一属性**

错误写法：



```xml
<script setup lang="ts">
import { reactive, watch } from "vue";
 
let info = reactive({
name: '树哥',
age: 18
})
 
//3s后改变值
setTimeout(() => {
info.age = 19
}, 3000)
 
 
watch(info.age, (newV, oldV) => {
console.log(newV, oldV) 
})
 
</script>
```

可以看到控制台出现警告



```bash
[Vue warn]: Invalid watch source:  18 A watch source can only be a getter/effect function, a ref, a reactive object, or an array of these types. 
at <Index> 
at <App>
```

如果我们非要监听响应式对象中的某个属性，我们可以使用 getter 函数的形式,**即将watch第一个参数修改成一个回调函数的形式**

正确写法：



```javascript
// 其他不变
watch(()=>info.age, (newV, oldV) => {
console.log(newV, oldV) // 19 18
})
```

- **5、监听reactive定义的 引用数据**



```xml
<script setup lang="ts">
import { reactive, watch } from "vue";
 
let info = reactive({
name: '张麻子',
age: 18,
obj: {
str: '彼时彼刻，恰如此时此刻'
}
})
 
//3s后改变s值
setTimeout(() => {
info.obj.str = 'to be or not to be'
}, 3000)
 
// 需要自己开启 deep:true深度监听,不然不发触发 watch 的回调函数
watch(() => info.obj, (newV, oldV) => {
console.log(newV, oldV)
}, {
deep: true
})
 
</script>
```

## 8、WatchEffect

会立即执行传入的一个函数，同时响应式追踪其依赖，并在其依赖变更时重新运行该函数。（有点像计算属性）

如果用到 a 就只会监听 a, 就是用到几个监听几个 而且是非惰性,会默认调用一次



```xml
<script setup lang="ts">
import { ref, watchEffect } from "vue";
 
let num = ref(0)
 
//3s后改变值
setTimeout(() => {
num.value++
}, 3000)
 
watchEffect(() => {
console.log('num 值改变：', num.value)
})
 
</script>
```

可以在控制台上看到，第一次进入页面时，打印出`num 值改变：0`,三秒后，再次打印`num 值改变：1`

- **停止监听**

当 watchEffect 在组件的 setup() 函数或生命周期钩子被调用时，侦听器会被链接到该组件的生命周期，并在组件卸载时自动停止。

但是我们采用异步的方式创建了一个监听器，这个时候监听器没有与当前组件绑定，所以即使组件销毁了，监听器依然存在。

这个时候我们可以显式调用停止监听



```xml
<script setup lang="ts">
import { watchEffect } from 'vue'
// 它会自动停止
watchEffect(() => {})
// ...这个则不会！
setTimeout(() => {
watchEffect(() => {})
}, 100)
 
const stop = watchEffect(() => {
/* ... */
})
 
// 显式调用
stop()
</script>
```

- **清除副作用（onInvalidate）**

watchEffect 的第一个参数——effect函数——可以接收一个参数：叫onInvalidate，也是一个函数，用于清除 effect 产生的副作用

就是在触发监听之前会调用一个函数可以处理你的逻辑，例如防抖



```javascript
import { ref, watchEffect } from "vue";
 
let num = ref(0)
 
//3s后改变值
setTimeout(() => {
num.value++
}, 3000)
 
watchEffect((onInvalidate) => {
console.log(num.value)
onInvalidate(() => {
console.log('执行');
});
})
```

控制台依次输出：0 => 执行 => 1

- **配置选项**

watchEffect的第二个参数，用来定义副作用刷新时机，可以作为一个调试器来使用

flush （更新时机）：

- 1、pre：组件更新前执行
- 2、sync：强制效果始终同步触发
- 3、post：组件更新后执行



```xml
<script setup lang="ts">
import { ref, watchEffect } from "vue";
 
let num = ref(0)
 
//3s后改变值
setTimeout(() => {
num.value++
}, 3000)
 
watchEffect((onInvalidate) => {
console.log(num.value)
onInvalidate(() => {
console.log('执行');
});
}, {
flush: "post", //此时这个函数会在组件更新之后去执行
onTrigger(e) { //作为一个调试工具，可在开发中方便调试
console.log('触发', e);
},
})
</script>
```

## 9、生命周期

和 vue2 相比的话，基本上就是将 Vue2 中的beforeDestroy名称变更成beforeUnmount; destroyed 表更为 unmounted；然后用setup代替了两个钩子函数 beforeCreate 和 created；新增了两个开发环境用于调试的钩子

[![img](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104402_vueImg4.png)](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104402_vueImg4.png)

## 10、父子组件传参

### defineProps

父组件传参



```xml
<template>
<Children :msg="msg" :list="list"></Children>
</template>
 
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Children from './Children.vue'
 
const msg = ref('hello 啊，树哥')
const list = reactive<number[]>([1, 2, 3])
</script>
```

> 在 script setup 中，引入的组件会自动注册，所以可以直接使用，无需再通过components进行注册

子组件接受值

defineProps 来接收父组件传递的值， **defineProps是无须引入的直接使用即可**



```xml
<template>
<div>
<p>msg：{{msg}}</p>
<p>list：{{list}}</p>
</div>
</template>
 
<script setup lang="ts">
defineProps<{
msg: string,
list: number[]
}>()
</script>
```

使用 withDefaults 定义默认值



```xml
<template>
<div>
<p>msg：{{msg}}</p>
<p>list：{{list}}</p>
</div>
</template>
 
<script setup lang="ts">
type Props = {
msg?: string,
list?: number[]
}
 
// withDefaults 的第二个参数便是默认参数设置，会被编译为运行时 props 的 default 选项
withDefaults(defineProps<Props>(), {
msg: '张麻子',
list: () => [4, 5, 6]
})
</script>
```

子组件向父组件抛出事件

### defineEmits

子组件派发事件



```xml
<template>
<div>
<p>msg：{{msg}}</p>
<p>list：{{list}}</p>
<button @click="onChangeMsg">改变msg</button>
</div>
</template>
 
<script setup lang="ts">
type Props = {
msg?: string,
list?: number[]
}
 
withDefaults(defineProps<Props>(), {
msg: '张麻子',
list: () => [4, 5, 6]
})
 
const emits = defineEmits(['changeMsg'])
const onChangeMsg = () => {
emits('changeMsg','黄四郎')
}
</script>
```

子组件绑定了一个click 事件 然后通过defineEmits 注册了一个自定义事件,点击按钮的时候，触发 emit 调用我们注册的事件，传递参数

父组件接收



```xml
<template>
<Children :msg="msg" :list="list" @changeMsg="changeMsg"></Children>
</template>
 
<script setup lang="ts">
import { ref, reactive } from 'vue'
import Children from './Children.vue'
 
const msg = ref('hello 啊，树哥')
const list = reactive<number[]>([1, 2, 3])
 
const changeMsg = (v: string) => {
msg.value = v
}
</script>
```

### defineExpose 获取子组件	实例和内部属性

在 script-setup 模式下，所有数据只是默认 return 给 template 使用，不会暴露到组件外，所以父组件是无法直接通过挂载 ref 变量获取子组件的数据。

如果要调用子组件的数据，需要先在子组件显示的暴露出来，才能够正确的拿到，这个操作，就是由 defineExpose 来完成。

子组件



```xml
<template>
<p>{{name}}</p>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
 
const name = ref('张麻子')
const changeName = () => {
name.value = '县长'
}
// 将方法、变量暴露给父组件使用，父组件才可通过 ref API拿到子组件暴露的数据
defineExpose({
name,
changeName
})
</script>
```

父组件



```xml
<template>
<div>
<child ref='childRef' />
<button @click="getName">获取子组件中的数据</button>
</div>
</template>
 
<script lang="ts" setup>
import { ref } from 'vue'
import child from './Child.vue'
 
// 子组件ref（TypeScript语法）
const childRef = ref<InstanceType<typeof child>>()
 
const getName = () => {
// 获取子组件name
console.log(childRef.value!.name)
// 执行子组件方法
childRef.value?.changeName()
// 获取修改后的name
console.log(childRef.value!.name)
}
</script>
```

> 注意：defineProps 、defineEmits 、 defineExpose 和 withDefaults 这四个宏函数只能在 `<script setup>` 中使用。他们不需要导入，会随着`<script setup>`的处理过程中一起被编译。

## 11、插槽

在 Vue2 的中一般中具名插槽和作用域插槽分别使用slot和slot-scope来实现，如：

父组件



```xml
<template>
<div>
<p style="color:red">父组件</p>
<Child ref='childRef'>
  <template slot="content" slot-scope="{ msg }">
    <div>{{ msg }}</div>
  </template>
</Child>
</div>
</template>
 
<script lang="ts" setup>
import Child from './Child.vue'
</script>
```

子组件



```xml
<template>
<div>child</div>
<slot name="content" msg="hello 啊，树哥!"></slot>
</template>
```

在 Vue3 中将slot和slot-scope进行了合并统一使用，使用 v-slot， `v-slot:slotName` 简写 `#slotName`

父组件



```xml
<template>
<div>
<p style="color:red">父组件</p>
<Child>
  <template  v-slot:content="{ msg }">
    <div>{{ msg }}</div>
  </template>
</Child>
</div>
</template>
 
<script lang="ts" setup>
import Child from './Child.vue'
</script>
 
<!-- 简写 -->
<Child>
<template #content="{ msg }">
<div>{{ msg }}</div>
  </template>
</Child>
```

> 实际上,v-slot 在 Vue2.6+ 的版本就可以使用。

## 12、异步组件

通过 defineAsyncComponent 异步加载



```xml
<template>
<Children :msg="msg" :list="list" @changeMsg="changeMsg"></Children>
</template>
 
<script setup lang="ts">
import { ref, reactive,defineAsyncComponent } from 'vue'
// import Children from './Children.vue'
const Children = defineAsyncComponent(() => import('./Children.vue'))
</script>
```

## 13、Suspense

Suspense 允许应用程序在等待异步组件时渲染一些其它内容,在 Vue2 中，必须使用条件判断(例如 v-if、 v-else等)来检查数据是否已加载并显示一些其它内容；但是，在 Vue3 新增了 Suspense 了，就不必跟踪何时加载数据并呈现相应的内容。

他是一个带插槽的组件，只是它的插槽指定了default 和 fallback 两种状态。

Suspense 使用：

- 1、使用 `<Suspense></Suspense>` 包裹所有异步组件相关代码
- 2、`<template v-slot:default></template>` 插槽包裹异步组件
- 3、`<template v-slot:fallback></template>` 插槽包裹渲染异步组件渲染之前的内容



```xml
<template>
<Suspense>
<template #default>
  <!-- 异步组件-默认渲染的页面 -->
  <Children :msg="msg" :list="list" @changeMsg="changeMsg"></Children>
</template>
<template #fallback>
  <!-- 页面还没加载出来展示的页面 -->
  <div>loading...</div>
</template>
</Suspense>
</template>
 
<script setup lang="ts">
import { ref, reactive, defineAsyncComponent } from 'vue'
const Children = defineAsyncComponent(() => import('./Children.vue'))
</script>
```

## 14、Teleport传送组件

Teleport 是一种能够将我们的模板渲染至指定DOM节点，不受父级style、v-show等属性影响，但data、prop数据依旧能够共用的技术

主要解决的问题：因为Teleport节点挂载在其他指定的DOM节点下，完全不受父级style样式影响

使用： 通过to 属性插入到指定元素位置，如 body，html，自定义className等等。



```xml
<template>
<!-- 插入至 body -->
<Teleport to="body">
<Children></Children>
</Teleport>
<!-- 默认 #app 下 -->
<Children></Children>
</template>
<script lang="ts" setup>
import Children from './Children.vue'
</script>
```

[![img](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104408_vueImg5.png)](https://images.cnblogs.com/cnblogs_com/houjl/2234793/t_221028104408_vueImg5.png)

## 15、keep-alive 缓存组件

- 作用和vue2一致，只是生命周期名称有所更改
- 初次进入时： onMounted> onActivated
- 退出后触发 deactivated
- 再次进入：只会触发 onActivated

> 事件挂载的方法等，只执行一次的放在 onMounted中；组件每次进去执行的方法放在 onActivated中

## 16、provide/inject

provide 可以在祖先组件中指定我们想要提供给后代组件的数据或方法，而在任何后代组件中，我们都可以使用 inject 来接收 provide 提供的数据或方法。

父组件



```xml
<template>
<Children></Children>
</template>
 
<script setup lang="ts">
import { ref, provide } from 'vue'
import Children from "./Children.vue"
 
const msg = ref('hello 啊，树哥')
 
provide('msg', msg)
</script>
```

子组件



```xml
<template>
<div>
<p>msg：{{msg}}</p>
<button @click="onChangeMsg">改变msg</button>
</div>
</template>
 
<script setup lang="ts">
import { inject, Ref, ref } from 'vue'
 
const msg = inject<Ref<string>>('msg',ref('hello啊！'))
const onChangeMsg = () => {
msg.value = 'shuge'
}
</script>
```

> 如果你想要传入的值能响应式的改变，需要通过Ref,ref 或 reactive 添加响应式

## 17、v-model 升级

v-model 在vue3可以说是破坏式更新，改动还是不少的

我们都知道，v-model 是props 和 emit 组合而成的语法糖,vue3中 v-model 有以下改动

- 变更：value => modelValue
- 变更：update:input => update:modelValue
- 新增：一个组件可以设置多个 v-model
- 新增：开发者可以自定义 v-model修饰符
- v-bind 的 .sync 修饰符和组件的 model 选项已移除

子组件



```xml
<template>
<div>
<p>{{msg}}，{{modelValue}}</p>
<button @click="onChangeMsg">改变msg</button>
</div>
</template>
 
<script setup lang="ts">
 
type Props = {
modelValue: string,
msg: string
}
defineProps<Props>()
const emit = defineEmits(['update:modelValue', 'update:msg'])
 
const onChangeMsg = () => {
// 触发父组件的值更新
emit('update:modelValue', '恰如此时此刻')
emit('update:msg', '彼时彼刻')
}
</script>
```

父组件



```javascript
<template>
// v-model:modelValue简写为v-model
// 绑定多个v-model
<Children v-model="name" v-model:msg="msg"></Children>
</template>
 
<script setup lang="ts">
import { ref } from 'vue'
import Children from "./Children.vue"
 
const msg = ref('hello啊')
const name = ref('树哥')
</script>
```

## 18、自定义指令

自定义指令的生命周期

- created 元素初始化的时候
- beforeMount 指令绑定到元素后调用 只调用一次
- mounted 元素插入父级dom调用
- beforeUpdate 元素被更新之前调用
- update 这个周期方法被移除 改用updated
- beforeUnmount 在元素被移除前调用
- unmounted 指令被移除后调用 只调用一次

实现一个自定义拖拽指令



```xml
<template>
<div v-move class="box">
<div class="header"></div>
<div>
  内容
</div>
</div>
</template>
 
<script setup lang='ts'>
import { Directive } from "vue";
const vMove: Directive = {
mounted(el: HTMLElement) {
let moveEl = el.firstElementChild as HTMLElement;
const mouseDown = (e: MouseEvent) => {
  //鼠标点击物体那一刻相对于物体左侧边框的距离=点击时的位置相对于浏览器最左边的距离-物体左边框相对于浏览器最左边的距离
  console.log(e.clientX, e.clientY, "起始位置", el.offsetLeft);
  let X = e.clientX - el.offsetLeft;
  let Y = e.clientY - el.offsetTop;
  const move = (e: MouseEvent) => {
    el.style.left = e.clientX - X + "px";
    el.style.top = e.clientY - Y + "px";
    console.log(e.clientX, e.clientY, "位置改变");
  };
  document.addEventListener("mousemove", move);
  document.addEventListener("mouseup", () => {
    document.removeEventListener("mousemove", move);
  });
};
moveEl.addEventListener("mousedown", mouseDown);
},
};
</script>
 
<style >
.box {
position: fixed;
left: 50%;
top: 50%;
transform: translate(-50%, -50%);
width: 200px;
height: 200px;
border: 1px solid #ccc;
}
 
.header {
height: 20px;
background: black;
cursor: move;
}
</style>
```

## 19、自定义 hooks

我们都知道在 vue 中有个东西叫 mixins，他可以将多个组件中相同的逻辑抽离出来，实现一次写代码，多组件受益的效果。

但是 mixins 的副作用就是引用的多了变量的来源就不清晰了，而且还会有变量来源不明确,不利于阅读，容易使代码变得难以维护。

- Vue3 的 hook函数 相当于 vue2 的 mixin, 不同在与 hooks 是函数
- Vue3 的 hook函数 可以帮助我们提高代码的复用性, 让我们能在不同的组件中都利用 hooks 函数

**useWindowResize**

我们来实现一个窗口改变时获取宽高的 hook



```javascript
import { onMounted, onUnmounted, ref } from "vue";
 
function useWindowResize() {
const width = ref(0);
const height = ref(0);
function onResize() {
width.value = window.innerWidth;
height.value = window.innerHeight;
}
onMounted(() => {
window.addEventListener("resize", onResize);
onResize();
});
onUnmounted(() => {
window.removeEventListener("resize", onResize);
});
return {
width,
height
};
}
 
export default useWindowResize;
```

使用：



```xml
<template>
<h3>屏幕尺寸</h3>
<div>宽度：{{ width }}</div>
<div>高度：{{ height }}</div>
</template>
 
<script setup lang="ts">
import useWindowResize from "../hooks/useWindowResize.ts";
const { width, height } = useWindowResize();
</script>
```

## 20、style v-bind CSS变量注入



```xml
<template>
<span> style v-bind CSS变量注入</span>  
</template>
<script lang="ts" setup>
import { ref } from 'vue'
const color = ref('red')
</script>
<style scoped>
span {
/* 使用v-bind绑定组件中定义的变量 */
color: v-bind('color');
}  
</style>
```

 