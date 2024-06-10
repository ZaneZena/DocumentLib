

#  🌈 **NODE基本语法**

## 一.node入门基础知识与语法

##### 	1.node官网API文档

​		http://nodejs.cn/api/  

##### 	2.控制台 启动node项目代码

```
  npm run start
```

#####     3.JS能做与不能做的事情:

   		①js能做:操作css  操作dom 执行常规函数方法 前后端通信

​			②js不能做:不能链接数据库操作文件系统

#####     4.node async(异步) api基础知识点:

​		① 同步是请求与响应同步在一起,异步是不在一起

​		② 回调函数的至少有一个形参,而且在第一个位置,而且是error

#####     5.阻塞非阻塞区别 :

​       ①单线程阻塞,多线程非阻塞

## 二.基于命令行的实行生成express

` 1、npm install express-generator -g`
` 2、express 项目名称 // 表示在当前目录下生成一个项目`

## 三.常用基础代码操作

##### 1. 引用包

`const mypackage= require('./mypachage');`

##### 2.文件操作

```js
//①写入
fs.writeFile('./fs.txt','Hong',(e)=>{
    //错误优先原则
    if (e){
        console.error(e);return ;
    }console.log("成功");
    //同步fs.writeFileSync('./fs.txt',new Date())
})
```

```js
//②读取
fs.readFile('./fs.txt',(e,data)=>{
    if (e){
        console.error(e);return ;
    }console.log(data.toString());
})
```

##### 3.同步异常捕获

```
try {
    let data=fs.readFileSync('./fs.txt')
    console.log("成功");
    console.log(data.toString());
}catch (e) {
    console.error('出错');
}
```

##### 4.路径函数

```
const  path=require('path');
//参数中...是可选参数(任意)
console.log(path.join('a','../b','c'))
console.log(path.basename('./fs.txt'));
console.log(path.dirname('f./fs.txt'));
console.log(path.extname('./fs.txt'));*/
//获取当前目录路径
console.log(__dirname);
//获取当前目录文件路径,包括当前路径
console.log(__filename);
```

##### 5.美化日志=>(在bin包中的www替换onListening)

```js
var fs = require('fs');
function getPackageJson() {
    // console.log('----------------------1.开始读取package.json')
    var _packageJson = fs.readFileSync('./package.json')
    // console.log('----------------------读取package.json文件完毕')
    return JSON.parse(_packageJson)
}
function onListening() {
    var addr = server.address();
    var bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    console.log(`
#    _____                     .___
#  _/ ____\\  ____    ____    __| _/  ____
#  \\   __\\  /    \\  /  _ \\  / __ | _/ __ \\
#   |  |   |   |  \\(  <_> )/ /_/ | \\  ___/
#   |__|   |___|  / \\____/ \\____ |  \\___  >
#               \\/              \\/      \\/
=============================================
fnode :: (v0.0.1RELEASE)
        `)
    console.log(`[SYSTERM]${getPackageJson().name}应用启动中...`);
    console.log(`[SYSTERM]应用部署在${bind}`);
}
```

##### 6.node热更新=>(package.json中修改)

```
"scripts": {
  "start": "nodemon ./bin/www"
},
```

##### 7.app.js可改部分

1.引用路由 可改

```
*var usersRouter = require('./routes/users');
```

2.路由注册

```
app.use('/users', usersRouter);
```

###### 

## 四.补充注意点

##### 1.为什么要把所有静态资源（html文件，或者css之类）指定放置到与入口文件index.js同级的public文件夹下?

- 要把所有静态资源（html文件，或者css之类）指定放置到与入口文件index.js同级的public文件夹下

  -     index.js的app.use()函数也指定了public文件夹作为存放静态资源的路径。故sendFile()函数自动从public文件夹里寻找html

  ```
  var express = require('express');
  var app = express();
  var path = require('path');
  //加载静态资源
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', function(req, res) {
      res.sendFile('/index.html');
  });
  app.listen(8080);
  ```

  -    index.js在package.json中被指定为入口文件（相当于C语言的 main.cpp）=>不放在一个包实现方法

  ```
  var express = require('express');
  var app = express();
  var path = require('path');
  
  //app.use(express.static(path.join(__dirname, 'public')));
  
  app.get('/', function(req, res) {
      //res.send('hello!');
      res.sendFile(__dirname + '/index.html');
  });
  ```


​    

###### 2.新项目常用修改

​	二=>5,6,7







# 🌈 **请求req和响应原理resp（前后端传输简单示例）**



## 一.箭头函数和匿名函数区别(作用时间区别)

##### 	1.正常情况下this指向window

##### 	2.箭头函数是编译(解析)时=>

-     编译时指向当前this指向

##### 	3.匿名函数是进行(运行)时=>

-   全局环境指向window   function

## 二.数据传输简单基础原理=>(服务端,浏览器,POST,GET)

##### 	1. 浏览器访问原理=>

-    协议=>ip=>端口=>uri

##### 	2. 服务端(前端)数据传输过程=>

-   控制层=>逻辑层=>数据层=>后端(数据持久层)

##### 	3. GET与POST区别:=>

* GET是进行明文传递,POST非明文请求数据放在请求体中

  

## 三.状态码大致意义

* 4xx开头是客户端,
* 5xx开头服务端问题,
* 200 ok,
* 3开头 nginx请求转发

## 四.请求响应与跨域

#####   1.req:request（请求对象）=>

-     代表,所有跟请求有关的东西都在req对象里头,包括请求参数 请求头 请求头 cookie

##### 2.res:response（响应对象）=>

