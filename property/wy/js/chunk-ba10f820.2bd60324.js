(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-ba10f820"],{"12ec":function(t,e,s){"use strict";var i=s("a952"),a=s.n(i);a.a},"65ad":function(t,e,s){"use strict";s.r(e);var i=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"td_wrapper"},[s("div",{staticClass:"td_container"},[s("h6",[t._v(t._s(t.v_detail.title))]),s("div",{staticClass:"td_header_detail"},[s("span",[t._v("来源: "+t._s(t.v_detail.sourceName))]),s("span",[t._v(t._s(t.v_detail.createTime))]),s("ul",[s("li",{class:t.v_detail.hasBrowse?"index_topic_icon_active":""},[s("i"),t._v(t._s(t.v_detail.rate))]),s("li",{class:t.v_detail.hasCollect?"index_topic_icon_active":"",on:{click:t.f_getCollect}},[s("i"),t._v(t._s(t.v_detail.collect))])])]),s("img",{attrs:{src:t.v_detail.img,alt:""}}),s("div",{staticClass:"td_content",domProps:{innerHTML:t._s(t.v_detail.content)}}),s("div",{staticClass:"td_comment"},[s("div",{staticClass:"td_comment_header"},[s("span",[t._v("全部评论（"+t._s(t.v_total)+"条）")]),s("span",{on:{click:function(e){return t.f_openSubmitComments(0)}}},[t._v("评论")])]),t.v_total?s("div",{staticClass:"td_comment_list"},t._l(t.v_comments,function(e,i){return s("div",{key:i,staticClass:"td_comment_item"},[t._m(0,!0),s("div",{staticClass:"td_comment_item_right"},[s("div",{staticClass:"td_comment_right_top"},[s("span",[t._v(t._s(e.mianComment.createUserName))]),s("i",{on:{click:function(s){return t.f_openSubmitComments(e.mianComment.id)}}})]),s("div",{staticClass:"td_comment_right_bottom"},[t._v("\n              "+t._s(e.mianComment.createTime.split(" ")[0])+"\n            ")]),s("div",{staticClass:"td_comment_content"},[t._v("\n              "+t._s(e.mianComment.content)+"\n            ")]),e.childrenComments?s("div",{staticClass:"td_comment_content_list"},[t._l(e.childrenComments,function(i,a){return s("div",{key:a,staticClass:"td_comment_content_list_each",class:e.openComment?"":"td_comment_content_list_more"},[s("span",[t._v(t._s(i.createUserName)+":")]),s("p",[t._v(t._s(i.content))])])}),t._e()],2):t._e()])])}),0):s("div",{staticClass:"td_nocomment"},[t._v("暂无评论")])]),s("div",{staticClass:"td_signup",class:t.signupLabel},[s("span",[t._v(t._s((new Date).getTime>new Date(this.v_detail.postEnd)?"已结束":"报名中"))]),s("span",{on:{click:t.f_openSignUp}},[t._v(t._s(1===t.v_status?"审核中":"我要报名"))])]),s("div",{directives:[{name:"show",rawName:"v-show",value:t.v_submit,expression:"v_submit"}],staticClass:"td_submit_wrapper"},[s("div",{staticClass:"td_mask",on:{click:t.f_closeSubmitComments}}),s("div",{staticClass:"td_submit_content"},[s("div",{staticClass:"td_submit_text"},[s("textarea",{directives:[{name:"model",rawName:"v-model",value:t.v_textarea,expression:"v_textarea"}],attrs:{placeholder:"请输入内容"},domProps:{value:t.v_textarea},on:{input:function(e){e.target.composing||(t.v_textarea=e.target.value)}}})]),s("div",{staticClass:"td_submit_btn",on:{click:t.f_postComment}},[t._v("提交")])])]),t.v_signup?s("div",{staticClass:"td_signup_wrapper"},[s("div",{staticClass:"td_mask",on:{click:t.f_closeSignUp}}),s("div",{staticClass:"td_sign_content"},[s("h6",[t._v("我要报名")]),s("div",{staticClass:"td_sign_input"},[s("label",[t._v("房屋信息")]),s("div",{staticClass:"td_sign_box"},[s("mu-select",{attrs:{label:"Normal",solo:"","full-width":""},model:{value:t.v_house,callback:function(e){t.v_house=e},expression:"v_house"}},t._l(t.v_houseList,function(t,e){return s("mu-option",{key:e,attrs:{label:t,value:t}})}),1)],1),s("i")]),s("div",{staticClass:"td_sign_input"},[s("label",[t._v("姓名")]),s("div",{staticClass:"td_sign_box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.user.name,expression:"$store.state.user.name"}],attrs:{type:"text",readonly:""},domProps:{value:t.$store.state.user.name},on:{input:function(e){e.target.composing||t.$set(t.$store.state.user,"name",e.target.value)}}})])]),s("div",{staticClass:"td_sign_input"},[s("label",[t._v("联系方式")]),s("div",{staticClass:"td_sign_box"},[s("input",{directives:[{name:"model",rawName:"v-model",value:t.$store.state.user.phoneNum,expression:"$store.state.user.phoneNum"}],attrs:{type:"text",readonly:""},domProps:{value:t.$store.state.user.phoneNum},on:{input:function(e){e.target.composing||t.$set(t.$store.state.user,"phoneNum",e.target.value)}}})])]),s("div",{staticClass:"td_sign_btn",on:{click:t.f_signup}},[t._v("立即报名")])])]):t._e()])])},a=[function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"td_comment_item_left"},[s("div",{staticClass:"td_comment_avatar"},[s("img",{attrs:{src:"",alt:""}})])])}],n=(s("7f7f"),s("ac6a"),{name:"detail",data:function(){return{v_id:0,v_detail:{},v_comments:[],v_total:0,v_status:3,v_submit:!1,v_signup:!1,v_houseList:[],v_house:"",v_textarea:"",v_currentRid:""}},computed:{signupLabel:function(){switch(this.v_status){case 1:return"td_signup_2";case 2:return"td_signup_3";case 0:return"td_signup_4"}if((new Date).getTime>new Date(this.v_detail.postEnd))return"td_signup_3"}},created:function(){this.v_id=this.$route.query.id,this.f_addRate(),this.f_getComments(),this.f_getHouse()},methods:{f_addRate:function(){var t=this,e={id:this.v_id,memberId:this.$store.state.user.id};this.$http.get("/obtain/notice/add",{params:e}).then(function(e){console.log("增加流量"),t.f_getDetail()})},f_getCollect:function(){var t,e=this;this.v_detail.hasCollect?this.$http.post("/collection/notice/cancel?memberId=".concat(this.$store.state.user.id,"&noticeId=").concat(this.v_id)).then(function(t){t.data.success&&(e.$toast("取消收藏"),e.f_getDetail())}):(t={noticeId:this.v_id,type:4,memberId:this.$store.state.user.id,phone:this.$store.state.user.phoneNum,villageCode:this.$store.state.villageCode},this.$http.post("/collection/notice/save",t).then(function(t){t.data.success&&(e.$toast("收藏成功"),e.f_getDetail())}))},f_getHouse:function(){var t=this,e={memberId:this.$store.state.user.id};this.$http.get("/admin/member/house/all",{params:e}).then(function(e){e.data.data&&(t.v_houseList=e.data.data.map(function(t){return"".concat(t.building).concat(t.unit).concat(t.room)}))})},f_getStatus:function(){var t=this,e={memberId:this.$store.state.user.id,rActivityId:this.v_detail.id};this.$http.get("/notice/activity/detail",{params:e}).then(function(e){e.data.result&&(t.v_status=e.data.result.sts)})},f_getDetail:function(){var t=this,e={id:this.v_id,memberId:this.$store.state.user.id};this.$http.get("/admin/event/detail",{params:e}).then(function(e){console.log("detail",e.data),t.v_detail=Object.assign({},e.data.data),t.v_status=e.data.data.status,t.f_getStatus()})},f_getComments:function(){var t=this,e=this.$store.state.villageCode;this.$http.post("/admin/comment/noticeList?rId=".concat(this.v_id,"&rtype=notice&villageCode=").concat(e)).then(function(e){console.log(e.data),t.v_comments=[],e.data.data.length&&e.data.data.forEach(function(e){e.openComment=!1,t.v_total++,t.v_comments.push(e)})})},f_openComments:function(t){this.v_comments[t].openComment=!0},f_openSubmitComments:function(t){this.v_submit=!0,this.v_currentRid=t,console.log(t)},f_closeSubmitComments:function(){this.v_submit=!1,this.v_textarea=""},f_postComment:function(){var t=this,e={rId:this.v_id,rtype:"notice",createUserId:this.$store.state.user.id,createUserName:this.$store.state.user.name,content:this.v_textarea,parentId:this.v_currentRid};this.$http.post("/admin/comment/add",e).then(function(e){e.data.success?(t.$toast("回复成功"),t.f_closeSubmitComments(),t.f_getComments()):console.log("评论失败",e)})},f_openSignUp:function(){this.v_signup=!0},f_closeSignUp:function(){this.v_signup=!1},f_signup:function(){var t=this,e={rActivityId:this.v_id,activityTitle:this.v_detail.title,houseInfo:this.v_house,memberName:this.$store.state.user.name,memberId:this.$store.state.user.id,villageCode:this.$store.state.villageCode,phone:this.$store.state.user.phoneNum};this.$http.post("/notice/activity/add",e).then(function(e){e.data.success&&(t.v_status=1,t.f_closeSignUp(),t.$toast("报名成功"))})}}}),o=n,c=(s("12ec"),s("2877")),_=Object(c["a"])(o,i,a,!1,null,"49b5393f",null);e["default"]=_.exports},"7f7f":function(t,e,s){var i=s("86cc").f,a=Function.prototype,n=/^\s*function ([^ (]*)/,o="name";o in a||s("9e1e")&&i(a,o,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(t){return""}}})},a952:function(t,e,s){}}]);
//# sourceMappingURL=chunk-ba10f820.2bd60324.js.map