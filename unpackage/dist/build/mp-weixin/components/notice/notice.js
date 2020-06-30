(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/notice/notice"],{"060c":function(t,n,e){"use strict";e.r(n);var o=e("d3ee"),u=e.n(o);for(var c in o)"default"!==c&&function(t){e.d(n,t,(function(){return o[t]}))}(c);n["default"]=u.a},"1d7e":function(t,n,e){"use strict";var o={tuiBottomPopup:function(){return e.e("components/thorui/tui-bottom-popup/tui-bottom-popup").then(e.bind(null,"ccc1"))}},u=function(){var t=this,n=t.$createElement;t._self._c},c=[];e.d(n,"b",(function(){return u})),e.d(n,"c",(function(){return c})),e.d(n,"a",(function(){return o}))},"4e27":function(t,n,e){"use strict";var o=e("a186"),u=e.n(o);u.a},a186:function(t,n,e){},a7f9:function(t,n,e){"use strict";e.r(n);var o=e("1d7e"),u=e("060c");for(var c in u)"default"!==c&&function(t){e.d(n,t,(function(){return u[t]}))}(c);e("4e27");var i,a=e("f0c5"),r=Object(a["a"])(u["default"],o["b"],o["c"],!1,null,null,null,!1,o["a"],i);n["default"]=r.exports},d3ee:function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o={name:"notice",props:{value:{type:Boolean,default:!1}},data:function(){return{showPopup:!1}},watch:{value:function(t){this.showPopup=t}},methods:{onClose:function(){this.showPopup=!1,this.$emit("close",{})}}};n.default=o}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/notice/notice-create-component',
    {
        'components/notice/notice-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("a7f9"))
        })
    },
    [['components/notice/notice-create-component']]
]);