-   所有响应客户端的东西都在res里头,包括相应参数,响应头(跨域处理就是在这)

##### 3.跨域请求的本质与原理=>

-   当一个请求url的协议、域名、端口三者之间任意一个与当前页面url不同即为跨域

-   请求本质是成功的,但是浏览器判断本次请求不安全

## 五.resp.send注意事项

1. ##### 每个完整的请求,一定要以resp.send来结束请求,强调结束请求,而不是以resp.send结束代码

2. #####  如果请求结束了,也想让逻辑代码结束,那么一定要以return结束

```
let start=(req,resp)=>{
    resp.send(req.query)
    return;
    console.log(111);}
```

## 六.补充注意点

##### 1.JQ入口函数意义=>

-   入口函数,通常使用和window.onload一样的功效

-   区别:在jquery文件加载后,同时当前的window下面已经有了$和jq对象后,才开始运行





------





# 🌈 Cookie、session、图片验证码、jwt的使用

## 一.response.cookie和request.cookie的区别

##### 1.范围特点使用语法各不相同

```
response.cookie：
```

1.  操作过的Cookie，所有方法获取到的都是被更新过的值，也就是说Response.Cookies是修改所有容器中的Cookie的值。   
2.  用于在客户端写入cookie值。若指定的cookie不存在，则创建它。若存在，则将自动进行更新。结果返回给客户端浏览器。   

3.  Response.Cookies(CookieName)[(key)|.attribute]=value。这里的CookiesName是指定的Cookie的名称，如果指定了Key，则该Cookie就是一个字典，Attribute属性包括Domain，Expires，HasKeys，Path，Secure。

```
request.cookie：
```

1.  创建的Cookie只能用于后台不能用于HTML的前台。
2.  设置cookie的最大有效期为30天，然后通过Response回送cookie到浏览器。
3.  Request.Cookies使用语法：Request.Cookies(cookie)[(key)|.attribute]。

## 二.Cookie代码示范

```js
/**
 * 设置cookie
 */
function setCookie(name, value, seconds) {
    console.log('进入setCookie逻辑函数')
    seconds = seconds || 0;   //conds有值就直接赋值，没有为0，这个根php不一样。
    var expires = "";
    // cookies随浏览器关闭而失效的方法:
    //     如果不设置Expires的属性那么Cookie的存活时间就是在关闭浏览器的时候。
    if (seconds != 0 ) {      //设置cookie生存时间
        var date = new Date();
        date.setTime(date.getTime()+(seconds*1000));
        expires = "; expires="+date.toGMTString();
    }
    document.cookie = name+"="+escape(value)+expires+"; path=/";   //转码并赋值
}

/**
 * 读取cookie
 */
function getCookie(name) {
    console.log('进入getCookie逻辑函数');
    var nameEQ = name + '='
    var ca = document.cookie.split(';') // 把cookie分割成组
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i] // 取得字符串
        while (c.charAt(0) == ' ') { // 判断一下字符串有没有前导空格
            c = c.substring(1, c.length) // 有的话，从第二位开始取
        }
        if (c.indexOf(nameEQ) == 0) { // 如果含有我们要的name
            return unescape(c.substring(nameEQ.length, c.length)) // 解码并截取我们要值
        }
    }
    return false
}

/**
 * 检查cookie
 * @param c_name
 * @return {boolean}
 */
function checkCookie(c_name) {
    username = getCookie(c_name);
    console.log(username);
    if (username != null && username != "") {
        return true;
    }
    else {
        return false;
    }
}

/**
 * 清除cookie
 * @param name
 */
function clearCookie(name) {
    setCookie(name, "", -1);
}
```

## 三.Cookie生命周期

如果要立马失效时间要设置为-1,设置为0为本次浏览器关闭结束生命周期

  如果不设置Expires的属性那么Cookie的存活时间就是在关闭浏览器的时候。

## 四.session使用

###### 		1.session的概念=>

​			会话（生命周期：通常是浏览器关了，session就没了，不同的浏览器有不同的session，永久不冲突）

###### 		2.session的应用--》

​			用来存储会话级别的变量：令牌的解密秘钥等，当前登录的用户的信息（可以给数据拾释压）

###### 		3.session的使用--》区别于之前我们使用cookie的用法:

   1. ###### cookie的用法：前后端共享的变量区域

         1. 获取cookie:由请求对象来实现
                                  				2.  操作cookie：包括增删改 由响应对象来实现

            		2. ###### session的用法：只能服务端操作，仅仅是存在在服务端
            	
            			1.  获取由请求对象来获取
            			2.  操作由请求对象来操作

​         

###### 4.原理解答=>

就是当访问一个页面的时候给浏览器创建一个独一无二的号码，也给同时创建的session赋予同样的号码。这样就可以在打开同一个网站的第二个页面时获取到第一个页面中session保留下来的对应信息（理解：当访问第二个页面时将号码同时传递到第二个页面。找到对应的session。）。这个号码也叫sessionID，session的ID号码，session的独一无二号码。


###### 5.session安装语句

```
 npm install express-session
```

###### 6.配置中间件=>app.js

注意 :设置在var app = express();之后,路由之前

```js
//设置在var app = express();之后
//引入session
const session=require('express-session')
//配置中间件 maxAge单位为ms
app.use(session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
    //maxAge:最多可以存活多久
    cookie: ('name', 'value',{maxAge:  5*60*1000,secure: false})
}));
```

###### 7.express-session使用

```js
// 设置session
req.session.username="张三"

//获取session
req.session.username

//重新设置cookie的过期时间为1s
req.session.cookie.maxAge=1000;

//销毁session
req.session.destroy(function(err){

})
```

