(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[118],{1349:function(n,e,t){(function(e){for(var o=t(1429),r="undefined"===typeof window?e:window,a=["moz","webkit"],i="AnimationFrame",c=r["request"+i],s=r["cancel"+i]||r["cancelRequest"+i],l=0;!c&&l<a.length;l++)c=r[a[l]+"Request"+i],s=r[a[l]+"Cancel"+i]||r[a[l]+"CancelRequest"+i];if(!c||!s){var u=0,p=0,m=[];c=function(n){if(0===m.length){var e=o(),t=Math.max(0,1e3/60-(e-u));u=t+e,setTimeout((function(){var n=m.slice(0);m.length=0;for(var e=0;e<n.length;e++)if(!n[e].cancelled)try{n[e].callback(u)}catch(t){setTimeout((function(){throw t}),0)}}),Math.round(t))}return m.push({handle:++p,callback:n,cancelled:!1}),p},s=function(n){for(var e=0;e<m.length;e++)m[e].handle===n&&(m[e].cancelled=!0)}}n.exports=function(n){return c.call(r,n)},n.exports.cancel=function(){s.apply(r,arguments)},n.exports.polyfill=function(n){n||(n=r),n.requestAnimationFrame=c,n.cancelAnimationFrame=s}}).call(this,t(86))},1429:function(n,e,t){(function(e){(function(){var t,o,r,a,i,c;"undefined"!==typeof performance&&null!==performance&&performance.now?n.exports=function(){return performance.now()}:"undefined"!==typeof e&&null!==e&&e.hrtime?(n.exports=function(){return(t()-i)/1e6},o=e.hrtime,a=(t=function(){var n;return 1e9*(n=o())[0]+n[1]})(),c=1e9*e.uptime(),i=a-c):Date.now?(n.exports=function(){return Date.now()-r},r=Date.now()):(n.exports=function(){return(new Date).getTime()-r},r=(new Date).getTime())}).call(this)}).call(this,t(98))},3149:function(n,e,t){"use strict";t.r(e);var o=t(0),r=t.n(o),a=t(1081),i=t(306),c=t(305),s=t(304),l=t(313),u=t(314),p=t(316),m=t(315),d=t(1306),f=t(1587),g=t.n(f),h=t(1349),v=t.n(h),w=g.a&&navigator.geolocation?navigator.geolocation:{getCurrentPosition:function(n,e){e("Your browser doesn't support geolocation.")}},b=Object(d.withGoogleMap)((function(n){return r.a.createElement(d.GoogleMap,{defaultZoom:10,center:n.center},n.center&&r.a.createElement(d.InfoWindow,{position:n.center},r.a.createElement("div",null,n.content)),n.center&&r.a.createElement(d.Circle,{center:n.center,radius:n.radius,options:{fillColor:"red",fillOpacity:.2,strokeColor:"red",strokeOpacity:1,strokeWeight:1}}))})),M=function(n){Object(p.a)(t,n);var e=Object(m.a)(t);function t(){var n;Object(l.a)(this,t);for(var o=arguments.length,r=new Array(o),a=0;a<o;a++)r[a]=arguments[a];return(n=e.call.apply(e,[this].concat(r))).state={center:null,content:null,radius:6e3},n.isUnmounted=!1,n}return Object(u.a)(t,[{key:"componentDidMount",value:function(){var n=this,e=function e(){n.isUnmounted||(n.setState({radius:Math.max(n.state.radius-20,0)}),n.state.radius>200&&v()(e))};w.getCurrentPosition((function(t){n.isUnmounted||(n.setState({center:{lat:t.coords.latitude,lng:t.coords.longitude},content:"Location found using HTML5."}),v()(e))}),(function(e){n.isUnmounted||n.setState({center:{lat:60,lng:105},content:"Error: The Geolocation service failed (".concat(e,").")})}))}},{key:"componentWillUnmount",value:function(){this.isUnmounted=!0}},{key:"render",value:function(){return r.a.createElement(b,{containerElement:r.a.createElement("div",{className:"cr-embed-responsive cr-embed-responsive-21by9"}),mapElement:r.a.createElement("div",{className:"cr-embed-responsive-item"}),center:this.state.center,content:this.state.content,radius:this.state.radius})}}]),t}(o.Component);e.default=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(c.a,{title:"Google Map",refUrl:"http://google-map-react.github.io/google-map-react/map/balderdash/"}),r.a.createElement(s.a,null,r.a.createElement(a.a,{item:!0,xs:12},r.a.createElement(i.a,{title:"Simple Map",component:M,source:"import React, {Component} from 'react';\nimport {Circle, GoogleMap, InfoWindow, withGoogleMap} from 'react-google-maps';\nimport canUseDOM from 'can-use-dom';\nimport raf from 'raf';\n\nconst geolocation =\n  canUseDOM && navigator.geolocation\n    ? navigator.geolocation\n    : {\n        getCurrentPosition(success, failure) {\n          failure(`Your browser doesn't support geolocation.`);\n        },\n      };\n\nconst GeolocationExampleGoogleMap = withGoogleMap((props) => (\n  <GoogleMap defaultZoom={10} center={props.center}>\n    {props.center && (\n      <InfoWindow position={props.center}>\n        <div>{props.content}</div>\n      </InfoWindow>\n    )}\n    {props.center && (\n      <Circle\n        center={props.center}\n        radius={props.radius}\n        options={{\n          fillColor: 'red',\n          fillOpacity: 0.2,\n          strokeColor: 'red',\n          strokeOpacity: 1,\n          strokeWeight: 1,\n        }}\n      />\n    )}\n  </GoogleMap>\n));\n\n/*\n * https://developers.google.com/maps/documentation/javascript/examples/map-geolocation\n *\n * Add <script src=\"https://maps.googleapis.com/maps/api/js\"><\/script> to your HTML to provide google.maps reference\n */\nexport default class GeolocationExample extends Component {\n  state = {\n    center: null,\n    content: null,\n    radius: 6000,\n  };\n\n  isUnmounted = false;\n\n  componentDidMount() {\n    const tick = () => {\n      if (this.isUnmounted) {\n        return;\n      }\n      this.setState({radius: Math.max(this.state.radius - 20, 0)});\n\n      if (this.state.radius > 200) {\n        raf(tick);\n      }\n    };\n    geolocation.getCurrentPosition(\n      (position) => {\n        if (this.isUnmounted) {\n          return;\n        }\n        this.setState({\n          center: {\n            lat: position.coords.latitude,\n            lng: position.coords.longitude,\n          },\n          content: `Location found using HTML5.`,\n        });\n\n        raf(tick);\n      },\n      (reason) => {\n        if (this.isUnmounted) {\n          return;\n        }\n        this.setState({\n          center: {\n            lat: 60,\n            lng: 105,\n          },\n          content: `Error: The Geolocation service failed (${reason}).`,\n        });\n      },\n    );\n  }\n\n  componentWillUnmount() {\n    this.isUnmounted = true;\n  }\n\n  render() {\n    return (\n      <GeolocationExampleGoogleMap\n        containerElement={\n          <div className='cr-embed-responsive cr-embed-responsive-21by9' />\n        }\n        mapElement={<div className='cr-embed-responsive-item' />}\n        center={this.state.center}\n        content={this.state.content}\n        radius={this.state.radius}\n      />\n    );\n  }\n}\n"}))))}}}]);
//# sourceMappingURL=118.0eebe917.chunk.js.map