(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[67,8],{1151:function(e,t,a){"use strict";var o=a(3),n=a(116),r=a(12),l=a(0),i=(a(11),a(4)),c=a(1145),s=a(1154),m=a(21),d=a(479),u=l.forwardRef((function(e,t){var a=e.autoFocus,m=e.checked,u=e.checkedIcon,p=e.classes,f=e.className,b=e.defaultChecked,h=e.disabled,x=e.icon,v=e.id,g=e.inputProps,E=e.inputRef,y=e.name,j=e.onBlur,w=e.onChange,O=e.onFocus,C=e.readOnly,R=e.required,k=e.tabIndex,N=e.type,S=e.value,B=Object(r.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),z=Object(c.a)({controlled:m,default:Boolean(b),name:"SwitchBase",state:"checked"}),T=Object(n.a)(z,2),F=T[0],I=T[1],L=Object(s.a)(),M=h;L&&"undefined"===typeof M&&(M=L.disabled);var P="checkbox"===N||"radio"===N;return l.createElement(d.a,Object(o.a)({component:"span",className:Object(i.default)(p.root,f,F&&p.checked,M&&p.disabled),disabled:M,tabIndex:null,role:void 0,onFocus:function(e){O&&O(e),L&&L.onFocus&&L.onFocus(e)},onBlur:function(e){j&&j(e),L&&L.onBlur&&L.onBlur(e)},ref:t},B),l.createElement("input",Object(o.a)({autoFocus:a,checked:m,defaultChecked:b,className:p.input,disabled:M,id:P&&v,name:y,onChange:function(e){var t=e.target.checked;I(t),w&&w(e,t)},readOnly:C,ref:E,required:R,tabIndex:k,type:N,value:S},g)),F?u:x)}));t.a=Object(m.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(u)},1230:function(e,t,a){"use strict";var o=a(0),n=a(239);t.a=Object(n.a)(o.createElement("path",{d:"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z"}),"KeyboardArrowLeft")},1231:function(e,t,a){"use strict";var o=a(0),n=a(239);t.a=Object(n.a)(o.createElement("path",{d:"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z"}),"KeyboardArrowRight")},1233:function(e,t,a){"use strict";var o=a(3),n=a(12),r=a(0),l=(a(11),a(4)),i=a(1151),c=a(239),s=Object(c.a)(r.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=Object(c.a)(r.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),d=a(50),u=Object(c.a)(r.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),p=a(31),f=a(21),b=r.createElement(m,null),h=r.createElement(s,null),x=r.createElement(u,null),v=r.forwardRef((function(e,t){var a=e.checkedIcon,c=void 0===a?b:a,s=e.classes,m=e.color,d=void 0===m?"secondary":m,u=e.icon,f=void 0===u?h:u,v=e.indeterminate,g=void 0!==v&&v,E=e.indeterminateIcon,y=void 0===E?x:E,j=e.inputProps,w=e.size,O=void 0===w?"medium":w,C=Object(n.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),R=g?y:f,k=g?y:c;return r.createElement(i.a,Object(o.a)({type:"checkbox",classes:{root:Object(l.default)(s.root,s["color".concat(Object(p.a)(d))],g&&s.indeterminate),checked:s.checked,disabled:s.disabled},color:d,inputProps:Object(o.a)({"data-indeterminate":g},j),icon:r.cloneElement(R,{fontSize:void 0===R.props.fontSize&&"small"===O?O:R.props.fontSize}),checkedIcon:r.cloneElement(k,{fontSize:void 0===k.props.fontSize&&"small"===O?O:k.props.fontSize}),ref:t},C))}));t.a=Object(f.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(d.d)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(d.d)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(v)},1273:function(e,t,a){"use strict";var o=a(44);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a(0)),r=(0,o(a(62)).default)(n.default.createElement("path",{d:"M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"}),"Facebook");t.default=r},1287:function(e,t,a){"use strict";var o=a(44);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a(0)),r=(0,o(a(62)).default)(n.default.createElement("path",{d:"M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"}),"Twitter");t.default=r},1472:function(e,t,a){"use strict";var o=a(44);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=o(a(0)),r=(0,o(a(62)).default)(n.default.createElement("path",{d:"M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"}),"GitHub");t.default=r},1610:function(e,t,a){"use strict";var o=a(3),n=a(12),r=a(0),l=(a(11),a(4)),i=a(1230),c=a(1231),s=a(21),m=a(289),d=r.createElement(i.a,{fontSize:"small"}),u=r.createElement(c.a,{fontSize:"small"}),p=r.forwardRef((function(e,t){var a=e.classes,i=e.className,c=e.direction,s=e.orientation,p=e.disabled,f=Object(n.a)(e,["classes","className","direction","orientation","disabled"]);return r.createElement(m.a,Object(o.a)({component:"div",className:Object(l.default)(a.root,i,p&&a.disabled,"vertical"===s&&a.vertical),ref:t,role:null,tabIndex:null},f),"left"===c?d:u)}));t.a=Object(s.a)({root:{width:40,flexShrink:0,opacity:.8,"&$disabled":{opacity:0}},vertical:{width:"100%",height:40,"& svg":{transform:"rotate(90deg)"}},disabled:{}},{name:"MuiTabScrollButton"})(p)},1611:function(e,t,a){"use strict";var o=a(12),n=a(42),r=a(3),l=a(0),i=(a(11),a(4)),c=a(21),s=a(289),m=a(31),d=l.forwardRef((function(e,t){var a=e.classes,n=e.className,c=e.disabled,d=void 0!==c&&c,u=e.disableFocusRipple,p=void 0!==u&&u,f=e.fullWidth,b=e.icon,h=e.indicator,x=e.label,v=e.onChange,g=e.onClick,E=e.onFocus,y=e.selected,j=e.selectionFollowsFocus,w=e.textColor,O=void 0===w?"inherit":w,C=e.value,R=e.wrapped,k=void 0!==R&&R,N=Object(o.a)(e,["classes","className","disabled","disableFocusRipple","fullWidth","icon","indicator","label","onChange","onClick","onFocus","selected","selectionFollowsFocus","textColor","value","wrapped"]);return l.createElement(s.a,Object(r.a)({focusRipple:!p,className:Object(i.default)(a.root,a["textColor".concat(Object(m.a)(O))],n,d&&a.disabled,y&&a.selected,x&&b&&a.labelIcon,f&&a.fullWidth,k&&a.wrapped),ref:t,role:"tab","aria-selected":y,disabled:d,onClick:function(e){v&&v(e,C),g&&g(e)},onFocus:function(e){j&&!y&&v&&v(e,C),E&&E(e)},tabIndex:y?0:-1},N),l.createElement("span",{className:a.wrapper},b,x),h)}));t.a=Object(c.a)((function(e){var t;return{root:Object(r.a)({},e.typography.button,(t={maxWidth:264,minWidth:72,position:"relative",boxSizing:"border-box",minHeight:48,flexShrink:0,padding:"6px 12px"},Object(n.a)(t,e.breakpoints.up("sm"),{padding:"6px 24px"}),Object(n.a)(t,"overflow","hidden"),Object(n.a)(t,"whiteSpace","normal"),Object(n.a)(t,"textAlign","center"),Object(n.a)(t,e.breakpoints.up("sm"),{minWidth:160}),t)),labelIcon:{minHeight:72,paddingTop:9,"& $wrapper > *:first-child":{marginBottom:6}},textColorInherit:{color:"inherit",opacity:.7,"&$selected":{opacity:1},"&$disabled":{opacity:.5}},textColorPrimary:{color:e.palette.text.secondary,"&$selected":{color:e.palette.primary.main},"&$disabled":{color:e.palette.text.disabled}},textColorSecondary:{color:e.palette.text.secondary,"&$selected":{color:e.palette.secondary.main},"&$disabled":{color:e.palette.text.disabled}},selected:{},disabled:{},fullWidth:{flexShrink:1,flexGrow:1,flexBasis:0,maxWidth:"none"},wrapped:{fontSize:e.typography.pxToRem(12),lineHeight:1.5},wrapper:{display:"inline-flex",alignItems:"center",justifyContent:"center",width:"100%",flexDirection:"column"}}}),{name:"MuiTab"})(d)},1667:function(e,t,a){"use strict";var o,n=a(3),r=a(12),l=a(42),i=a(0),c=(a(112),a(11),a(4)),s=a(143),m=a(190);function d(){if(o)return o;var e=document.createElement("div");return e.appendChild(document.createTextNode("ABCD")),e.dir="rtl",e.style.fontSize="14px",e.style.width="4px",e.style.height="1px",e.style.position="absolute",e.style.top="-1000px",e.style.overflow="scroll",document.body.appendChild(e),o="reverse",e.scrollLeft>0?o="default":(e.scrollLeft=1,0===e.scrollLeft&&(o="negative")),document.body.removeChild(e),o}function u(e,t){var a=e.scrollLeft;if("rtl"!==t)return a;switch(d()){case"negative":return e.scrollWidth-e.clientWidth+a;case"reverse":return e.scrollWidth-e.clientWidth-a;default:return a}}function p(e){return(1+Math.sin(Math.PI*e-Math.PI/2))/2}var f={width:99,height:99,position:"absolute",top:-9999,overflow:"scroll"};function b(e){var t=e.onChange,a=Object(r.a)(e,["onChange"]),o=i.useRef(),l=i.useRef(null),c=function(){o.current=l.current.offsetHeight-l.current.clientHeight};return i.useEffect((function(){var e=Object(s.a)((function(){var e=o.current;c(),e!==o.current&&t(o.current)}));return window.addEventListener("resize",e),function(){e.clear(),window.removeEventListener("resize",e)}}),[t]),i.useEffect((function(){c(),t(o.current)}),[t]),i.createElement("div",Object(n.a)({style:f,ref:l},a))}var h=a(21),x=a(31),v=i.forwardRef((function(e,t){var a=e.classes,o=e.className,l=e.color,s=e.orientation,m=Object(r.a)(e,["classes","className","color","orientation"]);return i.createElement("span",Object(n.a)({className:Object(c.default)(a.root,a["color".concat(Object(x.a)(l))],o,"vertical"===s&&a.vertical),ref:t},m))})),g=Object(h.a)((function(e){return{root:{position:"absolute",height:2,bottom:0,width:"100%",transition:e.transitions.create()},colorPrimary:{backgroundColor:e.palette.primary.main},colorSecondary:{backgroundColor:e.palette.secondary.main},vertical:{height:"100%",width:2,right:0}}}),{name:"PrivateTabIndicator"})(v),E=a(1610),y=a(76),j=a(57),w=i.forwardRef((function(e,t){var a=e["aria-label"],o=e["aria-labelledby"],f=e.action,h=e.centered,x=void 0!==h&&h,v=e.children,w=e.classes,O=e.className,C=e.component,R=void 0===C?"div":C,k=e.indicatorColor,N=void 0===k?"secondary":k,S=e.onChange,B=e.orientation,z=void 0===B?"horizontal":B,T=e.ScrollButtonComponent,F=void 0===T?E.a:T,I=e.scrollButtons,L=void 0===I?"auto":I,M=e.selectionFollowsFocus,P=e.TabIndicatorProps,W=void 0===P?{}:P,A=e.TabScrollButtonProps,D=e.textColor,H=void 0===D?"inherit":D,q=e.value,G=e.variant,V=void 0===G?"standard":G,$=Object(r.a)(e,["aria-label","aria-labelledby","action","centered","children","classes","className","component","indicatorColor","onChange","orientation","ScrollButtonComponent","scrollButtons","selectionFollowsFocus","TabIndicatorProps","TabScrollButtonProps","textColor","value","variant"]),U=Object(j.a)(),_="scrollable"===V,K="rtl"===U.direction,J="vertical"===z,X=J?"scrollTop":"scrollLeft",Q=J?"top":"left",Y=J?"bottom":"right",Z=J?"clientHeight":"clientWidth",ee=J?"height":"width";var te=i.useState(!1),ae=te[0],oe=te[1],ne=i.useState({}),re=ne[0],le=ne[1],ie=i.useState({start:!1,end:!1}),ce=ie[0],se=ie[1],me=i.useState({overflow:"hidden",marginBottom:null}),de=me[0],ue=me[1],pe=new Map,fe=i.useRef(null),be=i.useRef(null),he=function(){var e,t,a=fe.current;if(a){var o=a.getBoundingClientRect();e={clientWidth:a.clientWidth,scrollLeft:a.scrollLeft,scrollTop:a.scrollTop,scrollLeftNormalized:u(a,U.direction),scrollWidth:a.scrollWidth,top:o.top,bottom:o.bottom,left:o.left,right:o.right}}if(a&&!1!==q){var n=be.current.children;if(n.length>0){var r=n[pe.get(q)];0,t=r?r.getBoundingClientRect():null}}return{tabsMeta:e,tabMeta:t}},xe=Object(y.a)((function(){var e,t=he(),a=t.tabsMeta,o=t.tabMeta,n=0;if(o&&a)if(J)n=o.top-a.top+a.scrollTop;else{var r=K?a.scrollLeftNormalized+a.clientWidth-a.scrollWidth:a.scrollLeft;n=o.left-a.left+r}var i=(e={},Object(l.a)(e,Q,n),Object(l.a)(e,ee,o?o[ee]:0),e);if(isNaN(re[Q])||isNaN(re[ee]))le(i);else{var c=Math.abs(re[Q]-i[Q]),s=Math.abs(re[ee]-i[ee]);(c>=1||s>=1)&&le(i)}})),ve=function(e){!function(e,t,a){var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},n=arguments.length>4&&void 0!==arguments[4]?arguments[4]:function(){},r=o.ease,l=void 0===r?p:r,i=o.duration,c=void 0===i?300:i,s=null,m=t[e],d=!1,u=function(){d=!0},f=function o(r){if(d)n(new Error("Animation cancelled"));else{null===s&&(s=r);var i=Math.min(1,(r-s)/c);t[e]=l(i)*(a-m)+m,i>=1?requestAnimationFrame((function(){n(null)})):requestAnimationFrame(o)}};m===a?n(new Error("Element already at target position")):requestAnimationFrame(f)}(X,fe.current,e)},ge=function(e){var t=fe.current[X];J?t+=e:(t+=e*(K?-1:1),t*=K&&"reverse"===d()?-1:1),ve(t)},Ee=function(){ge(-fe.current[Z])},ye=function(){ge(fe.current[Z])},je=i.useCallback((function(e){ue({overflow:null,marginBottom:-e})}),[]),we=Object(y.a)((function(){var e=he(),t=e.tabsMeta,a=e.tabMeta;if(a&&t)if(a[Q]<t[Q]){var o=t[X]+(a[Q]-t[Q]);ve(o)}else if(a[Y]>t[Y]){var n=t[X]+(a[Y]-t[Y]);ve(n)}})),Oe=Object(y.a)((function(){if(_&&"off"!==L){var e,t,a=fe.current,o=a.scrollTop,n=a.scrollHeight,r=a.clientHeight,l=a.scrollWidth,i=a.clientWidth;if(J)e=o>1,t=o<n-r-1;else{var c=u(fe.current,U.direction);e=K?c<l-i-1:c>1,t=K?c>1:c<l-i-1}e===ce.start&&t===ce.end||se({start:e,end:t})}}));i.useEffect((function(){var e=Object(s.a)((function(){xe(),Oe()})),t=Object(m.a)(fe.current);return t.addEventListener("resize",e),function(){e.clear(),t.removeEventListener("resize",e)}}),[xe,Oe]);var Ce=i.useCallback(Object(s.a)((function(){Oe()})));i.useEffect((function(){return function(){Ce.clear()}}),[Ce]),i.useEffect((function(){oe(!0)}),[]),i.useEffect((function(){xe(),Oe()})),i.useEffect((function(){we()}),[we,re]),i.useImperativeHandle(f,(function(){return{updateIndicator:xe,updateScrollButtons:Oe}}),[xe,Oe]);var Re=i.createElement(g,Object(n.a)({className:w.indicator,orientation:z,color:N},W,{style:Object(n.a)({},re,W.style)})),ke=0,Ne=i.Children.map(v,(function(e){if(!i.isValidElement(e))return null;var t=void 0===e.props.value?ke:e.props.value;pe.set(t,ke);var a=t===q;return ke+=1,i.cloneElement(e,{fullWidth:"fullWidth"===V,indicator:a&&!ae&&Re,selected:a,selectionFollowsFocus:M,onChange:S,textColor:H,value:t})})),Se=function(){var e={};e.scrollbarSizeListener=_?i.createElement(b,{className:w.scrollable,onChange:je}):null;var t=ce.start||ce.end,a=_&&("auto"===L&&t||"desktop"===L||"on"===L);return e.scrollButtonStart=a?i.createElement(F,Object(n.a)({orientation:z,direction:K?"right":"left",onClick:Ee,disabled:!ce.start,className:Object(c.default)(w.scrollButtons,"on"!==L&&w.scrollButtonsDesktop)},A)):null,e.scrollButtonEnd=a?i.createElement(F,Object(n.a)({orientation:z,direction:K?"left":"right",onClick:ye,disabled:!ce.end,className:Object(c.default)(w.scrollButtons,"on"!==L&&w.scrollButtonsDesktop)},A)):null,e}();return i.createElement(R,Object(n.a)({className:Object(c.default)(w.root,O,J&&w.vertical),ref:t},$),Se.scrollButtonStart,Se.scrollbarSizeListener,i.createElement("div",{className:Object(c.default)(w.scroller,_?w.scrollable:w.fixed),style:de,ref:fe,onScroll:Ce},i.createElement("div",{"aria-label":a,"aria-labelledby":o,className:Object(c.default)(w.flexContainer,J&&w.flexContainerVertical,x&&!_&&w.centered),onKeyDown:function(e){var t=e.target;if("tab"===t.getAttribute("role")){var a=null,o="vertical"!==z?"ArrowLeft":"ArrowUp",n="vertical"!==z?"ArrowRight":"ArrowDown";switch("vertical"!==z&&"rtl"===U.direction&&(o="ArrowRight",n="ArrowLeft"),e.key){case o:a=t.previousElementSibling||be.current.lastChild;break;case n:a=t.nextElementSibling||be.current.firstChild;break;case"Home":a=be.current.firstChild;break;case"End":a=be.current.lastChild}null!==a&&(a.focus(),e.preventDefault())}},ref:be,role:"tablist"},Ne),ae&&Re),Se.scrollButtonEnd)}));t.a=Object(h.a)((function(e){return{root:{overflow:"hidden",minHeight:48,WebkitOverflowScrolling:"touch",display:"flex"},vertical:{flexDirection:"column"},flexContainer:{display:"flex"},flexContainerVertical:{flexDirection:"column"},centered:{justifyContent:"center"},scroller:{position:"relative",display:"inline-block",flex:"1 1 auto",whiteSpace:"nowrap"},fixed:{overflowX:"hidden",width:"100%"},scrollable:{overflowX:"scroll",scrollbarWidth:"none","&::-webkit-scrollbar":{display:"none"}},scrollButtons:{},scrollButtonsDesktop:Object(l.a)({},e.breakpoints.down("xs"),{display:"none"}),indicator:{}}}),{name:"MuiTabs"})(w)},3138:function(e,t,a){"use strict";a.r(t);var o=a(22),n=a(2),r=a(0),l=a.n(r),i=a(1611),c=a(1667),s=a(1612),m=a(1273),d=a.n(m),u=a(493),p=a(1233),f=a(1201),b=a(1208),h=a(479),x=a(15),v=a(83),g=a(312),E=a(20),y=a(37),j=a(94),w=a(67),O=a(23),C=a(1076),R=a(164),k=a(4),N=a(7),S=a(462),B=a.n(S),z=function(e){var t=Object(f.d)(e),a=Object(o.a)(t,2),n=a[0],r=a[1],i=r.error&&r.touched?r.error:"";return l.a.createElement(s.a,Object.assign({},e,n,{helperText:i,error:!!i}))},T=b.b({email:b.c().email(l.a.createElement(O.a,{id:"validation.emailFormat"})).required(l.a.createElement(O.a,{id:"validation.emailRequired"})),password:b.c().required(l.a.createElement(O.a,{id:"validation.passwordRequired"}))}),F=function(e){var t=Object(x.d)(),a=Object(y.h)(),o=function(){a.push("/forget-password",{tab:"awsCognito"})},r=Object(C.a)().messages,i=Object(R.a)((function(e){return{formRoot:Object(n.a)({textAlign:"left"},e.breakpoints.up("xl"),{marginBottom:24}),myTextFieldRoot:{width:"100%"},checkboxRoot:{marginLeft:-12},pointer:{cursor:"pointer"},btnRoot:{borderRadius:e.overrides.MuiCard.root.borderRadius,width:"10rem",fontWeight:N.b.REGULAR,fontSize:16},dividerRoot:Object(n.a)({marginBottom:16,marginLeft:-48,marginRight:-48},e.breakpoints.up("xl"),{marginBottom:32}),iconButtonRoot:{marginLeft:8,marginRight:8,color:e.palette.grey[500],"&:hover, &:focus":{color:e.palette.text.primary}},textLg:{fontSize:18},textPrimary:{color:e.palette.text.primary},colorTextPrimary:{color:e.palette.primary.main},underlineNone:{textDecoration:"none"},textGrey:{color:e.palette.grey[500]}}}))(e);return l.a.createElement(w.a,{flex:1,display:"flex",flexDirection:"column"},l.a.createElement(w.a,{px:{xs:6,sm:10,xl:15},pt:8,flex:1,display:"flex",flexDirection:"column"},l.a.createElement(f.c,{validateOnChange:!0,initialValues:{email:"crema.demo@gmail.com",password:"Pass@1!@all"},validationSchema:T,onSubmit:function(e,o){var n=o.setSubmitting;n(!0),t(Object(E.N)({email:e.email,password:e.password}),a),n(!1)}},(function(e){var t=e.isSubmitting;return l.a.createElement(f.b,{className:i.formRoot,noValidate:!0,autoComplete:"off"},l.a.createElement(w.a,{mb:{xs:5,xl:8}},l.a.createElement(z,{placeholder:r["common.email"],label:l.a.createElement(O.a,{id:"common.email"}),name:"email",variant:"outlined",className:i.myTextFieldRoot})),l.a.createElement(w.a,{mb:{xs:3,lg:4}},l.a.createElement(z,{type:"password",placeholder:r["common.password"],label:l.a.createElement(O.a,{id:"common.password"}),name:"password",variant:"outlined",className:i.myTextFieldRoot})),l.a.createElement(w.a,{mb:{xs:3,xl:4},display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:{sm:"space-between"},fontSize:15},l.a.createElement(w.a,{display:"flex",alignItems:"center"},l.a.createElement(p.a,{className:i.checkboxRoot}),l.a.createElement(w.a,{className:i.textGrey,component:"span"},l.a.createElement(O.a,{id:"common.rememberMe"}))),l.a.createElement(w.a,{color:"primary.main",component:"span",ml:{sm:4},fontSize:15,className:i.pointer,onClick:o},l.a.createElement(O.a,{id:"common.forgetPassword"}))),l.a.createElement(w.a,{mb:6,display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:{sm:"space-between"}},l.a.createElement(u.a,{variant:"contained",color:"secondary",type:"submit",disabled:t,className:i.btnRoot},l.a.createElement(O.a,{id:"common.login"})),l.a.createElement(w.a,{ml:{xs:0,sm:4},mt:{xs:3,sm:0},color:"text.secondary",fontSize:15},l.a.createElement(w.a,{className:i.textGrey,component:"span",mr:2},l.a.createElement(O.a,{id:"common.dontHaveAccount"})),l.a.createElement(w.a,{component:"span"},l.a.createElement(j.a,{to:"/signup",className:Object(k.default)(i.underlineNone,i.colorTextPrimary)},l.a.createElement(O.a,{id:"common.signup"}))))))}))),l.a.createElement(w.a,{bgcolor:B.a[100],px:{xs:6,sm:10,xl:15},py:2,display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"center",alignItems:"center"},l.a.createElement(w.a,{component:"span",className:i.textGrey,mr:4,fontSize:15},l.a.createElement(O.a,{id:"common.orLoginWith"})),l.a.createElement(w.a,{display:"flex",alignItems:"center"},l.a.createElement(h.a,{className:i.iconButtonRoot,onClick:function(){return v.a.federatedSignIn({provider:"Google"})}},l.a.createElement("i",{className:"zmdi zmdi-google"})),l.a.createElement(h.a,{className:i.iconButtonRoot,onClick:function(){return v.a.federatedSignIn({provider:"Facebook"})}},l.a.createElement(d.a,null)))),l.a.createElement(g.a,null))},I=function(e){var t=Object(f.d)(e),a=Object(o.a)(t,2),n=a[0],r=a[1],i=r.error&&r.touched?r.error:"";return l.a.createElement(s.a,Object.assign({},e,n,{helperText:i,error:!!i}))},L=b.b({email:b.c().email(l.a.createElement(O.a,{id:"validation.emailFormat"})).required(l.a.createElement(O.a,{id:"validation.emailRequired"})),password:b.c().required(l.a.createElement(O.a,{id:"validation.passwordRequired"}))}),M=function(e){var t=Object(x.d)(),a=Object(y.h)(),o=function(){a.push("/forget-password",{tab:"jwtAuth"})},r=Object(C.a)().messages,i=Object(R.a)((function(e){return{formRoot:Object(n.a)({textAlign:"left"},e.breakpoints.up("xl"),{marginBottom:24}),myTextFieldRoot:{width:"100%"},checkboxRoot:{marginLeft:-12},pointer:{cursor:"pointer"},btnRoot:{borderRadius:e.overrides.MuiCard.root.borderRadius,width:"10rem",fontWeight:N.b.REGULAR,fontSize:16,textTransform:"capitalize"},btnRootFull:{width:"100%"},dividerRoot:Object(n.a)({marginBottom:16,marginLeft:-48,marginRight:-48},e.breakpoints.up("xl"),{marginBottom:32}),textPrimary:{color:e.palette.text.primary},colorTextPrimary:{color:e.palette.primary.main},underlineNone:{textDecoration:"none"},textGrey:{color:e.palette.grey[500]}}}))(e);return l.a.createElement(w.a,{flex:1,display:"flex",flexDirection:"column"},l.a.createElement(w.a,{px:{xs:6,sm:10,xl:15},pt:8,flex:1,display:"flex",flexDirection:"column"},l.a.createElement(f.c,{validateOnChange:!0,initialValues:{email:"crema.demo@gmail.com",password:"Pass@1!@all"},validationSchema:L,onSubmit:function(e,o){var n=o.setSubmitting;n(!0),t(Object(E.H)({email:e.email,password:e.password}),a),n(!1)}},(function(e){var t=e.isSubmitting;return l.a.createElement(f.b,{className:i.formRoot,noValidate:!0,autoComplete:"off"},l.a.createElement(w.a,{mb:{xs:5,xl:8}},l.a.createElement(I,{placeholder:r["common.email"],name:"email",label:l.a.createElement(O.a,{id:"common.email"}),variant:"outlined",className:i.myTextFieldRoot})),l.a.createElement(w.a,{mb:{xs:3,xl:4}},l.a.createElement(I,{type:"password",placeholder:r["common.password"],label:l.a.createElement(O.a,{id:"common.password"}),name:"password",variant:"outlined",className:i.myTextFieldRoot})),l.a.createElement(w.a,{mb:{xs:3,xl:4},display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:{sm:"space-between"},fontSize:15},l.a.createElement(w.a,{display:"flex",alignItems:"center"},l.a.createElement(p.a,{className:i.checkboxRoot}),l.a.createElement(w.a,{className:i.textGrey,component:"span"},l.a.createElement(O.a,{id:"common.rememberMe"}))),l.a.createElement(w.a,{color:"primary.main",component:"span",ml:{sm:4},className:i.pointer,onClick:o,fontSize:15},l.a.createElement(O.a,{id:"common.forgetPassword"}))),l.a.createElement(w.a,{mb:6,display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:{sm:"space-between"}},l.a.createElement(u.a,{variant:"contained",color:"secondary",type:"submit",disabled:t,className:i.btnRoot},l.a.createElement(O.a,{id:"common.login"})),l.a.createElement(w.a,{ml:{xs:0,sm:4},mt:{xs:3,sm:0},className:i.textGrey,fontSize:15},l.a.createElement(w.a,{component:"span",mr:2},l.a.createElement(O.a,{id:"common.dontHaveAccount"})),l.a.createElement(w.a,{component:"span"},l.a.createElement(j.a,{to:"/signup",className:Object(k.default)(i.underlineNone,i.colorTextPrimary)},l.a.createElement(O.a,{id:"common.signup"}))))))}))),l.a.createElement(w.a,{bgcolor:B.a[100],px:{xs:6,sm:10,xl:15},py:{xs:3,xl:4},display:"flex",justifyContent:"center",alignItems:"center"},l.a.createElement(u.a,{variant:"contained",color:"primary",className:Object(k.default)(i.btnRoot,i.btnRootFull),onClick:function(){return t(Object(E.M)())}},l.a.createElement(O.a,{id:"auth.loginWithAuth0"}))),l.a.createElement(g.a,null))},P=a(1472),W=a.n(P),A=a(1287),D=a.n(A),H=function(e){var t=Object(f.d)(e),a=Object(o.a)(t,2),n=a[0],r=a[1],i=r.error&&r.touched?r.error:"";return l.a.createElement(s.a,Object.assign({},e,n,{helperText:i,error:!!i}))},q=b.b({email:b.c().email(l.a.createElement(O.a,{id:"validation.emailFormat"})).required(l.a.createElement(O.a,{id:"validation.emailRequired"})),password:b.c().required(l.a.createElement(O.a,{id:"validation.passwordRequired"}))}),G=function(e){var t=Object(x.d)(),a=Object(y.h)(),o=function(){a.push("/forget-password",{tab:"firebase"})},r=Object(C.a)().messages,i=Object(R.a)((function(e){return{formRoot:Object(n.a)({textAlign:"left"},e.breakpoints.up("xl"),{marginBottom:24}),myTextFieldRoot:{width:"100%"},checkboxRoot:{marginLeft:-12},pointer:{cursor:"pointer"},btnRoot:{borderRadius:e.overrides.MuiCard.root.borderRadius,width:"10rem",fontWeight:N.b.REGULAR,fontSize:16},dividerRoot:Object(n.a)({marginBottom:16,marginLeft:-48,marginRight:-48},e.breakpoints.up("xl"),{marginBottom:32}),iconButtonRoot:Object(n.a)({marginLeft:4,marginRight:4,color:e.palette.grey[500],"&:hover, &:focus":{color:e.palette.text.primary}},e.breakpoints.up("sm"),{marginLeft:8,marginRight:8}),textLg:{fontSize:18},textPrimary:{color:e.palette.text.primary},colorTextPrimary:{color:e.palette.primary.main},underlineNone:{textDecoration:"none"},textGrey:{color:e.palette.grey[500]}}}))(e);return l.a.createElement(w.a,{flex:1,display:"flex",flexDirection:"column"},l.a.createElement(w.a,{px:{xs:6,sm:10,xl:15},pt:8,flex:1,display:"flex",flexDirection:"column"},l.a.createElement(f.c,{validateOnChange:!0,initialValues:{email:"crema.demo@gmail.com",password:"Pass@1!@all"},validationSchema:q,onSubmit:function(e,o){var n=o.setSubmitting;n(!0),t(Object(E.O)(e.email,e.password),a),n(!1)}},(function(e){var t=e.isSubmitting;return l.a.createElement(f.b,{className:i.formRoot,noValidate:!0,autoComplete:"off"},l.a.createElement(w.a,{mb:{xs:5,xl:8}},l.a.createElement(H,{placeholder:r["common.email"],name:"email",label:l.a.createElement(O.a,{id:"common.email"}),variant:"outlined",className:i.myTextFieldRoot})),l.a.createElement(w.a,{mb:{xs:3,lg:4}},l.a.createElement(H,{type:"password",placeholder:r["common.password"],label:l.a.createElement(O.a,{id:"common.password"}),name:"password",variant:"outlined",className:i.myTextFieldRoot})),l.a.createElement(w.a,{mb:{xs:3,xl:4},display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:{sm:"space-between"},fontSize:15},l.a.createElement(w.a,{display:"flex",alignItems:"center"},l.a.createElement(p.a,{className:i.checkboxRoot}),l.a.createElement(w.a,{className:i.textGrey,component:"span"},l.a.createElement(O.a,{id:"common.rememberMe"}))),l.a.createElement(w.a,{color:"primary.main",component:"span",ml:{sm:4},className:i.pointer,onClick:o,fontSize:15},l.a.createElement(O.a,{id:"common.forgetPassword"}))),l.a.createElement(w.a,{mb:6,display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"},justifyContent:{sm:"space-between"}},l.a.createElement(u.a,{variant:"contained",color:"secondary",type:"submit",disabled:t,className:i.btnRoot},l.a.createElement(O.a,{id:"common.login"})),l.a.createElement(w.a,{ml:{xs:0,sm:4},mt:{xs:3,sm:0},color:"text.secondary",fontSize:15},l.a.createElement(w.a,{className:i.textGrey,component:"span",mr:2},l.a.createElement(O.a,{id:"common.dontHaveAccount"})),l.a.createElement(w.a,{component:"span"},l.a.createElement(j.a,{to:"/signup",className:Object(k.default)(i.underlineNone,i.colorTextPrimary)},l.a.createElement(O.a,{id:"common.signup"}))))))}))),l.a.createElement(w.a,{bgcolor:B.a[100],px:{xs:6,sm:10,xl:15},py:2,display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:"center",alignItems:"center"},l.a.createElement(w.a,{component:"span",className:i.textGrey,mr:{sm:4},fontSize:15},l.a.createElement(O.a,{id:"common.orLoginWith"})),l.a.createElement(w.a,{display:"flex",alignItems:"center"},l.a.createElement(h.a,{className:i.iconButtonRoot,onClick:function(){return t(Object(E.hb)())}},l.a.createElement("i",{className:"zmdi zmdi-google"})),l.a.createElement(h.a,{className:i.iconButtonRoot,onClick:function(){return t(Object(E.fb)())}},l.a.createElement(d.a,null)),l.a.createElement(h.a,{className:i.iconButtonRoot,onClick:function(){return t(Object(E.gb)())}},l.a.createElement(W.a,null)),l.a.createElement(h.a,{className:i.iconButtonRoot,onClick:function(){return t(Object(E.ib)())}},l.a.createElement(D.a,null)))),l.a.createElement(g.a,null))},V=a(1077),$=Object(R.a)((function(e){var t;return{imgRoot:{cursor:"pointer",display:"inline-block",width:140},cardRoot:(t={maxWidth:"36rem",width:"100%",overflow:"hidden",boxShadow:"0 10px 15px -3px rgba(0, 0, 0, 0.1)",textAlign:"center",position:"relative",paddingTop:20},Object(n.a)(t,e.breakpoints.up("xl"),{paddingTop:32}),Object(n.a)(t,"&:before",{content:"''",position:"absolute",left:0,right:0,top:0,width:130,height:9,borderBottomRightRadius:80,borderBottomLeftRadius:80,marginRight:"auto",marginLeft:"auto",backgroundColor:e.palette.primary.main}),t),muiTabsFull:{marginLeft:0,marginRight:0,borderBottom:"1px solid ".concat(e.palette.grey[300]),"& .MuiTabs-flexContainer":{"& .MuiTab-root":{flex:1}}},muiTab:{fontWeight:N.b.MEDIUM,fontSize:16,paddingBottom:16,paddingTop:16,marginLeft:8,marginRight:8,color:e.palette.text.secondary},textUppercase:{textTransform:"uppercase"}}}));t.default=function(e){var t=Object(r.useState)(1),a=Object(o.a)(t,2),n=a[0],s=a[1],m=function(e){return{id:"simple-tab-".concat(e),"aria-controls":"simple-tabpanel-".concat(e)}},d=$(e);return l.a.createElement(w.a,{flex:1,display:"flex",flexDirection:"column",justifyContent:"center"},l.a.createElement(w.a,{mb:{xs:6,md:8,xl:18},textAlign:"center"},l.a.createElement("img",{className:d.imgRoot,src:"/assets/images/logo-white-with-name.png",alt:"crema-logo"})),l.a.createElement(w.a,{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"},l.a.createElement(V.a,{className:d.cardRoot},l.a.createElement(w.a,{px:{xs:6,sm:10,xl:15}},l.a.createElement(w.a,{component:"h2",mb:{xs:3,xl:6},color:"text.primary",fontWeight:N.b.REGULAR,fontSize:{xs:24,xl:26}},l.a.createElement(O.a,{id:"common.login"}))),l.a.createElement(c.a,{value:n,onChange:function(e,t){s(t)},indicatorColor:"primary",textColor:"primary","aria-label":"simple tabs example",className:d.muiTabsFull},l.a.createElement(i.a,Object.assign({className:d.muiTab,label:"aws cognito"},m(1))),l.a.createElement(i.a,Object.assign({className:d.muiTab,label:"jwt auth"},m(2))),l.a.createElement(i.a,Object.assign({className:d.muiTab,label:"firebase"},m(0)))),l.a.createElement(l.a.Fragment,null,0===n&&l.a.createElement(F,null),1===n&&l.a.createElement(M,null),2===n&&l.a.createElement(G,null)))))}}}]);
//# sourceMappingURL=67.87d25aeb.chunk.js.map