## 五.图片验证码实现

###### 1.svg安装

```
npm install svg-captcha
```

###### 2.图片验证码代码

①前端页面代码

```html
<fieldset >
    <legend>验证码
    </legend>
    <img src="http://localhost:3000/users/getCaptcha" alt="">
    <input  id="capText">
    <button type="button" onclick="captachaValid()">验证</button>
</fieldset>
```

②运行函数

```js
function captachaValid(){
    future.ajax({
        url:'/users/captachaValid',
        type:'get',
        data:{
            captcha:$('#capText').val()
        },success:function (result) {
            alert('验证成功')
        }
    })
}
```

③路由文件中(routes/users)

```js
var svgCaptcha = require('svg-captcha');
router.get('/getCaptcha', function(req, res, next) {
  var captcha = svgCaptcha.create({
    // 翻转颜色
    inverse: false,
    // 字体大小
    fontSize: 36,
    // 噪声线条数
    noise: 2,
    // 宽度
    width: 80,
    // 高度
    height: 30,
  });
  // 保存到session,忽略大小写
  req.session.captcha = captcha.text.toLowerCase();
  console.log(req.session.captcha); //0xtg 生成的验证码
  //设置什么格式返回前端,默认text格式
  res.setHeader('Content-Type', 'image/svg+xml');
  //将此数据转成字符串写入传到前端,并且.write并不会结束请求可以多次调用
  res.write(String(captcha.data));
  res.end()
})
```

###### 3.验证码使用实操

1. 安装npm install svg-captcha

2. 直接使用captcha的api

3. 直接根据captcha生成的对象做解析

4. 幅度段返回验证码之前需要缓存验证码的内容(共后续验证用)

5. 完成验证码的点击刷新功能

    ```html
    <img src="http://192.168.0.151:3000/users/getCaptcha" onclick="javascript:this.setAttribute('src','http://192.168.0.151:3000/users/getCaptcha?v='+new Date().getTime())">
    ```

    ```js
   //根据token不同生成不同验证码
   obj.setAttribute('src','http://localhost:3000/users/getCaptcha?v='+new Date().getTime()+"&token="+window.localStorage.token)
    ```

## 六.拦截器=>jwt

##### 1.jwt安装

```
npm install jsonwebtoken
```

##### 2.jwt的相关api=>

###### 	a.jwtUtils

```js
// 安全拦截器
const jwt = require("jsonwebtoken");
/**
 * 验证权限
 * @param token
 * @param secretkey 秘钥
 * @param success
 * @param error
 */
function verify(token, secretkey, success, error) {
    jwt.verify(token, secretkey, function (err, decode) {
        if (err) {
            if (error) {
                error(err);
            }
        } else {
            if (success) {
                success(decode);
            }
        }
    })
}
/**
 * 签名
 * @param load 载荷 json对象 存储存在
 * @param secretkey 秘钥
 * @param expiresIn 过期时间 秒
 * @returns {number | PromiseLike<ArrayBuffer>}
 */
function sign(load, secretkey, expiresIn) {
    var token = jwt.sign(load, secretkey, {expiresIn: expiresIn});
    return token;
}

/**异步转同步
 * 这个再app.js路由调用中已经转换过一次,所以不用重复转换
 * @param token
 * @param secretkey
 * @returns {Promise<any>}
 */
function verifysync(token, secretkey) {
    return new Promise((resolve, reject) => {
        jwt.verify(token, secretkey, function (err, decode) {
            if (err) {
                if (err) {
                    console.log(err.message);
                    resolve({err: 'error', msg: '绘画已过期'})
                } else {
                    resolve(decode)
                }
            }
        })

    })

}

module.exports = {verify, sign, verifysync};

/*//使用解密
let user={id:111,name:'user',password:123456};
/!*
//q清空密码
delete user.password;
let token=sign(user,'123456',10);*!/
//解密
let token=sign(user,'123456',10);
verify(token,"123456",function (user) {
    console.log(user);
},function (err) {
    console.error(err)
    }
)
console.log(token);*/
/*verify(token,'123456',function (user) {
    console.log(user)
},function (err) {
    console.error(err);
})*/
```

###### 	b.拦截器中间件=>

```js
//拦截器中间件,原本
app.use(function(req,resp,next){
    log.debug(req.path);
    if(req.path !='/mine.html' && req.path !='/user/login' && req.path !='/user/register'){
        let token = req.headers.token;
        safeInterceptor.verify(token,global.secretKey,function(user){
            req.headers.sessionData = user;
            next();
        },function(err){
            next();
        })
    }else{
        next();
    }
})



/**
 * 全系统允许跨域处理 这段配置要再new出express实例的时候就要设置了，放在所有的api前面，不然没有效果
 */
app.all("*",function(req,res,next){
    //设置允许跨域的域名，*代表允许任意域名跨域
    res.header("Access-Control-Allow-Origin","*");
    //允许的header类型
    res.header("Access-Control-Allow-Headers","*");
    //跨域允许的请求方式
    res.header("Access-Control-Allow-Methods","*");
    if (req.method.toLowerCase() == 'options')
        res.send(200);  //让options尝试请求快速结束
    else
        next();
});

```

