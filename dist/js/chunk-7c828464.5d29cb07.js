(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7c828464"],{"4df4":function(t,e,r){"use strict";var o=r("0366"),n=r("7b0b"),c=r("9bdd"),a=r("e95a"),i=r("50c4"),l=r("8418"),d=r("35a1");t.exports=function(t){var e,r,s,u,f,b,p=n(t),m="function"==typeof this?this:Array,g=arguments.length,h=g>1?arguments[1]:void 0,j=void 0!==h,O=d(p),v=0;if(j&&(h=o(h,g>2?arguments[2]:void 0,2)),void 0==O||m==Array&&a(O))for(e=i(p.length),r=new m(e);e>v;v++)b=j?h(p[v],v):p[v],l(r,v,b);else for(u=O.call(p),f=u.next,r=new m;!(s=f.call(u)).done;v++)b=j?c(u,h,[s.value,v],!0):s.value,l(r,v,b);return r.length=v,r}},"690f":function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("fb6a"),r("d3b7"),r("b0c0"),r("a630"),r("3ca3");function o(t,e){(null==e||e>t.length)&&(e=t.length);for(var r=0,o=new Array(e);r<e;r++)o[r]=t[r];return o}function n(t,e){if(t){if("string"===typeof t)return o(t,e);var r=Object.prototype.toString.call(t).slice(8,-1);return"Object"===r&&t.constructor&&(r=t.constructor.name),"Map"===r||"Set"===r?Array.from(t):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?o(t,e):void 0}}},"9bdd":function(t,e,r){var o=r("825a"),n=r("2a62");t.exports=function(t,e,r,c){try{return c?e(o(r)[0],r[1]):e(r)}catch(a){throw n(t),a}}},a630:function(t,e,r){var o=r("23e7"),n=r("4df4"),c=r("1c7e"),a=!c((function(t){Array.from(t)}));o({target:"Array",stat:!0,forced:a},{from:n})},b85c:function(t,e,r){"use strict";r.d(e,"a",(function(){return n}));r("a4d3"),r("e01a"),r("d3b7"),r("d28b"),r("3ca3"),r("ddb0");var o=r("690f");function n(t,e){var r;if("undefined"===typeof Symbol||null==t[Symbol.iterator]){if(Array.isArray(t)||(r=Object(o["a"])(t))||e&&t&&"number"===typeof t.length){r&&(t=r);var n=0,c=function(){};return{s:c,n:function(){return n>=t.length?{done:!0}:{done:!1,value:t[n++]}},e:function(t){throw t},f:c}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var a,i=!0,l=!1;return{s:function(){r=t[Symbol.iterator]()},n:function(){var t=r.next();return i=t.done,t},e:function(t){l=!0,a=t},f:function(){try{i||null==r["return"]||r["return"]()}finally{if(l)throw a}}}}},d28b:function(t,e,r){var o=r("746f");o("iterator")},e01a:function(t,e,r){"use strict";var o=r("23e7"),n=r("83ab"),c=r("da84"),a=r("5135"),i=r("861d"),l=r("9bf2").f,d=r("e893"),s=c.Symbol;if(n&&"function"==typeof s&&(!("description"in s.prototype)||void 0!==s().description)){var u={},f=function(){var t=arguments.length<1||void 0===arguments[0]?void 0:String(arguments[0]),e=this instanceof f?new s(t):void 0===t?s():s(t);return""===t&&(u[e]=!0),e};d(f,s);var b=f.prototype=s.prototype;b.constructor=f;var p=b.toString,m="Symbol(test)"==String(s("test")),g=/^Symbol\((.*)\)[^)]+$/;l(b,"description",{configurable:!0,get:function(){var t=i(this)?this.valueOf():this,e=p.call(t);if(a(u,t))return"";var r=m?e.slice(7,-1):e.replace(g,"$1");return""===r?void 0:r}}),o({global:!0,forced:!0},{Symbol:f})}},ef31:function(t,e,r){"use strict";r.r(e);var o=r("7a23"),n=Object(o["withScopeId"])("data-v-58617e66");Object(o["pushScopeId"])("data-v-58617e66");var c={class:"container"},a={class:"form-group row"},i=Object(o["createVNode"])("label",{for:"roll_id",class:"col-md-12 col-form-label"},"ລາຍງານຍອດຂາຍວັນທີ: ",-1),l={class:"col-md-12"},d=Object(o["createVNode"])("label",{for:"roll_id",class:"col-md-12 col-form-label"},null,-1),s={class:"col-md-12"},u=Object(o["createVNode"])("button",{class:"btn btn-success"},"ດຶງຂໍ້ມູນ",-1),f={class:"table sm"},b=Object(o["createVNode"])("thead",null,[Object(o["createVNode"])("tr",null,[Object(o["createVNode"])("th",{scope:"col"},"ເລກງວດ"),Object(o["createVNode"])("th",{scope:"col"},"ເລກບິນ"),Object(o["createVNode"])("th",{scope:"col"},"ຜູ້ຂາຍ"),Object(o["createVNode"])("th",{scope:"col"},"ວັນທີ"),Object(o["createVNode"])("th",{scope:"col",class:"text-right"},"ເລກສ່ຽງ"),Object(o["createVNode"])("th",{scope:"col",class:"text-right"},"ຈຳນວນເງິນ")])],-1),p={class:"text-right"},m={class:"text-right"},g={key:0,class:"error"},h=Object(o["createVNode"])("td",null,null,-1),j=Object(o["createVNode"])("td",null,null,-1),O=Object(o["createVNode"])("td",null,null,-1),v=Object(o["createVNode"])("td",{class:"text-right"},"ລວມຍອດຂາຍ",-1),y={class:"text-right"},N={key:0,class:"fa fa-spinner fa-spin fa-3x fa-fw"},V={key:1,style:{color:"red"}};Object(o["popScopeId"])();var _=n((function(t,e,r,n,_,S){return Object(o["openBlock"])(),Object(o["createBlock"])("div",c,[Object(o["createVNode"])("form",{onSubmit:e[2]||(e[2]=Object(o["withModifiers"])((function(){return S.getData&&S.getData.apply(S,arguments)}),["prevent"]))},[Object(o["createVNode"])("div",a,[i,Object(o["createVNode"])("div",l,[Object(o["withDirectives"])(Object(o["createVNode"])("input",{type:"date",class:"form-control","onUpdate:modelValue":e[1]||(e[1]=function(t){return _.r_date=t})},null,512),[[o["vModelText"],_.r_date]])]),d,Object(o["createVNode"])("div",s,[u,Object(o["createTextVNode"])(" | "+Object(o["toDisplayString"])(S.formatdate(_.r_date)),1)])])],32),Object(o["createVNode"])("table",f,[b,Object(o["createVNode"])("tbody",null,[(Object(o["openBlock"])(!0),Object(o["createBlock"])(o["Fragment"],null,Object(o["renderList"])(_.report_data,(function(t,e){return Object(o["openBlock"])(),Object(o["createBlock"])("tr",{key:e},[Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(t.ism_id),1),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(t.sale_bill_id),1),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(t.mem_id),1),Object(o["createVNode"])("td",null,Object(o["toDisplayString"])(S.formatdate(t.date)),1),Object(o["createVNode"])("td",p,Object(o["toDisplayString"])(t.sale_num),1),Object(o["createVNode"])("td",m,Object(o["toDisplayString"])(S.formatNum(t.sale_price)),1)])})),128)),Object(o["createVNode"])("tr",null,[Object(o["createVNode"])("td",null,[!_.isloading&&_.report_data.length<1?(Object(o["openBlock"])(),Object(o["createBlock"])("span",g,"ບໍ່ມີຂໍ້ມູນ")):Object(o["createCommentVNode"])("",!0)]),h,j,O,v,Object(o["createVNode"])("td",y,Object(o["toDisplayString"])(S.getSumSale),1)])])]),_.isloading?(Object(o["openBlock"])(),Object(o["createBlock"])("i",N)):!_.isloading&&_.error?(Object(o["openBlock"])(),Object(o["createBlock"])("p",V,Object(o["toDisplayString"])(_.error),1)):Object(o["createCommentVNode"])("",!0)])})),S=r("b85c"),w=(r("4de4"),r("c181")),k={created:function(){this.setCurDate()},data:function(){return{report_data:[],r_date:"",isloading:!1,error:null}},computed:{getSumSale:function(){var t,e=0,r=Object(S["a"])(this.report_data);try{for(r.s();!(t=r.n()).done;){var o=t.value;e+=o.sale_price}}catch(n){r.e(n)}finally{r.f()}return this.formatNum(e)},isAdmin:function(){return console.log(this.$store.getters.isAdmin),this.$store.getters.isAdmin},mem_id:function(){return this.$store.getters.user_id},mem_master:function(){return this.$store.getters.isMaster}},methods:{getData:function(){var t=this;this.error=null,this.isloading=!0,w["a"].get("salereport",{params:{p_date:this.r_date,p_admin:this.isAdmin,p_mem_id:this.mem_id,p_master:this.mem_master}}).then((function(e){console.log(e.data),t.report_data=e.data.filter((function(t){return 0==t.is_cancel})),console.log(t.report_data),console.log(t.report_data),t.isloading=!1})).catch((function(e){t.error=e,t.isloading=!1}))},formatNum:function(t){return(new Intl.NumberFormat).format(t)},formatdate:function(t){var e=new Date(t),r=""+(e.getMonth()+1),o=""+e.getDate();return r.length<2&&(r="0"+r),o.length<2&&(o="0"+o),e=o+"-"+r+"-"+e.getFullYear(),console.log(e),e},setCurDate:function(){var t=new Date,e=""+(t.getMonth()+1),r=""+t.getDate();e.length<2&&(e="0"+e),r.length<2&&(r="0"+r),this.r_date=t.getFullYear()+"-"+e+"-"+r}}},D=(r("f3d3"),r("d959")),A=r.n(D);const x=A()(k,[["render",_],["__scopeId","data-v-58617e66"]]);e["default"]=x},f039:function(t,e,r){},f3d3:function(t,e,r){"use strict";r("f039")},fb6a:function(t,e,r){"use strict";var o=r("23e7"),n=r("861d"),c=r("e8b5"),a=r("23cb"),i=r("50c4"),l=r("fc6a"),d=r("8418"),s=r("b622"),u=r("1dde"),f=u("slice"),b=s("species"),p=[].slice,m=Math.max;o({target:"Array",proto:!0,forced:!f},{slice:function(t,e){var r,o,s,u=l(this),f=i(u.length),g=a(t,f),h=a(void 0===e?f:e,f);if(c(u)&&(r=u.constructor,"function"!=typeof r||r!==Array&&!c(r.prototype)?n(r)&&(r=r[b],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return p.call(u,g,h);for(o=new(void 0===r?Array:r)(m(h-g,0)),s=0;g<h;g++,s++)g in u&&d(o,s,u[g]);return o.length=s,o}})}}]);
//# sourceMappingURL=chunk-7c828464.5d29cb07.js.map