(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-26af7037"],{"268f":function(t,e,n){t.exports=n("fde4")},2901:function(t,e,n){"use strict";var a=n("42e7"),o=n.n(a);o.a},"32a6":function(t,e,n){var a=n("241e"),o=n("c3a1");n("ce7e")("keys",function(){return function(t){return o(a(t))}})},3522:function(t,e,n){"use strict";n.r(e);var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"lp_wrapper"},[n("div",{staticClass:"lp_container"},[n("h6",[t._v(t._s(t.place))]),n("div",{staticClass:"lp_form"},[n("div",{staticClass:"lp_input"},[n("label",[t._v("类型")]),n("div",{staticClass:"lp_input_box"},[n("mu-select",{attrs:{solo:!0,placeholder:"请选择类型"},model:{value:t.v_form.type,callback:function(e){t.$set(t.v_form,"type",e)},expression:"v_form.type"}},t._l(t.v_type,function(t,e){return n("mu-option",{key:e,attrs:{label:t.name,value:t.type}})}),1)],1),n("i")]),n("div",{staticClass:"lp_input"},[n("label",[t._v("标题")]),n("div",{staticClass:"lp_input_box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.v_form.title,expression:"v_form.title"}],attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.v_form.title},on:{input:function(e){e.target.composing||t.$set(t.v_form,"title",e.target.value)}}})])]),n("div",{staticClass:"lp_input"},[n("label",[t._v("发布人")]),n("div",{staticClass:"lp_input_box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.v_form.createUserName,expression:"v_form.createUserName"}],attrs:{type:"text",placeholder:"请输入姓名",readonly:""},domProps:{value:t.v_form.createUserName},on:{input:function(e){e.target.composing||t.$set(t.v_form,"createUserName",e.target.value)}}})])]),n("div",{staticClass:"lp_input"},[n("label",[t._v("联系方式")]),n("div",{staticClass:"lp_input_box"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.v_form.telephone,expression:"v_form.telephone"}],attrs:{type:"text",placeholder:"手机号、微信、QQ"},domProps:{value:t.v_form.telephone},on:{input:function(e){e.target.composing||t.$set(t.v_form,"telephone",e.target.value)}}})])])]),n("div",{staticClass:"lp_detail"},[n("b",[t._v("内容")]),n("div",{staticClass:"lp_detail_box"},[n("textarea",{directives:[{name:"model",rawName:"v-model",value:t.v_form.content,expression:"v_form.content"}],attrs:{placeholder:"内容不超过200字",maxlength:"200"},domProps:{value:t.v_form.content},on:{input:function(e){e.target.composing||t.$set(t.v_form,"content",e.target.value)}}})])]),n("div",{staticClass:"lp_upload"},[t._m(0),n("div",{staticClass:"lp_preview"},[t._l(t.v_form.imgUrl,function(t,e){return n("div",{key:e,staticClass:"lp_preview_list"},[n("img",{attrs:{src:t,alt:""}})])}),n("button",{staticClass:"lp_preview_add",on:{click:t.f_upload}})],2)]),n("button",{staticClass:"lp_submit",on:{click:t.f_submit}},[t._v("发布")])])])},o=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("b",[t._v("图片"),n("span",[t._v("(最多三张)")])])}],r=n("cebc"),i=(n("7f7f"),{data:function(){return{v_form:{title:"",content:"",createUserId:"",createUserName:"",telephone:"",type:"",villageCode:"",imgUrl:[]},v_type:[{name:"失物",type:1},{name:"招领",type:2}]}},computed:{place:function(){return this.$store.state.village}},mounted:function(){this.v_form.createUserName=this.$store.state.user.name},methods:{f_upload:function(t){var e=this;this.v_form.imgUrl.length>2?this.$toast("最多三张图片"):this.$wxsdk.chooseImage().then(function(t){var n=t.localIds;e.$toast({msg:"图片加载中...",time:3e3}),n.map(function(t){e.$wxsdk.getLocalImgData(t).then(function(t){var n=t.localData,a=new FormData;a.append("base64",n),e.$http.post("/admin/file/upload2",a).then(function(t){var n=t.data.data;e.$toast("加载完成"),e.v_form.imgUrl.push(n)})})})})},f_submit:function(){var t=this,e=Object(r["a"])({},this.v_form,{createUserId:this.$store.state.user.id,imgUrl:JSON.stringify(this.v_form.imgUrl),villageCode:this.$store.state.villageCode});e.title&&e.type&&e.createUserName&&e.telephone&&e.content?(console.log("失物招领",e),this.$http.post("/admin/lost/system/wx/addLostFound",e).then(function(e){var n=e.data.success;n&&(t.$toast("发布成功"),t.$router.go(-1))})):this.$toast("请完善基本信息")}}}),s=i,c=(n("2901"),n("2877")),l=Object(c["a"])(s,a,o,!1,null,"2b487170",null);e["default"]=l.exports},"42e7":function(t,e,n){},"454f":function(t,e,n){n("46a7");var a=n("584a").Object;t.exports=function(t,e,n){return a.defineProperty(t,e,n)}},"46a7":function(t,e,n){var a=n("63b6");a(a.S+a.F*!n("8e60"),"Object",{defineProperty:n("d9f6").f})},"7f7f":function(t,e,n){var a=n("86cc").f,o=Function.prototype,r=/^\s*function ([^ (]*)/,i="name";i in o||n("9e1e")&&a(o,i,{configurable:!0,get:function(){try{return(""+this).match(r)[1]}catch(t){return""}}})},"85f2":function(t,e,n){t.exports=n("454f")},"8aae":function(t,e,n){n("32a6"),t.exports=n("584a").Object.keys},a4bb:function(t,e,n){t.exports=n("8aae")},bf90:function(t,e,n){var a=n("36c3"),o=n("bf0b").f;n("ce7e")("getOwnPropertyDescriptor",function(){return function(t,e){return o(a(t),e)}})},ce7e:function(t,e,n){var a=n("63b6"),o=n("584a"),r=n("294c");t.exports=function(t,e){var n=(o.Object||{})[t]||Object[t],i={};i[t]=e(n),a(a.S+a.F*r(function(){n(1)}),"Object",i)}},cebc:function(t,e,n){"use strict";var a=n("268f"),o=n.n(a),r=n("e265"),i=n.n(r),s=n("a4bb"),c=n.n(s),l=n("85f2"),u=n.n(l);function p(t,e,n){return e in t?u()(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=c()(n);"function"===typeof i.a&&(a=a.concat(i()(n).filter(function(t){return o()(n,t).enumerable}))),a.forEach(function(e){p(t,e,n[e])})}return t}n.d(e,"a",function(){return f})},e265:function(t,e,n){t.exports=n("ed33")},ed33:function(t,e,n){n("014b"),t.exports=n("584a").Object.getOwnPropertySymbols},fde4:function(t,e,n){n("bf90");var a=n("584a").Object;t.exports=function(t,e){return a.getOwnPropertyDescriptor(t,e)}}}]);
//# sourceMappingURL=chunk-26af7037.7c37ab0d.js.map