```js
/**
 * 拦截器中间件,登陆注册功能时修改使用的
 */
app.use(async function(req,resp,next){
    let path =req.path;
    //检查路由 决定是否拦截,``````````~~~~~~~~!!!!!犯的错误:将除了登陆外的全部拦截了
    if (path.startsWith('/users/login')||path.startsWith('/user')) {
        console.log("登入页面放行")
        next();
    }else{
        //从请求头里面拿到令牌==>常规方法
        let token =req.headers.token;
        if(!token){
            //非常规状况(文件下载,是否没办法设置请求头,或者例如获取验证码等)
            token=req.query.token;
        }
        let result=await jwtUtils.verifysync(token,global.globalKey)
        if (result.err) {
            // resp.status(500)
            resp.send(result.msg)
            // throw  new Error(result.msg)
        }else{
            req.headers.session=result;
            //表示执行下一步动作-->放行
            console.log("成公了")
            next();
        }

    }
```

##### 3.前后端分离的场景=>

当前用户的身份如果以明文传输,很容易故意被模仿,所以 需要对用户的身份进行加密传输
          加密传输的方式:
                        1)https
                        2)rsa 非对称加密
                        3)aes 对称密钥
                        4)jwt json web token: 目前比较流行的

##### 4.jwt的作用=>

```
用来加密门票用的.
加密:1)被加密 2)用什么加密(加盐)
简单版的:密钥共用,但是被加密的东西不一样
```

##### 5.实际操作=>

1.   在用户登录成功之后使用jwt对用户的基本信息进行加密(注意要提出密码属性)
2.   加密之后,将token返回到前端,存储到localStorage
3.   每次请求,在请求发送之前,将localStorage里头的令牌,当作请求头一起发送
4.   服务端针对需要验权(鉴权)的api进行定制化拦截(前置拦截器)
5.   将拦截下来的req里头的令牌取出来,并做解密错做
     1.      解密成功:将解密出来的对象,即用户的基本信息对象,并将该基本信息对象存到请求头里去(单线程变量-用时间换空间)
     2.      解密失败:请求结束并报错(会话已经过期,请重新登录,前端的表现通常时直接重定向到登录页面)
6.   执行业务代码,如果执行的过程需要用到用户信息,那么不要再从数据库里头去查询数据,直接从请求捞就行了





# 🌈 遇到的问题与解决方法

##### 1.为何在字符串中转义不出变量

​	问题代码位置=>console.log('会话ID:${req.sessionID}');=>test/users.js=>26  

​	问题分析=>用错符号,应用模板符号

​	问题解决=>使用``而不能用''

##### 2.为什么在后台代码test/users中调用不了public中的自定义(CookieUti.js)js包中的函数?

​	问题代码位置=>test/users.js=>35

​	问题分析=>在后台代码test/users中调用静态资源中的文件,导致调用错误

​    原理剖析=>本质上node是后台代码,其中包括bin/www , routes/users.js||index.js ,node_modules  ,app.js , 

​						package.json都是后台文件, 而public其实是单独的静态文件,它与后台文件是通过共享port端口进行数								据传输,而不能相互调用

​						





------





------





# 🌈 知识点的复习与补充

## 一.对于一个新项目实操准备工作

###### 1、重新配置app.js

   1. 配置全局异常处理拦截器（后置拦截器）

      ```
       res.status(err.status || 500);
      /*
      *  ①配置全局异常处理拦截器(后置拦截器)
      * */
       res.render(err.message);
      ```

   2. 配置全局请求拦截器（前置拦截器）--后面一起讲（jwt）

###### 2、基于public构建同域前端

1.  public作为静态的目录文件夹是可以配置的
2.  静态目录里头的文件和服务端的文件是要区分开来的，不具备相互引用的能力
      1. 静态目录里头的文件最终都是在客户端被访问
      2. 服务端里头的文件只提供服务，不提供文件的访问
      3. 静态文件和服务端的文件之间的交互要通过http请求来实现（ajax fetch axios）

###### 3. 使用session

​		使用express-session来操作服务端的session

​		安装：npm install express-session

```
/*引用session
* */
let session=require('express-session')
/*
*session配置
* */
app.use(session({
    secret:"keyboard cat"
}))
```

###### 4. 验证码

1. ① 安装

   ```
   npm install svg-captcha
   ```

2. 直接使用captcha的api

3. 直接根据captcha生成的对象做解析

4. 幅度段返回验证码之前需要缓存验证码的内容(共后续验证用)

5. 完成验证码的点击刷新功能

```
//  <img src="http://192.168.0.151:3000/users/getCaptcha" onclick="javascript:this.setAttribute('src','http://192.168.0.151:3000/users/getCaptcha?v='+new Date().getTime())">
```

## 二.重要准则

###### 1.很重要的准则：

1. 指令可以也应该要全局安装
2. 依赖通常是装在局部，（没办法确保项目和全局的目录是一个侄子和叔叔的关系）

###### 2.require引用包的一个次序。

1. 主要理解 省略后缀名的场景和 node_modules找包的一个次序（从里往外）

​	

​	



------





# 🌈 Promise+await+async概念及简单应用

##  一.Promise

##### 	1.Promise作用:

>    ###### 用来解决回调地狱问题，但是只是简单的改变格式，并没有彻底解决上面的问题真正要解决上述问题，一定要利用promise再加上await和async关键字实现异步传同步

#####     2.Promise运行=>

```js
//new的时候方法体就立刻运行
new Promise(function (resolve,reject){//业务代码}）
```

#####    3.Promise的参数解释=>

1. resolve:表示方法体里头执行成功之后的回调函数

  2. reject:表示方法体里头出错后的回调函数
  3. Function(函数):支持多层嵌套的回调函数作为方法体内容

#####     

##     二.Promise+await+async=>

##### 							1)Promise==>异步

##### 							2)await==>异步转同步

​			1.await 可以理解为是 async wait 的简写。await 必须出现在 async 函数内部，不能单独使用。

