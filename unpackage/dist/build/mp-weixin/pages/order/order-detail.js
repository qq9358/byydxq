(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/order/order-detail"],{"38e4":function(e,t,n){"use strict";(function(e){n("db7e");r(n("66fd"));var t=r(n("4de0"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},"3e1c":function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=u(n("4795")),a=u(n("a70c")),o=u(n("ec5c")),c=u(n("8861")),i=u(n("ed00"));function u(e){return e&&e.__esModule?e:{default:e}}function s(e){if("undefined"===typeof Symbol||null==e[Symbol.iterator]){if(Array.isArray(e)||(e=l(e))){var t=0,n=function(){};return{s:n,n:function(){return t>=e.length?{done:!0}:{done:!1,value:e[t++]}},e:function(e){throw e},f:n}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var r,a,o=!0,c=!1;return{s:function(){r=e[Symbol.iterator]()},n:function(){var e=r.next();return o=e.done,e},e:function(e){c=!0,a=e},f:function(){try{o||null==r.return||r.return()}finally{if(c)throw a}}}}function l(e,t){if(e){if("string"===typeof e)return f(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);return"Object"===n&&e.constructor&&(n=e.constructor.name),"Map"===n||"Set"===n?Array.from(n):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?f(e,t):void 0}}function f(e,t){(null==t||t>e.length)&&(t=e.length);for(var n=0,r=new Array(t);n<t;n++)r[n]=e[n];return r}function d(e,t,n,r,a,o,c){try{var i=e[o](c),u=i.value}catch(s){return void n(s)}i.done?t(u):Promise.resolve(u).then(r,a)}function h(e){return function(){var t=this,n=arguments;return new Promise((function(r,a){var o=e.apply(t,n);function c(e){d(o,r,a,c,i,"next",e)}function i(e){d(o,r,a,c,i,"throw",e)}c(void 0)}))}}var v={data:function(){return{orderInfo:{details:[]},currentBarcode:"",countdownText:"",timer:-1,saving:!1,isLoadingData:!1,allowLeave:!1}},computed:{statusInfo:function(){switch(this.orderInfo.orderStatusName){case"待付款":return"库存有限，请尽快完成付款";case"退款中":return"退款申请已提交，我们将尽快为您处理";case"已取消":return"您的订单已取消，欢迎重新预订";case"已审核":return"预订已成功，祝您出游愉快"}return""},allowCancel:function(){return this.orderInfo.shouldPay||0==this.orderInfo.totalMoney},refundText:function(){return this.allowCancel?"申请取消":"申请退款"},changCiOrderDetails:function(){return this.orderInfo.details.filter((function(e){return e.groundChangCis&&e.groundChangCis.length>0}))}},onLoad:function(e){var t=this;return h(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return t.listNo=e.listNo,n.next=3,t.loadData();case 3:case"end":return n.stop()}}),n)})))()},onPullDownRefresh:function(){var e=this;return h(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.loadData();case 2:case"end":return t.stop()}}),t)})))()},beforeRouteLeave:function(e,t,n){var a=this;return h(r.default.mark((function e(){return r.default.wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(!a.allowLeave){e.next=3;break}return n(),e.abrupt("return");case 3:clearInterval(a.timer),n();case 5:case"end":return e.stop()}}),e)})))()},methods:{loadData:function(){var e=this;return h(r.default.mark((function t(){return r.default.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.getOrderInfo();case 2:e.startCountdown();case 3:case"end":return t.stop()}}),t)})))()},getOrderInfo:function(){var t=this;return h(r.default.mark((function n(){var a;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,t.isLoadingData=!0,t.currentBarcode="",e.showLoading({duration:0,title:"加载中..."}),n.next=6,c.default.getOrderInfoForMobileAsync(t.listNo);case 6:return a=n.sent,a.hasContact=a.contact.contactName||a.contact.contactCertNo||a.contact.contactMobile,n.next=10,t.generateQRCodeAsync(a);case 10:t.orderInfo=a,console.log(orderInfo),n.next=17;break;case 14:return n.prev=14,n.t0=n["catch"](0),n.abrupt("return");case 17:return n.prev=17,e.hideLoading(),t.isLoadingData=!1,n.finish(17);case 21:case"end":return n.stop()}}),n,null,[[0,14,17,21]])})))()},generateQRCodeAsync:function(e){var t=this;return h(r.default.mark((function n(){var a,c,i,u,l,f;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(e.hasDetail=e.details&&e.details.length>0,e.hasDetail){n.next=3;break}return n.abrupt("return");case 3:a=s(e.details),n.prev=4,a.s();case 6:if((c=a.n()).done){n.next=34;break}if(i=c.value,i.hasTicket=i.tickets&&i.tickets.length>0,i.hasTicket){n.next=11;break}return n.abrupt("continue",32);case 11:u=s(i.tickets),n.prev=12,u.s();case 14:if((l=u.n()).done){n.next=24;break}if(f=l.value,f.isUsable){n.next=18;break}return n.abrupt("continue",22);case 18:return n.next=20,o.default.createQRCodeAsync(f.ticketCode);case 20:f.qrcode=n.sent,t.currentBarcode||(t.currentBarcode=f.ticketCode);case 22:n.next=14;break;case 24:n.next=29;break;case 26:n.prev=26,n.t0=n["catch"](12),u.e(n.t0);case 29:return n.prev=29,u.f(),n.finish(29);case 32:n.next=6;break;case 34:n.next=39;break;case 36:n.prev=36,n.t1=n["catch"](4),a.e(n.t1);case 39:return n.prev=39,a.f(),n.finish(39);case 42:case"end":return n.stop()}}),n,null,[[4,36,39,42],[12,26,29,32]])})))()},startCountdown:function(){var e=this;if(clearInterval(this.timer),this.orderInfo.shouldPay){var t=(0,a.default)("2018-01-01 00:00:00"),n=t.clone().addSeconds(this.orderInfo.expireSeconds),r=this.orderInfo.expireSeconds>3600?"HH:mm:ss":"mm:ss";this.countdownText=n.format(r),this.timer=setInterval((function(){n=n.subtract(1,"seconds"),e.countdownText=n.format(r),n.isSame(t)&&(clearInterval(e.timer),e.getOrderInfo())}),1e3)}},onBarcodeClick:function(e){this.currentBarcode=e.ticketCode},isBarcodeCollapse:function(e){return this.currentBarcode!==e.ticketCode},pay:function(){e.navigateTo({url:"/pages/payment/wx-js-pay?listNo="+this.listNo})},refund:function(){var t=this;return h(r.default.mark((function n(){return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(!t.allowCancel){n.next=5;break}return n.next=3,t.cancelOrder();case 3:n.next=6;break;case 5:e.navigateTo({url:"/pages/order/refund-ticket?listNo="+t.listNo});case 6:case"end":return n.stop()}}),n)})))()},cancelOrder:function(){var t=this;return h(r.default.mark((function n(){var a,o;return r.default.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.prev=0,t.saving=!0,n.next=4,e.showModal({content:"确定取消订单？"});case 4:if(a=n.sent,!a[1].confirm){n.next=13;break}return n.next=8,c.default.cancelOrderAsync(t.listNo);case 8:if(o=n.sent,!o.success){n.next=13;break}return i.default.noneToast("取消成功"),n.next=13,t.getOrderInfo();case 13:n.next=18;break;case 15:return n.prev=15,n.t0=n["catch"](0),n.abrupt("return");case 18:return n.prev=18,t.saving=!1,n.finish(18);case 21:case"end":return n.stop()}}),n,null,[[0,15,18,21]])})))()},buyAgain:function(){e.switchTab({url:"/pages/index/index"})},refundDetail:function(){e.navigateTo({url:"/pages/order/refnd-detail?listNo="+this.listNo})},enrollFace:function(){e.navigateTo({url:"/pages/member/enroll-face?listNo="+this.listNo})}}};t.default=v}).call(this,n("543d")["default"])},"4de0":function(e,t,n){"use strict";n.r(t);var r=n("82e2"),a=n("7549");for(var o in a)"default"!==o&&function(e){n.d(t,e,(function(){return a[e]}))}(o);n("e12c");var c,i=n("f0c5"),u=Object(i["a"])(a["default"],r["b"],r["c"],!1,null,"0b65f323",null,!1,r["a"],c);t["default"]=u.exports},7549:function(e,t,n){"use strict";n.r(t);var r=n("3e1c"),a=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,(function(){return r[e]}))}(o);t["default"]=a.a},"82e2":function(e,t,n){"use strict";var r,a=function(){var e=this,t=e.$createElement,n=(e._self._c,e.__map(e.orderInfo.details,(function(t,n){var r=e.__map(t.tickets,(function(t,n){var r=e.isBarcodeCollapse(t),a=e.isBarcodeCollapse(t),o=e.isBarcodeCollapse(t);return{$orig:e.__get_orig(t),m0:r,m1:a,m2:o}}));return{$orig:e.__get_orig(t),l0:r}})));e.$mp.data=Object.assign({},{$root:{l1:n}})},o=[];n.d(t,"b",(function(){return a})),n.d(t,"c",(function(){return o})),n.d(t,"a",(function(){return r}))},ab86:function(e,t,n){},e12c:function(e,t,n){"use strict";var r=n("ab86"),a=n.n(r);a.a}},[["38e4","common/runtime","common/vendor"]]]);