(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-635e3e16"],{"1e10":function(e,t,s){"use strict";var o=s("585f"),a=s.n(o);a.a},"585f":function(e,t,s){},"63fa":function(e,t,s){e.exports=s.p+"img/start_logo.58daa431.png"},ede4:function(e,t,s){"use strict";s.r(t);var o=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"login_wrapper"},[o("img",{attrs:{src:s("63fa"),alt:""}}),o("div",{staticClass:"login_content"},[o("div",{staticClass:"login_input"},[o("span"),o("input",{directives:[{name:"model",rawName:"v-model",value:e.v_name,expression:"v_name"}],attrs:{type:"text",placeholder:"请输入用户名"},domProps:{value:e.v_name},on:{input:function(t){t.target.composing||(e.v_name=t.target.value)}}})]),o("div",{staticClass:"login_input"},[o("span"),"checkbox"===(e.v_switch?"text":"password")?o("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:"checkbox"},domProps:{checked:Array.isArray(e.v_password)?e._i(e.v_password,null)>-1:e.v_password},on:{change:function(t){var s=e.v_password,o=t.target,a=!!o.checked;if(Array.isArray(s)){var n=null,i=e._i(s,n);o.checked?i<0&&(e.v_password=s.concat([n])):i>-1&&(e.v_password=s.slice(0,i).concat(s.slice(i+1)))}else e.v_password=a}}}):"radio"===(e.v_switch?"text":"password")?o("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:"radio"},domProps:{checked:e._q(e.v_password,null)},on:{change:function(t){e.v_password=null}}}):o("input",{directives:[{name:"model",rawName:"v-model",value:e.v_password,expression:"v_password"}],attrs:{placeholder:"请输入密码",type:e.v_switch?"text":"password"},domProps:{value:e.v_password},on:{input:function(t){t.target.composing||(e.v_password=t.target.value)}}}),o("i",{class:{active:e.v_open},on:{click:e.f_switch}})]),o("div",{staticClass:"login_submit",on:{click:e.f_login}},[e._v("\n      登录\n    ")])])])},a=[],n=(s("28a5"),{name:"Login",data:function(){return{v_name:"",v_password:"",v_switch:!1,v_open:!1}},mounted:function(){this.f_getCookie()},methods:{f_login:function(){var e=this,t={name:this.v_name,password:this.v_password};this.$http.get("/admin/user/wy/login",{params:t}).then(function(t){t.data.success?(e.f_setCookie(e.v_name,e.v_password,1),e.$toast("登录成功"),e.$store.dispatch("setUser",t.data.data),e.$router.push({name:"pickads"}),localStorage.clear()):e.$toast(t.data.msg)}),localStorage.clear()},f_forget:function(){console.log("忘记密码")},f_register:function(){this.$nextTick(function(e){var t=localStorage.getItem("wx-auth-count");1!=t&&(localStorage.setItem("wx-auth-count",1),window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx3ec96b7fb94e38fa&redirect_uri=".concat(encodeURIComponent("http://zjphtech.com/admin/wx/person"),"&response_type=code&scope=snsapi_userinfo#wechat_redirect"))}),this.$router.push({name:"register"})},f_switch:function(){this.v_switch=!this.v_switch,this.v_open=!this.v_open},f_setCookie:function(e,t){var s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,o=new Date;o.setTime(o.getTime()+864e5*s),window.document.cookie="userName="+e+";path=/;expires="+o.toGMTString(),window.document.cookie="userPwd="+t+";path=/;expires="+o.toGMTString()},f_getCookie:function(){if(document.cookie.length>0)for(var e=document.cookie.split("; "),t=0;t<e.length;t++){var s=e[t].split("=");"userName"==s[0]?this.v_name=s[1]:"userPwd"==s[0]&&(this.v_password=s[1])}this.v_name&&this.v_password&&this.f_login()}}}),i=n,r=(s("1e10"),s("2877")),c=Object(r["a"])(i,o,a,!1,null,null,null);t["default"]=c.exports}}]);
//# sourceMappingURL=chunk-635e3e16.60bdb283.js.map