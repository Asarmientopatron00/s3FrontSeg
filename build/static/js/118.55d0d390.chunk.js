(this.webpackJsonpcrema=this.webpackJsonpcrema||[]).push([[118],{1330:function(e,t,a){"use strict";var r=[{title:"All Day Event very long title",allDay:!0,start:new Date(2019,10,0),end:new Date(2019,10,1)},{title:"Long Event",start:new Date(2019,10,7),end:new Date(2019,10,10)},{title:"DTS STARTS",start:new Date(2019,9,110,0,0,0),end:new Date(2019,9,20,0,0,0)},{title:"DTS ENDS",start:new Date(2019,10,6,0,0,0),end:new Date(2019,10,10,0,0,0)},{title:"Some Event",start:new Date(2019,10,9,0,0,0),end:new Date(2019,10,9,0,0,0)},{title:"Conference",start:new Date(2019,10,11),end:new Date(2019,10,13),desc:"Big conference for important people"},{title:"Meeting",start:new Date(2019,10,12,10,30,0,0),end:new Date(2019,10,12,12,30,0,0),desc:"Pre-meeting meeting, to prepare for the meeting"},{title:"Lunch",start:new Date(2019,10,12,12,0,0,0),end:new Date(2019,10,12,110,0,0,0),desc:"Power lunch"},{title:"Meeting",start:new Date(2019,10,12,14,0,0,0),end:new Date(2019,10,12,15,0,0,0)},{title:"Happy Hour",start:new Date(2019,10,12,17,0,0,0),end:new Date(2019,10,12,17,30,0,0),desc:"Most important meal of the day"},{title:"Dinner",start:new Date(2019,10,12,20,0,0,0),end:new Date(2019,10,12,21,0,0,0)},{title:"Birthday Party",start:new Date(2019,10,10,7,0,0),end:new Date(2019,10,10,10,30,0)},{title:"Birthday Party 2",start:new Date(2019,10,10,7,0,0),end:new Date(2019,10,10,10,30,0)},{title:"Birthday Party 3",start:new Date(2019,10,10,7,0,0),end:new Date(2019,10,10,10,30,0)},{title:"Late Night Event",start:new Date(2019,10,17,19,30,0),end:new Date(2019,10,18,9,0,0)},{title:"Multi-day Event",start:new Date(2019,10,20,19,30,0),end:new Date(2019,10,22,9,0,0)}];t.a=r},1331:function(e,t,a){"use strict";var r=a(164),n=Object(r.a)((function(e){return{root:{"& .cr-calendar .react-daypicker-root .day.today, & .cr-calendar .react-daypicker-root .day.today:hover ":{color:e.palette.primary.main},"& .rbc-event, & .rbc-event.rbc-selected":{backgroundColor:e.palette.primary.main},"& .rbc-slot-selection":{backgroundColor:e.palette.primary.main},"& .rbc-toolbar button":{cursor:"pointer",color:e.palette.text.secondary,fontSize:"100%","&:hover, &:focus":{backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main,color:e.palette.primary.contrastText},"&:active, &.rbc-active":{backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main,color:e.palette.primary.contrastText,"&:hover, &:focus":{backgroundColor:e.palette.primary.main,borderColor:e.palette.primary.main,color:e.palette.primary.contrastText}}},"& .cr-calendar-color .header":{backgroundColor:e.palette.primary.main},"& .rbc-off-range-bg":{backgroundColor:e.palette.background.paper},"& .rbc-row-segment a":{color:e.palette.primary.main},"& .cr-calendar table":{color:"#a8aaad","& th":{color:"#b1b5b8"}},"& .cr-calendar .react-daypicker-root .day:hover:not(.empty), & .cr-calendar .react-daypicker-root .day.active":{backgroundColor:"transparent",color:"#888888"},"& .cr-calendar-color .react-daypicker-root .previous-month, & .cr-calendar-color .react-daypicker-root .next-month, & .cr-calendar-color .react-daypicker-root .previous-month:hover, & .cr-calendar-color .react-daypicker-root .next-month:hover":{color:e.palette.primary.contrastText},"& .cr-calendar-color .header .month-year":{color:e.palette.primary.contrastText},"& .cr-calendar-color table thead th":{color:"#313541"},"& .rbc-today":{backgroundColor:e.palette.background.paper},"& .rbc-show-more":{backgroundColor:"transparent"}},selectRoot:{marginLeft:12,backgroundColor:e.palette.background.paper,color:e.palette.text.primary}}}));t.a=n},3192:function(e,t,a){"use strict";a.r(t);var r=a(0),n=a.n(r),o=a(1086),c=a(306),l=a(304),i=a(303),d=a(26),p=a(7),s=a(22),m=a(1503),b=a(2715),y=a.n(b),u=a(1330),D=(a(2727),a(59)),w=a.n(D),g=a(1331),h=y()(m.a),v=function(){var e=Object(r.useState)(u.a),t=Object(s.a)(e,2),a=t[0],o=t[1],c=Object(g.a)();return n.a.createElement(h,{className:c.root,selectable:!0,localizer:Object(m.c)(w.a),events:a,onEventDrop:function(e){var t=e.event,r=e.start,n=e.end,c=e.isAllDay,l=a.indexOf(t),i=t.allDay;!t.allDay&&c?i=!0:t.allDay&&!c&&(i=!1);var s=Object(p.a)(Object(p.a)({},t),{},{start:r,end:n,allDay:i}),m=Object(d.a)(a);m.splice(l,1,s),o(m)},resizable:!0,onEventResize:function(e){var t=e.event,r=e.start,n=e.end,c=a.map((function(e){return e.id===t.id?Object(p.a)(Object(p.a)({},e),{},{start:r,end:n}):e}));o(c)},onSelectSlot:function(e){var t=a.map((function(e){return e.id})),r={id:Math.max.apply(Math,Object(d.a)(t))+1,title:"New Event",allDay:1===e.slots.length,start:e.start,end:e.end};o(a.concat([r]))},onDragStart:console.log,defaultView:m.b.MONTH,defaultDate:new Date(2019,10,12)})};t.default=function(){return n.a.createElement(n.a.Fragment,null,n.a.createElement(l.a,{title:"React Big Calendar",refUrl:"http://intljusticemission.github.io/react-big-calendar/examples/index.html#basic"}),n.a.createElement(i.a,null,n.a.createElement(o.a,{item:!0,xs:12},n.a.createElement(c.a,{title:"Dnd Calendar",component:v}))))}}}]);
//# sourceMappingURL=118.55d0d390.chunk.js.map