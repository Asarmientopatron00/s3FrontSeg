(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[100],{1257:function(e,a,l){"use strict";var n=l(3),r=l(12),t=l(0),c=(l(11),l(4)),i=l(239),o=Object(i.a)(t.createElement("path",{d:"M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm5 13.59L15.59 17 12 13.41 8.41 17 7 15.59 10.59 12 7 8.41 8.41 7 12 10.59 15.59 7 17 8.41 13.41 12 17 15.59z"}),"Cancel"),s=l(21),m=l(50),p=l(38),h=l(31),d=l(289);function u(e){return"Backspace"===e.key||"Delete"===e.key}var C=t.forwardRef((function(e,a){var l=e.avatar,i=e.classes,s=e.className,m=e.clickable,C=e.color,b=void 0===C?"default":C,y=e.component,v=e.deleteIcon,k=e.disabled,f=void 0!==k&&k,D=e.icon,E=e.label,N=e.onClick,g=e.onDelete,I=e.onKeyDown,S=e.onKeyUp,z=e.size,x=void 0===z?"medium":z,j=e.variant,O=void 0===j?"default":j,A=Object(r.a)(e,["avatar","classes","className","clickable","color","component","deleteIcon","disabled","icon","label","onClick","onDelete","onKeyDown","onKeyUp","size","variant"]),P=t.useRef(null),F=Object(p.a)(P,a),w=function(e){e.stopPropagation(),g&&g(e)},R=!(!1===m||!N)||m,M="small"===x,B=y||(R?d.a:"div"),L=B===d.a?{component:"div"}:{},T=null;if(g){var $=Object(c.default)("default"!==b&&("default"===O?i["deleteIconColor".concat(Object(h.a)(b))]:i["deleteIconOutlinedColor".concat(Object(h.a)(b))]),M&&i.deleteIconSmall);T=v&&t.isValidElement(v)?t.cloneElement(v,{className:Object(c.default)(v.props.className,i.deleteIcon,$),onClick:w}):t.createElement(o,{className:Object(c.default)(i.deleteIcon,$),onClick:w})}var Y=null;l&&t.isValidElement(l)&&(Y=t.cloneElement(l,{className:Object(c.default)(i.avatar,l.props.className,M&&i.avatarSmall,"default"!==b&&i["avatarColor".concat(Object(h.a)(b))])}));var W=null;return D&&t.isValidElement(D)&&(W=t.cloneElement(D,{className:Object(c.default)(i.icon,D.props.className,M&&i.iconSmall,"default"!==b&&i["iconColor".concat(Object(h.a)(b))])})),t.createElement(B,Object(n.a)({role:R||g?"button":void 0,className:Object(c.default)(i.root,s,"default"!==b&&[i["color".concat(Object(h.a)(b))],R&&i["clickableColor".concat(Object(h.a)(b))],g&&i["deletableColor".concat(Object(h.a)(b))]],"default"!==O&&[i.outlined,{primary:i.outlinedPrimary,secondary:i.outlinedSecondary}[b]],f&&i.disabled,M&&i.sizeSmall,R&&i.clickable,g&&i.deletable),"aria-disabled":!!f||void 0,tabIndex:R||g?0:void 0,onClick:N,onKeyDown:function(e){e.currentTarget===e.target&&u(e)&&e.preventDefault(),I&&I(e)},onKeyUp:function(e){e.currentTarget===e.target&&(g&&u(e)?g(e):"Escape"===e.key&&P.current&&P.current.blur()),S&&S(e)},ref:F},L,A),Y||W,t.createElement("span",{className:Object(c.default)(i.label,M&&i.labelSmall)},E),T)}));a.a=Object(s.a)((function(e){var a="light"===e.palette.type?e.palette.grey[300]:e.palette.grey[700],l=Object(m.d)(e.palette.text.primary,.26);return{root:{fontFamily:e.typography.fontFamily,fontSize:e.typography.pxToRem(13),display:"inline-flex",alignItems:"center",justifyContent:"center",height:32,color:e.palette.getContrastText(a),backgroundColor:a,borderRadius:16,whiteSpace:"nowrap",transition:e.transitions.create(["background-color","box-shadow"]),cursor:"default",outline:0,textDecoration:"none",border:"none",padding:0,verticalAlign:"middle",boxSizing:"border-box","&$disabled":{opacity:.5,pointerEvents:"none"},"& $avatar":{marginLeft:5,marginRight:-6,width:24,height:24,color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],fontSize:e.typography.pxToRem(12)},"& $avatarColorPrimary":{color:e.palette.primary.contrastText,backgroundColor:e.palette.primary.dark},"& $avatarColorSecondary":{color:e.palette.secondary.contrastText,backgroundColor:e.palette.secondary.dark},"& $avatarSmall":{marginLeft:4,marginRight:-4,width:18,height:18,fontSize:e.typography.pxToRem(10)}},sizeSmall:{height:24},colorPrimary:{backgroundColor:e.palette.primary.main,color:e.palette.primary.contrastText},colorSecondary:{backgroundColor:e.palette.secondary.main,color:e.palette.secondary.contrastText},disabled:{},clickable:{userSelect:"none",WebkitTapHighlightColor:"transparent",cursor:"pointer","&:hover, &:focus":{backgroundColor:Object(m.c)(a,.08)},"&:active":{boxShadow:e.shadows[1]}},clickableColorPrimary:{"&:hover, &:focus":{backgroundColor:Object(m.c)(e.palette.primary.main,.08)}},clickableColorSecondary:{"&:hover, &:focus":{backgroundColor:Object(m.c)(e.palette.secondary.main,.08)}},deletable:{"&:focus":{backgroundColor:Object(m.c)(a,.08)}},deletableColorPrimary:{"&:focus":{backgroundColor:Object(m.c)(e.palette.primary.main,.2)}},deletableColorSecondary:{"&:focus":{backgroundColor:Object(m.c)(e.palette.secondary.main,.2)}},outlined:{backgroundColor:"transparent",border:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(m.d)(e.palette.text.primary,e.palette.action.hoverOpacity)},"& $avatar":{marginLeft:4},"& $avatarSmall":{marginLeft:2},"& $icon":{marginLeft:4},"& $iconSmall":{marginLeft:2},"& $deleteIcon":{marginRight:5},"& $deleteIconSmall":{marginRight:3}},outlinedPrimary:{color:e.palette.primary.main,border:"1px solid ".concat(e.palette.primary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(m.d)(e.palette.primary.main,e.palette.action.hoverOpacity)}},outlinedSecondary:{color:e.palette.secondary.main,border:"1px solid ".concat(e.palette.secondary.main),"$clickable&:hover, $clickable&:focus, $deletable&:focus":{backgroundColor:Object(m.d)(e.palette.secondary.main,e.palette.action.hoverOpacity)}},avatar:{},avatarSmall:{},avatarColorPrimary:{},avatarColorSecondary:{},icon:{color:"light"===e.palette.type?e.palette.grey[700]:e.palette.grey[300],marginLeft:5,marginRight:-6},iconSmall:{width:18,height:18,marginLeft:4,marginRight:-4},iconColorPrimary:{color:"inherit"},iconColorSecondary:{color:"inherit"},label:{overflow:"hidden",textOverflow:"ellipsis",paddingLeft:12,paddingRight:12,whiteSpace:"nowrap"},labelSmall:{paddingLeft:8,paddingRight:8},deleteIcon:{WebkitTapHighlightColor:"transparent",color:l,height:22,width:22,cursor:"pointer",margin:"0 5px 0 -6px","&:hover":{color:Object(m.d)(l,.4)}},deleteIconSmall:{height:16,width:16,marginRight:4,marginLeft:-4},deleteIconColorPrimary:{color:Object(m.d)(e.palette.primary.contrastText,.7),"&:hover, &:active":{color:e.palette.primary.contrastText}},deleteIconColorSecondary:{color:Object(m.d)(e.palette.secondary.contrastText,.7),"&:hover, &:active":{color:e.palette.secondary.contrastText}},deleteIconOutlinedColorPrimary:{color:Object(m.d)(e.palette.primary.main,.7),"&:hover, &:active":{color:e.palette.primary.main}},deleteIconOutlinedColorSecondary:{color:Object(m.d)(e.palette.secondary.main,.7),"&:hover, &:active":{color:e.palette.secondary.main}}}}),{name:"MuiChip"})(C)},1509:function(e,a,l){"use strict";var n=l(44);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(l(0)),t=(0,n(l(62)).default)(r.default.createElement("path",{d:"M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z"}),"Done");a.default=t},1633:function(e,a,l){"use strict";var n=l(44);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(l(0)),t=(0,n(l(62)).default)(r.default.createElement("path",{d:"M9 11.75c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zm6 0c-.69 0-1.25.56-1.25 1.25s.56 1.25 1.25 1.25 1.25-.56 1.25-1.25-.56-1.25-1.25-1.25zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8 0-.29.02-.58.05-.86 2.36-1.05 4.23-2.98 5.21-5.37C11.07 8.33 14.05 10 17.42 10c.78 0 1.53-.09 2.25-.26.21.71.33 1.47.33 2.26 0 4.41-3.59 8-8 8z"}),"Face");a.default=t},2326:function(e,a,l){"use strict";var n=l(44);Object.defineProperty(a,"__esModule",{value:!0}),a.default=void 0;var r=n(l(0)),t=(0,n(l(62)).default)(r.default.createElement("path",{d:"M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"}),"TagFaces");a.default=t},3102:function(e,a,l){"use strict";l.r(a);var n=l(0),r=l.n(n),t=l(1081),c=l(306),i=l(305),o=l(304),s=l(164),m=l(459),p=l(1257),h=l(1633),d=l.n(h),u=l(1509),C=l.n(u),b=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap"},chip:{margin:e.spacing(1)}}}));function y(){var e=b();function a(){alert("You clicked the delete icon.")}function l(){alert("You clicked the Chip.")}return r.a.createElement("div",{className:e.root},r.a.createElement(p.a,{label:"Basic Chip",className:e.chip}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,"MB"),label:"Clickable Chip",onClick:l,className:e.chip}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,{alt:"Natacha",src:"https://via.placeholder.com/150"}),label:"Deletable Chip",onDelete:a,className:e.chip}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip}),r.a.createElement(p.a,{icon:r.a.createElement(d.a,null),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip}),r.a.createElement(p.a,{label:"Custom delete icon Chip",onClick:l,onDelete:a,className:e.chip,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{label:"Clickable Link Chip",className:e.chip,component:"a",href:"#chip",clickable:!0}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,"MB"),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{icon:r.a.createElement(d.a,null),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{label:"Deletable Primary Chip",onDelete:a,className:e.chip,color:"primary"}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary"}),r.a.createElement(p.a,{icon:r.a.createElement(d.a,null),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary"}))}var v=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap"},chip:{margin:e.spacing(1)}}}));function k(){var e=v();function a(){alert("You clicked the delete icon.")}function l(){alert("You clicked the Chip.")}return r.a.createElement("div",{className:e.root},r.a.createElement(p.a,{label:"Basic Chip",className:e.chip,variant:"outlined"}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,"MB"),label:"Clickable Chip",onClick:l,className:e.chip,variant:"outlined"}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,{alt:"Natacha",src:"https://via.placeholder.com/150"}),label:"Deletable Chip",onDelete:a,className:e.chip,variant:"outlined"}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip,variant:"outlined"}),r.a.createElement(p.a,{icon:r.a.createElement(d.a,null),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip,variant:"outlined"}),r.a.createElement(p.a,{label:"Custom delete icon Chip",onClick:l,onDelete:a,className:e.chip,deleteIcon:r.a.createElement(C.a,null),variant:"outlined"}),r.a.createElement(p.a,{label:"Clickable Link Chip",className:e.chip,component:"a",href:"#chip",clickable:!0,variant:"outlined"}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,"MB"),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null),variant:"outlined"}),r.a.createElement(p.a,{icon:r.a.createElement(d.a,null),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null),variant:"outlined"}),r.a.createElement(p.a,{label:"Deletable Primary Chip",onDelete:a,className:e.chip,color:"primary",variant:"outlined"}),r.a.createElement(p.a,{avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary",variant:"outlined"}),r.a.createElement(p.a,{icon:r.a.createElement(d.a,null),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary",variant:"outlined"}))}var f=l(22),D=l(165),E=l(2326),N=l.n(E),g=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap",padding:e.spacing(.5)},chip:{margin:e.spacing(.5)}}}));function I(){var e=g(),a=r.a.useState([{key:0,label:"Angular"},{key:1,label:"jQuery"},{key:2,label:"Polymer"},{key:3,label:"React"},{key:4,label:"Vue.js"}]),l=Object(f.a)(a,2),n=l[0],t=l[1];return r.a.createElement(D.a,{className:e.root},n.map((function(a){var l,n;return"React"===a.label&&(l=r.a.createElement(N.a,null)),r.a.createElement(p.a,{key:a.key,icon:l,label:a.label,onDelete:(n=a,function(){"React"!==n.label?t((function(e){return e.filter((function(e){return e.key!==n.key}))})):alert("Why would you want to delete React?! :)")}),className:e.chip})})))}var S=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap"},chip:{margin:e.spacing(1)}}}));function z(){var e=S();function a(){alert("You clicked the delete icon.")}function l(){alert("You clicked the Chip.")}return r.a.createElement("div",{className:e.root},r.a.createElement(p.a,{size:"small",label:"Basic Chip",className:e.chip}),r.a.createElement(p.a,{size:"small",avatar:r.a.createElement(m.a,null,"MB"),label:"Clickable Chip",onClick:l,className:e.chip}),r.a.createElement(p.a,{size:"small",avatar:r.a.createElement(m.a,{alt:"Natacha",src:"https://via.placeholder.com/150"}),label:"Deletable Chip",onDelete:a,className:e.chip}),r.a.createElement(p.a,{size:"small",avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip}),r.a.createElement(p.a,{size:"small",icon:r.a.createElement(d.a,null),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip}),r.a.createElement(p.a,{size:"small",label:"Custom delete icon Chip",onClick:l,onDelete:a,className:e.chip,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{size:"small",label:"Clickable Link Chip",className:e.chip,component:"a",href:"#chip",clickable:!0}),r.a.createElement(p.a,{size:"small",avatar:r.a.createElement(m.a,null,"MB"),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{size:"small",icon:r.a.createElement(d.a,null),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{size:"small",label:"Deletable Primary Chip",onDelete:a,className:e.chip,color:"primary"}),r.a.createElement(p.a,{size:"small",avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary"}),r.a.createElement(p.a,{size:"small",icon:r.a.createElement(d.a,null),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary"}))}var x=Object(s.a)((function(e){return{root:{display:"flex",justifyContent:"center",flexWrap:"wrap"},chip:{margin:e.spacing(1)}}}));function j(){var e=x();function a(){alert("You clicked the delete icon.")}function l(){alert("You clicked the Chip.")}return r.a.createElement("div",{className:e.root},r.a.createElement(p.a,{variant:"outlined",size:"small",label:"Basic Chip",className:e.chip}),r.a.createElement(p.a,{variant:"outlined",size:"small",avatar:r.a.createElement(m.a,null,"MB"),label:"Clickable Chip",onClick:l,className:e.chip}),r.a.createElement(p.a,{size:"small",avatar:r.a.createElement(m.a,{alt:"Natacha",src:"https://via.placeholder.com/150"}),label:"Deletable Chip",onDelete:a,className:e.chip}),r.a.createElement(p.a,{variant:"outlined",size:"small",avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip}),r.a.createElement(p.a,{variant:"outlined",size:"small",icon:r.a.createElement(d.a,null),label:"Clickable Deletable Chip",onClick:l,onDelete:a,className:e.chip}),r.a.createElement(p.a,{variant:"outlined",size:"small",label:"Custom delete icon Chip",onClick:l,onDelete:a,className:e.chip,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{variant:"outlined",size:"small",label:"Clickable Link Chip",className:e.chip,component:"a",href:"#chip",clickable:!0}),r.a.createElement(p.a,{variant:"outlined",size:"small",avatar:r.a.createElement(m.a,null,"MB"),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{variant:"outlined",size:"small",icon:r.a.createElement(d.a,null),label:"Primary Clickable Chip",clickable:!0,className:e.chip,color:"primary",onDelete:a,deleteIcon:r.a.createElement(C.a,null)}),r.a.createElement(p.a,{variant:"outlined",size:"small",label:"Deletable Primary Chip",onDelete:a,className:e.chip,color:"primary"}),r.a.createElement(p.a,{variant:"outlined",size:"small",avatar:r.a.createElement(m.a,null,r.a.createElement(d.a,null)),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary"}),r.a.createElement(p.a,{variant:"outlined",size:"small",icon:r.a.createElement(d.a,null),label:"Deletable Secondary Chip",onDelete:a,className:e.chip,color:"secondary"}))}a.default=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(i.a,{title:"Chips",description:"Chips are compact elements that represent an input, attribute, or action.",refUrl:"https://material-ui.com/components/chips/"}),r.a.createElement(o.a,null,r.a.createElement(t.a,{item:!0,xs:12},r.a.createElement(c.a,{title:"Simple Chip",component:y,source:"import React from 'react';\r\nimport {makeStyles} from '@material-ui/core/styles';\r\nimport Avatar from '@material-ui/core/Avatar';\r\nimport Chip from '@material-ui/core/Chip';\r\nimport FaceIcon from '@material-ui/icons/Face';\r\nimport DoneIcon from '@material-ui/icons/Done';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    display: 'flex',\r\n    justifyContent: 'center',\r\n    flexWrap: 'wrap',\r\n  },\r\n  chip: {\r\n    margin: theme.spacing(1),\r\n  },\r\n}));\r\n\r\nexport default function Chips() {\r\n  const classes = useStyles();\r\n\r\n  function handleDelete() {\r\n    alert('You clicked the delete icon.');\r\n  }\r\n\r\n  function handleClick() {\r\n    alert('You clicked the Chip.');\r\n  }\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Chip label='Basic Chip' className={classes.chip} />\r\n      <Chip\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Clickable Chip'\r\n        onClick={handleClick}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        avatar={\r\n          <Avatar alt='Natacha' src={'https://via.placeholder.com/150'} />\r\n        }\r\n        label='Deletable Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        icon={<FaceIcon />}\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        label='Custom delete icon Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        label='Clickable Link Chip'\r\n        className={classes.chip}\r\n        component='a'\r\n        href='#chip'\r\n        clickable\r\n      />\r\n      <Chip\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        icon={<FaceIcon />}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        label='Deletable Primary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='primary'\r\n      />\r\n      <Chip\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n      />\r\n      <Chip\r\n        icon={<FaceIcon />}\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n      />\r\n    </div>\r\n  );\r\n}\r\n",description:"Examples of Chips, using an image Avatar, SVG Icon Avatar, Letter and (string) Avatar.."})),r.a.createElement(t.a,{item:!0,xs:12},r.a.createElement(c.a,{title:"Outlined Chips",component:k,source:"import React from 'react';\r\nimport {makeStyles} from '@material-ui/core/styles';\r\nimport Avatar from '@material-ui/core/Avatar';\r\nimport Chip from '@material-ui/core/Chip';\r\nimport FaceIcon from '@material-ui/icons/Face';\r\nimport DoneIcon from '@material-ui/icons/Done';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    display: 'flex',\r\n    justifyContent: 'center',\r\n    flexWrap: 'wrap',\r\n  },\r\n  chip: {\r\n    margin: theme.spacing(1),\r\n  },\r\n}));\r\n\r\nexport default function OutlinedChips() {\r\n  const classes = useStyles();\r\n\r\n  function handleDelete() {\r\n    alert('You clicked the delete icon.');\r\n  }\r\n\r\n  function handleClick() {\r\n    alert('You clicked the Chip.');\r\n  }\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Chip label='Basic Chip' className={classes.chip} variant='outlined' />\r\n      <Chip\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Clickable Chip'\r\n        onClick={handleClick}\r\n        className={classes.chip}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        avatar={\r\n          <Avatar alt='Natacha' src={'https://via.placeholder.com/150'} />\r\n        }\r\n        label='Deletable Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        icon={<FaceIcon />}\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        label='Custom delete icon Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        deleteIcon={<DoneIcon />}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        label='Clickable Link Chip'\r\n        className={classes.chip}\r\n        component='a'\r\n        href='#chip'\r\n        clickable\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        icon={<FaceIcon />}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        label='Deletable Primary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='primary'\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n        variant='outlined'\r\n      />\r\n      <Chip\r\n        icon={<FaceIcon />}\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n        variant='outlined'\r\n      />\r\n    </div>\r\n  );\r\n}\r\n",description:"Outlined chips offer an alternative style."})),r.a.createElement(t.a,{item:!0,xs:12},r.a.createElement(c.a,{title:"Small Chip",component:z,source:"import React from 'react';\r\nimport {makeStyles} from '@material-ui/core/styles';\r\nimport Avatar from '@material-ui/core/Avatar';\r\nimport Chip from '@material-ui/core/Chip';\r\nimport FaceIcon from '@material-ui/icons/Face';\r\nimport DoneIcon from '@material-ui/icons/Done';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    display: 'flex',\r\n    justifyContent: 'center',\r\n    flexWrap: 'wrap',\r\n  },\r\n  chip: {\r\n    margin: theme.spacing(1),\r\n  },\r\n}));\r\n\r\nexport default function SmallChips() {\r\n  const classes = useStyles();\r\n\r\n  function handleDelete() {\r\n    alert('You clicked the delete icon.');\r\n  }\r\n\r\n  function handleClick() {\r\n    alert('You clicked the Chip.');\r\n  }\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Chip size='small' label='Basic Chip' className={classes.chip} />\r\n      <Chip\r\n        size='small'\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Clickable Chip'\r\n        onClick={handleClick}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        avatar={\r\n          <Avatar alt='Natacha' src={'https://via.placeholder.com/150'} />\r\n        }\r\n        label='Deletable Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        icon={<FaceIcon />}\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        label='Custom delete icon Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        label='Clickable Link Chip'\r\n        className={classes.chip}\r\n        component='a'\r\n        href='#chip'\r\n        clickable\r\n      />\r\n      <Chip\r\n        size='small'\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        icon={<FaceIcon />}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        label='Deletable Primary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='primary'\r\n      />\r\n      <Chip\r\n        size='small'\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n      />\r\n      <Chip\r\n        size='small'\r\n        icon={<FaceIcon />}\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n      />\r\n    </div>\r\n  );\r\n}\r\n",description:"You can use the size prop to define a small Chip."})),r.a.createElement(t.a,{item:!0,xs:12},r.a.createElement(c.a,{title:"Outlined variant",component:j,source:"import React from 'react';\r\nimport {makeStyles} from '@material-ui/core/styles';\r\nimport Avatar from '@material-ui/core/Avatar';\r\nimport Chip from '@material-ui/core/Chip';\r\nimport FaceIcon from '@material-ui/icons/Face';\r\nimport DoneIcon from '@material-ui/icons/Done';\r\n\r\nconst useStyles = makeStyles((theme) => ({\r\n  root: {\r\n    display: 'flex',\r\n    justifyContent: 'center',\r\n    flexWrap: 'wrap',\r\n  },\r\n  chip: {\r\n    margin: theme.spacing(1),\r\n  },\r\n}));\r\n\r\nexport default function SmallOutlinedChips() {\r\n  const classes = useStyles();\r\n\r\n  function handleDelete() {\r\n    alert('You clicked the delete icon.');\r\n  }\r\n\r\n  function handleClick() {\r\n    alert('You clicked the Chip.');\r\n  }\r\n\r\n  return (\r\n    <div className={classes.root}>\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        label='Basic Chip'\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Clickable Chip'\r\n        onClick={handleClick}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        size='small'\r\n        avatar={\r\n          <Avatar alt='Natacha' src={'https://via.placeholder.com/150'} />\r\n        }\r\n        label='Deletable Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        icon={<FaceIcon />}\r\n        label='Clickable Deletable Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        label='Custom delete icon Chip'\r\n        onClick={handleClick}\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        label='Clickable Link Chip'\r\n        className={classes.chip}\r\n        component='a'\r\n        href='#chip'\r\n        clickable\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        avatar={<Avatar>MB</Avatar>}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        icon={<FaceIcon />}\r\n        label='Primary Clickable Chip'\r\n        clickable\r\n        className={classes.chip}\r\n        color='primary'\r\n        onDelete={handleDelete}\r\n        deleteIcon={<DoneIcon />}\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        label='Deletable Primary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='primary'\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        avatar={\r\n          <Avatar>\r\n            <FaceIcon />\r\n          </Avatar>\r\n        }\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n      />\r\n      <Chip\r\n        variant='outlined'\r\n        size='small'\r\n        icon={<FaceIcon />}\r\n        label='Deletable Secondary Chip'\r\n        onDelete={handleDelete}\r\n        className={classes.chip}\r\n        color='secondary'\r\n      />\r\n    </div>\r\n  );\r\n}\r\n"})),r.a.createElement(t.a,{item:!0,xs:12,lg:6},r.a.createElement(c.a,{title:"Chip array",component:I,source:"import React from 'react';\nimport {makeStyles} from '@material-ui/core/styles';\nimport Chip from '@material-ui/core/Chip';\nimport Paper from '@material-ui/core/Paper';\nimport TagFacesIcon from '@material-ui/icons/TagFaces';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    display: 'flex',\n    justifyContent: 'center',\n    flexWrap: 'wrap',\n    padding: theme.spacing(0.5),\n  },\n  chip: {\n    margin: theme.spacing(0.5),\n  },\n}));\n\nexport default function ChipsArray() {\n  const classes = useStyles();\n  const [chipData, setChipData] = React.useState([\n    {key: 0, label: 'Angular'},\n    {key: 1, label: 'jQuery'},\n    {key: 2, label: 'Polymer'},\n    {key: 3, label: 'React'},\n    {key: 4, label: 'Vue.js'},\n  ]);\n\n  const handleDelete = (chipToDelete) => () => {\n    if (chipToDelete.label === 'React') {\n      alert('Why would you want to delete React?! :)');\n      return;\n    }\n\n    setChipData((chips) =>\n      chips.filter((chip) => chip.key !== chipToDelete.key),\n    );\n  };\n\n  return (\n    <Paper className={classes.root}>\n      {chipData.map((data) => {\n        let icon;\n\n        if (data.label === 'React') {\n          icon = <TagFacesIcon />;\n        }\n\n        return (\n          <Chip\n            key={data.key}\n            icon={icon}\n            label={data.label}\n            onDelete={handleDelete(data)}\n            className={classes.chip}\n          />\n        );\n      })}\n    </Paper>\n  );\n}\n",description:"An example of rendering multiple Chips from an array of values. Deleting a chip removes it from the array. Note that since no onClick property is defined, the Chip can be focused, but does not gain depth while clicked or touched."}))))}}}]);
//# sourceMappingURL=100.50a6c701.chunk.js.map