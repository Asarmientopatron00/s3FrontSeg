(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[168],{3156:function(e,n,t){"use strict";t.r(n);var a=t(0),o=t.n(a),r=t(1081),i=t(306),l=t(305),s=t(304),m=t(313),c=t(314),p=t(316),d=t(315),w=t(1306),u={lat:49.2853171,lng:-123.1119202},g={overlayView:{background:"red",color:"white",padding:5,borderRadius:"50%"}};function v(e,n){return{x:-e/2,y:-n/2}}var f=Object(w.withGoogleMap)((function(e){return o.a.createElement(w.GoogleMap,{defaultZoom:8,defaultCenter:u},o.a.createElement(w.StreetViewPanorama,{defaultPosition:u,visible:!0},o.a.createElement(w.OverlayView,{position:{lat:49.28590291211115,lng:-123.11248166065218},mapPaneName:w.OverlayView.OVERLAY_LAYER,getPixelPositionOffset:v},o.a.createElement("div",{style:g.overlayView},"OverlayView"))))})),V=function(e){Object(p.a)(t,e);var n=Object(d.a)(t);function t(){return Object(m.a)(this,t),n.apply(this,arguments)}return Object(c.a)(t,[{key:"render",value:function(){return o.a.createElement(f,{containerElement:o.a.createElement("div",{className:"cr-embed-responsive cr-embed-responsive-21by9"}),mapElement:o.a.createElement("div",{className:"cr-embed-responsive-item"})})}}]),t}(a.Component);n.default=function(){return o.a.createElement(o.a.Fragment,null,o.a.createElement(l.a,{title:"StreetView Map",description:"A wrapper around google.maps.StreetViewPanorama",refUrl:"https://developers.google.com/maps/documentation/javascript/3.exp/reference#StreetViewPanorama/"}),o.a.createElement(s.a,null,o.a.createElement(r.a,{item:!0,xs:12},o.a.createElement(i.a,{title:"StreetView Map",component:V,source:"import React, {Component} from 'react';\nimport {\n  GoogleMap,\n  OverlayView,\n  StreetViewPanorama,\n  withGoogleMap,\n} from 'react-google-maps';\n\nconst coordinates = {lat: 49.2853171, lng: -123.1119202};\n\nconst STYLES = {\n  overlayView: {\n    background: `red`,\n    color: `white`,\n    padding: 5,\n    borderRadius: `50%`,\n  },\n};\n\nfunction getPixelPositionOffset(width, height) {\n  return {x: -(width / 2), y: -(height / 2)};\n}\n\nconst StreetViewPanoramaExampleGoogleMap = withGoogleMap((props) => (\n  <GoogleMap defaultZoom={8} defaultCenter={coordinates}>\n    <StreetViewPanorama defaultPosition={coordinates} visible>\n      <OverlayView\n        position={{lat: 49.28590291211115, lng: -123.11248166065218}}\n        mapPaneName={OverlayView.OVERLAY_LAYER}\n        getPixelPositionOffset={getPixelPositionOffset}>\n        <div style={STYLES.overlayView}>OverlayView</div>\n      </OverlayView>\n    </StreetViewPanorama>\n  </GoogleMap>\n));\n\n/**\n * You can pass in an `containerElement` to render `StreetViewPanorama` in its own containers\n * At this point the `GoogleMap` wrapper and `withGoogleMap` HOC become optional,\n * so you can either render a map and StreetView at the same time,\n * or just the StreetView on its own\n *    <StreetViewPanorama\n *      containerElement={<div style={{ width: `100%`, height: `100%` }} />}\n *      defaultPosition={coordinates}\n *      visible\n *    />\n */\n\n/*\n * Add <script src=\"https://maps.googleapis.com/maps/api/js\"><\/script> to your HTML to provide google.maps reference\n */\nexport default class StreetViewPanoramaExample extends Component {\n  render() {\n    return (\n      <StreetViewPanoramaExampleGoogleMap\n        containerElement={\n          <div className='cr-embed-responsive cr-embed-responsive-21by9' />\n        }\n        mapElement={<div className='cr-embed-responsive-item' />}\n      />\n    );\n  }\n}\n"}))))}}}]);
//# sourceMappingURL=168.3d1380a1.chunk.js.map