​			2.await 后面可以跟任何的JS 表达式。虽然说 await 可以等很多类型的东西，但是它最主要的意图是用来等待 						Promise 对象的状态被 resolved。如果await的是 promise对象会造成异步函数停止执行并且等待 promise 的						解决,如果等的是正常的表达式则立即执行。

##### 							3)async==>同步转异步

1.    方法体内部的某个表达式使用await修饰，那么这个方法体所属方法必须要用async修饰所以使用awit方法会自动升级为异步方法



# 🌈  Redis+Mysql数据库安装以及使用 

## 一.Redis(远程字典服务)

### 	1.Redis的特点:

1)工作的时候用的是以内存作为储存媒介,支持持久化

###     2.Redis的优点:

###### 				1.速度快

>    ​	(1) 因为数据存在内存中，类似于 HashMap ，HashMap 的优势就是查找和操作的时间复杂度都是O (1) 。
>    (2) Redis 本质上是一个 Key-Value 类型的内存数据库，很像Memcached ，整个数据库统统加载在内存当中进行操作，定期通过**异步操作**把数据库数据 flush 到硬盘上进行保存。fork子进程持久化。
>    (3) 因为是纯内存操作，Redis 的性能非常出色，每秒可以处理超过 10 万次读写操作，是已知性能最快的 Key-Value 数据库。

###### 				2.支持丰富数据类型: String ，List，Set，Sorted Set，Hash 。

>    Redis 的出色之处不仅仅是性能，Redis 最大的魅力是支持保存多种数据结构，此外单个 Value 的最大限制是1GB，不像 Memcached只能保存1MB的数据，因此Redis可以用来实现很多有用的功能

###### 				3.丰富的特性

>    订阅发布 Pub / Sub 功能
>    Key 过期策略
>    事务
>    支持多个 DB
>    计数

###### 				4.持久化存储

>    Redis 提供 RDB 和 AOF 两种数据的持久化存储方案，解决内存数据库最担心的万一 Redis 挂掉，数据会消失掉。

### 		3.Redis的缺点:

>    1.由于 Redis 是内存数据库，所以，单台机器，存储的数据量，跟机器本身的内存大小。虽然 Redis 本身有Key 过期策略，但是还是需要提前预估和节约内存。如果内存增长过快，需要定期删除数据。
>
>    2.redis是单线程的，单台服务器无法充分利用多核服务器的CPU

### 4.Redis -window 64bit 版本的使用=>

##### 		1.安装:免安装

##### 		2.使用:

###### 			1.双击redis-server.exe

>    Q: 如果启动报错建议查看错误日志(最难的bug,最难的是除了bug,没有bug)
>
>    *           eg:没有找到配置文件
>    *           解决措施:基于cmd运行下面命令来解决(显卡的指定配置0)
>    *           redis-server.exe redis.window-service.conf(解释:指定以后面那个位置)

###### 			2.redis-cli.exe双击(客户端测试时候使用)

###### 			3.熟练掌握两个命令: set key value   ,   get key

### 5.实际操作(基于node来连接redis)=>

###### 	   1.安装node 的redis 的依赖包, npm install redis

###### 		2.熟练调度redis的基本api

###### 		3.登陆成功后将用户的信息存储在redis里头,取而代之不用session

###### 		4.每次获取用户具体的信息的时候不走数据库,直接走redis



### 6.redisUtil(封装工具包)=>

```js
const redis = require('redis');
const client = redis.createClient(6379, 'localhost');
// const client = redis.createClient();
//获取当前db中所有的key
// function getdbnamelist(){
//     // 相当于命令（keys *）, 返回list，包含当前db所有key的名字
//     client.keys('*',function(err,val){
//         console.log(val);
//         //callback(val);
//     });
// }

/**
 * 设置键值
 * @param dbNum 库号
 * @param key 键
 * @param value 值
 * @param expire 过期时间（单位：秒，可为空，为空则不过期）
 */
let set =  (key,value,expire,dbNum) => {
    if (typeof(value)=='object') {
        value=JSON.stringify(value)
    }
    
    console.log(`[redis]set key=${key}  value=${value}  expire=${expire}  dbNum=${dbNum}`)
    if (!dbNum) {
        dbNum = 0
    }
    return  new Promise((resolve, reject) => {
        client.select(dbNum,function (err) {//设置库
            if (err){
                console.error('redis set 选库失败：'+err)
                // throw new Error('redis set 选库失败：'+err);
            }else {
                client.set(key,value,function (err,result) {//设置值
                    if (err){
                        console.error('redis插入失败：'+err)
                        // throw new Error('redis插入失败：'+err);
                    } else {
                        if (!isNaN(expire) && expire>0){
                            client.expire(key, parseInt(expire));//设置过期时间
                        }
                        resolve(result);
                    }
                })
            }

        })
    })
};

/**
 * 获取缓存
 * @param key
 * @param dbNum
 * @return {Promise<*>}
 */
let get = async (key, dbNum) => {
    console.log(`[redis]get key=${key} dbNum=${dbNum}`)
    if (!dbNum) {
        dbNum = 0
    }
    return   new Promise((resolve, reject) => {
        client.select(dbNum, function (err) {//链接库
            if (err){
                console.error('redis set 选库失败：'+err)
                // throw new Error('redis get 选库失败：'+err);
            }else {
                client.get(key, function (err,result) {//获取值
                    if (err){
                        console.error('redis读取失败：'+err)
                        // throw new Error('redis get 获取失败：'+err);
                    } else {
                        resolve(result);
                    }
                })
            }
        })
    })

};

module.exports = {
    get,
    set,
    // getays
}
```

