## 使用技术

  - vue & vue-cli3.x

  - axios & vue-axios

  - muse-ui & scss

  - 微信jssdk

## 开发规范

#### 通用

  - 所有文件缩进使用 制表符(tab)2格

  - 开发使用dev_hy分支, 开发前后记得pull代码

  - 使用rem布局，尺寸书写为 (设计图尺寸 / 100)rem

  - 其余规范参照 eslint 的 standard 规范

  - 部分使用提示或弹窗地方使用 this.$toast({ msg: String, time: Number})

#### vue文件

  - 页面文件放入views文件夹，公用组件放入components文件夹

  - 页面文件及其所属子组件(非公用)放入同一层级

  - App.vue文件为所有页面入口文件，/views/Home.vue 为含tab栏页面的入口

  - 文件根据其模块功能，放入其模块名文件夹下，文件名语义化但不含拼音

  - template中class命名使用下划线命名，js中data变量使用v_xx命名，方法使用f_xxYy命名

#### utils

  - 所有可公用方法同一放入/utils/utils.js文件中，使用 {} 导出

  - 微信的所有方法放入/utils/wxsdk.js文件中，已绑定至vue.prototype.wxsdk，调用只需this.wxsdk.handler

#### router

  - 所有页面皆异步注册 component: () => import('')

  - 含有tab栏的页面需放入 /home 下的子路由中

#### assets

  - assets文件夹下 /css 放入全局css

  - /images 放入所有页面的图片，根据模块名建立文件夹