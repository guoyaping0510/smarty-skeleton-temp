(()=>{"use strict";function t(e){return t="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},t(e)}function e(){/*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */
e=function(){return r};var n,r={},o=Object.prototype,a=o.hasOwnProperty,i=Object.defineProperty||function(t,e,n){t[e]=n.value},c="function"==typeof Symbol?Symbol:{},u=c.iterator||"@@iterator",d=c.asyncIterator||"@@asyncIterator",l=c.toStringTag||"@@toStringTag";function s(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{s({},"")}catch(n){s=function(t,e,n){return t[e]=n}}function f(t,e,n,r){var o=e&&e.prototype instanceof b?e:b,a=Object.create(o.prototype),c=new j(r||[]);return i(a,"_invoke",{value:O(t,n,c)}),a}function p(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(t){return{type:"throw",arg:t}}}r.wrap=f;var h="suspendedStart",m="suspendedYield",g="executing",y="completed",v={};function b(){}function E(){}function w(){}var N={};s(N,u,(function(){return this}));var k=Object.getPrototypeOf,x=k&&k(k(M([])));x&&x!==o&&a.call(x,u)&&(N=x);var A=w.prototype=b.prototype=Object.create(N);function T(t){["next","throw","return"].forEach((function(e){s(t,e,(function(t){return this._invoke(e,t)}))}))}function L(e,n){function r(o,i,c,u){var d=p(e[o],e,i);if("throw"!==d.type){var l=d.arg,s=l.value;return s&&"object"==t(s)&&a.call(s,"__await")?n.resolve(s.__await).then((function(t){r("next",t,c,u)}),(function(t){r("throw",t,c,u)})):n.resolve(s).then((function(t){l.value=t,c(l)}),(function(t){return r("throw",t,c,u)}))}u(d.arg)}var o;i(this,"_invoke",{value:function(t,e){function a(){return new n((function(n,o){r(t,e,n,o)}))}return o=o?o.then(a,a):a()}})}function O(t,e,r){var o=h;return function(a,i){if(o===g)throw Error("Generator is already running");if(o===y){if("throw"===a)throw i;return{value:n,done:!0}}for(r.method=a,r.arg=i;;){var c=r.delegate;if(c){var u=S(c,r);if(u){if(u===v)continue;return u}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if(o===h)throw o=y,r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);o=g;var d=p(t,e,r);if("normal"===d.type){if(o=r.done?y:m,d.arg===v)continue;return{value:d.arg,done:r.done}}"throw"===d.type&&(o=y,r.method="throw",r.arg=d.arg)}}}function S(t,e){var r=e.method,o=t.iterator[r];if(o===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=n,S(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),v;var a=p(o,t.iterator,e.arg);if("throw"===a.type)return e.method="throw",e.arg=a.arg,e.delegate=null,v;var i=a.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=n),e.delegate=null,v):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,v)}function C(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function I(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(C,this),this.reset(!0)}function M(e){if(e||""===e){var r=e[u];if(r)return r.call(e);if("function"==typeof e.next)return e;if(!isNaN(e.length)){var o=-1,i=function t(){for(;++o<e.length;)if(a.call(e,o))return t.value=e[o],t.done=!1,t;return t.value=n,t.done=!0,t};return i.next=i}}throw new TypeError(t(e)+" is not iterable")}return E.prototype=w,i(A,"constructor",{value:w,configurable:!0}),i(w,"constructor",{value:E,configurable:!0}),E.displayName=s(w,l,"GeneratorFunction"),r.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===E||"GeneratorFunction"===(e.displayName||e.name))},r.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,s(t,l,"GeneratorFunction")),t.prototype=Object.create(A),t},r.awrap=function(t){return{__await:t}},T(L.prototype),s(L.prototype,d,(function(){return this})),r.AsyncIterator=L,r.async=function(t,e,n,o,a){void 0===a&&(a=Promise);var i=new L(f(t,e,n,o),a);return r.isGeneratorFunction(e)?i:i.next().then((function(t){return t.done?t.value:i.next()}))},T(A),s(A,l,"Generator"),s(A,u,(function(){return this})),s(A,"toString",(function(){return"[object Generator]"})),r.keys=function(t){var e=Object(t),n=[];for(var r in e)n.push(r);return n.reverse(),function t(){for(;n.length;){var r=n.pop();if(r in e)return t.value=r,t.done=!1,t}return t.done=!0,t}},r.values=M,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=n,this.done=!1,this.delegate=null,this.method="next",this.arg=n,this.tryEntries.forEach(I),!t)for(var e in this)"t"===e.charAt(0)&&a.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=n)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function r(r,o){return c.type="throw",c.arg=t,e.next=r,o&&(e.method="next",e.arg=n),!!o}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],c=i.completion;if("root"===i.tryLoc)return r("end");if(i.tryLoc<=this.prev){var u=a.call(i,"catchLoc"),d=a.call(i,"finallyLoc");if(u&&d){if(this.prev<i.catchLoc)return r(i.catchLoc,!0);if(this.prev<i.finallyLoc)return r(i.finallyLoc)}else if(u){if(this.prev<i.catchLoc)return r(i.catchLoc,!0)}else{if(!d)throw Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return r(i.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var r=this.tryEntries[n];if(r.tryLoc<=this.prev&&a.call(r,"finallyLoc")&&this.prev<r.finallyLoc){var o=r;break}}o&&("break"===t||"continue"===t)&&o.tryLoc<=e&&e<=o.finallyLoc&&(o=null);var i=o?o.completion:{};return i.type=t,i.arg=e,o?(this.method="next",this.next=o.finallyLoc,v):this.complete(i)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),v},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),I(n),v}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;I(n)}return o}}throw Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:M(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=n),v}},r}function n(t,e,n,r,o,a,i){try{var c=t[a](i),u=c.value}catch(t){return void n(t)}c.done?e(u):Promise.resolve(u).then(r,o)}function r(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,r=Array(e);n<e;n++)r[n]=t[n];return r}function o(t,e){if(t){if("string"==typeof t)return r(t,e);var n={}.toString.call(t).slice(8,-1);return"Object"===n&&t.constructor&&(n=t.constructor.name),"Map"===n||"Set"===n?Array.from(t):"Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)?r(t,e):void 0}}function a(t,e){return function(t){if(Array.isArray(t))return t}(t)||function(t,e){var n=null==t?null:"undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(null!=n){var r,o,a,i,c=[],u=!0,d=!1;try{if(a=(n=n.call(t)).next,0===e){if(Object(n)!==n)return;u=!1}else for(;!(u=(r=a.call(n)).done)&&(c.push(r.value),c.length!==e);u=!0);}catch(t){d=!0,o=t}finally{try{if(!u&&null!=n.return&&(i=n.return(),Object(i)!==i))return}finally{if(d)throw o}}return c}}(t,e)||o(t,e)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function i(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(!n){if(Array.isArray(t)||(n=o(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var r=0,a=function(){};return{s:a,n:function(){return r>=t.length?{done:!0}:{done:!1,value:t[r++]}},e:function(t){throw t},f:a}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var i,c=!0,u=!1;return{s:function(){n=n.call(t)},n:function(){var t=n.next();return c=t.done,t},e:function(t){u=!0,i=t},f:function(){try{c||null==n.return||n.return()}finally{if(u)throw i}}}}var c="transparent",u=/\.(jpeg|jpg|png|gif|svg|webp)/,d=/gradient/,l=/display:\s*none/,s="mz-sk-",f="sk-text-id",p=window.Node,h=new Map,m=function(t){var e=".".concat(s+t),n="{\n    border-radius: ".concat("rect"===t?"0":"50%",";\n  }");h.has(e)||h.set(e,n)},g=function(t,e){h.has(t)||h.set(t,e)},y=function(t,e){var n,r=i(e);try{for(r.s();!(n=r.n()).done;){var o=n.value;t.classList.add(o)}}catch(t){r.e(t)}finally{r.f()}},v=function(t){var e=t.parentNode;e&&e.removeChild(t)},b=window.getComputedStyle,E=document.querySelectorAll.bind(document),w=document.querySelector.bind(document),N=function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"rem",n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:4,r="string"==typeof t?parseFloat(t,10):t;if("rem"===e){var o=b(document.documentElement).fontSize;return"".concat((r/parseFloat(o,10)).toFixed(n)).concat(e)}var a,i,c=(a=window.innerHeight,i=window.innerWidth,{vh:a,vw:i,vmax:Math.max(i,a),vmin:Math.min(i,a)});return"".concat((r/c[e]*100).toFixed(n)).concat(e)};function k(t){return"SCRIPT"!==t.tagName&&"STYLE"!==t.tagName&&t.childNodes&&t.childNodes.length>0&&t.childNodes[0].nodeType===Node.TEXT_NODE&&/\S/.test(t.childNodes[0].textContent)}function x(t,e,n,r){var o=e.color,a=e.shape,i=e.shapeOpposite,u=t.getBoundingClientRect(),d=u.width,l=u.height;if(0===d||0===l||"true"===t.getAttribute("aria-hidden"))return v(t);i.indexOf(t)>-1&&getOppositeShape(a);!function(t){t.innerHTML=""}(t);var f=s+a;if(m(a),Object.assign(t.style,{width:N(d,n,r),height:N(l,n,r)}),y(t,[f]),o===c)!function(t){var e=s+"opacity";g(".".concat(e),"{\n      opacity: 0 !important;\n    }"),t.classList.add(e)}(t);else{var p=s+"svg",h="{\n        background-color: ".concat(o," !important;\n      }");g(".".concat(p),h),t.classList.add(p)}}function A(t,e,n,r){var o=b(t),a=t.textContent,i=o.lineHeight,c=o.paddingTop,u=(o.paddingRight,o.paddingBottom),d=(o.paddingLeft,o.position,o.fontSize),l=(o.textAlign,o.wordSpacing),p=o.wordBreak;if(!/\d/.test(i)){var h=parseFloat(d,10)||14;i="".concat(1.4*h,"px")}var m=(t.offsetHeight-parseFloat(c,10)-parseFloat(u,10))/parseFloat(i,10)|0,v=parseFloat(d,10)/parseFloat(i,10);Number.isNaN(v)&&(v=1/1.4);var E=s+"text",w=e;m>1?function(t,e){var n,r,o=e.textAlign,a=e.lineHeight,i=(e.fontSize,e.paddingBottom),c=e.paddingLeft,u=e.paddingRight,d=arguments.length>2&&void 0!==arguments[2]?arguments[2]:.5;switch(o){case"center":[n=document.createElement("span"),r=document.createElement("span")].forEach((function(t){Object.assign(t.style,{display:"inline-block",width:"".concat(d/2*100,"%"),height:a,backgroundColor:"#fff",position:"absolute",bottom:i})})),n.style.left=c,r.style.right=u,t.appendChild(n),t.appendChild(r);break;case"right":n=document.createElement("span"),Object.assign(n.style,{display:"inline-block",width:"".concat(100*d,"%"),height:a,backgroundColor:"#fff",position:"absolute",bottom:i,left:c}),t.appendChild(n);break;default:r=document.createElement("span"),Object.assign(r.style,{display:"inline-block",width:"".concat(100*d,"%"),height:a,backgroundColor:"#fff",position:"absolute",bottom:i,right:u}),t.appendChild(r)}}(t,o):function(t,e){var n=document.querySelector("#".concat(f));if(!n){var r=document.createElement("p");n=document.createElement("span"),Object.assign(r.style,{width:"10000px"}),n.id=f,r.appendChild(n),document.body.appendChild(r)}Object.assign(n.style,e),n.textContent=t,n.getBoundingClientRect().width}(a,{fontSize:d,lineHeight:i,wordBreak:p,wordSpacing:l});var N="{\n              background-color: ".concat(w," !important;\n              color: transparent;\n              width: auto;\n              padding: 0 !important;\n          }");g(".".concat(E),N),y(t,[E])}function T(t){var e=t.children,n=Array.from(e).filter((function(t){return"LI"===t.tagName||"TR"===t.tagName})).length;if(0===n)return!1;var r=e[0];if("LI"!==r.tagName&&"TR"!==r.tagName)return T(r);Array.from(e).forEach((function(t,e){e>0&&t.parentNode.removeChild(t)}));for(var o=1;o<n;o++)t.appendChild(r.cloneNode(!0))}function L(t,e){var n=e.color,r=e.shape,o=s+"image",a=s+r,i="{\n      background-color: ".concat(n," !important;\n    }");g(".".concat(o),i),m(r),y(t,[o,a])}function O(t,e){var n=e.color,r=e.shape,o=e.shapeOpposite,a=t.getBoundingClientRect(),i={width:a.width,height:a.height,src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"},c=o.indexOf(t)>-1?getOppositeShape(r):r;!function(t,e){Object.keys(e).forEach((function(n){return t.setAttribute(n,e[n])}))}(t,i);var u=s+"image",d=s+c,l="{\n      background-color: ".concat(n," !important;\n    }");g(".".concat(u),l),m(c),y(t,[u,d]),t.hasAttribute("alt")&&t.removeAttribute("alt")}function S(e){var n=function(e,n){if("object"!=t(e)||!e)return e;var r=e[Symbol.toPrimitive];if(void 0!==r){var o=r.call(e,n||"default");if("object"!=t(o))return o;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===n?String:Number)(e)}(e,"string");return"symbol"==t(n)?n:n+""}function C(t,e,n){return(e=S(e))in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}function I(t,e){var n=e.excludes,r=void 0===n?[]:n,o=e.cssUnit,a=void 0===o?"px":o,i=e.containerId,h=e.color||"#EFEFEF",m=r&&r.length?Array.from(E(r.join(","))):[],N={color:h,shape:"circle",shapeOpposite:[]},S=h,I={color:h},j={shape:"rect",color:h,shapeOpposite:[]},M={color:h,shape:"circle",shapeOpposite:[]},B=[],R=[],_=[],F=[],P=[],D=[],H=[],G=[],z=[];!function t(e){var n=b(e),r=function(t){var e=""!==b(t,"::before").getPropertyValue("content"),n=""!==b(t,"::after").getPropertyValue("content");return!(!e&&!n)&&{hasBefore:e,hasAfter:n,ele:t}}(e);if(!e.classList.contains("mz-sk-".concat(i,"-clone"))&&l.test(e.getAttribute("style")))return F.push(e);if(~m.indexOf(e))return!1;r&&G.push(r),function(t){return"none"!==t.getPropertyValue("border-style")}(n)&&(e.style.border="none");var o=e.getAttribute("style");return o&&(/background-color/.test(o)&&(o=o.replace(/background-color:([^;]+);/,"background-color:#fff;"),e.setAttribute("style",o)),/background-image/.test(o)&&(o=o.replace(/background-image:([^;]+);/,""),e.setAttribute("style",o))),e.children&&e.children.length>0&&/UL|OL|TBODY/.test(e.tagName)&&T(e),k(e)&&function(t){return"inline"!==b(t).display}(e)&&function(t){var e=t.childNodes[0].textContent;t.removeChild(t.childNodes[0]);var n=document.createElement("span");n.textContent=e,t.childNodes.length>0?t.insertBefore(n,t.childNodes[0]):t.appendChild(n)}(e),e.children&&e.children.length>0&&Array.from(e.children).forEach((function(e){return t(e)})),e.childNodes&&Array.from(e.childNodes).some((function(t){return t.nodeType===p.TEXT_NODE}))&&function(t){var e=s+"transparent",n="{\n      color: ".concat(c," !important;\n    }");g(".".concat(e),n),t.classList.add(e)}(e),function(t){return!/none/.test(t.textDecorationLine)}(n)&&(e.style.textDecorationColor=TRANSPARENT),"svg"===e.tagName?D.push(e):"INPUT"===e.tagName?H.push(e):u.test(n.background)||u.test(n.backgroundImage)?_.push(e):d.test(n.background)||d.test(n.backgroundImage)?z.push(e):"IMG"===e.tagName||/base64/.test(e.src)||"FIGURE"===e.tagName?P.push(e):e.nodeType===p.ELEMENT_NODE&&("BUTTON"===e.tagName||"A"===e.tagName&&"button"===e.getAttribute("role"))?R.push(e):k(e)?B.push(e):void 0}(t),D.forEach((function(t){return x(t,N,a,4)})),H.forEach((function(t){return function(t,e){var n=s+"input",r="{\n        background-color: ".concat(e," !important;\n        color: transparent !important;\n        width: auto;\n    }");g(".".concat(n),r),y(t,[n])}(t,h)})),B.forEach((function(t){return A(t,S)})),R.forEach((function(t){return function(t,e){var n=e.color,r=e.excludes;if((void 0===r?[]:r).indexOf(t)>-1)return!1;var o=s+"button",a="{\n      color: ".concat(n," !important;\n      background-color: ").concat(n," !important;\n      border: none !important;\n      box-shadow: none !important;\n    }");g(".".concat(o),a),t.classList.add(o)}(t,I)})),_.forEach((function(t){return L(t,j)})),P.forEach((function(t){return O(t,j)})),G.forEach((function(t){return function(t,e){var n=t.ele,r=(t.hasBefore,t.hasAfter,e.color),o=e.shape,a=e.shapeOpposite.indexOf(n)>-1?getOppositeShape(o):o,i="".concat(s,"pseudo"),c="".concat(s,"pseudo-rect"),u="".concat(s,"pseudo-circle"),d=C(C(C({},".".concat(i,"::before, .").concat(i,"::after"),"{\n        background-color: ".concat(r," !important;\n        background-image: none !important;\n        color: transparent !important;\n        border-color: transparent !important;\n      }")),".".concat(c,"::before, .").concat(c,"::after"),"{\n        border-radius: 0 !important;\n      }"),".".concat(u,"::before, .").concat(u,"::after"),"{\n        border-radius: 50% !important;\n      }");Object.keys(d).forEach((function(t){g(t,d[t])})),y(n,[i,"circle"===a?u:c])}(t,M)})),z.forEach((function(t){return L(t,j)})),[].forEach((function(t){return function(t,e){var n=e.color,r=s+"gray",o="{\n      color: ".concat(n," !important;\n      background-color: ").concat(n," !important;\n    }");g(".".concat(r),o),t.classList.add(r);var a=t.querySelectorAll("*");Array.from(a).forEach((function(t){var e=t.childNodes;Array.from(e).some((function(t){return t.nodeType===Node.TEXT_NODE}))&&t.classList.add(r)}))}(t,I)}));var q=w("#".concat(f));q&&q.parentNode&&F.push(q.parentNode),F.forEach((function(t){return v(t)}))}function j(t,e){I(t,e);var n,r="",o=i(h);try{for(o.s();!(n=o.n()).done;){var c=a(n.value,2),u=c[0],d=c[1];r+="".concat(u," ").concat(d,"\n")}}catch(t){o.e(t)}finally{o.f()}var l=document.createElement("style");l.id="mz-skeleton",l.innerHTML=r,document.head?document.head.appendChild(l):document.body.appendChild(l)}function M(t){var e="mz-sk-mock-parent",n=document.getElementById(e);n&&n.parentNode.removeChild(n);var r=document.createElement("div"),o=t.cloneNode(!0);return o.style.display="block",r.id=e,r.style.display="none",document.body.appendChild(r),r.appendChild(o),{style:document.getElementById("mz-skeleton").innerHTML,cleanedHtml:r.innerHTML.replace(/&quot;/g,"'")}}var B=function(t){return["script","iframe"].forEach((function(e){var n=new RegExp("<".concat(e,"([^>]*)>.*?</").concat(e,">"),"g");t=t.replace(n,"")})),t},R=function(t,e){var n="mz-sk-".concat(e,"-clone"),r=document.getElementById("mz-skeleton"),o=document.querySelector(".".concat(n));o&&o.parentNode.removeChild(o),r&&r.parentNode.removeChild(r);var a,i,c=t.cloneNode(!0);return c.style.display="none",c.classList.add(n),a=c,(i=t).parentNode.insertBefore(a,i.nextSibling),c};function _(t){console.log(t,"root99999",t&&t.id,t);var e=[{node:t,skeId:t.id,pid:0}],n=[],r="",o="",a=function(t){var e=t.w,n=t.h,r=t.x,o=t.y;return["position: fixed","width:".concat(e,"%"),"height:".concat(n,"%"),"left:".concat(r,"%"),"top:".concat(o,"%")]},i=function(t,e){var n=t.getBoundingClientRect(),r=n.width,o=n.height,a=n.top,i=n.left,c=window,u=c.innerWidth,d=c.innerHeight;return r>5&&o>5&&a<d&&i<u&&i+r<u?(r=Number((r/u*100).toFixed(2)),o=Number((o/d*100).toFixed(2)),i=Number((i/u*100).toFixed(2)),{w:r,h:o,y:a=Number((a/d*100).toFixed(2)),x:i}):null},c=function(t){var e=t.node,r=t.skeId,o=t.pid;t.isText;if(e){var a=i(e);a&&function(t){var e=t.node,r=t.skeId,o=t.pid,a=t.position,i=getComputedStyle(e,null).borderRadius,c={position:a,pid:o,skeId:r,borderRadius:i};if(n.length){var u=n[n.length-1],d=u.position,l=d.w,s=d.h,f=d.x,p=d.y,h=u.borderRadius,m=a.w,g=a.h,y=a.x,v=a.y,b=Math.abs(f+l-y),E=Math.abs(p+s-v);if(console.log(e.parentElement.className,f+l-y,p+s-v,f,l,p,s,b,E,y,v,"xGapYgap",o,u.pid),(b<.5||E<.5)&&o==u.pid){var w={x:Math.min(f,y),y:Math.min(p,v),w:Math.max(f+l,y+m)-Math.min(f,y),h:Math.max(p+s,v+g)-Math.min(p,v)};n[n.length-1]={position:w,borderRadius:Math.max(h,i),skeId:r,pid:o}}else n.push(c)}else n.push(c)}({node:e,skeId:r,pid:o,position:a})}},u=function(t){var n=t.node,u=t.skeId,d=t.pid;if(n){var l=function(t){var e=window.getComputedStyle(t);return"none"!==e.display&&"hidden"!==e.visibility&&"0"!==e.opacity&&t.offsetWidth>0&&t.offsetHeight>0}(n);if(l)if(n.childNodes&&Array.from(n.childNodes).some((function(t){return t.nodeType===Node.TEXT_NODE})))c({node:n,skeId:u,pid:d,isText:!0});else{var s=function(t){var e=t.node,n=!1;return e.nodeType!=Node.ELEMENT_NODE||(e.childNodes&&Array.from(e.childNodes).some((function(t){return t.nodeType===Node.TEXT_NODE}))&&(n=!0),"svg"===e.tagName&&(n=!0),"A"===e.tagName&&(n=!0),("IMG"===e.tagName||/base64/.test(e.src)||"FIGURE"===e.tagName)&&(n=!0),"INPUT"!==e.tagName&&"TEXTAREA"!=e.tagName||(n=!0),"CANVAS"===e.tagName&&(n=!0),e.nodeType===Node.ELEMENT_NODE&&("BUTTON"===e.tagName||"A"===e.tagName&&"button"===e.getAttribute("role"))&&(n=!0)),n}({node:n});if(s)c({node:n,skeId:u,pid:d,isInEnumableTags:s});else if(function(t){if(t.nodeType===Node.ELEMENT_NODE){var e=window.getComputedStyle(t);return"rgba(0, 0, 0, 0)"!==e.background||"none"!==e.backgroundImage||"rgba(0, 0, 0, 0)"!==e.backgroundColor}}(n)&&function(t){var e=t.node,n=t.skeId,o=i(e);if(!o)return null;var c=n||"",u=getComputedStyle(e,null),d=u.borderRadius,l=(u.background,u.backgroundColor),s=a(o).concat(["background-color:".concat(l),"border-radius:".concat(d)]).join(";");r+='<div data-ske-id="'.concat(c,'" style="').concat(s,'"></div>')}({node:n,skeId:u}),function(t){if(t.nodeType===Node.ELEMENT_NODE){var e=window.getComputedStyle(t);return"rgba(0, 0, 0, 0)"!==e.borderTopColor||"rgba(0, 0, 0, 0)"!==e.borderRightColor||"rgba(0, 0, 0, 0)"!==e.borderBottomColor||"rgba(0, 0, 0, 0)"!==e.borderLeftColor||"0px"!==e.borderTopWidth||"0px"!==e.borderRightWidth||"0px"!==e.borderBottomWidth||"0px"!==e.borderLeftWidth||"none"!==e.borderTopStyle||"none"!==e.borderRightStyle||"none"!==e.borderBottomStyle||"none"!==e.borderLeftStyle}}(n)&&function(t){var e=t.node,n=t.skeId,r=i(e);if(!r)return null;var c=n||"",u=a(r),d=getComputedStyle(e,null),l=d.borderRadius,s=d.backgroundColor,f=d.borderWidth,p=d.borderStyle,h=(d.borderColor,u.concat(["background-color:".concat(s),"border-radius:".concat(l)]).concat(["border-width:".concat(f),"border-style:".concat(p),"border-color:#f4f4f4","border-radius:".concat(l)]).join(";"));o+='<div  data-ske-id="'.concat(c,'" style="').concat(h,'"></div>')}({node:n,skeId:u}),n.hasChildNodes)for(var f=n.childNodes,p=d++,h=0;h<f.length;h++){var m=f[h],g=u+m.id;e.push({node:m,skeId:g,pid:p})}else!function(t){var e=t.node,n=t.skeId,r=t.pid;e.nodeType===Node.ELEMENT_NODE?e&&c({node:e,skeId:n,pid:r}):e.nodeType===Node.TEXT_NODE?e&&c({node:e.parentElement,skeId:n,pid:r}):(e.nodeType,Node.COMMENT_NODE)}({node:n,skeId:u,pid:d})}}},d=function(){console.log(n,"SkeBoxes");var t,e=n.reduce((function(t,e){var n=e.skeId,r=e.position,o=e.borderRadius,i=a(r).concat(["border-radius:".concat(o)]);return t+'<div data-ske-id="'.concat(n||"",'" class="skeleton-common" \n      style="').concat(i.join(";"),'" ></div>')}),""),i=r+o+e;return console.log(i,"skesskes"),function(t){if(!t)return;var e=document.createElement("div");e.style.position="fixed",e.style.zIndex="1000000",e.innerHTML=t,document.body.append(e)}(i),(t=document.createElement("style")).innerHTML=".skeleton-common {\n    position: fixed;\n    background:#e9e9e9 linear-gradient(90deg, rgba(0, 0, 0, 0.06) 50%, rgba(0, 0, 0, 0.15) 50%, rgba(0, 0, 0, 0.06) 63%);\n    background-size: 400% 100%;\n    animation-name: loading;\n    animation-duration: 1.4s;\n    animation-timing-function: ease;\n    animation-iteration-count: infinite;\n  }\n  \n  @keyframes loading {\n    0% {\n      background-position: 100% 50%;\n    }\n    to {\n      background-position: 0% 50%;\n    }\n  }\n  \n  @keyframes opacity {\n    0% {\n      opacity: 1;\n    }\n    50% {\n      opacity: 0.4;\n    }\n    100% {\n      opacity: 1;\n    }\n  }\n  ",document.head.append(t),i};var l=function(){0!==e.length?requestIdleCallback((function(t){for(var n;(n=e.shift())&&!t.didTimeout&&t.timeRemaining()>0;)u(n);l()})):d()};l()}var F=null,P=null,D=null,H="";chrome.runtime.onMessage.addListener(function(){var t,r=(t=e().mark((function t(n,r,o){var a,i,c,u;return e().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.t0=n.type,t.next="generate"===t.t0?3:"show"===t.t0?25:"hide"===t.t0?28:"query"===t.t0?31:33;break;case 3:return console.log("inittest"),_(document.getElementById("icestarkNode")||document.getElementById("root")),t.abrupt("return");case 12:return H=window.getComputedStyle(F).display,P=R(F,void 0),t.next=16,j(P,n.data);case 16:return t.next=18,M(P);case 18:return a=t.sent,i=a.style,c=a.cleanedHtml,u=window.navigator.userAgent.toLowerCase().indexOf("mobile")>0,D={html:B(c),css:i,isMobile:u},o(D),t.abrupt("break",33);case 25:return F.style.display="none",P.style.display=H,t.abrupt("break",33);case 28:return F.style.display=H,P.style.display="none",t.abrupt("break",33);case 31:return o({isInPreview:P&&"none"!==P.style.display,queryInfo:null,skeletonInfo:D}),t.abrupt("break",33);case 33:case"end":return t.stop()}}),t)})),function(){var e=this,r=arguments;return new Promise((function(o,a){var i=t.apply(e,r);function c(t){n(i,o,a,c,u,"next",t)}function u(t){n(i,o,a,c,u,"throw",t)}c(void 0)}))});return function(t,e,n){return r.apply(this,arguments)}}())})();