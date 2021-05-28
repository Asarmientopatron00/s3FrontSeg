(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[154],{3134:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),l=t(1081),r=t(306),i=t(305),s=t(304),d=t(22),c=t(164),p=t(339);function m(){return Math.round(20*Math.random())-10}function u(){var e=50+m(),n=50+m();return{top:"".concat(e,"%"),left:"".concat(n,"%"),transform:"translate(-".concat(e,"%, -").concat(n,"%)")}}var b=Object(c.a)((function(e){return{paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}}));function f(){var e=b(),n=o.a.useState(u),t=Object(d.a)(n,1)[0],a=o.a.useState(!1),l=Object(d.a)(a,2),r=l[0],i=l[1];return o.a.createElement("div",null,o.a.createElement("p",null,"Click to get the full Modal experience!"),o.a.createElement("button",{type:"button",onClick:function(){i(!0)}},"Open Modal"),o.a.createElement(p.a,{"aria-labelledby":"simple-modal-title","aria-describedby":"simple-modal-description",open:r,onClose:function(){i(!1)}},o.a.createElement("div",{style:t,className:e.paper},o.a.createElement("h2",{id:"simple-modal-title"},"Text in a modal"),o.a.createElement("p",{id:"simple-modal-description"},"Duis mollis, est non commodo luctus, nisi erat porttitor ligula."),o.a.createElement(f,null))))}var h=t(1088),g=t(1089),y=Object(c.a)((function(e){return{modal:{display:"flex",alignItems:"center",justifyContent:"center"},paper:{backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}}));function k(){var e=y(),n=o.a.useState(!1),t=Object(d.a)(n,2),a=t[0],l=t[1];return o.a.createElement("div",null,o.a.createElement("button",{type:"button",onClick:function(){l(!0)}},"react-transition-group"),o.a.createElement(p.a,{"aria-labelledby":"transition-modal-title","aria-describedby":"transition-modal-description",className:e.modal,open:a,onClose:function(){l(!1)},closeAfterTransition:!0,BackdropComponent:h.a,BackdropProps:{timeout:500}},o.a.createElement(g.a,{in:a},o.a.createElement("div",{className:e.paper},o.a.createElement("h2",{id:"transition-modal-title"},"Transition modal"),o.a.createElement("p",{id:"transition-modal-description"},"react-transiton-group animates me.")))))}n.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(i.a,{title:"Modal",description:"The modal component provides a solid foundation for creating dialogs, popovers, lightboxes, or whatever else.",refUrl:"https://material-ui.com/components/modal/"}),o.a.createElement(s.a,null,o.a.createElement(l.a,{item:!0,xs:12,lg:6},o.a.createElement(r.a,{title:"Simple modal",component:f,source:"import React from 'react';\nimport {makeStyles} from '@material-ui/core/styles';\nimport Modal from '@material-ui/core/Modal';\n\nfunction rand() {\n  return Math.round(Math.random() * 20) - 10;\n}\n\nfunction getModalStyle() {\n  const top = 50 + rand();\n  const left = 50 + rand();\n\n  return {\n    top: `${top}%`,\n    left: `${left}%`,\n    transform: `translate(-${top}%, -${left}%)`,\n  };\n}\n\nconst useStyles = makeStyles((theme) => ({\n  paper: {\n    position: 'absolute',\n    width: 400,\n    backgroundColor: theme.palette.background.paper,\n    border: '2px solid #000',\n    boxShadow: theme.shadows[5],\n    padding: theme.spacing(2, 4, 3),\n  },\n}));\n\nexport default function SimpleModal() {\n  const classes = useStyles();\n  // getModalStyle is not a pure function, we roll the style only on the first render\n  const [modalStyle] = React.useState(getModalStyle);\n  const [open, setOpen] = React.useState(false);\n\n  const handleOpen = () => {\n    setOpen(true);\n  };\n\n  const handleClose = () => {\n    setOpen(false);\n  };\n\n  return (\n    <div>\n      <p>Click to get the full Modal experience!</p>\n      <button type='button' onClick={handleOpen}>\n        Open Modal\n      </button>\n      <Modal\n        aria-labelledby='simple-modal-title'\n        aria-describedby='simple-modal-description'\n        open={open}\n        onClose={handleClose}>\n        <div style={modalStyle} className={classes.paper}>\n          <h2 id='simple-modal-title'>Text in a modal</h2>\n          <p id='simple-modal-description'>\n            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.\n          </p>\n          <SimpleModal />\n        </div>\n      </Modal>\n    </div>\n  );\n}\n"})),o.a.createElement(l.a,{item:!0,xs:12,lg:6},o.a.createElement(r.a,{title:"Transitions modal",component:k,source:"import React from 'react';\nimport {makeStyles} from '@material-ui/core/styles';\nimport Modal from '@material-ui/core/Modal';\nimport Backdrop from '@material-ui/core/Backdrop';\nimport Fade from '@material-ui/core/Fade';\n\nconst useStyles = makeStyles((theme) => ({\n  modal: {\n    display: 'flex',\n    alignItems: 'center',\n    justifyContent: 'center',\n  },\n  paper: {\n    backgroundColor: theme.palette.background.paper,\n    border: '2px solid #000',\n    boxShadow: theme.shadows[5],\n    padding: theme.spacing(2, 4, 3),\n  },\n}));\n\nexport default function TransitionsModal() {\n  const classes = useStyles();\n  const [open, setOpen] = React.useState(false);\n\n  const handleOpen = () => {\n    setOpen(true);\n  };\n\n  const handleClose = () => {\n    setOpen(false);\n  };\n\n  return (\n    <div>\n      <button type='button' onClick={handleOpen}>\n        react-transition-group\n      </button>\n      <Modal\n        aria-labelledby='transition-modal-title'\n        aria-describedby='transition-modal-description'\n        className={classes.modal}\n        open={open}\n        onClose={handleClose}\n        closeAfterTransition\n        BackdropComponent={Backdrop}\n        BackdropProps={{\n          timeout: 500,\n        }}>\n        <Fade in={open}>\n          <div className={classes.paper}>\n            <h2 id='transition-modal-title'>Transition modal</h2>\n            <p id='transition-modal-description'>\n              react-transiton-group animates me.\n            </p>\n          </div>\n        </Fade>\n      </Modal>\n    </div>\n  );\n}\n",description:"The open/close state of the modal can be animated with a transition component. This component should respect the following conditions."}))))}}}]);
//# sourceMappingURL=154.b5d96f2d.chunk.js.map