(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-635e3e16"],{"1e10":function(e,t,a){"use strict";var s=a("585f"),o=a.n(s);o.a},"585f":function(e,t,a){},"63fa":function(e,t,a){e.exports=a.p+"img/start_logo.58daa431.png"},ede4:function(e,t,a){"use strict";a.r(t);var s=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"login_wrapper"},[s("img",{attrs:{src:a("63fa"),alt:""}}),s("div",{staticClass:"login_content"},[s("div",{staticClass:"login_input"},[s("span"),s("input",{directives:[{name:"model",rawName:"v-model",value:e.v_name,expression:"v_name"}],attrs:{type:"text",placeholder:"请输入用户名"},domProps:{value:e.v_name},on:{input:function(t){t.target.composing||(e.v_name=t.target.value)}}})]),s("div",{staticClass:"login_input"},[s("span"),"checkbox"===(e.v_switch?"text":"password")?s("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:"checkbox"},domProps:{checked:Array.isArray(e.v_password)?e._i(e.v_password,null)>-1:e.v_password},on:{change:function(t){var a=e.v_password,s=t.target,o=!!s.checked;if(Array.isArray(a)){var i=null,n=e._i(a,i);s.checked?n<0&&(e.v_password=a.concat([i])):n>-1&&(e.v_password=a.slice(0,n).concat(a.slice(n+1)))}else e.v_password=o}}}):"radio"===(e.v_switch?"text":"password")?s("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:"radio"},domProps:{checked:e._q(e.v_password,null)},on:{change:function(t){e.v_password=null}}}):s("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:e.v_switch?"text":"password"},domProps:{value:e.v_password},on:{input:function(t){t.target.composing||(e.v_password=t.target.value)}}}),s("i",{class:{active:e.v_open},on:{click:e.f_switch}})]),s("div",{staticClass:"login_submit",on:{click:e.f_login}},[e._v("\n      登录\n    ")])])])},o=[],i=(a("28a5"),a("a481"),{name:"Login",data:function(){return{v_name:"",v_password:"",v_switch:!1,v_open:!1}},mounted:function(){this.f_getCookie()},methods:{f_login:function(){var e=this,t={name:this.v_name,password:this.v_password};this.$http.get("/admin/user/wy/login",{params:t}).then(function(t){t.data.success?(e.f_setCookie(e.v_name,e.v_password,1),e.$toast("登录成功"),e.$store.dispatch("setUser",t.data.data),e.$store.dispatch("setVillageCode",t.data.data.villageCode),e.f_getVillage(t.data.data.villageCode),e.$router.replace({name:"index"}),localStorage.clear()):e.$toast(t.data.msg)}),localStorage.clear()},f_forget:function(){console.log("忘记密码")},f_getVillage:function(e){var t=this,a={villageCode:e};this.$http.get("/obtain/config/getVillageName",{params:a}).then(function(e){t.$store.dispatch("setVillage",e.data.data)})},f_register:function(){this.$nextTick(function(e){var t=localStorage.getItem("wx-auth-count");1!=t&&(localStorage.setItem("wx-auth-count",1),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ec96b7fb94e38fa&redirect_uri=".concat(encodeURIComponent("http://zjphtech.com/admin/wx/person"),"&response_type=code&scope=snsapi_userinfo#wechat_redirect"))}),this.$router.push({name:"register"})},f_switch:function(){this.v_switch=!this.v_switch,this.v_open=!this.v_open},f_setCookie:function(e,t){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,s=new Date;s.setTime(s.getTime()+864e5*a),window.document.cookie="userName="+unescape(e)+";path=/;expires="+s.toGMTString(),window.document.cookie="userPwd="+unescape(t)+";path=/;expires="+s.toGMTString()},f_getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var a=e[t].split("=");"userName"==a[0]?this.v_name=escape(a[1]):"userPwd"==a[0]&&(this.v_password=escape(a[1]))}this.v_name&&this.v_password&&this.f_login()}}}),n=i,r=(a("1e10"),a("2877")),c=Object(r["a"])(n,s,o,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-635e3e16.a6b343f9.js.map