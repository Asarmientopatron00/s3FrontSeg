(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[96],{1151:function(e,a,t){"use strict";var n=t(3),o=t(116),c=t(12),r=t(0),l=(t(11),t(4)),i=t(1145),d=t(1154),m=t(21),s=t(479),u=r.forwardRef((function(e,a){var t=e.autoFocus,m=e.checked,u=e.checkedIcon,p=e.classes,b=e.className,f=e.defaultChecked,h=e.disabled,v=e.icon,E=e.id,x=e.inputProps,g=e.inputRef,O=e.name,y=e.onBlur,k=e.onChange,j=e.onFocus,C=e.readOnly,w=e.required,z=e.tabIndex,I=e.type,S=e.value,B=Object(c.a)(e,["autoFocus","checked","checkedIcon","classes","className","defaultChecked","disabled","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"]),N=Object(i.a)({controlled:m,default:Boolean(f),name:"SwitchBase",state:"checked"}),F=Object(o.a)(N,2),M=F[0],P=F[1],V=Object(d.a)(),H=h;V&&"undefined"===typeof H&&(H=V.disabled);var q="checkbox"===I||"radio"===I;return r.createElement(s.a,Object(n.a)({component:"span",className:Object(l.default)(p.root,b,M&&p.checked,H&&p.disabled),disabled:H,tabIndex:null,role:void 0,onFocus:function(e){j&&j(e),V&&V.onFocus&&V.onFocus(e)},onBlur:function(e){y&&y(e),V&&V.onBlur&&V.onBlur(e)},ref:a},B),r.createElement("input",Object(n.a)({autoFocus:t,checked:m,defaultChecked:f,className:p.input,disabled:H,id:q&&E,name:O,onChange:function(e){var a=e.target.checked;P(a),k&&k(e,a)},readOnly:C,ref:g,required:w,tabIndex:z,type:I,value:S},x)),M?u:v)}));a.a=Object(m.a)({root:{padding:9},checked:{},disabled:{},input:{cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}},{name:"PrivateSwitchBase"})(u)},1233:function(e,a,t){"use strict";var n=t(3),o=t(12),c=t(0),r=(t(11),t(4)),l=t(1151),i=t(239),d=Object(i.a)(c.createElement("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),m=Object(i.a)(c.createElement("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),s=t(50),u=Object(i.a)(c.createElement("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox"),p=t(31),b=t(21),f=c.createElement(m,null),h=c.createElement(d,null),v=c.createElement(u,null),E=c.forwardRef((function(e,a){var t=e.checkedIcon,i=void 0===t?f:t,d=e.classes,m=e.color,s=void 0===m?"secondary":m,u=e.icon,b=void 0===u?h:u,E=e.indeterminate,x=void 0!==E&&E,g=e.indeterminateIcon,O=void 0===g?v:g,y=e.inputProps,k=e.size,j=void 0===k?"medium":k,C=Object(o.a)(e,["checkedIcon","classes","color","icon","indeterminate","indeterminateIcon","inputProps","size"]),w=x?O:b,z=x?O:i;return c.createElement(l.a,Object(n.a)({type:"checkbox",classes:{root:Object(r.default)(d.root,d["color".concat(Object(p.a)(s))],x&&d.indeterminate),checked:d.checked,disabled:d.disabled},color:s,inputProps:Object(n.a)({"data-indeterminate":x},y),icon:c.cloneElement(w,{fontSize:void 0===w.props.fontSize&&"small"===j?j:w.props.fontSize}),checkedIcon:c.cloneElement(z,{fontSize:void 0===z.props.fontSize&&"small"===j?j:z.props.fontSize}),ref:a},C))}));a.a=Object(b.a)((function(e){return{root:{color:e.palette.text.secondary},checked:{},disabled:{},indeterminate:{},colorPrimary:{"&$checked":{color:e.palette.primary.main,"&:hover":{backgroundColor:Object(s.d)(e.palette.primary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}},colorSecondary:{"&$checked":{color:e.palette.secondary.main,"&:hover":{backgroundColor:Object(s.d)(e.palette.secondary.main,e.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},"&$disabled":{color:e.palette.action.disabled}}}}),{name:"MuiCheckbox"})(E)},1273:function(e,a,t){"use strict";var n=t(44);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=n(t(0)),c=(0,n(t(62)).default)(o.default.createElement("path",{d:"M5 3h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2m13 2h-2.5A3.5 3.5 0 0 0 12 8.5V11h-2v3h2v7h3v-7h3v-3h-3V9a1 1 0 0 1 1-1h2V5z"}),"Facebook");a.default=c},1287:function(e,a,t){"use strict";var n=t(44);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=n(t(0)),c=(0,n(t(62)).default)(o.default.createElement("path",{d:"M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"}),"Twitter");a.default=c},1472:function(e,a,t){"use strict";var n=t(44);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var o=n(t(0)),c=(0,n(t(62)).default)(o.default.createElement("path",{d:"M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2 0 1.9 1.2 1.9 1.2 1 1.8 2.8 1.3 3.5 1 0-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.2.5-2.3 1.3-3.1-.2-.4-.6-1.6 0-3.2 0 0 1-.3 3.4 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8 0 3.2.9.8 1.3 1.9 1.3 3.2 0 4.6-2.8 5.6-5.5 5.9.5.4.9 1 .9 2.2v3.3c0 .3.1.7.8.6A12 12 0 0 0 12 .3"}),"GitHub");a.default=c},3035:function(e,a,t){"use strict";t.r(a);var n=t(22),o=t(2),c=t(0),r=t.n(c),l=t(1077),i=t(1612),d=t(493),m=t(164),s=t(1233),u=t(1201),p=t(1472),b=t.n(p),f=t(1287),h=t.n(f),v=t(1273),E=t.n(v),x=t(479),g=t(1208),O=t(23),y=t(1076),k=t(67),j=t(198),C=t(7),w=t(189),z=Object(m.a)((function(e){var a;return{logo:{height:24},textField:{width:"100%"},card:(a={maxWidth:576,width:"100%",textAlign:"center",padding:24,overflow:"hidden",boxShadow:"0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"},Object(o.a)(a,e.breakpoints.up("lg"),{padding:32}),Object(o.a)(a,e.breakpoints.up("xl"),{padding:"48px 64px"}),a),form:Object(o.a)({textAlign:"left",marginBottom:12},e.breakpoints.up("xl"),{marginBottom:32}),button:{width:"100%",height:44},iconColor:{color:e.palette.text.primary},pointer:{cursor:"pointer"}}})),I=function(e){var a=Object(u.d)(e),t=Object(n.a)(a,2),o=t[0],c=t[1],l=c.error&&c.touched?c.error:"";return r.a.createElement(i.a,Object.assign({},e,o,{helperText:l,error:!!l}))},S=g.b({email:g.c().email(r.a.createElement(O.a,{id:"validation.emailFormat"})).required(r.a.createElement(O.a,{id:"validation.emailRequired"})),password:g.c().required(r.a.createElement(O.a,{id:"validation.passwordRequired"}))});a.default=function(e){var a=z(e),t=Object(y.a)().messages;return r.a.createElement(w.a,{animation:"transition.slideUpIn",delay:200},r.a.createElement(k.a,{pb:6,py:{xl:8},display:"flex",flex:1,flexDirection:"column",alignItems:"center",justifyContent:"center"},r.a.createElement(l.a,{className:a.card},r.a.createElement(k.a,{mb:{xs:5,xl:8},display:"flex",alignItems:"center",justifyContent:"center"},r.a.createElement(k.a,{mr:2},r.a.createElement("img",{className:a.logo,src:"/assets/images/logo-icon-large.png",alt:"crema",title:"crema"})),r.a.createElement(k.a,{mb:1.5,fontWeight:C.b.BOLD,fontSize:20},r.a.createElement(O.a,{id:"common.login"}))),r.a.createElement(u.c,{validateOnChange:!0,initialValues:{email:"",password:""},validationSchema:S,onSubmit:function(e,a){a.setSubmitting;(0,a.resetForm)()}},(function(e){var n=e.isSubmitting;return r.a.createElement(u.b,{className:a.form,noValidate:!0,autoComplete:"off"},r.a.createElement(k.a,{mb:{xs:5,xl:8}},r.a.createElement(I,{placeholder:t["common.email"],label:r.a.createElement(O.a,{id:"common.email"}),name:"email",variant:"outlined",className:a.textField})),r.a.createElement(k.a,{mb:{xs:3,xl:8}},r.a.createElement(I,{type:"password",placeholder:t["common.password"],label:r.a.createElement(O.a,{id:"common.password"}),name:"password",variant:"outlined",className:a.textField})),r.a.createElement(k.a,{mb:{xs:3,xl:8},display:"flex",flexDirection:{xs:"column",sm:"row"},alignItems:{sm:"center"}},r.a.createElement(k.a,{display:"flex",flexDirection:"row",alignItems:"center"},r.a.createElement(k.a,{ml:-3},r.a.createElement(s.a,null)),r.a.createElement(k.a,{component:"span",fontSize:14},r.a.createElement(O.a,{id:"common.rememberMe"}))),r.a.createElement(k.a,{component:"span",ml:{sm:"auto"},color:"primary.main",mt:{xs:2,sm:0},fontWeight:C.b.BOLD,fontSize:14,className:a.pointer},r.a.createElement(O.a,{id:"common.forgetPassword"}))),r.a.createElement(d.a,{variant:"contained",color:"primary",type:"submit",disabled:n,className:a.button},r.a.createElement(O.a,{id:"common.login"})))})),r.a.createElement(k.a,{mb:{xs:2,xl:4},display:"flex",flexDirection:{xs:"column",sm:"row"},justifyContent:{sm:"center"},alignItems:{sm:"center"}},r.a.createElement(k.a,{component:"span",mr:4,color:j.a[600],fontSize:14},r.a.createElement(O.a,{id:"common.orLoginWith"})),r.a.createElement(k.a,{display:"inline-block"},r.a.createElement(x.a,null,r.a.createElement(E.a,{className:a.iconColor})),r.a.createElement(x.a,null,r.a.createElement(b.a,{className:a.iconColor})),r.a.createElement(x.a,null,r.a.createElement(h.a,{className:a.iconColor})))),r.a.createElement(k.a,{color:j.a[700],fontSize:14,fontWeight:C.b.BOLD},r.a.createElement(k.a,{component:"span",mr:2},r.a.createElement(O.a,{id:"common.dontHaveAccount"})),r.a.createElement(k.a,{component:"span",color:"primary.main",className:a.pointer},r.a.createElement(O.a,{id:"common.signup"}))))))}}}]);
//# sourceMappingURL=96.035c639c.chunk.js.map