## 二.Mysql(关系型数据库管理系统)

### 1.安装Mysql准备工作

>    选择引擎（innoDB(支持十五，通常我们会使用innoDB) Myisam Memory(内存数据库)）
>    选择编码    （一定要用UTF-8）
>    mysql
>    版本：目前使用5.7版本
>    安装（服务端）：
>    安装（客户端）：
>    REPL(mysql -u 用户名 -p 回车 再输入密码)
>    NAVICATE (破解)
>    NAVITOR (功能比较齐全，需自己下载)

### 2.mysql的运行原理:

	> 分析器
	       优化器
	       执行器(缓存)

### 3.实际操作=>

###### 			1.实现客户端连接数据库

###### 			2.基于客户端完成一张表的创建和配置过程

###### 			3.基于客户端完成mysql语法的基本讲解

###### 			4.NODE来操作数据库=>

>     4.1下载mysql的包
>       	  4.2实现node操作mysql的api
>        	 4.3实现用户注册-用户信息入库保存
>             4.4实现用户登录-根据数据库用户信息验证合法性
>       	 4.5实现获取当前用户的全部信息的功能

### 4.数据类型

##### 	1.js基础数据类型

>    Boolean
>    Number
>    Undefined
>    Object
>    String
>    Function

##### 	2.数据库基本数据类型

>    tinyint  =>boolean
>    int    =>int
>    varchar(length->长度参数）)  =>String
>    mediumtext  ==>长文本
>    datetime=> 时间Date类型

### 	5.数据库自动填入创建时间

```
//在时间戳那个数据默认中输入，表示自动填入时间
		CURRENT_TIMESTAMP
```

### 6.Mysql入门

###### 	1.mysql入门教学-概念

>数据库=》excel
>
>表 =》sheet
>
>字段=》字段
>
>主键 =》如果某个字段是逐渐，那么要求该字段的内容不能为空且不重复
>
>非空=》要求这个字段不嫩为空

2.mysql入门教学-基础数据库语句=>

```js
创建数据库：create database db_name character set utf8;

删除数据库：drop database db_name;

切换数据库：use dbname

创建表：create table student(id int primary key comment'这里写注释',name 
varchar(20),sex char(1) ,address varchar(20));

删除表：drop table tb_name1,tb_name2;

写入数据：全字段写入
insert into student values(001,'刘亦菲','女','湖北武汉'),(002,'杨幂','女','北京')；

写入数据：可选字段写入，其他字段自增或有默认值
insert into student(name,address) values('刘亦菲','湖北'),('杨幂',,'北京'),('刘诗诗','北京');

删除数据：delete from tbname where 条件，只删数据，不删结构
delete from student where id=003;

修改数据：update student set key=value,key2=value2 where 条件
update student set address='湖北' where id=001;

查看数据：select 字段1，字段2，.. from tbname；
select * from student;

查看表的结构：desc tbname；

修改表名：alter table tb_name rename to tb_name_new;

修改字段(包括名称，类型，约束)：alter table tb_name change column_name column_name_new 数据类型 约束;
例：alter table student change sex 性别 char(1) not null default '女';

修改字段类型：alter table tb_name modify column_name 修改后的字段类型；

添加字段：alter table 表名 add 字段名 数据类型 约束 字段位置(first,或者after xxx);
例：alter table tb_name add column_name decimal not null after cno;第一个则用first

删除字段：alter table tb_name drop column_name；

修改字段的默认值：alter table tb_name alter column_name set Default 666;

删除字段的默认值：alter table tb_name alter column_name drop Default;

查看建表命令：show create table tbname；内含表的编码格式

修改数据库编码格式：alter database <数据库名> character set utf8;

修改表的编码格式：alter table 表名 convert to character set utf8;

//笔记记载
查询用户信息
获取 id为1并且account为a的用户信息
SELECT * FROM `user` a WHERE id = 1 AND account = 'a'

获取到的信息分页  第几个开始，每页的个数
SELECT * FROM `user` LIMIT 1,2

//根据密码分组
SELECT COUNT(1), pwd FROM `user` GROUP BY pwd

//左连接
SELECT a.name AS '用户名', b.name AS '课程' FROM `user` a LEFT JOIN lesson b ON a.id=b.user_id

//更新修改
UPDATE `user` SET pwd='1231' WHERE id ='1'
```

### 7.mysqlUtil(数据库工具包)=>

```js
// 操作数据库模块 扫地僧 2019年5月30日19:58:46
var mysql = require('mysql');
let logPrefix=mysql
var pool = mysql.createPool({
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    port     : '3306',
    database : 'xunke725'//数据库名称
});

/**
 * 增删改查 通用组件  同步写法
 *
 * @param sql 增删改查sql 含占位符
 * @param params 跟占位符顺序匹配的参数数组，要求跟sql的占位符数量一样多
 */
let exec =  function (sql,params) {
    // 返回一个 Promise
        return  new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                } else {
                    //query执行sql语句
                    connection.query(sql, params, (err, results) => {

                        if (err) {
                            console.error(err)
                          //  reject(err)
                        } else {
                            console.log(`${logPrefix}result : ${JSON.stringify(results)}`);
                            resolve(results)
                        }
                        // 结束会话 释放链接
                        connection.release()
                    })
                }
            })
        })
}

/**
 * 将所有的参数格式化成数组 参数是可变参数（可变参数在函数声明的时候不写）
 * @returns {Array}
 */
let formatParams = function () {
    var array = [];

    //js中有个变量arguments,可以访问所有传入的值
    for(var i = 0, l = arguments.length; i < l; i++){
        array.push(arguments[i]);
    }
    return array;
}
module.exports = {exec, formatParams};
```

