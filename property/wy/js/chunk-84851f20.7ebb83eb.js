(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-84851f20"],{5118:function(e,t,n){(function(e){var a="undefined"!==typeof e&&e||"undefined"!==typeof self&&self||window,o=Function.prototype.apply;function i(e,t){this._id=e,this._clearFn=t}t.setTimeout=function(){return new i(o.call(setTimeout,a,arguments),clearTimeout)},t.setInterval=function(){return new i(o.call(setInterval,a,arguments),clearInterval)},t.clearTimeout=t.clearInterval=function(e){e&&e.close()},i.prototype.unref=i.prototype.ref=function(){},i.prototype.close=function(){this._clearFn.call(a,this._id)},t.enroll=function(e,t){clearTimeout(e._idleTimeoutId),e._idleTimeout=t},t.unenroll=function(e){clearTimeout(e._idleTimeoutId),e._idleTimeout=-1},t._unrefActive=t.active=function(e){clearTimeout(e._idleTimeoutId);var t=e._idleTimeout;t>=0&&(e._idleTimeoutId=setTimeout(function(){e._onTimeout&&e._onTimeout()},t))},n("6017"),t.setImmediate="undefined"!==typeof self&&self.setImmediate||"undefined"!==typeof e&&e.setImmediate||this&&this.setImmediate,t.clearImmediate="undefined"!==typeof self&&self.clearImmediate||"undefined"!==typeof e&&e.clearImmediate||this&&this.clearImmediate}).call(this,n("c8ba"))},"5e1c":function(e,t,n){},6017:function(e,t,n){(function(e,t){(function(e,n){"use strict";if(!e.setImmediate){var a,o=1,i={},s=!1,r=e.document,c=Object.getPrototypeOf&&Object.getPrototypeOf(e);c=c&&c.setTimeout?c:e,"[object process]"==={}.toString.call(e.process)?f():p()?v():e.MessageChannel?h():r&&"onreadystatechange"in r.createElement("script")?_():g(),c.setImmediate=u,c.clearImmediate=l}function u(e){"function"!==typeof e&&(e=new Function(""+e));for(var t=new Array(arguments.length-1),n=0;n<t.length;n++)t[n]=arguments[n+1];var s={callback:e,args:t};return i[o]=s,a(o),o++}function l(e){delete i[e]}function d(e){var t=e.callback,a=e.args;switch(a.length){case 0:t();break;case 1:t(a[0]);break;case 2:t(a[0],a[1]);break;case 3:t(a[0],a[1],a[2]);break;default:t.apply(n,a);break}}function m(e){if(s)setTimeout(m,0,e);else{var t=i[e];if(t){s=!0;try{d(t)}finally{l(e),s=!1}}}}function f(){a=function(e){t.nextTick(function(){m(e)})}}function p(){if(e.postMessage&&!e.importScripts){var t=!0,n=e.onmessage;return e.onmessage=function(){t=!1},e.postMessage("","*"),e.onmessage=n,t}}function v(){var t="setImmediate$"+Math.random()+"$",n=function(n){n.source===e&&"string"===typeof n.data&&0===n.data.indexOf(t)&&m(+n.data.slice(t.length))};e.addEventListener?e.addEventListener("message",n,!1):e.attachEvent("onmessage",n),a=function(n){e.postMessage(t+n,"*")}}function h(){var e=new MessageChannel;e.port1.onmessage=function(e){var t=e.data;m(t)},a=function(t){e.port2.postMessage(t)}}function _(){var e=r.documentElement;a=function(t){var n=r.createElement("script");n.onreadystatechange=function(){m(t),n.onreadystatechange=null,e.removeChild(n),n=null},e.appendChild(n)}}function g(){a=function(e){setTimeout(m,0,e)}}})("undefined"===typeof self?"undefined"===typeof e?this:e:self)}).call(this,n("c8ba"),n("f28c"))},"63fa":function(e,t,n){e.exports=n.p+"img/start_logo.58daa431.png"},a9e3:function(e,t,n){"use strict";n.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"reg_wrapper"},[a("img",{attrs:{src:n("63fa"),alt:""}}),a("div",{staticClass:"reg_content"},[a("div",{staticClass:"reg_input"},[a("span"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_phone,expression:"v_phone"}],attrs:{type:"text",placeholder:"请输入手机号",maxlength:"11"},domProps:{value:e.v_phone},on:{input:function(t){t.target.composing||(e.v_phone=t.target.value)}}})]),a("div",{staticClass:"reg_input"},[a("span"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_code,expression:"v_code"}],attrs:{type:"text",placeholder:"验证码"},domProps:{value:e.v_code},on:{input:function(t){t.target.composing||(e.v_code=t.target.value)}}}),a("i",{class:e.v_flag?"":"reg_not",on:{click:e.f_getCode}},[e._v(e._s(e.v_flag?"发送验证码":e.v_time+" s"))])]),a("div",{staticClass:"reg_input"},[a("span"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{type:"password",placeholder:"请输入6到12位密码"},domProps:{value:e.v_password},on:{input:function(t){t.target.composing||(e.v_password=t.target.value)}}})]),a("div",{staticClass:"reg_input"},[a("span"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_again,expression:"v_again"}],attrs:{type:"password",placeholder:"确认密码"},domProps:{value:e.v_again},on:{input:function(t){t.target.composing||(e.v_again=t.target.value)}}})]),a("div",{staticClass:"reg_submit",on:{click:e.f_submit}},[e._v("\n      注册\n    ")])])])},o=[],i=n("5118"),s={name:"Register",data:function(){return{v_name:"",v_phone:"",v_code:"",v_password:"",v_again:"",v_flag:!0,v_time:60}},beforeRouteEnter:function(e,t,n){n(function(e){e.$store.state.user.id&&e.$router.push({name:"index"})})},mounted:function(){try{document.body.removeChild(document.getElementById("start_wrapper")),Object(i["setTimeout"])(function(){document.getElementById("app").style.display="block"},500)}catch(e){}},methods:{f_submit:function(){var e=this,t={phoneNum:this.v_phone,password:this.v_password,smsCode:this.v_code,userName:this.$store.state.wxInfo.nickname,headIcon:this.$store.state.wxInfo.headimgurl};this.v_phone&&this.v_code&&this.v_password&&this.v_again?this.v_password===this.v_again?this.$http.post("/admin/user/register",t).then(function(t){console.log("注册",t),t.data.success?(e.$toast("注册成功"),e.$router.push({name:"login"})):e.$toast(t.data.msg)}):this.$toast("密码不一致"):this.$toast("请填写完整")},f_getCode:function(){var e=this;if(/^1[345678]\d{9}$/.test(this.v_phone)){var t={phoneNum:this.v_phone};this.v_flag=!1,this.f_countDown(),this.$http.get("/admin/sms/code",{params:t}).then(function(t){e.$toast("已发送")})}else this.$toast("手机号错误")},f_countDown:function(){var e=this,t=Object(i["setTimeout"])(function(){if(0===e.v_time)return Object(i["clearTimeout"])(t),e.v_flag=!0,void(e.v_time=60);e.v_time--,e.f_countDown()},1e3)}}},r=s,c=(n("d1a3"),n("2877")),u=Object(c["a"])(r,a,o,!1,null,null,null);t["default"]=u.exports},d1a3:function(e,t,n){"use strict";var a=n("5e1c"),o=n.n(a);o.a}}]);
//# sourceMappingURL=chunk-84851f20.7ebb83eb.js.map