(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[178],{3104:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(1149),i=[{name:"Page A",uv:4e3,pv:2400,amt:2400},{name:"Page B",uv:3e3,pv:1398,amt:2210},{name:"Page C",uv:2e3,pv:9800,amt:2290},{name:"Page D",uv:2780,pv:3908,amt:2e3},{name:"Page E",uv:1890,pv:4800,amt:2181},{name:"Page F",uv:2390,pv:3800,amt:2500},{name:"Page G",uv:3490,pv:4300,amt:2100}],m=function(){return r.a.createElement(o.y,{width:"100%",height:200},r.a.createElement(o.h,{data:i,margin:{top:10,right:0,left:-25,bottom:0}},r.a.createElement(o.E,{dataKey:"name"}),r.a.createElement(o.F,null),r.a.createElement(o.C,null),r.a.createElement(o.l,null),r.a.createElement(o.f,{stroke:"#f5f5f5"}),r.a.createElement(o.a,{type:"monotone",dataKey:"amt",fill:"#F04F47",stroke:"#F04F47"}),r.a.createElement(o.c,{dataKey:"pv",barSize:20,fill:"#4299E1"}),r.a.createElement(o.m,{type:"monotone",dataKey:"uv",stroke:"#59AA2B"})))},l=function(){return r.a.createElement(o.y,{width:"100%",height:200},r.a.createElement(o.h,{layout:"vertical",data:i,margin:{top:10,right:0,left:-12,bottom:0}},r.a.createElement(o.E,{type:"number"}),r.a.createElement(o.F,{dataKey:"name",type:"category"}),r.a.createElement(o.C,null),r.a.createElement(o.l,null),r.a.createElement(o.f,{stroke:"#f5f5f5"}),r.a.createElement(o.a,{dataKey:"amt",fill:"#F04F47",stroke:"#F04F47"}),r.a.createElement(o.c,{dataKey:"pv",barSize:20,fill:"#4299E1"}),r.a.createElement(o.m,{dataKey:"uv",stroke:"#59AA2B"})))},s=function(){return r.a.createElement(o.y,{width:"100%",height:200},r.a.createElement(o.h,{data:i,margin:{top:10,right:0,left:-25,bottom:0}},r.a.createElement(o.E,{dataKey:"name"}),r.a.createElement(o.F,null),r.a.createElement(o.C,null),r.a.createElement(o.l,null),r.a.createElement(o.f,{stroke:"#f5f5f5"}),r.a.createElement(o.c,{dataKey:"uv",barSize:20,fill:"#4299E1"}),r.a.createElement(o.m,{type:"monotone",dataKey:"uv",stroke:"#59AA2B"})))},d=function(){return r.a.createElement(o.y,{width:"100%",height:200},r.a.createElement(o.h,{data:i,margin:{top:10,right:0,left:-25,bottom:0}},r.a.createElement(o.E,{dataKey:"name"}),r.a.createElement(o.F,null),r.a.createElement(o.C,null),r.a.createElement(o.l,null),r.a.createElement(o.f,{stroke:"#f5f5f5"}),r.a.createElement(o.a,{type:"monotone",dataKey:"amt",fill:"#F04F47",stroke:"#F04F47"}),r.a.createElement(o.c,{dataKey:"pv",barSize:20,fill:"#4299E1"}),r.a.createElement(o.m,{type:"monotone",dataKey:"uv",stroke:"#59AA2B"})))},p=a(1081),c=a(306),h=a(305),C=a(304);t.default=function(e){e.match;return r.a.createElement(r.a.Fragment,null,r.a.createElement(h.a,{title:"Composed Chart",description:"A chart composed of line, area, and bar charts. When you just want to draw a chart of a single type like line, then LineChart is recommended.",refUrl:"http://recharts.org/en-US/api/ComposedChart/"}),r.a.createElement(C.a,null,r.a.createElement(p.a,{item:!0,xs:12,lg:6},r.a.createElement(c.a,{title:"Line Bar Area Composed Chart",component:m,source:"import React from 'react';\nimport {\n  Area,\n  Bar,\n  CartesianGrid,\n  ComposedChart,\n  Legend,\n  Line,\n  ResponsiveContainer,\n  Tooltip,\n  XAxis,\n  YAxis,\n} from 'recharts';\nimport data from './data';\n\nconst LineBarAreaComposedChart = () => (\n  <ResponsiveContainer width='100%' height={200}>\n    <ComposedChart\n      data={data}\n      margin={{top: 10, right: 0, left: -25, bottom: 0}}>\n      <XAxis dataKey='name' />\n      <YAxis />\n      <Tooltip />\n      <Legend />\n      <CartesianGrid stroke='#f5f5f5' />\n      <Area type='monotone' dataKey='amt' fill='#F04F47' stroke='#F04F47' />\n      <Bar dataKey='pv' barSize={20} fill='#4299E1' />\n      <Line type='monotone' dataKey='uv' stroke='#59AA2B' />\n    </ComposedChart>\n  </ResponsiveContainer>\n);\n\nexport default LineBarAreaComposedChart;\n"})),r.a.createElement(p.a,{item:!0,xs:12,lg:6},r.a.createElement(c.a,{title:"Line Bar Area Composed Chart",component:l,source:"import React from 'react';\nimport {\n  Area,\n  Bar,\n  CartesianGrid,\n  ComposedChart,\n  Legend,\n  Line,\n  ResponsiveContainer,\n  Tooltip,\n  XAxis,\n  YAxis,\n} from 'recharts';\nimport data from './data';\n\nconst VerticalComposedChart = () => (\n  <ResponsiveContainer width='100%' height={200}>\n    <ComposedChart\n      layout='vertical'\n      data={data}\n      margin={{top: 10, right: 0, left: -12, bottom: 0}}>\n      <XAxis type='number' />\n      <YAxis dataKey='name' type='category' />\n      <Tooltip />\n      <Legend />\n      <CartesianGrid stroke='#f5f5f5' />\n      <Area dataKey='amt' fill='#F04F47' stroke='#F04F47' />\n      <Bar dataKey='pv' barSize={20} fill='#4299E1' />\n      <Line dataKey='uv' stroke='#59AA2B' />\n    </ComposedChart>\n  </ResponsiveContainer>\n);\n\nexport default VerticalComposedChart;\n"})),r.a.createElement(p.a,{item:!0,xs:12,lg:6},r.a.createElement(c.a,{title:"Same Data Composed Chart",component:s,source:"import React from 'react';\nimport {\n  Bar,\n  CartesianGrid,\n  ComposedChart,\n  Legend,\n  Line,\n  ResponsiveContainer,\n  Tooltip,\n  XAxis,\n  YAxis,\n} from 'recharts';\nimport data from './data';\n\nconst SameDataComposedChart = () => (\n  <ResponsiveContainer width='100%' height={200}>\n    <ComposedChart\n      data={data}\n      margin={{top: 10, right: 0, left: -25, bottom: 0}}>\n      <XAxis dataKey='name' />\n      <YAxis />\n      <Tooltip />\n      <Legend />\n      <CartesianGrid stroke='#f5f5f5' />\n      <Bar dataKey='uv' barSize={20} fill='#4299E1' />\n      <Line type='monotone' dataKey='uv' stroke='#59AA2B' />\n    </ComposedChart>\n  </ResponsiveContainer>\n);\n\nexport default SameDataComposedChart;\n"})),r.a.createElement(p.a,{item:!0,xs:12,lg:6},r.a.createElement(c.a,{title:"Composed Chart With Axis Labels",component:d,source:"import React from 'react';\nimport {\n  Area,\n  Bar,\n  CartesianGrid,\n  ComposedChart,\n  Legend,\n  Line,\n  ResponsiveContainer,\n  Tooltip,\n  XAxis,\n  YAxis,\n} from 'recharts';\nimport data from './data';\n\nconst ComposedChartWithAxisLabels = () => (\n  <ResponsiveContainer width='100%' height={200}>\n    <ComposedChart\n      data={data}\n      margin={{top: 10, right: 0, left: -25, bottom: 0}}>\n      <XAxis dataKey='name' />\n      <YAxis />\n      <Tooltip />\n      <Legend />\n      <CartesianGrid stroke='#f5f5f5' />\n      <Area type='monotone' dataKey='amt' fill='#F04F47' stroke='#F04F47' />\n      <Bar dataKey='pv' barSize={20} fill='#4299E1' />\n      <Line type='monotone' dataKey='uv' stroke='#59AA2B' />\n    </ComposedChart>\n  </ResponsiveContainer>\n);\n\nexport default ComposedChartWithAxisLabels;\n"}))))}}}]);
//# sourceMappingURL=178.a96e7ba8.chunk.js.map