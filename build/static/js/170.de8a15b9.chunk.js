(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[170],{3177:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),i=t(1086),r=t(306),l=t(304),c=t(303),s=t(312),p=t(313),m=t(323),d=t(315),u=t(314),v=t(499),h=t(1329),g={mapContainer:{height:500},overlayView:{background:"#fff",border:"1px solid #ccc",padding:15}};function f(e,n){return{x:-e/2,y:-n/2}}var y=Object(h.withGoogleMap)((function(e){return o.a.createElement(h.GoogleMap,{defaultZoom:15,defaultCenter:{lat:47.646935,lng:-122.303763}},o.a.createElement(h.OverlayView,{position:{lat:47.646935,lng:-122.303763},mapPaneName:h.OverlayView.OVERLAY_MOUSE_TARGET,getPixelPositionOffset:f},o.a.createElement("div",{style:g.overlayView},o.a.createElement("h1",null,"OverlayView"),o.a.createElement(v.a,{variant:"contained",color:"primary",onClick:e.onClick},"I have been clicked ",e.count," time",1===e.count?"":"s"))))})),O=function(e){Object(d.a)(t,e);var n=Object(u.a)(t);function t(){var e;Object(s.a)(this,t);for(var a=arguments.length,o=new Array(a),i=0;i<a;i++)o[i]=arguments[i];return(e=n.call.apply(n,[this].concat(o))).state={count:0},e.handleClick=e.handleClick.bind(Object(m.a)(e)),e}return Object(p.a)(t,[{key:"handleClick",value:function(){this.setState({count:this.state.count+1})}},{key:"render",value:function(){return o.a.createElement(y,{containerElement:o.a.createElement("div",{className:"cr-embed-responsive cr-embed-responsive-21by9"}),mapElement:o.a.createElement("div",{className:"cr-embed-responsive-item"}),count:this.state.count,onClick:this.handleClick})}}]),t}(a.Component);n.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{title:"OverlayView Map",description:"A wrapper around google.maps.OverlayView",refUrl:"https://developers.google.com/maps/documentation/javascript/3.exp/reference#OverlayView"}),o.a.createElement(c.a,null,o.a.createElement(i.a,{item:!0,xs:12},o.a.createElement(r.a,{title:"Map Overlay",component:O,source:"import React, {Component} from 'react';\nimport Button from '@material-ui/core/Button';\nimport {GoogleMap, OverlayView, withGoogleMap} from 'react-google-maps';\n\nconst STYLES = {\n  mapContainer: {\n    height: 500,\n  },\n  overlayView: {\n    background: '#fff',\n    border: '1px solid #ccc',\n    padding: 15,\n  },\n};\n\nfunction getPixelPositionOffset(width, height) {\n  return {x: -(width / 2), y: -(height / 2)};\n}\n\nconst OverlayViewExampleGoogleMap = withGoogleMap((props) => (\n  <GoogleMap\n    defaultZoom={15}\n    defaultCenter={{lat: 47.646935, lng: -122.303763}}>\n    <OverlayView\n      position={{lat: 47.646935, lng: -122.303763}}\n      /*\n       * An alternative to specifying position is specifying bounds.\n       * bounds can either be an instance of google.maps.LatLngBounds\n       * or an object in the following format:\n       * bounds={{\n       *    ne: { lat: 62.400471, lng: -150.005608 },\n       *    sw: { lat: 62.281819, lng: -150.287132 }\n       * }}\n       */\n      /*\n       * 1. Specify the pane the OverlayView will be rendered to. For\n       *    mouse interactivity, use `OverlayView.OVERLAY_MOUSE_TARGET`.\n       *    Defaults to `OverlayView.OVERLAY_LAYER`.\n       */\n      mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}\n      /*\n       * 2. Tweak the OverlayView's pixel position. In this case, we're\n       *    centering the content.\n       */\n      getPixelPositionOffset={getPixelPositionOffset}\n      /*\n       * 3. Create OverlayView content using standard React components.\n       */\n    >\n      <div style={STYLES.overlayView}>\n        <h1>OverlayView</h1>\n        <Button variant='contained' color='primary' onClick={props.onClick}>\n          I have been clicked {props.count} time{props.count === 1 ? `` : `s`}\n        </Button>\n      </div>\n    </OverlayView>\n  </GoogleMap>\n));\n\n/*\n * Add <script src=\"https://maps.googleapis.com/maps/api/js\"><\/script> to your HTML to provide google.maps reference\n */\nexport default class MapOverlay extends Component {\n  state = {\n    count: 0,\n  };\n\n  handleClick = this.handleClick.bind(this);\n\n  handleClick() {\n    this.setState({count: this.state.count + 1});\n  }\n\n  render() {\n    return (\n      <OverlayViewExampleGoogleMap\n        containerElement={\n          <div className='cr-embed-responsive cr-embed-responsive-21by9' />\n        }\n        mapElement={<div className='cr-embed-responsive-item' />}\n        count={this.state.count}\n        onClick={this.handleClick}\n      />\n    );\n  }\n}\n"}))))}}}]);
//# sourceMappingURL=170.de8a15b9.chunk.js.map