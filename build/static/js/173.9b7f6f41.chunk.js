(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[173],{3087:function(n,t,e){"use strict";e.r(t);var a=e(0),o=e.n(a),r=e(1081),i=e(306),c=e(305),m=e(304),l=e(1467),s=e.n(l),u=e(493),d=["top-left","top-right","top-center","bottom-left","bottom-right","bottom-center"],p=["success","danger","warning","default","info","awesome"],f=["All your db has been successfully updated","Your meeting has been successfully attended","Document has been successfully updated"],y=["You have no access rights","An error occurred while saving","Document has been permanently removed"],g=["Your connection is not private","Your local datetime is not in sync with server's date","You've already done this action"],B=["All your messages have been logged","A new issue has been reported by Office Desk"],h=["A new appointment has been created in your agenda","You have an appointment at 4PM today"],x=["Custom types can be used as well. Pretty cool, huh!?","Types are easily configurable. Nice, huh?!"],C=function(){return d[Math.floor(Math.random()*d.length)]},E=function(){var n=Math.floor(Math.random()*p.length);return p[n]},v=function(n){switch(n){case"success":return"Success";case"danger":return"Error";case"warning":return"Warning";case"info":return;case"default":case"awesome":default:return}},b=function(n){switch(n){case"success":return f[Math.floor(Math.random()*f.length)];case"danger":return y[Math.floor(Math.random()*y.length)];case"warning":return g[Math.floor(Math.random()*g.length)];case"info":return h[Math.floor(Math.random()*h.length)];case"default":return B[Math.floor(Math.random()*B.length)];case"awesome":return x[Math.floor(Math.random()*x.length)];default:return B[Math.floor(Math.random()*B.length)]}},k={title:"Awesomeness",message:"Awesome Notifications!",type:"success",container:"top-right",insert:"top",animationIn:["animated","fadeIn"],animationOut:["animated","faster","fadeOut"],slidingEnter:{duration:300,timingFunction:"linear",delay:0},slidingExit:{duration:300,timingFunction:"linear",delay:0},touchRevert:{duration:600,timingFunction:"linear",delay:0},touchSlidingExit:{swipe:{duration:600,timingFunction:"linear",delay:0},fade:{duration:300,timingFunction:"linear",delay:0}},dismiss:{duration:5e3,onScreen:!1,pauseOnHover:!0,waitForAnimation:!1,showIcon:!0,click:!0,touch:!0}},w=e(67),O=function(){var n=function(n){var t=E();return l.store.addNotification(Object.assign({},k,{animationIn:n,container:C(),message:b(t),type:t}))};return o.a.createElement(w.a,{display:"flex",flexWrap:"wrap"},o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated bounceIn"])}},"Bounce In")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated fadeIn"])}},"Fade In")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated flipInX"])}},"Flip In X")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated flipInY"])}},"Flip In Y")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated zoomIn"])}},"Zoom In")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated flash"])}},"Flash")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated jackInTheBox"])}},"Jack In The Box")))},I=function(){var n=function(n){var t=E();return l.store.addNotification(Object.assign({},k,{slidingExit:{delay:300},animationOut:n,container:C(),message:b(t),type:t}))};return o.a.createElement(w.a,{display:"flex",flexWrap:"wrap"},o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated bounceOut"])}},"Bounce Out")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated fadeOut"])}},"Fade Out")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated flipOutX"])}},"Flip Out X")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated flipOutY"])}},"Flip Out Y")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n(["animated zoomOut"])}},"Zoom Out")))},T=e(164),N=function(n){var t=function(n){var t=E();return l.store.addNotification(Object.assign({},k,{type:t,insert:n,message:b(t),title:v(t)}))},e=Object(T.a)((function(n){return{btnRoot:{marginBottom:4,marginTop:4,marginLeft:8,marginRight:8}}}))(n);return o.a.createElement(w.a,null,o.a.createElement(u.a,{className:e.btnRoot,color:"primary",variant:"contained",onClick:function(){return t("top")}},"Top"),o.a.createElement(u.a,{className:e.btnRoot,color:"primary",variant:"contained",onClick:function(){return t("bottom")}},"Bottom"))},M=e(313),j=e(314),R=e(316),A=e(315),F=function(n){Object(R.a)(e,n);var t=Object(A.a)(e);function e(){var n;Object(M.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=t.call.apply(t,[this].concat(o))).add=function(n){var t=E();return l.store.addNotification(Object.assign({},k,{title:v(t),message:b(t),container:n,type:t}))},n}return Object(j.a)(e,[{key:"render",value:function(){var n=this;return o.a.createElement(w.a,{display:"flex",flexWrap:"wrap"},o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("top-left")}},"Top Left")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("top-right")}},"Top Right")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("top-center")}},"Top Center")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("bottom-left")}},"Bottom Left")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("bottom-right")}},"Bottom Right")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("bottom-center")}},"Bottom Center")))}}]),e}(o.a.Component),W=e(114),Y=function(n){Object(R.a)(e,n);var t=Object(A.a)(e);function e(){var n;Object(M.a)(this,e);for(var a=arguments.length,r=new Array(a),i=0;i<a;i++)r[i]=arguments[i];return(n=t.call.apply(t,[this].concat(r))).addCustomIcon=function(n,t){var e;"success"===n?e="Your agenda has been successfully synced":"warning"===n?e="Warning! All your db will be lost if you proceed":"danger"===n&&(e="Error! You have no update rights"),l.store.addNotification(Object.assign({},k,{width:275,container:C(),content:o.a.createElement(w.a,{className:"notification-custom-".concat(n)},o.a.createElement(w.a,{className:"notification-custom-icon"},o.a.createElement("i",{className:t})),o.a.createElement(w.a,{className:"notification-custom-content"},o.a.createElement(W.a,{className:"notification-message"},e)))}))},n.add=function(){l.store.addNotification(Object.assign({},k,{width:325,container:C(),content:o.a.createElement(w.a,{display:"flex",flexDirection:"row",className:"custom-image-content"},o.a.createElement("img",{src:"/assets/images/logo.png",alt:""}),o.a.createElement(w.a,{component:"span",px:8,py:2},"Crema Admin"))}))},n}return Object(j.a)(e,[{key:"render",value:function(){var n=this;return o.a.createElement(w.a,{display:"flex",flexWrap:"wrap"},o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:this.add},"Custom Image Content")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{variant:"contained",color:"primary",onClick:function(){return n.addCustomIcon("success","fas fa-check-circle")}},"Success with Icon")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{variant:"contained",color:"primary",onClick:function(){return n.addCustomIcon("danger","fas fa-exclamation-circle")}},"Danger with Icon")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.addCustomIcon("warning","fas fa-exclamation-triangle")}},"Warning with Icon")))}}]),e}(o.a.Component),S=function(n){Object(R.a)(e,n);var t=Object(A.a)(e);function e(){var n;Object(M.a)(this,e);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=t.call.apply(t,[this].concat(o))).add=function(n){return l.store.addNotification(Object.assign({},k,{type:n,title:v(n),message:b(n),container:C()}))},n}return Object(j.a)(e,[{key:"render",value:function(){var n=this;return o.a.createElement(w.a,{display:"flex",flexWrap:"wrap"},o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("success")}},"Success")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("default")}},"Default")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("warning")}},"Warning")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("info")}},"Info")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("danger")}},"Danger")),o.a.createElement(w.a,{mr:2,my:1},o.a.createElement(u.a,{color:"primary",variant:"contained",onClick:function(){return n.add("awesome")}},"Custom")))}}]),e}(o.a.Component);t.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(c.a,{title:"React Notifications",description:"Delightful and highly customisable React Component to notify your users.",refUrl:"https://teodosii.github.io/react-notifications-component//"}),o.a.createElement(s.a,{types:[{htmlClasses:["notification-awesome"],name:"awesome"}],isMobile:!0}),o.a.createElement(m.a,null,o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"Animation Entrance",description:"Entrance animation can be customised by specifying CSS classes",component:O,source:"import React from 'react';\nimport {store} from 'react-notifications-component';\nimport Button from '@material-ui/core/Button';\nimport {getContainer, getMessage, getType} from '../helpers/randomize';\nimport notification from '../helpers/notification';\nimport Box from '@material-ui/core/Box';\n\nconst AnimationEntrance = () => {\n  const add = (htmlClasses) => {\n    const type = getType();\n    return store.addNotification(\n      Object.assign({}, notification, {\n        animationIn: htmlClasses,\n        container: getContainer(),\n        message: getMessage(type),\n        type,\n      }),\n    );\n  };\n\n  return (\n    <Box display='flex' flexWrap='wrap'>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated bounceIn'])}>\n          Bounce In\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated fadeIn'])}>\n          Fade In\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated flipInX'])}>\n          Flip In X\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated flipInY'])}>\n          Flip In Y\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated zoomIn'])}>\n          Zoom In\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated flash'])}>\n          Flash\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated jackInTheBox'])}>\n          Jack In The Box\n        </Button>\n      </Box>\n    </Box>\n  );\n};\nexport default AnimationEntrance;\n"})),o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"Animation Exit",description:"Exit animation can be customised by specifying CSS classes",component:I,source:"import React from 'react';\nimport {store} from 'react-notifications-component';\nimport Button from '@material-ui/core/Button';\n\nimport {getContainer, getMessage, getType} from '../helpers/randomize';\nimport notification from '../helpers/notification';\nimport Box from '@material-ui/core/Box';\n\nconst AnimationExit = () => {\n  const add = (htmlClasses) => {\n    const type = getType();\n    return store.addNotification(\n      Object.assign({}, notification, {\n        slidingExit: {delay: 300},\n        animationOut: htmlClasses,\n        container: getContainer(),\n        message: getMessage(type),\n        type,\n      }),\n    );\n  };\n\n  return (\n    <Box display='flex' flexWrap='wrap'>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated bounceOut'])}>\n          Bounce Out\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated fadeOut'])}>\n          Fade Out\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated flipOutX'])}>\n          Flip Out X\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated flipOutY'])}>\n          Flip Out Y\n        </Button>\n      </Box>\n      <Box mr={2} my={1}>\n        <Button\n          color='primary'\n          variant='contained'\n          onClick={() => add(['animated zoomOut'])}>\n          Zoom Out\n        </Button>\n      </Box>\n    </Box>\n  );\n};\nexport default AnimationExit;\n"})),o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"Container",description:"Container can be set from predefined values top-left, top-right, top-center, bottom-left, bottom-right, bottom-center",component:F,source:"import React from 'react';\nimport {store} from 'react-notifications-component';\nimport Button from '@material-ui/core/Button';\n\nimport notification from '../helpers/notification';\nimport {getMessage, getTitle, getType} from '../helpers/randomize';\nimport Box from '@material-ui/core/Box';\n\nexport default class ContainerExample extends React.Component {\n  add = (container) => {\n    const type = getType();\n\n    return store.addNotification(\n      Object.assign({}, notification, {\n        title: getTitle(type),\n        message: getMessage(type),\n        container,\n        type,\n      }),\n    );\n  };\n\n  render() {\n    return (\n      <Box display='flex' flexWrap='wrap'>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('top-left')}>\n            Top Left\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('top-right')}>\n            Top Right\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('top-center')}>\n            Top Center\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('bottom-left')}>\n            Bottom Left\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('bottom-right')}>\n            Bottom Right\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('bottom-center')}>\n            Bottom Center\n          </Button>\n        </Box>\n      </Box>\n    );\n  }\n}\n"})),o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"Custom Content",description:"With react-notifications-component notification's content can be customised to suit your needs.",component:Y,source:"import React from 'react';\nimport {store} from 'react-notifications-component';\nimport Button from '@material-ui/core/Button';\n\nimport notification from '../helpers/notification';\nimport {getContainer} from '../helpers/randomize';\nimport Box from '@material-ui/core/Box';\nimport Typography from '@material-ui/core/Typography';\n\nexport default class CustomContentExample extends React.Component {\n  addCustomIcon = (type, iconClassName) => {\n    let message;\n    if (type === 'success') {\n      message = 'Your agenda has been successfully synced';\n    } else if (type === 'warning') {\n      message = 'Warning! All your db will be lost if you proceed';\n    } else if (type === 'danger') {\n      message = 'Error! You have no update rights';\n    }\n\n    store.addNotification(\n      Object.assign({}, notification, {\n        width: 275,\n        container: getContainer(),\n        content: (\n          <Box className={`notification-custom-${type}`}>\n            <Box className='notification-custom-icon'>\n              <i className={iconClassName} />\n            </Box>\n            <Box className='notification-custom-content'>\n              <Typography className='notification-message'>\n                {message}\n              </Typography>\n            </Box>\n          </Box>\n        ),\n      }),\n    );\n  };\n\n  add = () => {\n    store.addNotification(\n      Object.assign({}, notification, {\n        width: 325,\n        container: getContainer(),\n        content: (\n          <Box\n            display='flex'\n            flexDirection='row'\n            className='custom-image-content'>\n            <img src='/assets/images/logo.png' alt='' />\n            <Box component='span' px={8} py={2}>\n              Crema Admin\n            </Box>\n          </Box>\n        ),\n      }),\n    );\n  };\n\n  render() {\n    return (\n      <Box display='flex' flexWrap='wrap'>\n        <Box mr={2} my={1}>\n          <Button color='primary' variant='contained' onClick={this.add}>\n            Custom Image Content\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            variant='contained'\n            color='primary'\n            onClick={() =>\n              this.addCustomIcon('success', 'fas fa-check-circle')\n            }>\n            Success with Icon\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            variant='contained'\n            color='primary'\n            onClick={() =>\n              this.addCustomIcon('danger', 'fas fa-exclamation-circle')\n            }>\n            Danger with Icon\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() =>\n              this.addCustomIcon('warning', 'fas fa-exclamation-triangle')\n            }>\n            Warning with Icon\n          </Button>\n        </Box>\n      </Box>\n    );\n  }\n}\n"})),o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"Insert",description:"Insertion in react-notifications can be done either at the top or at the bottom of the container",component:N,source:"import React from 'react';\nimport {store} from 'react-notifications-component';\nimport Button from '@material-ui/core/Button';\n\nimport notification from '../helpers/notification';\nimport {getMessage, getTitle, getType} from '../helpers/randomize';\nimport Box from '@material-ui/core/Box';\nimport {makeStyles} from '@material-ui/core/styles';\n\nconst InsertExample = (props) => {\n  const add = (insert) => {\n    const type = getType();\n    return store.addNotification(\n      Object.assign({}, notification, {\n        type,\n        insert,\n        message: getMessage(type),\n        title: getTitle(type),\n      }),\n    );\n  };\n\n  const useStyles = makeStyles((theme) => ({\n    btnRoot: {\n      marginBottom: 4,\n      marginTop: 4,\n      marginLeft: 8,\n      marginRight: 8,\n    },\n  }));\n  const classes = useStyles(props);\n\n  return (\n    <Box>\n      <Button\n        className={classes.btnRoot}\n        color='primary'\n        variant='contained'\n        onClick={() => add('top')}>\n        Top\n      </Button>\n      <Button\n        className={classes.btnRoot}\n        color='primary'\n        variant='contained'\n        onClick={() => add('bottom')}>\n        Bottom\n      </Button>\n    </Box>\n  );\n};\nexport default InsertExample;\n"})),o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"Type",description:"Type can be set from predefined values success, default, warning, info, danger or custom to suit your needs",component:S,source:"import React from 'react';\nimport {store} from 'react-notifications-component';\nimport Button from '@material-ui/core/Button';\n\nimport notification from '../helpers/notification';\nimport {getContainer, getMessage, getTitle} from '../helpers/randomize';\nimport Box from '@material-ui/core/Box';\n\nexport default class TypeExample extends React.Component {\n  add = (type) => {\n    return store.addNotification(\n      Object.assign({}, notification, {\n        type,\n        title: getTitle(type),\n        message: getMessage(type),\n        container: getContainer(),\n      }),\n    );\n  };\n\n  render() {\n    return (\n      <Box display='flex' flexWrap='wrap'>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('success')}>\n            Success\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('default')}>\n            Default\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('warning')}>\n            Warning\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('info')}>\n            Info\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('danger')}>\n            Danger\n          </Button>\n        </Box>\n        <Box mr={2} my={1}>\n          <Button\n            color='primary'\n            variant='contained'\n            onClick={() => this.add('awesome')}>\n            Custom\n          </Button>\n        </Box>\n      </Box>\n    );\n  }\n}\n"}))))}}}]);
//# sourceMappingURL=173.9b7f6f41.chunk.js.map