### 8.我的数据库线程池封装代码

```js
const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    port: '3306',
    database: 'vue_store',
    // timezone: '+08:00' //东八时区
    timezone: 'local',
})

/**
 *
 * 自己封装的数据模型的基类
 * 封装了数据库操作
 */
module.exports = class Model {

    /**
     * 通用查询方法
     * @param {string} sql 要执行的SQL语句
     * @param {Array} params 给SQL语句的占位符进行赋值的参数数组
     */
    static query(sql, params) {
        return new Promise((resolve, reject) => {
            pool.getConnection(function (err, connection) {
                if (err) {
                    console.error(err)
                    connection.release()
                } else {
                    //query执行sql语句
                    connection.query(sql, params, (err, results) => {
                        //在外部用catch截取
                        if (err) {
                            console.error(err)
                             reject(err)
                        } else {
                            resolve(results)
                        }
                        // 结束会话 释放链接
                        connection.release()
                    })
                }
            })
        })
    }

    static formatParams() {
        var array = [];
        //js中有个变量arguments,可以访问所有传入的值
        for (var i = 0, l = arguments.length; i < l; i++) {
            array.push(arguments[i]);
        }
        return array;
    }
}
```





# 🌈 遇到问题以及解决

#### 	1.控制台报错Error: Expected "payload" to be a plain object

​			1.问题出现场景

