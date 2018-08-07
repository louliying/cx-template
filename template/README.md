# vue移动端（车享）
vue 移动端单页项目

# vue

> vue+webpack 单页项目

[![node version](https://img.shields.io/badge/node.js-%3E=_6.00-green.svg?style=flat-square)](http://nodejs.org/download/)
# 安装启动

#### 安装Node
推荐安装最新的 `LTS` 版本Node，如果本地没有安装Node或安装了低版本的Node，可以按下面的指引安装最新版的Node：

1. **Windows系统**，访问[https://nodejs.org/](https://nodejs.org/)，下载最新的 `LTS` 版本Node，点击默认安装即可。
2. **Mac系统**安装方式跟Windows一样。
3. **Linux系统**，推荐使用源码安装方式，这样无需自己配置 `path`，如果无法用源码安装，也可以直接二进制版本的Node，解压后把里面的bin目录路径加到系统的 `PATH` 即可：
	- **源码安装**：从[Node官网](https://nodejs.org/en/download/)下载最新版的**Source Code**(或者用`wget`命令下载)，解压文件(`tar -xzvf node-xxx.tar.gz`)，进入解压后的根目录(`node-xxx`)，依次执行`./configure`、`./make`和`./make install`。
	- **直接用二进制版本**：从[Node官网](https://nodejs.org/en/download/)下载最新版的**Linux Binaries**(或者用`wget`命令下载)，解压文件(`tar -xzvf node-xxx.tar.gz`)，解压后将Node二进制文件的bin目录完整路径加到系统的 `PATH`。

Node安装完成后，在命令行执行 `node -v` 查看下对应的Node版本是否安装成功：

	$ node -v
	v8.9.4
我们可以使用淘宝镜像：

	npm install cnpm -g --registry=https://registry.npm.taobao.org

## Build Setup

``` bash
# install dependencies
npm install
or
cnpm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```


## Root Folder Structure


###########目录结构描|--
|-- Readme.md------------------------------------->help
|-- src------------------------------------------->根目录
|--     |-- assets---------------------------------->静态资源文件
|--     |-- common--------------------------------->公共方法  api  工具类
|--     |-- components----------------------------->组件(包含基本组件和业务组件)
|--     |-- pages ---------------------------------->页面  有组件组成
|--     |-- router -------------------------------->路由  (主要用一级路由)
|--     |-- components----------------------------->组件(包含基本组件和业务组件)
|--     |-- store  -------------------------------->数据通信，组件共享(可以改用公司内部的，目前还没有)
│   └── app.vue ------------------------------->根根组件
├── build  ------------------------------------> webpack 配置  </br>
│──  config ----------------------------------->上产环境开发，环境,接口代理
├── dist   ------------------------------------> 打包后的目录
├── static ------------------------------------>第三方库
├── .babelrc----------------------------------->es6转es5 使用新特性,代码兼容
|___ package.json------------------------------>项目运行，开发依赖包等等
|——— .gitignore-------------------------------->git 忽略文件
# 组件的封装的规范
公司前缀Smcv+组件名字
组件结构 统一用 index.vue index.js
导入的时候 import xxx from "@/components/xxx"
# page的书写规范
``` bash
template lang="html">
    <div>
        <Heador :props="props"/>
        <Life/>
        <Footor/>
        <Navbar/>
    </div>
</template>

<script>
import Heador from "../public/header.vue"
import Footor from "../public/footer.vue"
import Product from "./product.vue"
import Life from "./life.vue"
export default {
    components: {
        Heador,
        Life,
        Footor,
        Navbar,
    },
    data(){
      return{
        props:{}
      }
    }
    created:function(){
      api().then((response)=>{
          this.props = response.xxx;
      });
    }
}
</script>

业务逻辑，api的调用尽量放在 page里面 组件的数据来自page，实现解耦
详情看 components/Hello/index.vue
```
#配置接口代理
``` bash
 静态资源文件夹
    assetsSubDirectory: 'static',
 发布路径
    assetsPublicPath: '/',

 代理配置表，在这里可以配置特定的请求代理到对应的API接口
 例如将'localhost:8080/api/xxx'代理到'www.example.com/api/xxx'
 代理可以配置多个 如下例子
    proxyTable: {
      '/api': {
          target: 'www.example.com/', -------------------> 接口的域名
          secure: false,   ------------------------------>如果是https接口，需要配置这个参数
          changeOrigin: true, ---------------------------> 如果接口跨域，需要进行这个参数配置
          pathRewrite: {
            '^/api': ''
          }
      },
      '/api1': {
          target: 'www.example1.com/', -------------------> 接口的域名
          secure: false,  --------------------------------> 如果是https接口，需要配置这个参数
          changeOrigin: true,  ---------------------------> 如果接口跨域，需要进行这个参数配置
          pathRewrite: {
            '^/api1': ''
          }
      }
    },

```

```
  // 需要代理访问的域名
  let baseUrl = {
      serverB: 'http://baidu.com',
      serverA: 'http://gateway.fangkuaiyi.com',
  }
  // 配置请求接口和代理域名
  export const getInfo = async (param = {}, config = {}) =>
        await ajax.get(`${baseUrl.serverB}/mobile/home/getHeadData`,param, config);

```

# store modules 的分类和使用

```
modules/user 文件:
export default {
  name:"李晓龙",
  info:{},
  nameList:[
    {name:"李晓龙",age:29},
    {name:"科比",age:37}
  ],
}
```

```
// import 定义的 user 模块
import user from './modules/user';

// 对外抛出modules模块并自动挂载到this.$MD上
export default {
  modules: {
    user
  }
};


具体使用:
  this.$MD.user   // user 对应定义的module名
  this.$MD.user.name,   // user.name 对应user模块下的name属性
  this.$MD.user.getInfo // user.getInfo 对应user模块下的getInfo方法
```
# 前端技术规范

* 前端 javascript 的编写规范
* 前端 css 的编写规范

## 工具

#### webstorm
* 设置vue文件
    * ![](https://github.com/Edwardelric/vue2-koa2/blob/extend/share/template.png?raw=true)
* 设置es6语法格式
    * ![](https://github.com/Edwardelric/vue2-koa2/blob/extend/share/language.png?raw=true)
* 设置缩进
    * ![](https://github.com/Edwardelric/vue2-koa2/blob/extend/share/indent.png?raw=true)
#### sublime
* 略


## javascript 规范

#### 缩进规范：
* 通过工具统一缩进2个空格

##

#### 声明规范

* 变量名驼峰命名
    ```
    let myName = "";
    ```
* 常量名大写
    ```
    const PI = Math.PI;
    ```
* 私有变量名
    ```
    let _self = this;
    ```
* 表达式结尾分号保留(建议保留)
    ```
    let str = "Hello World";
    ```
* 字符串声明使用双引号(单引号也可以,具体看项目组统一决定)
    ```
    let str = "Hello World";
    ```
* 类名首字母大写
    ```
    class Child extends Parent;
    ```

##

#### 编写规范
* 空格控制
    ```
    let name = "Edward";
    if (name) {
      console.log("true");
    } else {
      console.log("false");
    }
    ```
    ```
    let story = [
      1,
      2,
      3
    ];
    let arr = [1, 2, 3, 4, 5];
    for (let key in arr) {
      console.log(arr[key]);
    }
    ```

    ```
    let foo1 = function () {};
    let foo2 = function a() {};
    ```

    ```
    // bad
    function foo(bar, baz, quux) {
      ...
    }
    function foo(bar,
                 baz,
                 quux) {
      ...
    }
    // good
    function foo(
      bar,
      baz,
      quux
    ) {
      ...
    }

    ```
* 对象属性省略
    ```
    let name = "Edward";
    let age = 18;
    let obj = {
      name,
      age,
      getName() {
        console.log(this.name);
      }
    }
    ```

* 箭头函数
    ```
    let cb = () => "train";
    ```

* 模板
    ```
    let tmpStr = "Hello world";
    let tmp = `this is ${tmpStr}`;
    ```

#### 技巧简介
* rest用法
    ```
    //bad:
    let original = {a: 1, b: 2};
    let copy = Object.assign(original, {c: 3});
    //good:
    let original = { a: 1, b: 2 };
    let copy = { ...original, c: 3 };
    ```

    ```
    let obj1 = {
       name: "Edward",
       age: 18
    }
    let obj2 = {
       name: "elric",
       age: 17
    }
    let copy = [{...obj1}, {...obj2}];
    ```

    ```
    let dom = document.querySelectorAll("div");
    // good
    let doms = Array.from(dom);
    // best
    let doms = [...dom];
    ```
* 解构
    ```
    // bad
    function getName(user) {
      let firstName = user.firstName;
      let lastName = user.lastName;
    }
    // good
    function getName(user) {
      let {firstName, lastName} = user;
    }
    // best
    function getName({firstName, lastName}) {
      console.log(firstName, lastName);
    }
    ```
    ```
    let arr = [1, 2, 3, 4];
    // bad
    let first = arr[0];
    let second = arr[1];
    // good
    let [first, second] = arr;
    ```

* 函数声明
    ```
    // bad
    function foo() {

    }
    let foo = function() {

    }
    // good
    let foo = function foo() {

    }
    ```

* 快速与、快速或
    ```
    let origin;
    let cur = origin || 2;
    let cur = origin && 2;
    ```

* 表达式
    ```
    // bad
    if (test)
      return false;
    // good
    if (test) return false;
    // best
    if (test) {
      return false;
    }
    ```

## css 规范

#### 书写顺序
* 位置顺序
    ```
    position, top, right, z-index, display, float
    ```
* 大小
    ```
    width, height, padding, margin
    ```
* 边框
    ```
    border, border-radius
    ```
* 背景
    ```
    background, backgorund-size
    ```
* 阴影
    ```
    box-shadow
    ```
* 文字系列
    ```
    font, line-height, letter-spacing, color, text-align,
    ```
* 其他
    ```
    animate, transition
    ```

#### 语义化声明
    ```
    布局
    wrapper, main, content, header, footer, sidebar, nav, subNav,
    ```
    ```
    结构
    section, article, panel, figure
    ```
    ```
    功能
    logo, banner, tag, message, tips, vote, friendlink, summary, search, tools, mask
    ```

#### 书写规范

* ![](http://p87017g0w.bkt.clouddn.com/css1.png)
* ![](http://p87017g0w.bkt.clouddn.com/css2.png)
* ![](http://p87017g0w.bkt.clouddn.com/css3.png)
* ![](http://p87017g0w.bkt.clouddn.com/css4.png)
* ![](http://p87017g0w.bkt.clouddn.com/css5.png)


## 总结
  1. 首先安装NODE 版本号不低于8.0

  2. 建立项目文件夹 test(移动单页为例)

  3. cd test

  4. git clone https://lixiaolong@dev-cv.saicmotor.com/gitlab/newDmsUtils/xyx-mobile-single-web-template.git

  5. npm install

  6. npm run dev
  7. 打包运行  npm run build

## 使用注意事项

   1. 如何增加环境

    打开 package.json 在script 中增加
     "build:pre": "cross-env NODE_ENV=pre node build/build.js",

    打开src - common - api.js中增加 pre环境接口访问的地址
    打开config ---index.js 增加pre环境的静态资源地址

    运行命令 npm run build:pre


    如果是开发阶段 设置环境 举例sit环境来说
    开发环境下 sit的静态资源指向了sit的服务器
    但是接口始终是要经过代理才可以访问的 所以开发环境配置大家可以根据自己的需要灵活修改代理文件


## 问题处理
        启动提示某些包找不到
        删除本地node_modules 重新安装
        如果还是没有解决 单独安装该模块

        打包文件过大，可以参照webpack优化
        https://segmentfault.com/a/1190000011138081

        接口访问跨域，由于本地调试是本机IP，如果跨域参照跨域配置。

## npm 使用帮助
```
npm init 在此目录生成package.json文件，可以添加-y | --yes 参数则默认所有配置为默认yes

npm install <package> -g 全局安装

npm install --production 安装dependencies，不包含devDependencies

npm install <package> 默认使用–save 参数，如果不想保存到package.json中，可以添加--no-save参数；还可以指定–save-dev 或 -g参数

npm uninstall <package> 卸载依赖包， 默认使用–save参数，即从package.json中移除

npm ls [-g] [--depth=0] 查看当前目录或全局的依赖包，可指定层级为0

npm outdated 查看当前过期依赖，其中current显示当前安装版本，latest显示依赖包的最新版本，wanted显示我们可以升级到可以不破坏当前代码的版本

npm root -g 查看全局安装地址

npm update <package> 升级依赖包版本

npm ll[la] [--depth=0] 查看依赖包信息

npm list <package>查看依赖的当前版本

npm search <string> 查找包含该字符串的依赖包

npm view <package> [field] [--json]列出依赖信息，包括历史版本，可以指定field来查看某个具体信息，比如（versions) 可以添加–json参数输出全部结果

npm home <package> 在浏览器端查看项目（项目主页）

npm repo <package> 浏览器端打开项目地址（GitHub）

npm docs <packge> 查看项目文档

npm bugs <packge> 查看项目bug

npm prune 移除当前不在package.json中但是存在node_modules中的依赖
```







