(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[114],{1408:function(e,t,n){"use strict";var o=n(43);Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a=o(n(0)),r=(0,o(n(57)).default)(a.default.createElement("path",{d:"M7 10l5 5 5-5z"}),"ArrowDropDown");t.default=r},1743:function(e,t,n){"use strict";var o=n(3),a=n(12),r=n(0),l=(n(112),n(11),n(4)),i=n(31),u=n(50),c=n(21);n(499).a.styles;var s=r.forwardRef((function(e,t){var n=e.children,u=e.classes,c=e.className,s=e.color,d=void 0===s?"default":s,m=e.component,p=void 0===m?"div":m,b=e.disabled,f=void 0!==b&&b,g=e.disableElevation,B=void 0!==g&&g,h=e.disableFocusRipple,y=void 0!==h&&h,v=e.disableRipple,E=void 0!==v&&v,x=e.fullWidth,T=void 0!==x&&x,O=e.orientation,w=void 0===O?"horizontal":O,G=e.size,R=void 0===G?"medium":G,C=e.variant,k=void 0===C?"outlined":C,S=Object(a.a)(e,["children","classes","className","color","component","disabled","disableElevation","disableFocusRipple","disableRipple","fullWidth","orientation","size","variant"]),j=Object(l.default)(u.grouped,u["grouped".concat(Object(i.a)(w))],u["grouped".concat(Object(i.a)(k))],u["grouped".concat(Object(i.a)(k)).concat(Object(i.a)(w))],u["grouped".concat(Object(i.a)(k)).concat("default"!==d?Object(i.a)(d):"")],f&&u.disabled);return r.createElement(p,Object(o.a)({role:"group",className:Object(l.default)(u.root,c,T&&u.fullWidth,B&&u.disableElevation,"contained"===k&&u.contained,"vertical"===w&&u.vertical),ref:t},S),r.Children.map(n,(function(e){return r.isValidElement(e)?r.cloneElement(e,{className:Object(l.default)(j,e.props.className),color:e.props.color||d,disabled:e.props.disabled||f,disableElevation:e.props.disableElevation||B,disableFocusRipple:y,disableRipple:E,fullWidth:T,size:e.props.size||R,variant:e.props.variant||k}):null})))}));t.a=Object(c.a)((function(e){return{root:{display:"inline-flex",borderRadius:e.shape.borderRadius},contained:{boxShadow:e.shadows[2]},disableElevation:{boxShadow:"none"},disabled:{},fullWidth:{width:"100%"},vertical:{flexDirection:"column"},grouped:{minWidth:40},groupedHorizontal:{"&:not(:first-child)":{borderTopLeftRadius:0,borderBottomLeftRadius:0},"&:not(:last-child)":{borderTopRightRadius:0,borderBottomRightRadius:0}},groupedVertical:{"&:not(:first-child)":{borderTopRightRadius:0,borderTopLeftRadius:0},"&:not(:last-child)":{borderBottomRightRadius:0,borderBottomLeftRadius:0}},groupedText:{},groupedTextHorizontal:{"&:not(:last-child)":{borderRight:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")}},groupedTextVertical:{"&:not(:last-child)":{borderBottom:"1px solid ".concat("light"===e.palette.type?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)")}},groupedTextPrimary:{"&:not(:last-child)":{borderColor:Object(u.d)(e.palette.primary.main,.5)}},groupedTextSecondary:{"&:not(:last-child)":{borderColor:Object(u.d)(e.palette.secondary.main,.5)}},groupedOutlined:{},groupedOutlinedHorizontal:{"&:not(:first-child)":{marginLeft:-1},"&:not(:last-child)":{borderRightColor:"transparent"}},groupedOutlinedVertical:{"&:not(:first-child)":{marginTop:-1},"&:not(:last-child)":{borderBottomColor:"transparent"}},groupedOutlinedPrimary:{"&:hover":{borderColor:e.palette.primary.main}},groupedOutlinedSecondary:{"&:hover":{borderColor:e.palette.secondary.main}},groupedContained:{boxShadow:"none"},groupedContainedHorizontal:{"&:not(:last-child)":{borderRight:"1px solid ".concat(e.palette.grey[400]),"&$disabled":{borderRight:"1px solid ".concat(e.palette.action.disabled)}}},groupedContainedVertical:{"&:not(:last-child)":{borderBottom:"1px solid ".concat(e.palette.grey[400]),"&$disabled":{borderBottom:"1px solid ".concat(e.palette.action.disabled)}}},groupedContainedPrimary:{"&:not(:last-child)":{borderColor:e.palette.primary.dark}},groupedContainedSecondary:{"&:not(:last-child)":{borderColor:e.palette.secondary.dark}}}}),{name:"MuiButtonGroup"})(s)},3126:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(1086),l=n(306),i=n(304),u=n(303),c=n(499),s=n(1743),d=n(164),m=Object(d.a)((function(e){return{root:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}}}}));function p(){var e=m();return a.a.createElement("div",{className:e.root},a.a.createElement(s.a,{color:"primary","aria-label":"outlined primary button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")),a.a.createElement(s.a,{variant:"contained",color:"primary","aria-label":"contained primary button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")),a.a.createElement(s.a,{variant:"text",color:"primary","aria-label":"text primary button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")))}var b=Object(d.a)((function(e){return{root:{display:"flex",flexDirection:"column",alignItems:"center","& > *":{margin:e.spacing(1)}}}}));function f(){var e=b();return a.a.createElement("div",{className:e.root},a.a.createElement(s.a,{size:"small","aria-label":"small outlined button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")),a.a.createElement(s.a,{color:"secondary","aria-label":"outlined secondary button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")),a.a.createElement(s.a,{size:"large",color:"primary","aria-label":"large outlined primary button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")))}var g=Object(d.a)((function(e){return{root:{display:"flex","& > *":{margin:e.spacing(1)}}}}));function B(){var e=g();return a.a.createElement("div",{className:e.root},a.a.createElement(s.a,{orientation:"vertical",color:"primary","aria-label":"vertical outlined primary button group"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")),a.a.createElement(s.a,{orientation:"vertical",color:"primary","aria-label":"vertical contained primary button group",variant:"contained"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")),a.a.createElement(s.a,{orientation:"vertical",color:"primary","aria-label":"vertical contained primary button group",variant:"text"},a.a.createElement(c.a,null,"One"),a.a.createElement(c.a,null,"Two"),a.a.createElement(c.a,null,"Three")))}var h=n(22),y=n(1408),v=n.n(y),E=n(1087),x=n(360),T=n(165),O=n(1317),w=n(1120),G=n(1076),R=["Create a merge commit","Squash and merge","Rebase and merge"];function C(){var e=a.a.useState(!1),t=Object(h.a)(e,2),n=t[0],o=t[1],l=a.a.useRef(null),i=a.a.useState(1),u=Object(h.a)(i,2),d=u[0],m=u[1],p=function(e){l.current&&l.current.contains(e.target)||o(!1)};return a.a.createElement(r.a,{container:!0,direction:"column",alignItems:"center"},a.a.createElement(r.a,{item:!0,xs:12},a.a.createElement(s.a,{variant:"contained",color:"primary",ref:l,"aria-label":"split button"},a.a.createElement(c.a,{onClick:function(){console.info("You clicked ".concat(R[d]))}},R[d]),a.a.createElement(c.a,{color:"primary",size:"small","aria-controls":n?"split-button-menu":void 0,"aria-expanded":n?"true":void 0,"aria-label":"select merge strategy","aria-haspopup":"menu",onClick:function(){o((function(e){return!e}))}},a.a.createElement(v.a,null))),a.a.createElement(O.a,{open:n,anchorEl:l.current,role:void 0,transition:!0,disablePortal:!0},(function(e){var t=e.TransitionProps,n=e.placement;return a.a.createElement(x.a,Object.assign({},t,{style:{transformOrigin:"bottom"===n?"center top":"center bottom"}}),a.a.createElement(T.a,null,a.a.createElement(E.a,{onClickAway:p},a.a.createElement(G.a,{id:"split-button-menu"},R.map((function(e,t){return a.a.createElement(w.a,{key:e,disabled:2===t,selected:t===d,onClick:function(e){return function(e,t){m(t),o(!1)}(0,t)}},e)}))))))}))))}t.default=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(i.a,{title:"Button group",description:"The ButtonGroup component can be used to group related buttons.",refUrl:"https://material-ui.com/components/button-group/"}),a.a.createElement(u.a,null,a.a.createElement(r.a,{item:!0,xs:12},a.a.createElement(l.a,{title:"Basic button group",component:p,source:"import React from 'react';\nimport Button from '@material-ui/core/Button';\nimport ButtonGroup from '@material-ui/core/ButtonGroup';\nimport {makeStyles} from '@material-ui/core/styles';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'center',\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function Basic() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <ButtonGroup color='primary' aria-label='outlined primary button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        variant='contained'\n        color='primary'\n        aria-label='contained primary button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        variant='text'\n        color='primary'\n        aria-label='text primary button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n    </div>\n  );\n}\n"})),a.a.createElement(r.a,{item:!0,xs:12},a.a.createElement(l.a,{title:"Sizes and colors",component:f,source:"import React from 'react';\nimport Button from '@material-ui/core/Button';\nimport ButtonGroup from '@material-ui/core/ButtonGroup';\nimport {makeStyles} from '@material-ui/core/styles';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    display: 'flex',\n    flexDirection: 'column',\n    alignItems: 'center',\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function SizesColors() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <ButtonGroup size='small' aria-label='small outlined button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        color='secondary'\n        aria-label='outlined secondary button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        size='large'\n        color='primary'\n        aria-label='large outlined primary button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n    </div>\n  );\n}\n"})),a.a.createElement(r.a,{item:!0,xs:12},a.a.createElement(l.a,{title:"Vertical group",component:B,source:"import React from 'react';\nimport Button from '@material-ui/core/Button';\nimport ButtonGroup from '@material-ui/core/ButtonGroup';\nimport {makeStyles} from '@material-ui/core/styles';\n\nconst useStyles = makeStyles((theme) => ({\n  root: {\n    display: 'flex',\n    '& > *': {\n      margin: theme.spacing(1),\n    },\n  },\n}));\n\nexport default function VerticalGroup() {\n  const classes = useStyles();\n\n  return (\n    <div className={classes.root}>\n      <ButtonGroup\n        orientation='vertical'\n        color='primary'\n        aria-label='vertical outlined primary button group'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        orientation='vertical'\n        color='primary'\n        aria-label='vertical contained primary button group'\n        variant='contained'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n      <ButtonGroup\n        orientation='vertical'\n        color='primary'\n        aria-label='vertical contained primary button group'\n        variant='text'>\n        <Button>One</Button>\n        <Button>Two</Button>\n        <Button>Three</Button>\n      </ButtonGroup>\n    </div>\n  );\n}\n"})),a.a.createElement(r.a,{item:!0,xs:12},a.a.createElement(l.a,{title:"Split button",component:C,source:"import React from 'react';\nimport Grid from '@material-ui/core/Grid';\nimport Button from '@material-ui/core/Button';\nimport ButtonGroup from '@material-ui/core/ButtonGroup';\nimport ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';\nimport ClickAwayListener from '@material-ui/core/ClickAwayListener';\nimport Grow from '@material-ui/core/Grow';\nimport Paper from '@material-ui/core/Paper';\nimport Popper from '@material-ui/core/Popper';\nimport MenuItem from '@material-ui/core/MenuItem';\nimport MenuList from '@material-ui/core/MenuList';\n\nconst options = [\n  'Create a merge commit',\n  'Squash and merge',\n  'Rebase and merge',\n];\n\nexport default function SplitButton() {\n  const [open, setOpen] = React.useState(false);\n  const anchorRef = React.useRef(null);\n  const [selectedIndex, setSelectedIndex] = React.useState(1);\n\n  const handleClick = () => {\n    console.info(`You clicked ${options[selectedIndex]}`);\n  };\n\n  const handleMenuItemClick = (event, index) => {\n    setSelectedIndex(index);\n    setOpen(false);\n  };\n\n  const handleToggle = () => {\n    setOpen((prevOpen) => !prevOpen);\n  };\n\n  const handleClose = (event) => {\n    if (anchorRef.current && anchorRef.current.contains(event.target)) {\n      return;\n    }\n\n    setOpen(false);\n  };\n\n  return (\n    <Grid container direction='column' alignItems='center'>\n      <Grid item xs={12}>\n        <ButtonGroup\n          variant='contained'\n          color='primary'\n          ref={anchorRef}\n          aria-label='split button'>\n          <Button onClick={handleClick}>{options[selectedIndex]}</Button>\n          <Button\n            color='primary'\n            size='small'\n            aria-controls={open ? 'split-button-menu' : undefined}\n            aria-expanded={open ? 'true' : undefined}\n            aria-label='select merge strategy'\n            aria-haspopup='menu'\n            onClick={handleToggle}>\n            <ArrowDropDownIcon />\n          </Button>\n        </ButtonGroup>\n        <Popper\n          open={open}\n          anchorEl={anchorRef.current}\n          role={undefined}\n          transition\n          disablePortal>\n          {({TransitionProps, placement}) => (\n            <Grow\n              {...TransitionProps}\n              style={{\n                transformOrigin:\n                  placement === 'bottom' ? 'center top' : 'center bottom',\n              }}>\n              <Paper>\n                <ClickAwayListener onClickAway={handleClose}>\n                  <MenuList id='split-button-menu'>\n                    {options.map((option, index) => (\n                      <MenuItem\n                        key={option}\n                        disabled={index === 2}\n                        selected={index === selectedIndex}\n                        onClick={(event) => handleMenuItemClick(event, index)}>\n                        {option}\n                      </MenuItem>\n                    ))}\n                  </MenuList>\n                </ClickAwayListener>\n              </Paper>\n            </Grow>\n          )}\n        </Popper>\n      </Grid>\n    </Grid>\n  );\n}\n",description:"ButtonGroup can also be used to create a split button. The dropdown can change the button action (as in this example), or be used to immediately trigger a related action."}))))}}}]);
//# sourceMappingURL=114.0d89d609.chunk.js.map