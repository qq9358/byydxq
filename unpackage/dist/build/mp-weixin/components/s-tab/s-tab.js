(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/s-tab/s-tab"],{"443b":function(t,n,a){"use strict";var e=a("4c70"),i=a.n(e);i.a},"4c70":function(t,n,a){},a266:function(t,n,a){"use strict";var e,i=function(){var t=this,n=t.$createElement;t._self._c},r=[];a.d(n,"b",(function(){return i})),a.d(n,"c",(function(){return r})),a.d(n,"a",(function(){return e}))},d7e7:function(t,n,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={name:"s-tab",inject:["$tabs"],props:{title:{type:String,default:""}},data:function(){return{id:"s-tab-id-"+Math.random().toString(36).substr(2)}},mounted:function(){var t=this.id,n=this.title;this.$tabs.navList=this.$tabs.navList.concat({id:t,title:n})},beforeDestroy:function(){var t=this;this.$tabs.navList=this.$tabs.navList.filter((function(n){return n.id!==t.id}))}};n.default=e},f5ae:function(t,n,a){"use strict";a.r(n);var e=a("d7e7"),i=a.n(e);for(var r in e)"default"!==r&&function(t){a.d(n,t,(function(){return e[t]}))}(r);n["default"]=i.a},fac9:function(t,n,a){"use strict";a.r(n);var e=a("a266"),i=a("f5ae");for(var r in i)"default"!==r&&function(t){a.d(n,t,(function(){return i[t]}))}(r);a("443b");var u,s=a("f0c5"),c=Object(s["a"])(i["default"],e["b"],e["c"],!1,null,null,null,!1,e["a"],u);n["default"]=c.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/s-tab/s-tab-create-component',
    {
        'components/s-tab/s-tab-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fac9"))
        })
    },
    [['components/s-tab/s-tab-create-component']]
]);
