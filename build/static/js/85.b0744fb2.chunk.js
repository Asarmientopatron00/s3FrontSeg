(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[85],{1242:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(164),o=a(67),c=a(1214),i=Object(l.a)((function(e){return{tableResponsiveMaterial:{minHeight:".01%",overflowX:"auto","-webkit-overflow-scrolling":"auto","& > thead > tr > th, > tbody > tr > th, > tfoot > tr > th, thead > tr > td, tbody > tr > td, tfoot > tr > td":{whiteSpace:"nowrap"},"@media (max-width: 767px)":{width:"100%",marginBottom:15,overflowY:"hidden",border:"1px solid ".concat(c.grey[300]),"& > table":{marginBottom:0}}}}}));t.a=function(e){var t=e.children,a=i();return r.a.createElement(o.a,{className:a.tableResponsiveMaterial},t)}},1272:function(e,t,a){"use strict";a.d(t,"f",(function(){return l})),a.d(t,"d",(function(){return o})),a.d(t,"e",(function(){return c})),a.d(t,"c",(function(){return i})),a.d(t,"b",(function(){return s})),a.d(t,"j",(function(){return u})),a.d(t,"g",(function(){return p})),a.d(t,"k",(function(){return m})),a.d(t,"a",(function(){return d})),a.d(t,"h",(function(){return f})),a.d(t,"i",(function(){return g}));var n=a(1),r=a(17),l=function(e){return function(t){t({type:n.x}),r.a.get("/api/ecommerce/list",{params:{filterData:e}}).then((function(e){200===e.status?(t({type:n.y}),t({type:n.V,payload:e.data})):t({type:n.w,payload:"Something went wrong, Please try again!"})})).catch((function(e){t({type:n.w,payload:e.message})}))}},o=function(e){return function(t){t({type:n.x}),r.a.get("/api/ecommerce/get",{params:{id:e}}).then((function(e){200===e.status?(t({type:n.y}),t({type:n.Bb,payload:e.data})):t({type:n.w,payload:"Something went wrong, Please try again!"})})).catch((function(e){t({type:n.w,payload:e.message})}))}},c=function(e,t){return function(a){a({type:n.x}),r.a.get("/api/ecommerce/orders",{params:{search:e,page:t}}).then((function(e){200===e.status?(a({type:n.y}),a({type:n.gb,payload:e.data})):a({type:n.w,payload:"Something went wrong, Please try again!"})})).catch((function(e){a({type:n.w,payload:e.message})}))}},i=function(e,t){return function(a){a({type:n.x}),r.a.get("/api/ecommerce/customers",{params:{search:e,page:t}}).then((function(e){200===e.status?(a({type:n.y}),a({type:n.R,payload:e.data})):a({type:n.w,payload:"Something went wrong, Please try again!"})})).catch((function(e){a({type:n.w,payload:e.message})}))}},s=function(){return function(e){e({type:n.x}),e({type:n.y})}},u=function(e){return function(t){t({type:n.Cb,payload:e})}},p=function(e){return function(t){t({type:n.vb,payload:e})}},m=function(e){return function(t){t({type:n.Rb,payload:e})}},d=function(e){return function(t){t({type:n.b,payload:e})}},f=function(e){return function(t){t({type:n.Bb,payload:e})}},g=function(e){return function(t){t({type:n.zb,payload:e})}}},1274:function(e,t,a){"use strict";a.d(t,"b",(function(){return u}));var n=a(2),r=a(0),l=a.n(r),o=a(33),c=a(310),i=a.n(c),s=a(50),u=i()((function(e){return{appsContentContainer:function(t){var a;return a={display:"flex",flexDirection:"column",height:"calc(100% - ".concat(t.isDetailView?60:115,"px)")},Object(n.a)(a,e.breakpoints.up("sm"),{height:"calc(100% - ".concat(t.fullView?0:60,"px)")}),Object(n.a)(a,e.breakpoints.up("xl"),{height:"calc(100% - ".concat(t.fullView?0:77,"px)")}),Object(n.a)(a,"& .scrum-absolute",{position:"absolute",top:0,left:0,width:"100%"}),Object(n.a)(a,"& .scrum-row",{display:"inline-flex",minWidth:"100%",height:"100%",marginLeft:"-10px",marginRight:"-10px"}),Object(n.a)(a,"& .scrum-col",Object(n.a)({minWidth:"280px",maxWidth:"280px",marginLeft:"10px",marginRight:"10px",borderRadius:e.overrides.MuiCard.root.borderRadius,backgroundColor:Object(s.d)(e.palette.background.paper,.45),height:"100% !important"},e.breakpoints.up("md"),{minWidth:"354px",maxWidth:"354px"})),Object(n.a)(a,"& .scroll-scrum-item",{height:"auto !important"}),a}}})),p=function(e){var t=u(e);return l.a.createElement(o.a,{className:t.appsContentContainer,style:e.style},e.children)};t.a=p,p.defaultProps={isDetailView:!1}},1278:function(e,t,a){"use strict";var n=a(9),r=a(0),l=a.n(r),o=a(20),c=a(15),i=a(312),s=a(67),u=a(1122),p=a(479),m=a(51),d=a.n(m),f=a(11),g=a.n(f),b=a(7),h=a(1077),y=a(2),E=a(164),x=function(e,t){return e===b.f.HOR_DARK_LAYOUT||e===b.f.HOR_LIGHT_NAV||e===b.f.H_DEFAULT?t>=1280?144:80:e===b.f.BIT_BUCKET?0:t>=600?70:60},w=Object(E.a)((function(e){var t;return{appsContainer:function(t){var a;return a={height:"calc(100vh - ".concat(75+x(t.navStyle,0)+(t.footer?70:10),"px) !important")},Object(y.a)(a,e.breakpoints.up("sm"),{height:"calc(100vh - ".concat(75+x(t.navStyle,600)+(t.footer?70:10),"px) !important")}),Object(y.a)(a,e.breakpoints.up("md"),{height:"calc(100vh - ".concat(85+x(t.navStyle,960)+(t.footer?80:10),"px) !important")}),Object(y.a)(a,e.breakpoints.up("lg"),{height:"calc(100vh - ".concat(73+x(t.navStyle,1280)+(t.footer?80:10),"px) !important")}),Object(y.a)(a,e.breakpoints.up("xl"),{height:"calc(100vh - ".concat(94+x(t.navStyle,1920)+(t.footer?86:10),"px) !important")}),Object(y.a)(a,"display","flex"),a},appsSidebar:(t={height:"100%"},Object(y.a)(t,e.breakpoints.up("lg"),{width:"17rem"}),Object(y.a)(t,e.breakpoints.up("xl"),{width:"20rem"}),t),appsMainContent:function(t){var a;return a={width:"100%",display:"flex",flexDirection:"column"},Object(y.a)(a,e.breakpoints.up("lg"),{width:"calc(100% - ".concat((t.fullView,0),"rem)"),paddingLeft:0}),Object(y.a)(a,e.breakpoints.up("xl"),{width:"calc(100% - ".concat((t.fullView,0),"rem)")}),a},menuButton:{marginRight:e.spacing(2)},menuIcon:{width:35,height:35},appSidebarDrawer:{width:"19rem","& .listItem":{zIndex:1305}},scLauncher:{"& .sc-header, & .sc-message--content.sent .sc-message--text, & .sc-header--close-button:hover":{backgroundColor:"".concat(e.palette.primary.main," !important")}}}})),C=a(29),v=function(e){var t=Object(c.d)(),a=Object(r.useContext)(C.a),m=a.footer,f=a.navStyle,g=e.title,y=e.fullView,E=e.children,x=w({footer:m,navStyle:f,fullView:y});return l.a.createElement(s.a,{pt:{xl:4},flex:1,display:"flex",flexDirection:"column",margin:"0px"},l.a.createElement(s.a,{mb:{xs:y?4:2,lg:y?5:4},mt:{xs:y?0:-3,lg:0},display:"flex",alignItems:"center"},y?null:l.a.createElement(u.a,{lgUp:!0},l.a.createElement(p.a,{edge:"start",className:x.menuButton,color:"inherit","aria-label":"open drawer",onClick:function(){return t(Object(o.T)())}},l.a.createElement(d.a,{className:x.menuIcon}))),l.a.createElement(s.a,{component:"h2",color:"text.primary",fontWeight:b.b.BOLD,fontSize:16},g)),l.a.createElement(s.a,{className:x.appsContainer},l.a.createElement(s.a,{className:x.appsMainContent},l.a.createElement(h.a,{style:Object(n.a)({height:"100%",display:"flex",flexDirection:"column"},e.cardStyle)},E),l.a.createElement(i.a,null))))};t.a=v;v.defaultProps={title:""},v.prototype={title:g.a.string}},1290:function(e,t,a){"use strict";var n=a(2),r=a(0),l=a.n(r),o=a(67),c=a(198),i=a(310),s=a.n(i)()((function(e){return{appHeader:Object(n.a)({height:60,display:"flex",alignItems:"center",borderBottom:"1px solid ".concat(c.a[300])},e.breakpoints.up("xl"),{height:77}),checkboxRoot:{marginRight:8},pointer:{cursor:"pointer"}}})),u=function(e){var t=e.children,a=s();return l.a.createElement(o.a,{px:6,py:{xs:1,xl:3},className:a.appHeader},t)};t.a=u,u.defaultProps={}},1340:function(e,t,a){"use strict";var n=a(0),r=a.n(n),l=a(1324),o=a(11),c=a.n(o),i=function(e){var t=e.count,a=e.page,n=e.onPageChange,o=e.rowsPerPage,c=e.className;return r.a.createElement(l.a,{component:"div",count:t,rowsPerPage:o,className:c,page:a,backIconButtonProps:{"aria-label":"Previous Page"},nextIconButtonProps:{"aria-label":"Next Page"},onChangePage:n,rowsPerPageOptions:[]})};t.a=i,i.defaultProps={className:"",rowsPerPage:15},i.prototype={count:c.a.number.isRequired,page:c.a.number.isRequired,onPageChange:c.a.func,className:c.a.string}},3124:function(e,t,a){"use strict";a.r(t);var n=a(22),r=a(0),l=a.n(r),o=a(1267),c=a(1268),i=a(1269),s=a(1239),u=a(1266),p=a(164),m=a(198),d=a(7),f=Object(p.a)((function(e){return{tableRowRoot:{color:m.a[500]},tableCellRoot:{borderBottom:"0 none",fontSize:13,padding:8,fontWeight:d.b.BOLD,"&:first-child":{paddingLeft:20},"&:last-child":{paddingRight:20}}}})),g=function(e){var t=f(e);return l.a.createElement(u.a,{className:t.tableRowRoot},l.a.createElement(s.a,{className:t.tableCellRoot},"Order ID"),l.a.createElement(s.a,{align:"left",className:t.tableCellRoot},"Product"),l.a.createElement(s.a,{align:"left",className:t.tableCellRoot},"Customer"),l.a.createElement(s.a,{align:"left",className:t.tableCellRoot},"Delivery Date"),l.a.createElement(s.a,{align:"left",className:t.tableCellRoot},"Price"),l.a.createElement(s.a,{align:"left",className:t.tableCellRoot},"Payment Method"),l.a.createElement(s.a,{align:"left",className:t.tableCellRoot},"Status"),l.a.createElement(s.a,{align:"right",className:t.tableCellRoot},"Actions"))},b=a(4),h=a(67),y=Object(p.a)((function(e){return{tableCell:{fontSize:13,padding:8,"&:first-child":{paddingLeft:20},"&:last-child":{paddingRight:20}},whiteSpace:{whiteSpace:"no-wrap"},anchar:{color:e.palette.primary.main,borderBottom:"1px solid ".concat(e.palette.primary.main),display:"inline-block"},badgeRoot:{padding:"3px 5px",borderRadius:4,fontSize:14,display:"inline-block"}}})),E=a(1113),x=a(1114),w=a(1089),C=a(479),v=a(63),O=a.n(v),j=function(){var e=l.a.useState(null),t=Object(n.a)(e,2),a=t[0],r=t[1],o=Boolean(a),c=function(){r(null)};return l.a.createElement(h.a,null,l.a.createElement(C.a,{"aria-controls":"fade-menu","aria-haspopup":"true",onClick:function(e){r(e.currentTarget)}},l.a.createElement(O.a,null)),l.a.createElement(E.a,{id:"fade-menu",anchorEl:a,keepMounted:!0,open:o,onClose:c,TransitionComponent:w.a},l.a.createElement(x.a,{style:{fontSize:14},onClick:c},"View Order"),l.a.createElement(x.a,{style:{fontSize:14},onClick:c},"Edit"),l.a.createElement(x.a,{style:{fontSize:14},onClick:c},"Delete")))},P=function(e){var t=e.data,a=y(),n=function(){switch(t.status){case"Pending":return"#F84E4E";case"Delivered":return"#43C888";default:return"#E2A72E"}};return l.a.createElement(u.a,{key:t.name,className:Object(b.default)(a.borderBottomClass,"item-hover")},l.a.createElement(s.a,{component:"th",scope:"row",className:a.tableCell},l.a.createElement(h.a,{className:a.anchar},t.id)),l.a.createElement(s.a,{align:"left",className:Object(b.default)(a.tableCell,a.tableCellColor)},t.product),l.a.createElement(s.a,{align:"left",className:Object(b.default)(a.tableCell,a.tableCellColor)},t.customer),l.a.createElement(s.a,{align:"left",className:a.tableCell},t.date),l.a.createElement(s.a,{align:"left",className:a.tableCell},t.price),l.a.createElement(s.a,{align:"left",className:a.tableCell},t.paymentType),l.a.createElement(s.a,{align:"left",className:a.tableCell},l.a.createElement(h.a,{className:a.badgeRoot,style:{color:n(),backgroundColor:n()+"44"}},t.status)),l.a.createElement(s.a,{align:"right",className:a.tableCell},l.a.createElement(j,null)))},N=a(1242),R=function(e){var t=e.orderData;return l.a.createElement(N.a,null,l.a.createElement(o.a,{stickyHeader:!0,className:"table"},l.a.createElement(c.a,null,l.a.createElement(g,null)),l.a.createElement(i.a,null,t.map((function(e){return l.a.createElement(P,{data:e,key:e.id})})))))},k=R;R.defaultProps={orderData:[]};var S=a(1278),D=a(1076),B=a(15),I=a(1272),V=a(493),L=a(1122),T=a(1290),z=a(1274),H=a(1340),W=a(1612),A=a(189),M=a(312);t.default=function(){var e=Object(D.a)().messages,t=Object(B.d)(),a=Object(B.e)((function(e){return e.ecommerce})),o=a.recentOrders,c=a.orderCount,i=Object(r.useState)(0),s=Object(n.a)(i,2),u=s[0],p=s[1],m=Object(r.useState)(""),d=Object(n.a)(m,2),f=d[0],g=d[1],b=function(e,t){p(t)};Object(r.useEffect)((function(){t(Object(I.e)(f,u))}),[t,f,u]);return l.a.createElement(l.a.Fragment,null,l.a.createElement(A.a,{animation:"transition.slideUpIn",delay:200},l.a.createElement(S.a,{title:e["eCommerce.recentOrders"],fullView:!0},l.a.createElement(T.a,null,l.a.createElement(h.a,{display:"flex",flexDirection:"row",alignItems:"center",width:1,justifyContent:"space-between"},l.a.createElement(W.a,{style:{maxWidth:150},margin:"dense",id:"user-name",placeholder:"Search",type:"search",variant:"outlined",onChange:function(e){g(e.target.value),p(0)}}),l.a.createElement(h.a,{display:"flex",flexDirection:"row",alignItems:"center"},l.a.createElement(V.a,{variant:"contained",color:"primary"},"Add Order"),l.a.createElement(L.a,{xsDown:!0},l.a.createElement(H.a,{rowsPerPage:10,count:c,page:u,onPageChange:b}))))),l.a.createElement(z.a,{style:{paddingTop:10,paddingBottom:10}},l.a.createElement(k,{orderData:o})),l.a.createElement(L.a,{smUp:!0},l.a.createElement(H.a,{rowsPerPage:10,count:c,page:u,onPageChange:b})))),l.a.createElement(M.a,null))}}}]);
//# sourceMappingURL=85.b0744fb2.chunk.js.map