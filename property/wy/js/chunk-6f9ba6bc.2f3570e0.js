(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6f9ba6bc"],{"4d08":function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"rep_wrapper"},[a("div",{staticClass:"rep_content"},[a("div",{staticClass:"rep_from"},[a("div",{staticClass:"rep_input"},[a("label",[e._v("饲养人")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.raiser,expression:"v_detail.raiser"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.raiser},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"raiser",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("宠物品种")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.petBreed,expression:"v_detail.petBreed"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.petBreed},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"petBreed",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("昵称")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.petName,expression:"v_detail.petName"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.petName},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"petName",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("性别")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.gender,expression:"v_detail.gender"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.gender},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"gender",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("是否绝育")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.sterilization,expression:"v_detail.sterilization"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.sterilization},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"sterilization",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("体重")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.weight,expression:"v_detail.weight"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.weight},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"weight",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("住址：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.address,expression:"v_detail.address"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.address},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"address",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("动物健康免疫证编号")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.exemptionNum,expression:"v_detail.exemptionNum"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.exemptionNum},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"exemptionNum",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("免疫时间：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.exemptionTime,expression:"v_detail.exemptionTime"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.exemptionTime},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"exemptionTime",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("疫苗种类：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.vaccineType,expression:"v_detail.vaccineType"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.vaccineType},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"vaccineType",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("养犬登记编号")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.petRegisNum,expression:"v_detail.petRegisNum"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.petRegisNum},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"petRegisNum",t.target.value)}}})]),a("div",{staticClass:"rep_input"},[a("label",[e._v("登记时间：")]),a("input",{directives:[{name:"model",rawName:"v-model",value:e.v_detail.createTime,expression:"v_detail.createTime"}],attrs:{type:"text",readonly:""},domProps:{value:e.v_detail.createTime},on:{input:function(t){t.target.composing||e.$set(e.v_detail,"createTime",t.target.value)}}})])]),a("div",{staticClass:"rep_preview"},[a("b",[e._v("证件照片")]),a("div",{staticClass:"rep_preview_wrapper"},e._l(e.imgs,function(e,t){return a("div",{key:t,staticClass:"rep_preview_item"},[a("img",{attrs:{src:e,alt:""}})])}),0)]),a("div",{staticClass:"pet_btns"},[a("span",{on:{click:e.f_passNot}},[e._v("审核不通过")]),a("span",{on:{click:e.f_pass}},[e._v("审核通过")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:e.v_pop,expression:"v_pop"}],staticClass:"pet_pop"},[a("div",{staticClass:"pet_mask",on:{click:e.f_cancel}}),a("div",{staticClass:"pet_content"},[a("textarea",{directives:[{name:"model",rawName:"v-model",value:e.v_desc,expression:"v_desc"}],attrs:{placeholder:"请输入审批原因"},domProps:{value:e.v_desc},on:{input:function(t){t.target.composing||(e.v_desc=t.target.value)}}}),a("div",{staticClass:"pet_pop_btns"},[a("span",{on:{click:e.f_cancel}},[e._v("取消")]),a("span",{on:{click:e.f_submit}},[e._v("确认")])])])])])])},s=[],n=(a("7f7f"),a("96cf"),a("3b8d")),r={data:function(){return{v_id:0,v_detail:{},v_pop:!1,v_desc:""}},computed:{imgs:function(){return JSON.parse(v_detail.exemptionImg)}},mounted:function(){this.v_id=this.$route.query.id},methods:{f_getDetail:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t={id:this.v_id},e.next=3,this.$http.get("/admin/member/pet/getPetDetail",{params:t});case 3:a=e.sent,i=a.data.data,this.v_detail=Object.assign({},i);case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),f_passNot:function(){this.v_pop=!0},f_pass:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return t={id:this.v_id,type:1,userId:this.$store.state.user.id,userName:this.$store.state.user.name},e.next=3,this.$http.get("/admin/member/pet/system/wx/updatePet",{params:t});case 3:a=e.sent,i=a.data.success,i?this.$toast("审核通过"):this.$toast("网络错误");case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),f_submit:function(){var e=Object(n["a"])(regeneratorRuntime.mark(function e(){var t,a,i;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(this.v_desc){e.next=3;break}return this.$toast("拒绝理由不能为空"),e.abrupt("return");case 3:return t={id:this.v_id,type:2,userId:this.$store.state.user.id,userName:this.$store.state.user.name,msg:this.v_desc},e.next=6,this.$http.get("/admin/member/pet/system/wx/updatePet",{params:t});case 6:a=e.sent,i=a.data.success,i?this.$toast("审批拒绝"):this.$toast("网络错误");case 9:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),f_cancel:function(){this.v_pop=!1}}},o=r,l=(a("dcb8"),a("2877")),p=Object(l["a"])(o,i,s,!1,null,"278c7282",null);t["default"]=p.exports},"7f7f":function(e,t,a){var i=a("86cc").f,s=Function.prototype,n=/^\s*function ([^ (]*)/,r="name";r in s||a("9e1e")&&i(s,r,{configurable:!0,get:function(){try{return(""+this).match(n)[1]}catch(e){return""}}})},8906:function(e,t,a){},dcb8:function(e,t,a){"use strict";var i=a("8906"),s=a.n(i);s.a}}]);
//# sourceMappingURL=chunk-6f9ba6bc.2f3570e0.js.map