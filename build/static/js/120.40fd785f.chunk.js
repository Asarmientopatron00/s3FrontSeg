(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[120],{1330:function(e,t,a){"use strict";var n=[{title:"All Day Event very long title",allDay:!0,start:new Date(2019,10,0),end:new Date(2019,10,1)},{title:"Long Event",start:new Date(2019,10,7),end:new Date(2019,10,10)},{title:"DTS STARTS",start:new Date(2019,9,110,0,0,0),end:new Date(2019,9,20,0,0,0)},{title:"DTS ENDS",start:new Date(2019,10,6,0,0,0),end:new Date(2019,10,10,0,0,0)},{title:"Some Event",start:new Date(2019,10,9,0,0,0),end:new Date(2019,10,9,0,0,0)},{title:"Conference",start:new Date(2019,10,11),end:new Date(2019,10,13),desc:"Big conference for important people"},{title:"Meeting",start:new Date(2019,10,12,10,30,0,0),end:new Date(2019,10,12,12,30,0,0),desc:"Pre-meeting meeting, to prepare for the meeting"},{title:"Lunch",start:new Date(2019,10,12,12,0,0,0),end:new Date(2019,10,12,110,0,0,0),desc:"Power lunch"},{title:"Meeting",start:new Date(2019,10,12,14,0,0,0),end:new Date(2019,10,12,15,0,0,0)},{title:"Happy Hour",start:new Date(2019,10,12,17,0,0,0),end:new Date(2019,10,12,17,30,0,0),desc:"Most important meal of the day"},{title:"Dinner",start:new Date(2019,10,12,20,0,0,0),end:new Date(2019,10,12,21,0,0,0)},{title:"Birthday Party",start:new Date(2019,10,10,7,0,0),end:new Date(2019,10,10,10,30,0)},{title:"Birthday Party 2",start:new Date(2019,10,10,7,0,0),end:new Date(2019,10,10,10,30,0)},{title:"Birthday Party 3",start:new Date(2019,10,10,7,0,0),end:new Date(2019,10,10,10,30,0)},{title:"Late Night Event",start:new Date(2019,10,17,19,30,0),end:new Date(2019,10,18,9,0,0)},{title:"Multi-day Event",start:new Date(2019,10,20,19,30,0),end:new Date(2019,10,22,9,0,0)}];t.a=n},1331:function(e,t,a){"use strict";var n=a(164),r=Object(n.a)((function(e){return{root:{"& .cr-calendar .react-daypicker-root .day.today, & .cr-calendar .react-daypicker-root .day.today:hover ":{color:e.palette.primary.main},"& .rbc-event, & .rbc-event.rbc-selected":{backgroundColor:e.palette.primary.main},"& .rbc-slot-selection":{backgroundColor:e.palette.primary.main},"& .rbc-toolbar button":{cursor:"pointer",color:e.palette.text.secondary,fontSize:"100%","&:hover, &:focus":{backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main,color:e.palette.primary.contrastText},"&:active, &.rbc-active":{backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main,color:e.palette.primary.contrastText,"&:hover, &:focus":{backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main,color:e.palette.primary.contrastText}}},"& .cr-calendar-color .header":{backgroundColor:e.palette.primary.main},"& .rbc-off-range-bg":{backgroundColor:e.palette.background.paper},"& .rbc-row-segment a":{color:e.palette.primary.main},"& .cr-calendar table":{color:"#a8aaad","& th":{color:"#b1b5b8"}},"& .cr-calendar .react-daypicker-root .day:hover:not(.empty), & .cr-calendar .react-daypicker-root .day.active":{backgroundColor:"transparent",color:"#888888"},"& .cr-calendar-color .react-daypicker-root .previous-month, & .cr-calendar-color .react-daypicker-root .next-month, & .cr-calendar-color .react-daypicker-root .previous-month:hover, & .cr-calendar-color .react-daypicker-root .next-month:hover":{color:e.palette.primary.contrastText},"& .cr-calendar-color .header .month-year":{color:e.palette.primary.contrastText},"& .cr-calendar-color table thead th":{color:"#313541"},"& .rbc-today":{backgroundColor:e.palette.background.paper},"& .rbc-show-more":{backgroundColor:"transparent"}},selectRoot:{marginLeft:12,backgroundColor:e.palette.background.paper,color:e.palette.text.primary}}}));t.a=r},3187:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(1086),c=a(306),l=a(304),i=a(303),d=a(1503),s=a(1330),p=a(59),m=a.n(p),u=a(1331),y=Object(d.c)(m.a);function v(e){var t=e.event;return r.a.createElement("span",null,r.a.createElement("strong",null,t.title),t.desc&&":  "+t.desc)}function g(e){var t=e.event;return r.a.createElement("span",null,r.a.createElement("em",{style:{color:"magenta"}},t.title),r.a.createElement("p",null,t.desc))}var b=function(e){var t=Object(u.a)(e);return r.a.createElement("div",{className:"app-calendar"},r.a.createElement(d.a,{className:t.root,events:s.a,localizer:y,defaultDate:new Date(2019,10,1),defaultView:"agenda",components:{event:v,agenda:{event:g}}}))};t.default=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement(l.a,{title:"React Big Calendar",refUrl:"http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic"}),r.a.createElement(i.a,null,r.a.createElement(o.a,{item:!0,xs:12},r.a.createElement(c.a,{title:"Rendering Calendar",component:b,source:"import React from 'react';\nimport {Calendar, momentLocalizer} from 'react-big-calendar';\nimport events from '../../events';\nimport moment from 'moment';\nimport useStyles from '../../calandar.style';\n\nconst localizer = momentLocalizer(moment);\n\nfunction Event({event}) {\n  return (\n    <span>\n      <strong>{event.title}</strong>\n      {event.desc && ':  ' + event.desc}\n    </span>\n  );\n}\n\nfunction EventAgenda({event}) {\n  return (\n    <span>\n      <em style={{color: 'magenta'}}>{event.title}</em>\n      <p>{event.desc}</p>\n    </span>\n  );\n}\n\nconst Rendering = (props) => {\n  const classes = useStyles(props);\n  return (\n    <div className='app-calendar'>\n      <Calendar\n        className={classes.root}\n        events={events}\n        localizer={localizer}\n        defaultDate={new Date(2019, 10, 1)}\n        defaultView='agenda'\n        components={{\n          event: Event,\n          agenda: {\n            event: EventAgenda,\n          },\n        }}\n      />\n    </div>\n  );\n};\n\nexport default Rendering;\n"}))))}}}]);
//# sourceMappingURL=120.40fd785f.chunk.js.map