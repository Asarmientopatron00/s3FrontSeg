(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[164],{3151:function(e,r,t){"use strict";t.r(r);var n=t(0),a=t.n(n),o=t(1081),s=t(306),c=t(305),l=t(304),m=t(313),i=t(314),p=t(316),u=t(315),d=t(2684),f=t.n(d),k=t(1306),h=t(2686),b=t.n(h),g=Object(k.withGoogleMap)((function(e){return a.a.createElement(k.GoogleMap,{defaultZoom:3,defaultCenter:{lat:25.0391667,lng:121.525}},a.a.createElement(b.a,{averageCenter:!0,enableRetinaIcons:!0,gridSize:60},e.markers.map((function(e){return a.a.createElement(k.Marker,{position:{lat:e.latitude,lng:e.longitude},key:e.photo_id})}))))})),M=function(e){Object(p.a)(t,e);var r=Object(u.a)(t);function t(){var e;return Object(m.a)(this,t),(e=r.call(this)).state={markers:[]},e}return Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;f()("https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json").then((function(e){return e.json()})).then((function(r){e.setState({markers:r.photos})}))}},{key:"render",value:function(){return a.a.createElement(g,{containerElement:a.a.createElement("div",{className:"cr-embed-responsive cr-embed-responsive-21by9"}),mapElement:a.a.createElement("div",{className:"cr-embed-responsive-item"}),markers:this.state.markers})}}]),t}(n.Component);r.default=function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement(c.a,{title:"Marker Clusterer",description:"A wrapper around MarkerClusterer",refUrl:"https://github.com/mahnunchik/markerclustererplus/blob/master/docs/reference.html"}),a.a.createElement(l.a,null,a.a.createElement(o.a,{item:!0,xs:12},a.a.createElement(s.a,{title:"Marker Clusterer Map",component:M,source:"import React, {Component} from 'react';\n\nimport fetch from 'isomorphic-fetch';\nimport {GoogleMap, Marker, withGoogleMap} from 'react-google-maps';\nimport MarkerClusterer from 'react-google-maps/lib/components/addons/MarkerClusterer';\n\nconst MarkerClustererExampleGoogleMap = withGoogleMap((props) => (\n  <GoogleMap defaultZoom={3} defaultCenter={{lat: 25.0391667, lng: 121.525}}>\n    <MarkerClusterer averageCenter enableRetinaIcons gridSize={60}>\n      {props.markers.map((marker) => (\n        <Marker\n          position={{lat: marker.latitude, lng: marker.longitude}}\n          key={marker.photo_id}\n        />\n      ))}\n    </MarkerClusterer>\n  </GoogleMap>\n));\n\nexport default class MarkerClustererExample extends Component {\n  constructor() {\n    super();\n    this.state = {\n      markers: [],\n    };\n  }\n\n  componentDidMount() {\n    fetch(\n      `https://gist.githubusercontent.com/farrrr/dfda7dd7fccfec5474d3/raw/758852bbc1979f6c4522ab4e92d1c92cba8fb0dc/data.json`,\n    )\n      .then((res) => res.json())\n      .then((data) => {\n        this.setState({markers: data.photos});\n      });\n  }\n\n  render() {\n    return (\n      <MarkerClustererExampleGoogleMap\n        containerElement={\n          <div className='cr-embed-responsive cr-embed-responsive-21by9' />\n        }\n        mapElement={<div className='cr-embed-responsive-item' />}\n        markers={this.state.markers}\n      />\n    );\n  }\n}\n"}))))}}}]);
//# sourceMappingURL=164.303afe27.chunk.js.map