(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8711844c"],{"1af6":function(t,e,n){var r=n("63b6");r(r.S,"Array",{isArray:n("9003")})},"20fd":function(t,e,n){"use strict";var r=n("d9f6"),i=n("aebd");t.exports=function(t,e,n){e in t?r.f(t,e,i(0,n)):t[e]=n}},"549b":function(t,e,n){"use strict";var r=n("d864"),i=n("63b6"),a=n("241e"),s=n("b0dc"),o=n("3702"),c=n("b447"),u=n("20fd"),f=n("7cd6");i(i.S+i.F*!n("4ee1")(function(t){Array.from(t)}),"Array",{from:function(t){var e,n,i,d,l=a(t),p="function"==typeof this?this:Array,h=arguments.length,m=h>1?arguments[1]:void 0,v=void 0!==m,_=0,g=f(l);if(v&&(m=r(m,h>2?arguments[2]:void 0,2)),void 0==g||p==Array&&o(g))for(e=c(l.length),n=new p(e);e>_;_++)u(n,_,v?m(l[_],_):l[_]);else for(d=g.call(l),n=new p;!(i=d.next()).done;_++)u(n,_,v?s(d,m,[i.value,_],!0):i.value);return n.length=_,n}})},"54a1":function(t,e,n){n("6c1c"),n("1654"),t.exports=n("95d5")},"5df3":function(t,e,n){"use strict";var r=n("02f4")(!0);n("01f9")(String,"String",function(t){this._t=String(t),this._i=0},function(){var t,e=this._t,n=this._i;return n>=e.length?{value:void 0,done:!0}:(t=r(e,n),this._i+=t.length,{value:t,done:!1})})},"75fc":function(t,e,n){"use strict";var r=n("a745"),i=n.n(r);function a(t){if(i()(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}var s=n("774e"),o=n.n(s),c=n("c8bb"),u=n.n(c);function f(t){if(u()(Object(t))||"[object Arguments]"===Object.prototype.toString.call(t))return o()(t)}function d(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function l(t){return a(t)||f(t)||d()}n.d(e,"a",function(){return l})},"774e":function(t,e,n){t.exports=n("d2d5")},"8ad4":function(t,e,n){},"95d5":function(t,e,n){var r=n("40c3"),i=n("5168")("iterator"),a=n("481b");t.exports=n("584a").isIterable=function(t){var e=Object(t);return void 0!==e[i]||"@@iterator"in e||a.hasOwnProperty(r(e))}},a745:function(t,e,n){t.exports=n("f410")},c8bb:function(t,e,n){t.exports=n("54a1")},d2d5:function(t,e,n){n("1654"),n("549b"),t.exports=n("584a").Array.from},dd3e:function(t,e,n){},f0bf:function(t,e,n){"use strict";var r=n("dd3e"),i=n.n(r);i.a},f410:function(t,e,n){n("1af6"),t.exports=n("584a").Array.isArray},f4e7:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"si_wrapper",on:{click:t.f_opemDetail}},[n("div",{staticClass:"shop_item_img"},[n("img",{attrs:{src:t.item.masterImg,alt:""}})]),n("b",[n("span",[t._v(t._s(t.item.name1))]),t._v(" "+t._s(t.item.productStock)+t._s(t.item.unit))]),n("p",[t._v(t._s(t.item.keyword))]),n("div",{staticClass:"shop_item_detail"},[n("span",[t._v("￥"+t._s(t.item.mallPcPrice))]),t.item.marketPrice?n("s",[t._v("原价:"+t._s(t.item.marketPrice))]):t._e(),n("span",[t._v("销量"+t._s(t.item.actualSales>1e3?"999+":t.item.actualSales)+"件")]),n("i",{class:{active:t.v_active},on:{click:function(e){return e.stopPropagation(),t.f_addShopCar(e)}}})])])},i=[],a=(n("96cf"),n("3b8d")),s={props:{item:Object},data:function(){return{v_active:!1}},mounted:function(){console.log("detail",this.item)},methods:{f_addShopCar:function(){var t=Object(a["a"])(regeneratorRuntime.mark(function t(){var e,n,r;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.item.productStock){t.next=3;break}return this.$toast("库存不足"),t.abrupt("return");case 3:return e={memberId:this.$store.state.user.id,count:1,productId:this.item.id,sellerId:this.item.sellerId,villageCode:this.item.villageCode,unitPrice:this.item.mallPcPrice,specInfo:this.item.name1},t.next=6,this.$http.post("/admin/cart/add",e);case 6:n=t.sent,r=n.data,console.log(r),r.success&&(this.v_active=!0);case 10:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),f_opemDetail:function(){this.$router.push({name:"shopItemDetail",query:{id:this.item.id}})}}},o=s,c=(n("f0bf"),n("2877")),u=Object(c["a"])(o,r,i,!1,null,"6e61ce5a",null);e["a"]=u.exports},f695:function(t,e,n){"use strict";var r=n("8ad4"),i=n.n(r);i.a},fe3d:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"sc_wrapper"},t._l(t.v_list,function(e,r){return n("div",{key:r,staticClass:"shop_category"},[n("div",{staticClass:"shop_category_head"},[n("span",[t._v(t._s(e.codeText))]),n("span",{on:{click:function(n){return t.f_moveMore(e.codeCd)}}},[t._v("更多 >")])]),n("div",{staticClass:"shop_category_body"},[n("ul",t._l(e.children,function(t,e){return n("li",{key:e},[n("shopItem",{key:e,attrs:{item:t}})],1)}),0)])])}),0)},i=[],a=(n("ac6a"),n("5df3"),n("75fc")),s=(n("96cf"),n("3b8d")),o=n("f4e7"),c={data:function(){return{v_list:[]}},components:{shopItem:o["a"]},created:function(){this.f_getList()},methods:{f_getList:function(){var t=Object(s["a"])(regeneratorRuntime.mark(function t(){var e,n,r,i=this;return regeneratorRuntime.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.$http.get("/admin/product/floor");case 2:return n=t.sent,r=n.data.data,(e=this.v_list).push.apply(e,Object(a["a"])(r)),t.next=7,Promise.all(r.map(function(t){return i.f_getItem({start:1,pageSize:5,villageCode:i.$store.state.villageCode,productCateId:t.codeCd},t.codeCd)})).then(function(t){var e;i.v_list=[],(e=i.v_list).push.apply(e,Object(a["a"])(r))});case 7:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),f_getItem:function(t,e){var n=this;return new Promise(function(){var r=Object(s["a"])(regeneratorRuntime.mark(function r(i){var a;return regeneratorRuntime.wrap(function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,n.$http.get("/admin/product/pageList",{params:t});case 2:a=r.sent,n.v_list.map(function(t){t.codeCd===e&&(t.children=a.data.data.slice(0))}),i(a);case 5:case"end":return r.stop()}},r)}));return function(t){return r.apply(this,arguments)}}())},f_moveMore:function(t){this.$router.push({name:"shopMore",query:{productCateId:t}})}}},u=c,f=(n("f695"),n("2877")),d=Object(f["a"])(u,r,i,!1,null,"4706228c",null);e["default"]=d.exports}}]);
//# sourceMappingURL=chunk-8711844c.921a43fd.js.map