(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-635e3e16"],{"1e10":function(e,t,s){"use strict";var a=s("585f"),o=s.n(a);o.a},"585f":function(e,t,s){},"63fa":function(e,t,s){e.exports=s.p+"img/start_logo.58daa431.png"},ede4:function(e,t,s){"use strict";s.r(t);var a=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"login_wrapper"},[a("img",{attrs:{src:s("63fa"),alt:""}}),a("div",{staticClass:"login_content"},[a("div",{staticClass:"login_input"},[a("span"),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_name,expression:"v_name"}],attrs:{type:"text",placeholder:"请输入用户名"},domProps:{value:e.v_name},on:{input:function(t){t.target.composing||(e.v_name=t.target.value)}}})]),a("div",{staticClass:"login_input"},[a("span"),"checkbox"===(e.v_switch?"text":"password")?a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:"checkbox"},domProps:{checked:Array.isArray(e.v_password)?e._i(e.v_password,null)>-1:e.v_password},on:{change:function(t){var s=e.v_password,a=t.target,o=!!a.checked;if(Array.isArray(s)){var n=null,i=e._i(s,n);a.checked?i<0&&(e.v_password=s.concat([n])):i>-1&&(e.v_password=s.slice(0,i).concat(s.slice(i+1)))}else e.v_password=o}}}):"radio"===(e.v_switch?"text":"password")?a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:"radio"},domProps:{checked:e._q(e.v_password,null)},on:{change:function(t){e.v_password=null}}}):a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:e.v_switch?"text":"password"},domProps:{value:e.v_password},on:{input:function(t){t.target.composing||(e.v_password=t.target.value)}}}),a("i",{class:{active:e.v_open},on:{click:e.f_switch}})]),a("div",{staticClass:"login_submit",on:{click:e.f_login}},[e._v("\n      登录\n    ")])])])},o=[],n={name:"Login",data:function(){return{v_name:"",v_password:"",v_switch:!1,v_open:!1}},methods:{f_login:function(){var e=this;this.$http.get("/admin/wy/login",{params:{name:this.v_name,password:this.v_password}}).then(function(t){t.data.success?(e.$toast("登录成功"),e.$store.dispatch("setUser",t.data.data),e.$router.push({name:"pickads"}),localStorage.clear()):e.$toast(t.data.msg)}),localStorage.clear()},f_forget:function(){console.log("忘记密码")},f_register:function(){this.$nextTick(function(e){var t=localStorage.getItem("wx-auth-count");1!=t&&(localStorage.setItem("wx-auth-count",1),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ec96b7fb94e38fa&redirect_uri=".concat(encodeURIComponent("http://zjphtech.com/admin/wx/person"),"&response_type=code&scope=snsapi_userinfo#wechat_redirect"))}),this.$router.push({name:"register"})},f_switch:function(){this.v_switch=!this.v_switch,this.v_open=!this.v_open}}},i=n,r=(s("1e10"),s("2877")),c=Object(r["a"])(i,a,o,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-635e3e16.d7d725bf.js.map