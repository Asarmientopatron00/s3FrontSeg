(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[107],{1157:function(e,t,a){"use strict";var n=a(117),r=a(0),o=a.n(r),l=a(9),i=a(1177),c=a(57),m=a(462),s=a.n(m),p=a(1175),d=function(e){var t=e.renderRow,a=e.onEndReached,r=e.data,m=e.animation,d=e.delay,u=void 0===d?0:d,x=e.duration,f=void 0===x?200:x,b=e.containerStyle,g=e.border,E=e.ListFooterComponent,y=e.ListEmptyComponent,h=(e.ItemSeparatorComponent,Object(n.a)(e,["renderRow","onEndReached","data","animation","delay","duration","containerStyle","border","ListFooterComponent","ListEmptyComponent","ItemSeparatorComponent"])),v=Object(c.a)(),j={border:"1px solid ".concat(s.a[300]),backgroundColor:v.palette.background.paper,borderRadius:4,overflow:"hidden"};a||(a=function(){});var O=b;return g&&(O=Object(l.a)(Object(l.a)({},O),j)),Object(i.a)(a,200),o.a.createElement(p.a,Object.assign({style:Object(l.a)({},O)},h,{flex:1,enter:{delay:u,duration:f,animation:m}}),r.length>0?r.map((function(e,a){return t(e,a)})):function(e){return e?o.a.isValidElement(e)?e:o.a.createElement(e,null):null}(y),function(e){return e?o.a.isValidElement(e)?e:o.a.createElement(e,null):null}(E))},u=d;d.defaultProps={border:!1,animation:"transition.slideUpIn",data:[],onEndReached:function(){}};var x=a(164),f=a(67),b=a(1115),g=a(11),E=a.n(g),y=a(4),h=Object(x.a)((function(e){return{listFooterRoot:{padding:10,color:e.palette.text.secondary,display:"flex",justifyContent:"center"},listFooterLoaderRoot:{width:"100%",display:"flex",color:e.palette.text.secondary,justifyContent:"center",padding:8,borderTop:"1px solid ".concat(e.palette.grey[200]),boxSizing:"border-box"}}})),v=function(e){var t=e.loading,a=e.footerText,n=h();return t?o.a.createElement(f.a,{className:n.listFooterLoaderRoot},o.a.createElement(b.a,{size:16}),o.a.createElement(f.a,{component:"span",ml:2},"Loading...")):o.a.createElement(f.a,{className:Object(y.default)(n.listFooterRoot,"list-footer")},o.a.createElement(f.a,{component:"p"},a))};v.prototype={loading:E.a.bool,footerText:E.a.string},v.defaultProps={loading:!1};var j=v,O=function(e){var t=e.footerProps,a=Object(n.a)(e,["footerProps"]);return o.a.createElement(u,Object.assign({},a,{ListFooterComponent:t?o.a.createElement(j,{loading:t.loading,footerText:t.footerText}):null}))};t.a=O;O.defaultProps={border:!1,data:[]}},1175:function(e,t,a){"use strict";var n=a(9),r=a(117),o=a(0),l=a.n(o),i=a(318),c=(a(468),{animation:"transition.fadeIn",stagger:50,duration:200,display:null,visibility:"visible",delay:0}),m={animation:"transition.slideUpOut",backwards:150,duration:200,display:null,visibility:"visible",delay:0};function s(e){e.loading;var t=Object(r.a)(e,["loading"]);return l.a.createElement(i.VelocityTransitionGroup,Object.assign({},t,{enter:Object(n.a)(Object(n.a)({},c),t.enter),leave:Object(n.a)(Object(n.a)({},m),t.leave)}))}s.defaultProps={enter:c,leave:m,easing:[.4,0,.2,1],runOnMount:!0,enterHideStyle:{visibility:"visible"},enterShowStyle:{visibility:"hidden"}},t.a=Object(o.memo)(s)},3166:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(15),l=a(20),i=a(2),c=a(1077),m=a(1257),s=a(493),p=a(459),d=a(1243),u=a.n(d),x=a(1384),f=a.n(x),b=a(1273),g=a.n(b),E=a(2761),y=a.n(E),h=a(2762),v=a.n(h),j=a(1287),O=a.n(j),w=a(1846),C=a.n(w),R=a(23),L=a(67),N=a(164),I=a(198),k=a(7),T=Object(N.a)((function(e){return{chipLabel:Object(i.a)({backgroundColor:"dark"===e.palette.type?e.palette.grey[700]:e.palette.grey[200],padding:"4px 12px",marginTop:8,marginRight:4,marginLeft:4,border:"1px solid",borderColor:I.a[500],borderRadius:2},e.breakpoints.up("xl"),{marginRight:8,marginLeft:8}),avatar:{height:85,width:85},chip:{backgroundColor:e.palette.primary.contrastText,color:"#484848",paddingRight:4,paddingLeft:4,fontWeight:k.b.MEDIUM},hireButton:{marginRight:20,marginTop:8,padding:"9px 12px",lineHeight:1,width:96,fontWeight:k.b.MEDIUM},removeButton:{backgroundColor:e.palette.primary.contrastText,color:I.a[500],marginTop:8,border:"1px solid",borderColor:I.a[500],width:96,fontWeight:k.b.MEDIUM,padding:"9px 12px",lineHeight:1},pointer:{cursor:"pointer"},titleRoot:{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",width:"100%",textAlign:"center"}}})),S=function(e){var t=T(e),a=e.user;return r.a.createElement(L.a,{mb:8,className:"item-hover",clone:!0},r.a.createElement(c.a,null,r.a.createElement(L.a,{display:"flex",flexDirection:{xs:"column",sm:"row"}},r.a.createElement(L.a,{color:"primary.contrastText",width:{xs:"100%",sm:200,xl:256},p:{xs:3,lg:5},bgcolor:"primary.main",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},r.a.createElement(L.a,{mb:3},r.a.createElement(p.a,{src:a.image,className:t.avatar})),r.a.createElement(L.a,{mb:3,component:"h3",className:t.titleRoot,fontSize:16,fontWeight:k.b.BOLD},a.name),r.a.createElement(m.a,{label:"@".concat(a.charge,"/Hour"),className:t.chip})),r.a.createElement(L.a,{p:5,flex:1},r.a.createElement(L.a,{mb:{xs:2,xl:3},color:"grey.600",display:"flex",flexDirection:{xs:"column",lg:"row"},alignItems:{lg:"center"}},r.a.createElement(L.a,{mx:-3,mb:2,color:"text.primary",pr:{xl:32},display:"flex",flex:1,fontSize:{xs:14,xl:16},flexWrap:"wrap",justifyContent:"space-between"},r.a.createElement(L.a,{px:3,display:"flex",alignItems:"center",className:t.pointer},r.a.createElement(u.a,null),r.a.createElement(L.a,{ml:2},a.email)),r.a.createElement(L.a,{px:3,display:"flex",alignItems:"center",className:t.pointer},r.a.createElement(C.a,null),r.a.createElement(L.a,{ml:2},a.website)),r.a.createElement(L.a,{px:3,display:"flex",alignItems:"center",className:t.pointer},r.a.createElement(f.a,null),r.a.createElement(L.a,{ml:2},a.phone))),r.a.createElement(L.a,{mx:{xs:-1,xl:-4},mb:2,pl:{lg:6,xl:10},display:"flex",alignItems:"center",justifyContent:{xs:"space-between",sm:"flex-start"},color:"text.primary"},r.a.createElement(L.a,{component:"span",mx:{xs:1,xl:4}},r.a.createElement(g.a,{className:t.pointer})),r.a.createElement(L.a,{component:"span",mx:{xs:1,xl:4}},r.a.createElement(y.a,{className:t.pointer})),r.a.createElement(L.a,{component:"span",mx:{xs:1,xl:4}},r.a.createElement(v.a,{className:t.pointer})),r.a.createElement(L.a,{component:"span",mx:{xs:1,xl:4}},r.a.createElement(O.a,{className:t.pointer})))),r.a.createElement(L.a,{pr:{lg:6,xl:16}},r.a.createElement(L.a,{component:"p",color:"text.secondary",mb:4,fontSize:14,fontWeight:k.b.LIGHT},a.information)),r.a.createElement(L.a,{display:"flex",alignItems:{md:"center"},flexDirection:{xs:"column",md:"row"}},r.a.createElement(L.a,{mx:{xs:-1,xl:-2}},a.skills.map((function(e,a){return r.a.createElement(m.a,{key:a,label:e,className:t.chipLabel})}))),r.a.createElement(L.a,{ml:{md:"auto"}},r.a.createElement(s.a,{variant:"contained",color:"primary",className:t.hireButton},r.a.createElement(R.a,{id:"common.hire"})),r.a.createElement(s.a,{variant:"contained",className:t.removeButton},r.a.createElement(R.a,{id:"mailApp.remove"}))))))))},D=a(312),F=a(1157);t.default=function(){var e=Object(o.d)(),t=Object(o.e)((function(e){return e.userList.usersList}));return Object(n.useEffect)((function(){e(Object(l.D)())}),[e]),r.a.createElement(L.a,{flex:1},t?r.a.createElement(F.a,{data:t,renderRow:function(e){return r.a.createElement(S,{user:e,key:e.id})}}):null,r.a.createElement(D.a,null))}}}]);
//# sourceMappingURL=107.fd223673.chunk.js.map