```js
//sign第一个参数必须是对象 ```````````!!!!!!!!!!!!!!!!!重点
//犯的错误:传入第一个参数其实并没有转化好导致报错
resp.send(jwtUtils.sign({id:loginSuss[0].id},global.globalKey,3600))
```

​			2)解决方式

```js
拦截器,传入参数错误
*错误代码：
var token = jwt.sign(user, 'app.get(superSecret)',
解决代码：
var token = jwt.sign(user.toJSON(), ‘app.get(superSecret)’,
```

#### 2.控制台报错Uncaught TypeError: Cannot read property 'setItem' of undefined

1)问题出现场景

```js
//localStorage写成localstorage导致变成声明一个window变量
window.localstorage.setItem("token",result);
```

2)解决方式

```js
//登陆成功后写入localStorage的token ~~~~~!!!!!!!!S未大写
window.localStorage.setItem("token",result);
```

#### 3.由于将登录以外的路径拦截 导致图片验证码以及其他的都无效且不显示

1)问题出现场景

```js
//检查路由 决定是否拦截,``````````~~~~~~~~!!!!!犯的错误:将除了登陆外的全部拦截了
if (path.startsWith('/users/login')) {next();}
```

2)解决方式

```js
//此处我将所有user的路径暂时都放出来
if (path.startsWith('/users/login')||path.startsWith('/user')) {  next();}
```

#### 4.Promise+await+async的使用相关问题

1)问题出现场景

```js
let login= (req,resp)=>{
    let loginSuss=  mysqlUtil.exec(loginSql,mysqlUtil.formatParams(name))
    }
```

2)解决

mysqlUtil.exec()内是一个Promise,需要await异步转同步,否出得到的返回值将会是一个挂起的Promise对象

加完后要在外部login函数上加async,将整体转为异步方法,内部由await也必须加上这个

```js
let login=async (req,resp)=>{
let loginSuss= await mysqlUtil.exec(loginSql,mysqlUtil.formatParams(name))
}
```



# 🌈 pm2  、nginx的概念与使用

### 一.pm2命令

##### 	1.pm2的使用

>    进程守卫:
>         1.监控当前的项目的资源的消耗情况
>         2.实现对当前的项目的热部署

##### 	2..实际操作

######       	  1.pm2安装

```
	 npm install  pm2 -g
```

######       	  2.检验是否由安装成功:

```
 npm list 包名 -g
```

######        	 3.了解下面的命令的使用以及顺序

```
    pm2 init    				##创建pm2配置文件
    pm2 start bin/www   ##启动服务器 bin/www表示要运行的脚本,express项目就
    pm2 list            ##查看运行状态
    pm2 log             ##查看日志
    pm2 restart www     ##重启应用 www是 pm2启动进程的名称
    pm2 stop www        ##停止应用 www是 pm2启动进程的名称(也可以输入id)
    pm2 delete www      ##卸载应用(即终止运行) www是 pm2启动进程的名称(也可以输入id)
    pm2 monit           ##实时监控cpu
```

###### 4.ecosystem.config.js修改

```js
module.exports = {
  apps : [
      //删除apps里面所有元素,这些都是多余的,然后添加以下元素
      {
          script: 'bin/www',
          //监听
          watch: true
      },
  ],
```



### 二.**Nginx**

#### 	1. 了解Nginx:

>    Nginx是一款[轻量级](https://baike.baidu.com/item/轻量级/10002835)的[Web](https://baike.baidu.com/item/Web/150564) 服务器/[反向代理](https://baike.baidu.com/item/反向代理/7793488)服务器及[电子邮件](https://baike.baidu.com/item/电子邮件/111106)（IMAP/POP3）代理服务器，在BSD-like 协议下发行。其特点是占有内存少，[并发](https://baike.baidu.com/item/并发/11024806)能力强，事实上nginx的并发能力在同类型的网页服务器中表现较好，中国大陆使用nginx网站用户有：百度、[京东](https://baike.baidu.com/item/京东/210931)、[新浪](https://baike.baidu.com/item/新浪/125692)、[网易](https://baike.baidu.com/item/网易/185754)、[腾讯](https://baike.baidu.com/item/腾讯/112204)、[淘宝](https://baike.baidu.com/item/淘宝/145661)等。

#### 	2.Nginx的作用:

>1)反向代理解决跨域问题
>		2)负载均衡
>		3)翻墙......

#### 	3.Nginx的三个bat文件=>

###### 		3.1)start.bat=>

```bat
start nginx -c ./conf/nginx.conf
echo success
pause
```

###### 		3.2)stop.bat=>

```bat
nginx.exe -s stop
echo success
pause
```

###### 		3.3)reload.bat=>

```bat
nginx.exe -s reload
echo success
pause
```

#### 4.Nginx实操=>

###### 	4.1)配置start.bat stop.bat reload.bat

1.   start.bat :启动nginx(通过start.bat启动的nginx,千万不能多次启动,否则会出现多个nginx实例,这个时候stop来不及了  stop只能关闭最后一个,但是如果真的犯错了,怎么关闭以前呢:在任务栏,右击打开任务管理器==>进入到详细服务列表,找到nginx服务,统统结束)
2.   stop.bat :停用nginx(在start之后可以用)
3.   reload.bat:重启nginx(在start之后可以用)
4.   通过cmd执行start.bat来启动nginx启动之后,千万别关闭串口

######     4.2)nginx出现访问不了的情况=>

1.   只有一种:配置出现问题=>学会看日志: E:\nginx\logs\error.log去看日志内容

#### 5.配置文件=>

##### 		5.1)配置文件位置:

>    E:\nginx\conf\nginx.conf

##### 		5.2)配置文件服务器配置部分解释=>

```bat
server {
        listen       80;
        #//监听的域名
        //本地IP地址
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
           #//如果是localhost 80端口   就访问根目录下的index.html
        location / {
            root   html;
            index  index.html index.htm;
        }
        //测试静态文件服务器配置(注意斜杠)
        location /xk {
              alias  E:/fyWebStrom/Xunke_Code/day7_27_28/public;
		}
		location /cross/ {
			proxy_pass  http://localhost:3000/;
			add_header  to http://localhost:3000;
		}
    }

```

##### 		5.3)静态文件服务器配置(注意斜杠)

###### 	5.3.1)方式一:	

```
location /qn { alias  E:/fyWebStrom/Xunke_Code/day7_27_28/public;	}
  alias表示别名,意思就是当我们请求的uri里头包含了qn,那么就会自动去访问alias指向的路径下的文件
    eg:
    http://localhost/qn/test.html
    表示:请求alias路径下的test.html
```

###### 	5.3.2)方式二:	

```
location  /qn{
    root E:/fyWebStrom/Xunke_Code/day7_27_28/public/Demo.html
    //表示根, 请求root路径下的qn文件夹下的test.html
}
```

#### 6.跨域代理=>

##### 6.1)配置文件配置:

```
server {
        listen       80;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        //nginx跨域配置
            location /cross/ {
        proxy_pass http://localhost:3000/;
        add_header to http://localhost:3000;
   } }
```

##### 6.2)配置proxy_pass代理转发四种方式=>

###### 	6.2.1)配置路径原理

>    在nginx中配置proxy_pass代理转发时，如果在proxy_pass后面的url加/，表示绝对根路径；如果没有/，表示相对路径，把匹配的路径部分也给代理走。

假设下面四种情况分别用 http://192.168.1.1/proxy/test.html 进行访问:

###### 	6.2.1)第一种方法:

```
location /proxy/ {
    proxy_pass http://127.0.0.1/;
}
代理到URL：http://127.0.0.1/test.html
```

###### 	6.2.2)第二种方法（相对于第一种，最后少一个 / ）:

```
location /proxy/ {
    proxy_pass http://127.0.0.1;
}
代理到URL：http://127.0.0.1/proxy/test.html
```

###### 	6.2.3)第三种方法:

```
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa/;
}
代理到URL：http://127.0.0.1/aaa/test.html
```

###### 	6.2.4)第四种方法(相对于第三种，最后少一个 / ）:

```
location /proxy/ {
    proxy_pass http://127.0.0.1/aaa;
}
代理到URL：http://127.0.0.1/aaatest.html
```

#### 7.Niginx配置文件及其跨域原理=>

###### 		① server表示启动一个代理服务器

###### 		② 该代理服务器也是静态文服 (静态文件要通过代理服务器来访问)

  			   1)因为代理服务器只能监听代理服务器的端口
  					  2)所以前端发出的所有请求一定是基于80端口去发出
  		   			  3)这样子,前端的所有跨域请求才可以被监听到
  					  4)才能实现 前端和代理服务器之间的不跨域

###### 		 ③ 80 表示监听80端口 所以最终我们的前端资源一定是部署在80端口上

 			    1)通过相对路径 html
 			  		 2)通过绝对路径  静态文服

###### 		 ④ location /cross

   			  1)服务端的接口的uri ,不一定要cross(联想alias,它只是一个规则,并没有表示真正的意图)
   					     http://localhost/cross/cross 后面的cross才是我们正要去访问的uri

###### 		  ⑤ proxy_pass

​    			  1) 表示我们真正想要请求的地址是......

###### 		  ⑥ add_header

   			   2) 就是我们在请求成功之后 响应头要添加的内容

###### 		  ⑦练习:

```
 http://localhost:81/cross/cross/get  (跨域不成功) 端口无法监听到
  http://localhost:81/cross1/cross/get (跨域不成功)找不到路径且端口也不正确
  http://localhost:80/cross/cross/get  (跨域成功)
```

> author(洪吉林)2020_7_16~28笔记

