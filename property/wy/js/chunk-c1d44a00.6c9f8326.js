(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-c1d44a00"],{3495:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"ns_wrapper"},[a("div",{staticClass:"ns_container"},[a("h6",[t._v(t._s(t.place))]),a("div",{staticClass:"ns_from"},[a("div",{staticClass:"ns_input"},[a("label",[t._v("分类")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.type,expression:"type"}],attrs:{type:"text",readonly:"",placeholder:"请选择分类"},domProps:{value:t.type},on:{click:t.f_openType,input:function(e){e.target.composing||(t.type=e.target.value)}}}),a("i")]),a("div",{staticClass:"ns_input"},[a("label",[t._v("标题")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.v_from.title,expression:"v_from.title"}],attrs:{type:"text",placeholder:"请输入标题"},domProps:{value:t.v_from.title},on:{input:function(e){e.target.composing||t.$set(t.v_from,"title",e.target.value)}}})]),a("div",{staticClass:"ns_input"},[a("label",[t._v("联系人")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.v_from.contact,expression:"v_from.contact"}],attrs:{type:"text",placeholder:"请输入姓名"},domProps:{value:t.v_from.contact},on:{input:function(e){e.target.composing||t.$set(t.v_from,"contact",e.target.value)}}})]),a("div",{staticClass:"ns_input"},[a("label",[t._v("联系方式")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.v_from.telephone,expression:"v_from.telephone"}],attrs:{type:"number",placeholder:"手机号、微信、QQ"},domProps:{value:t.v_from.telephone},on:{input:function(e){e.target.composing||t.$set(t.v_from,"telephone",e.target.value)}}})]),a("div",{staticClass:"ns_input"},[a("label",[t._v("预约人数")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.v_from.applyNum,expression:"v_from.applyNum"}],attrs:{type:"number",placeholder:"人数为0则不限制"},domProps:{value:t.v_from.applyNum},on:{input:function(e){e.target.composing||t.$set(t.v_from,"applyNum",e.target.value)}}})]),a("div",{staticClass:"ns_input ns_input_check"},[a("label",[t._v("人脸门禁")]),a("span",{on:{click:function(e){return t.f_changeDoor(1)}}},[a("i",{class:1===t.v_from.doorLock?"ns_checked":""}),t._v("有")]),a("span",{on:{click:function(e){return t.f_changeDoor(0)}}},[a("i",{class:0===t.v_from.doorLock?"ns_checked":""}),t._v("无")]),1===t.v_from.doorLock?a("p",[t._v("※需要携带本人身份证在进门处登记人脸识别照片")]):t._e()]),a("div",{staticClass:"ns_input ns_shareTime"},[a("label",[t._v("共享时间")]),a("span",[a("mu-date-input",{attrs:{container:"bottomSheet","should-disable-date":t.f_startTimeRules,prefix:"开始",solo:!0,"full-width":!0,"clock-type":"24hr","view-type":"list",type:"dateTime",landscape:""},model:{value:t.v_start,callback:function(e){t.v_start=e},expression:"v_start"}}),a("mu-date-input",{attrs:{container:"bottomSheet",solo:!0,"full-width":!0,prefix:"结束","clock-type":"24hr","view-type":"list",type:"time",landscape:""},model:{value:t.v_end,callback:function(e){t.v_end=e},expression:"v_end"}})],1)])]),a("div",{staticClass:"ns_description"},[a("b",[t._v("内容描述")]),a("div",{staticClass:"ns_input"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:t.v_from.content,expression:"v_from.content"}],attrs:{maxlength:"200"},domProps:{value:t.v_from.content},on:{input:function(e){e.target.composing||t.$set(t.v_from,"content",e.target.value)}}})])]),a("div",{staticClass:"ns_upload"},[t._m(0),a("div",{staticClass:"ns_preview"},[t._l(t.v_from.imgUrl,function(t,e){return a("div",{key:e,staticClass:"ns_preview_list"},[a("img",{attrs:{src:t,alt:""}})])}),a("a",{staticClass:"ns_preview_add",on:{click:t.f_upload}})],2)]),a("a",{staticClass:"ns_submit",on:{click:t.f_validate}},[t._v("发布")]),a("mu-bottom-sheet",{attrs:{open:t.v_typeFlag},on:{"update:open":function(e){t.v_typeFlag=e}}},[a("mu-list",[a("mu-sub-header",[t._v("选择类型")]),t._l(t.v_types,function(e,s){return a("mu-list-item",{key:s,attrs:{button:""},on:{click:function(e){return t.f_chooseType(s)}}},[a("mu-list-item-title",[t._v(t._s(e.name))])],1)})],2)],1),a("mu-bottom-sheet",{attrs:{open:t.v_carFlag},on:{"update:open":function(e){t.v_carFlag=e}}},[a("mu-list",[a("mu-sub-header",[t._v("选择车牌")]),t._l(t.v_carNum,function(e,s){return a("mu-list-item",{key:s,attrs:{button:""},on:{click:function(e){return t.f_chooseCarNum(s)}}},[a("mu-list-item-title",[t._v(t._s(e))])],1)})],2)],1),a("mu-bottom-sheet",{attrs:{open:t.v_parkFlag},on:{"update:open":function(e){t.v_parkFlag=e}}},[a("mu-list",[a("mu-sub-header",[t._v("选择车位")]),t._l(t.v_carPark,function(e,s){return a("mu-list-item",{key:s,attrs:{button:""},on:{click:function(e){return t.f_choosePark(s)}}},[a("mu-list-item-title",[t._v(t._s(e))])],1)})],2)],1)],1)])},i=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b",[t._v("图片"),a("span",[t._v("（最多三张）")])])}],o=(a("7f7f"),a("28a5"),a("fa7d")),r={name:"Self",data:function(){return{v_taskType:"0",v_typeFlag:!1,v_carFlag:!1,v_parkFlag:!1,v_types:[{name:"资源共享",taskType:"4"}],v_carNum:[],v_carPark:[],v_from:{taskType:"",createUserName:"",contact:"",telephone:"",title:"",doorLock:0,content:"",startTime:"",endTime:"",carLock:1,price:"",carNum:"",departPlace:"",destination:"",gender:1,profession:"",skill:"",createUserId:1,imgUrl:[],villageCode:"",applyNum:0},v_start:"",v_end:""}},computed:{type:function(){switch(this.v_from.taskType){case"1":return"拼车";case"2":return"车位共享";case"3":return"时间互换";case"4":return"资源共享"}},place:function(){return this.$store.state.village}},watch:{v_start:function(t,e){var a=Object(o["a"])(t);if(this.v_from.startTime="".concat(a," ").concat(new Date(t).toLocaleTimeString("chinese",{hour12:!1})),this.v_from.endTime){var s=this.v_from.endTime.split(" ")[1];this.v_from.endTime="".concat(a," ").concat(s)}console.log("开始时间",this.v_from.startTime)},v_end:function(t,e){var a=this.v_from.startTime;new Date(a).toLocaleTimeString("chinese",{hour12:!1});if(t&&a){var s=Object(o["a"])(a),i=new Date(t).toLocaleTimeString("chinese",{hour12:!1}),r=new Date("".concat(s," ").concat(i)).getTime();if(r<new Date(a).getTime()){this.v_from.endTime=a,this.v_from.startTime="".concat(s," ").concat(i);var n=this.v_start;this.v_start=this.v_end,this.v_end=n}else this.v_from.endTime="".concat(s," ").concat(i)}else this.v_from.endTime=this.v_end="",this.$toast({msg:"请先选择开始时间",time:1500});console.log("结束时间",this.v_from.endTime)}},mounted:function(){this.v_from.createUserId=this.$store.state.user.id,this.v_from.createUserName=this.$store.state.user.name,this.v_from.villageCode=this.$store.state.villageCode,this.f_getCar(),this.f_getPark()},methods:{f_openType:function(){this.v_typeFlag=!0},f_chooseType:function(t){this.v_taskType=this.v_from.taskType=this.v_types[t].taskType,this.v_typeFlag=!1},f_openCarNum:function(){this.v_carFlag=!0},f_chooseCarNum:function(t){console.log("这个车牌",this.v_carNum[t]),this.v_from.carNum=this.v_carNum[t],this.v_carFlag=!1},f_choosePark:function(t){console.log(this.v_carPark[t]),this.v_from.carNum=this.v_carPark[t],this.v_parkFlag=!1},f_changeLock:function(t){this.v_from.carLock=t},f_changeSex:function(t){this.v_from.gender=t},f_changeDoor:function(t){this.v_from.doorLock=t},f_startTimeRules:function(t){var e=(new Date).getTime();return new Date(t).getTime()<e},f_endTimeRules:function(t){if(this.v_start){var e=new Date(this.v_start).getTime();return new Date(t).getTime()<e-864e5}},f_upload:function(t){var e=this;this.v_from.imgUrl.length>2?this.$toast("最多三张图片"):this.$wxsdk.chooseImage().then(function(t){var a=t.localIds;a.map(function(t){e.$wxsdk.getLocalImgData(t).then(function(t){var a=t.localData,s=new FormData;s.append("base64",a),e.$http.post("/admin/file/upload2",s).then(function(t){var a=t.data.data;e.v_from.imgUrl.push(a)})})})})},f_getPark:function(){var t=this,e={memberId:this.$store.state.user.id,villageCode:this.$store.state.villageCode,pageNum:1,pageSize:100};this.$http.get("/admin/member/parking/lot/my/lots",{params:e}).then(function(e){e.data.data.map(function(e){return t.v_carPark.push(e.position)})})},f_getCar:function(){var t=this,e={memberId:this.$store.state.user.id,villageCode:this.$store.state.villageCode,pageNum:1,pageSize:100};this.$http.get("/admin/member/car/my/cars",{params:e}).then(function(e){e.data.data.map(function(e){return t.v_carNum.push(e.vehicleNumber)})})},f_validate:function(){var t,e=JSON.stringify(this.v_from.imgUrl);if(this.v_from.taskType&&this.v_from.title&&this.v_from.contact&&this.v_from.telephone)switch(this.v_from.taskType){case"1":this.v_from.carNum&&this.v_from.departPlace&&this.v_from.destination&&this.v_from.startTime?(t={createUserId:this.v_from.createUserId,createUserName:this.v_from.createUserName,taskType:this.v_from.taskType,title:this.v_from.title,contact:this.v_from.contact,telephone:this.v_from.telephone,carNum:this.v_from.carNum,departPlace:this.v_from.departPlace,destination:this.v_from.destination,startTime:this.v_from.startTime,content:this.v_from.content,imgUrl:e,villageCode:this.v_from.villageCode},this.f_submit(t)):this.$toast("请填写完整");break;case"2":this.v_from.carNum&&this.v_from.startTime&&this.v_from.endTime?(t={createUserId:this.v_from.createUserId,createUserName:this.v_from.createUserName,taskType:this.v_from.taskType,title:this.v_from.title,contact:this.v_from.contact,telephone:this.v_from.telephone,carNum:this.v_from.carNum,price:this.v_from.price,carLock:this.v_from.carLock,startTime:this.v_from.startTime,endTime:this.v_from.endTime,content:this.v_from.content,imgUrl:e,villageCode:this.v_from.villageCode},this.f_submit(t)):this.$toast("请填写完整");break;case"3":this.v_from.skill&&this.v_from.startTime&&this.v_from.endTime?(t={createUserId:this.v_from.createUserId,createUserName:this.v_from.createUserName,taskType:this.v_from.taskType,title:this.v_from.title,contact:this.v_from.contact,telephone:this.v_from.telephone,gender:this.v_from.gender,skill:this.v_from.skill,startTime:this.v_from.startTime,endTime:this.v_from.endTime,profession:this.v_from.profession,content:this.v_from.content,imgUrl:e,villageCode:this.v_from.villageCode},this.f_submit(t)):this.$toast("请填写完整");break;case"4":this.v_from.startTime&&this.v_from.endTime&&this.v_from.content?(t={createUserId:this.v_from.createUserId,createUserName:this.v_from.createUserName,taskType:this.v_from.taskType,title:this.v_from.title,contact:this.v_from.contact,telephone:this.v_from.telephone,startTime:this.v_from.startTime,endTime:this.v_from.endTime,content:this.v_from.content,imgUrl:e,villageCode:this.v_from.villageCode,doorLock:this.v_from.doorLock,applyNum:this.v_from.applyNum},console.log("资源参数",t),this.f_submit(t)):this.$toast("请填写内容和时间");break}else this.$toast("请完善基本信息")},f_submit:function(t){var e=this;console.log("共享参数",t),this.$http.post("/admin/share/system/wx/addShare",t).then(function(t){console.log(t),t.data.success?(e.$toast("发布成功"),e.$router.go(-1)):e.$toast(t.data.msg)})}}},n=r,c=(a("b5c9"),a("2877")),m=Object(c["a"])(n,s,i,!1,null,"1dbaf556",null);e["default"]=m.exports},"7f7f":function(t,e,a){var s=a("86cc").f,i=Function.prototype,o=/^\s*function ([^ (]*)/,r="name";r in i||a("9e1e")&&s(i,r,{configurable:!0,get:function(){try{return(""+this).match(o)[1]}catch(t){return""}}})},b5c9:function(t,e,a){"use strict";var s=a("f725"),i=a.n(s);i.a},f725:function(t,e,a){}}]);
//# sourceMappingURL=chunk-c1d44a00.6c9f8326.js.map