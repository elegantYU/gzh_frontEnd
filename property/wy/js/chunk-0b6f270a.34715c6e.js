(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0b6f270a"],{"6daa":function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"sd_wrapper"},[i("div",{staticClass:"sd_container"},[i("div",{staticClass:"sd_header"},[i("div",{staticClass:"sd_header_img"},[i("img",{attrs:{src:t.v_detail.masterImg,alt:""}})]),i("h6",[t._v(t._s(t.v_detail.name1))]),i("p",[t._v(t._s(t.v_detail.keyword))]),i("b",[t._v("￥ "+t._s(t.v_detail.mallPcPrice))]),i("div",{staticClass:"sd_header_shop clearfix"},[t.v_detail.name2?i("span",{staticClass:"sd_header_shop_tag"},[t._v(t._s(t.v_detail.name2))]):t._e(),t.v_num?i("div",{staticClass:"sd_header_shopcar_add"},[i("i",{on:{click:t.f_cutNum}},[t._v("-")]),i("span",[t._v(t._s(t.v_num))]),i("i",{on:{click:t.f_addNum}},[t._v("+")])]):i("div",{staticClass:"sd_header_shopcar_none",on:{click:t.f_addNum}})]),i("div",{staticClass:"sd_header_detail"},[t.v_detail.marketPrice?i("span",[t._v("原价："),i("s",[t._v("￥"+t._s(t.v_detail.marketPrice))])]):t._e(),i("span",[t._v("月销："+t._s(t.v_detail.actualSales))])])]),i("div",{staticClass:"sd_detail"},[i("p",[t._v("—  详情  —")]),i("div",{staticClass:"sd_detail_text",domProps:{innerHTML:t._s(t.v_detail.description)}})])]),i("div",{staticClass:"sd_fixed_bar"},[i("ul",{staticClass:"sd_fixed_bar_left clearfix"},[i("li",{on:{click:t.f_moveIndex}},[i("i"),i("span",[t._v("首页")])]),i("li",{on:{click:t.f_moveCar}},[i("i",{class:{active:t.v_blue}}),i("span",[t._v("购物车")])])]),i("div",{staticClass:"sd_fixed_bar_right"},[i("span",{class:{active:t.v_num},on:{click:t.f_addCar}},[t._v("加入购物车")]),i("span",{on:{click:t.f_getOrder}},[t._v("立即下单")])])])])},a=[],d=(i("7f7f"),i("96cf"),i("3b8d")),n={name:"shopItemDetail",data:function(){return{v_id:"",v_detail:{},v_num:1,v_blue:!1}},mounted:function(){console.log(this.$store.state),this.v_id=this.$route.query.id,this.f_getDetail()},methods:{f_getDetail:function(){var t=this,e={id:this.v_id};this.$http.get("/admin/product/detail",{params:e}).then(function(e){console.log(e),t.v_detail=Object.assign({},e.data.data)})},f_addNum:function(){this.v_num>this.v_detail.productStock?this.$toast("库存不足"):this.v_num++},f_cutNum:function(){if(!this.v_num)return!1;this.v_num--},f_addCar:function(){var t=Object(d["a"])(regeneratorRuntime.mark(function t(){var e;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e={memberId:this.$store.state.user.id,count:this.v_num,productId:this.v_id,sellerId:this.v_detail.sellerId,villageCode:this.v_detail.villageCode,unitPrice:this.v_detail.mallPcPrice,specInfo:this.v_detail.name1},t.next=3,this.$http.post("/admin/cart/add",e);case 3:this.v_blue=!0;case 4:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),f_moveIndex:function(){this.$router.push({name:"index"})},f_moveCar:function(){this.$router.push({name:"shopCar"})},f_getOrder:function(){var t=[{cartId:this.v_id,sellerId:this.v_detail.sellerId,memberId:this.$store.state.user.id,memberName:this.$store.state.user.name,moneyProduct:1*(this.v_detail.mallPcPrice*this.v_num).toFixed(2),mobile:this.$store.state.user.phoneNum,moneyPrice:this.v_detail.mallPcPrice,productId:this.v_detail.id,productName:this.v_detail.name1,number:this.v_num||1,specInfo:this.v_detail.name1,productSku:this.v_detail.masterImg}];this.$store.commit("setOrderParams",t),this.$router.push({name:"shopOrderList"})}}},r=n,c=(i("de32"),i("2877")),_=Object(c["a"])(r,s,a,!1,null,"3f2dc386",null);e["default"]=_.exports},"7f7f":function(t,e,i){var s=i("86cc").f,a=Function.prototype,d=/^\s*function ([^ (]*)/,n="name";n in a||i("9e1e")&&s(a,n,{configurable:!0,get:function(){try{return(""+this).match(d)[1]}catch(t){return""}}})},ac79:function(t,e,i){},de32:function(t,e,i){"use strict";var s=i("ac79"),a=i.n(s);a.a}}]);
//# sourceMappingURL=chunk-0b6f270a.34715c6e.js.map