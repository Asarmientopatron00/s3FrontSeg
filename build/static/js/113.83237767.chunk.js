(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[113],{1274:function(e,t,a){"use strict";var n=a(3),o=a(12),r=a(0),i=(a(11),a(4)),l=a(237),s=Object(l.a)(r.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),c=a(21),m=a(50),d=a(38),p=a(31),u=a(288);function y(e){return"Backspace"===e.key||"Delete"===e.key}var b=r.forwardRef((function(e,t){var a=e.avatar,l=e.classes,c=e.className,m=e.clickable,b=e.color,g=void 0===b?"default":b,h=e.component,f=e.deleteIcon,v=e.disabled,k=void 0!==v&&v,E=e.icon,S=e.label,x=e.onClick,I=e.onDelete,w=e.onKeyDown,O=e.onKeyUp,L=e.size,j=void 0===L?"medium":L,C=e.variant,N=void 0===C?"default":C,R=Object(o.a)(e,["avatar","classes","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"]),A=r.useRef(null),P=Object(d.a)(A,t),T=function(e){e.stopPropagation(),I&&I(e)},$=!(!1===m||!x)||m,q="small"===j,D=h||($?u.a:"div"),z=D===u.a?{component:"div"}:{},W=null;if(I){var B=Object(i.default)("default"!==g&&("default"===N?l["deleteIconColor".concat(Object(p.a)(g))]:l["deleteIconOutlinedColor".concat(Object(p.a)(g))]),q&&l.deleteIconSmall);W=f&&r.isValidElement(f)?r.cloneElement(f,{className:Object(i.default)(f.props.className,l.deleteIcon,B),onClick:T}):r.createElement(s,{className:Object(i.default)(l.deleteIcon,B),onClick:T})}var G=null;a&&r.isValidElement(a)&&(G=r.cloneElement(a,{className:Object(i.default)(l.avatar,a.props.className,q&&l.avatarSmall,"default"!==g&&l["avatarColor".concat(Object(p.a)(g))])}));var H=null;return E&&r.isValidElement(E)&&(H=r.cloneElement(E,{className:Object(i.default)(l.icon,E.props.className,q&&l.iconSmall,"default"!==g&&l["iconColor".concat(Object(p.a)(g))])})),r.createElement(D,Object(n.a)({role:$||I?"button":void 0,className:Object(i.default)(l.root,c,"default"!==g&&[l["color".concat(Object(p.a)(g))],$&&l["clickableColor".concat(Object(p.a)(g))],I&&l["deletableColor".concat(Object(p.a)(g))]],"default"!==N&&[l.outlined,{primary:l.outlinedPrimary,secondary:l.outlinedSecondary}[g]],k&&l.disabled,q&&l.sizeSmall,$&&l.clickable,I&&l.deletable),"aria-disabled":!!k||void 0,tabIndex:$||I?0:void 0,onClick:x,onKeyDown:function(e){e.currentTarget===e.target&&y(e)&&e.preventDefault(),w&&w(e)},onKeyUp:function(e){e.currentTarget===e.target&&(I&&y(e)?I(e):"Escape"===e.key&&A.current&&A.current.blur()),O&&O(e)},ref:P},z,R),G||H,r.createElement("span",{className:Object(i.default)(l.label,q&&l.labelSmall)},S),W)}));t.a=Object(c.a)((function(e){var t="light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],a=Object(m.d)(e.palette.text.primary,.26);return{root:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:e.palette.getContrastText(t),backgroundColor:t,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:"none",padding:0,verticalAlign:"middle",boxSizing:"border-box","&$disabled":{opacity:.5,pointerEvents:"none"},"& $avatar":{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],fontSize:e.typography.pxToRem(12)},"& $avatarColorPrimary":{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark},"& $avatarColorSecondary":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.dark},"& $avatarSmall":{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)}},sizeSmall:{height:24},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},disabled:{},clickable:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover, &:focus":{backgroundColor:Object(m.c)(t,.08)},"&:active":{boxShadow:e.shadows[1]}},clickableColorPrimary:{"&:hover, &:focus":{backgroundColor:Object(m.c)(e.palette.primary.main,.08)}},clickableColorSecondary:{"&:hover, &:focus":{backgroundColor:Object(m.c)(e.palette.secondary.main,.08)}},deletable:{"&:focus":{backgroundColor:Object(m.c)(t,.08)}},deletableColorPrimary:{"&:focus":{backgroundColor:Object(m.c)(e.palette.primary.main,.2)}},deletableColorSecondary:{"&:focus":{backgroundColor:Object(m.c)(e.palette.secondary.main,.2)}},outlined:{backgroundColor:"transparent",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(m.d)(e.palette.text.primary,e.palette.action.hoverOpacity)},"& $avatar":{marginLeft:4},"& $avatarSmall":{marginLeft:2},"& $icon":{marginLeft:4},"& $iconSmall":{marginLeft:2},"& $deleteIcon":{marginRight:5},"& $deleteIconSmall":{marginRight:3}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(e.palette.primary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(m.d)(e.palette.primary.main,e.palette.action.hoverOpacity)}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(e.palette.secondary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(m.d)(e.palette.secondary.main,e.palette.action.hoverOpacity)}},avatar:{},avatarSmall:{},avatarColorPrimary:{},avatarColorSecondary:{},icon:{color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],marginLeft:5,marginRight:-6},iconSmall:{width:18,height:18,marginLeft:4,marginRight:-4},iconColorPrimary:{color:"inherit"},iconColorSecondary:{color:"inherit"},label:{overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},labelSmall:{paddingLeft:8,paddingRight:8},deleteIcon:{WebkitTapHighlightColor:"transparent",color:a,height:22,width:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:Object(m.d)(a,.4)}},deleteIconSmall:{height:16,width:16,marginRight:4,marginLeft:-4},deleteIconColorPrimary:{color:Object(m.d)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconColorSecondary:{color:Object(m.d)(e.palette.secondary.contrastText,.7),"&:hover, &:active":{color:e.palette.secondary.contrastText}},deleteIconOutlinedColorPrimary:{color:Object(m.d)(e.palette.primary.main,.7),"&:hover, &:active":{color:e.palette.primary.main}},deleteIconOutlinedColorSecondary:{color:Object(m.d)(e.palette.secondary.main,.7),"&:hover, &:active":{color:e.palette.secondary.main}}}}),{name:"MuiChip"})(b)},1301:function(e,t,a){"use strict";var n=a(3),o=a(12),r=a(0),i=(a(11),a(4)),l=a(114),s=a(21),c=a(239),m=r.forwardRef((function(e,t){var a=e.children,s=e.classes,m=e.className,d=e.component,p=void 0===d?"div":d,u=e.disablePointerEvents,y=void 0!==u&&u,b=e.disableTypography,g=void 0!==b&&b,h=e.position,f=e.variant,v=Object(o.a)(e,["children","classes","className","component","disablePointerEvents","disableTypography","position","variant"]),k=Object(c.b)()||{},E=f;return f&&k.variant,k&&!E&&(E=k.variant),r.createElement(c.a.Provider,{value:null},r.createElement(p,Object(n.a)({className:Object(i.default)(s.root,m,y&&s.disablePointerEvents,k.hiddenLabel&&s.hiddenLabel,"filled"===E&&s.filled,{start:s.positionStart,end:s.positionEnd}[h],"dense"===k.margin&&s.marginDense),ref:t},v),"string"!==typeof a||g?a:r.createElement(l.a,{color:"textSecondary"},a)))}));t.a=Object(s.a)({root:{display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap"},filled:{"&$positionStart:not($hiddenLabel)":{marginTop:16}},positionStart:{marginRight:8},positionEnd:{marginLeft:8},disablePointerEvents:{pointerEvents:"none"},hiddenLabel:{},marginDense:{}},{name:"MuiInputAdornment"})(m)},3142:function(e,t,a){"use strict";a.r(t);var n=a(22),o=a(2),r=a(0),i=a.n(r),l=a(1629),s=a(1139),c=[{id:2001,ques:"How much one could earn using your products?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2002,ques:"What are some common taxes applied to these products?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2003,ques:"What is the commission structues you are offering to affiliates?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2004,ques:"How much incentive do you pay if someone reaches the sale goal?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2005,ques:"How much one could earn using your products?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]}],m=[{id:2001,ques:"Approximately how many people work in your company?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2002,ques:"What are some common system requirement to install your software?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2003,ques:"What are some pre-requisites before installing your software?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2004,ques:"Is there any document available for instructions regarding to installation of software?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]},{id:2005,ques:"What are some common system requirement to install your software?",ans:"orem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries.",tags:["SALES","EARNING","PRE-SALES"]}],d=a(1301),p=a(190),u=a.n(p),y=a(23),b=a(1081),g=a(67),h=a(1086),f=a(1082),v=a(1274),k=a(164),E=a(33),S=a(8),x=Object(k.a)((function(e){return{scrollBar:{padding:0,marginBottom:20,maxHeight:130},chip:{margin:8,fontWeight:S.b.MEDIUM}}})),I=function(e){var t=e.data,a=x();return i.a.createElement(h.a,{item:!0,xs:12,sm:6,md:4},i.a.createElement(g.a,{p:5,clone:!0},i.a.createElement(f.a,null,i.a.createElement(g.a,{mb:2,component:"h5",fontSize:16,fontWeight:S.b.BOLD},t.ques),i.a.createElement(E.a,{className:a.scrollBar},i.a.createElement(g.a,{component:"p"},t.ans)),i.a.createElement(g.a,{mx:-2},t.tags.map((function(e,t){return i.a.createElement(v.a,{label:e,variant:"outlined",className:a.chip,key:t})}))))))},w=a(303),O=function(e){var t=e.saleQueries;return i.a.createElement(g.a,{mb:{xs:6,lg:10}},i.a.createElement(g.a,{component:"h3",color:"text.primary",mb:{xs:4,lg:6},fontSize:16,fontWeight:S.b.BOLD},i.a.createElement(y.a,{id:"knowledge.sales"})),i.a.createElement(w.a,null,t.map((function(e,t){return i.a.createElement(I,{data:e,key:t})}))))},L=function(e){var t=e.installationQueries;return i.a.createElement(g.a,{mb:2},i.a.createElement(g.a,{component:"h3",color:"text.primary",mb:{xs:4,lg:6},fontSize:16,fontWeight:S.b.BOLD},i.a.createElement(y.a,{id:"knowledge.installation"})),i.a.createElement(w.a,null,t.map((function(e){return i.a.createElement(I,{data:e,key:e.id})}))))},j=a(188),C=Object(k.a)((function(e){var t;return{divider:(t={marginTop:16,marginBottom:16},Object(o.a)(t,e.breakpoints.up("sm"),{marginTop:24,marginBottom:24}),Object(o.a)(t,e.breakpoints.up("lg"),{marginTop:32,marginBottom:32}),Object(o.a)(t,e.breakpoints.up("xl"),{marginTop:40,marginBottom:40}),t)}}));t.default=function(){var e=Object(b.a)().messages,t=Object(r.useState)(""),a=Object(n.a)(t,2),o=a[0],p=a[1],h=""!==o?c.filter((function(e){return e.ques.includes(o)})):c,f=""!==o?m.filter((function(e){return e.ques.includes(o)})):m,v=C();return i.a.createElement(j.a,{animation:"transition.slideUpIn",delay:200},i.a.createElement(g.a,{flex:1},i.a.createElement(g.a,{mx:"auto",textAlign:"center",maxWidth:768},i.a.createElement(g.a,{component:"h2",color:"text.primary",mb:6,fontSize:20,fontWeight:S.b.BOLD},i.a.createElement(y.a,{id:"knowledge.howHelp"})),i.a.createElement(l.a,{id:"outlined-with-placeholder",placeholder:e["knowledge.Skeleton"],style:{width:"100%"},variant:"outlined",InputProps:{startAdornment:i.a.createElement(g.a,{fontWeight:S.b.MEDIUM,clone:!0},i.a.createElement(d.a,{position:"start"},i.a.createElement(u.a,null)))},value:o,onChange:function(e){return p(e.target.value)}})),i.a.createElement(s.a,{className:v.divider}),i.a.createElement(O,{saleQueries:h}),i.a.createElement(L,{installationQueries:f})))}}}]);
//# sourceMappingURL=113.83237767.chunk.js.map