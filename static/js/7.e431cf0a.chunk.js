(this["webpackJsonpsmisplan-typescript"]=this["webpackJsonpsmisplan-typescript"]||[]).push([[7],{339:function(e,t,a){"use strict";t.a=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"ascend",a=arguments.length>2?arguments[2]:void 0;return function(n,i){var c=a&&"number"===a?+n[e]:n[e],r=a&&"number"===a?+i[e]:i[e];return c<r?"ascend"===t?-1:1:c>r?"ascend"===t?1:-1:0}}},340:function(e,t,a){"use strict";a.d(t,"a",(function(){return j}));var n=a(4),i=a(0),c=a(151),r=a(56),d=a(154),l=a(147),o=a(148),s=a(152),u=a(70),j=function(e){var t=Object(i.useState)([]),a=Object(n.a)(t,2),j=a[0],f=a[1],b=Object(u.b)(),v=b.dictionary,h=b.setDictionary,O=Object(d.a)(),m=O.data,x=O.isError,p=O.isLoading,k=Object(l.a)(),g=k.data,w=k.isError,N=k.isLoading,y=Object(r.b)(),D=Object(i.useCallback)((function(e,t){var a=null===g||void 0===g?void 0:g.find((function(e){return e.id===t}));return a&&"multi-select"===a.type&&v[t]?e.split(",").map((function(e){return v[t][e].text})).join(", "):a&&["select","checkbox"].includes(a.type)&&v[t]&&v[t][e]?v[t][e].text:e}),[g,v]);return Object(i.useEffect)((function(){y(Object(o.c)(e)),y(Object(s.a)(e))}),[e,y]),Object(i.useEffect)((function(){g&&g.filter((function(e){return["select","multi-select","checkbox"].includes(e.type)})).forEach((function(e){return h(e.id,e.validValues)}))}),[g,h]),Object(i.useEffect)((function(){m&&g&&Object.keys(v).length&&f((function(){return m.map((function(e){return Object(c.mapValues)(e,D)}))}))}),[m,g,v,D]),{data:j,isErrorData:x,isLoadingData:p,metadata:g,isErrorMetadata:w,isLoadingMetadata:N}}},341:function(e,t,a){"use strict";var n=a(323),i=a(390),c=a(7);t.a=function(e){var t=e.title,a=e.dataSource,r=void 0===a?[]:a,d=e.noDataText,l=void 0===d?"\u041d\u0435\u0442 \u0434\u0430\u043d\u043d\u044b\u0445":d,o=e.avatar,s=e.width,u=void 0===s?600:s;r&&r.length?n.a.info({title:t,content:Object(c.jsx)(i.b,{dataSource:r,renderItem:function(e){return Object(c.jsx)(i.b.Item,{children:Object(c.jsx)(i.b.Item.Meta,{avatar:o,title:e.title,description:e.description.split("\n").map((function(e){return Object(c.jsx)("div",{children:e})}))})})}}),width:"".concat(u,"px")}):n.a.info({title:t,content:l,width:"".concat(u,"px")})}},377:function(e,t,a){},378:function(e,t,a){e.exports={"detailed-event-info-row":"DataCalendar_detailed-event-info-row__3iXF4","detailed-event-info-headcol":"DataCalendar_detailed-event-info-headcol__1kx2O","detailed-event-info-col":"DataCalendar_detailed-event-info-col__eI6lM"}},389:function(e,t,a){"use strict";a.r(t);var n=a(3),i=a(4),c=a(0),r=a(38),d=a.n(r),l=(a(369),a(383)),o=a(384),s=a(323),u=a(386),j=a(399),f=a(382),b=a(349),v=a(372),h=a(374),O=a(376),m=(a(377),a(7)),x={today:"\u0421\u0435\u0433\u043e\u0434\u043d\u044f",month:"\u041c\u0435\u0441\u044f\u0446",week:"\u041d\u0435\u0434\u0435\u043b\u044f",day:"\u0414\u0435\u043d\u044c",list:"\u0421\u043f\u0438\u0441\u043e\u043a"},p=function(e){var t=e.dates,a=e.handleDayClick,n=e.handleEventClick,i="dayGridMonth";return/\/calendar\/list/.test(document.location.pathname)&&(i="listWeek"),Object(m.jsx)(f.a,{events:t,eventTimeFormat:{hour:"2-digit",minute:"2-digit"},plugins:[b.b,v.a,h.a,O.a],initialView:i,dateClick:a,eventClick:n,locale:"ru",selectable:!0,weekNumberCalculation:"ISO",weekends:!1,slotMinTime:"08:00:00",headerToolbar:{left:"dayGridMonth,timeGridWeek,timeGridDay,listWeek",center:"title",right:"today prev,next"},buttonText:x})},k=a(149),g=a(340),w=a(339),N=a(25),y=a(378),D=a.n(y),E=a(341);d.a.locale("ru");t.default=function(e){var t=e.mode,a=Object(c.useState)([]),r=Object(i.a)(a,2),f=r[0],b=r[1],v=Object(g.a)(t),h=v.data,O=v.isErrorData,x=v.isLoadingData,y=v.isLoadingMetadata,C=v.isErrorMetadata;Object(c.useEffect)((function(){h&&h.length&&b(h.map((function(e){return Object(n.a)(Object(n.a)({},e),{},{date:new Date("".concat(e.date," ").concat(e.time))})})))}),[h]);var S=function(e){var t=f.find((function(t){return d()(e.event.start).toISOString()===d()(t.date).toISOString()&&t.title===e.event.title}));return t?Object(m.jsxs)(m.Fragment,{children:[Object(m.jsxs)(l.a,{className:D.a["detailed-event-info-row"],children:[Object(m.jsx)(o.a,{className:D.a["detailed-event-info-headcol"],children:"\u0422\u0435\u043c\u0430"}),Object(m.jsx)(o.a,{className:D.a["detailed-event-info-col"],children:t.title})]}),Object(m.jsxs)(l.a,{className:D.a["detailed-event-info-row"],children:[Object(m.jsx)(o.a,{className:D.a["detailed-event-info-headcol"],children:"\u041e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0435\u043d\u043d\u044b\u0439"}),Object(m.jsx)(o.a,{className:D.a["detailed-event-info-col"],children:t.responsible})]}),Object(m.jsxs)(l.a,{className:D.a["detailed-event-info-row"],children:[Object(m.jsx)(o.a,{className:D.a["detailed-event-info-headcol"],children:"\u0423\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u0438"}),Object(m.jsx)(o.a,{className:D.a["detailed-event-info-col"],children:t.participants})]}),Object(m.jsxs)(l.a,{className:D.a["detailed-event-info-row"],children:[Object(m.jsx)(o.a,{className:D.a["detailed-event-info-headcol"],children:"\u0414\u0430\u0442\u0430"}),Object(m.jsx)(o.a,{className:D.a["detailed-event-info-col"],children:d()(t.date).format(N.b)})]}),Object(m.jsxs)(l.a,{className:D.a["detailed-event-info-row"],children:[Object(m.jsx)(o.a,{className:D.a["detailed-event-info-headcol"],children:"\u0412\u0440\u0435\u043c\u044f"}),Object(m.jsx)(o.a,{className:D.a["detailed-event-info-col"],children:d()(t.date).format(N.c)})]})]}):"\u041d\u0435\u0442 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044b\u0445 \u0441\u043e\u0432\u0435\u0449\u0430\u043d\u0438\u0439"};return x||y?Object(m.jsx)("div",{className:D.a.center,children:Object(m.jsx)(k.a,{})}):!O&&!C||f?f&&Object(m.jsx)(p,{dates:f,handleEventClick:function(e){s.a.info({title:"\u0421\u043e\u0432\u0435\u0449\u0430\u043d\u0438e",content:S(e),width:"600px"})},handleDayClick:function(e){var t;Object(E.a)({title:"\u0421\u043e\u0432\u0435\u0449\u0430\u043d\u0438\u044f \u0437\u0430 \u0434\u0435\u043d\u044c",avatar:Object(m.jsx)(j.a,{}),dataSource:(t=e,f.filter((function(e){return d()(e.date).format(N.a)===t.dateStr})).sort(Object(w.a)("time","ascend")).map((function(e){return{title:d()(e.date).format(N.c),description:e.result}}))),noDataText:"\u041d\u0435\u0442 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044b\u0445 \u0441\u043e\u0432\u0435\u0449\u0430\u043d\u0438\u0439"})}}):Object(m.jsx)("div",{className:D.a.center,children:Object(m.jsx)(u.a.Title,{level:3,children:"\u041e\u0448\u0438\u0431\u043a\u0430 \u043f\u043e\u043b\u0443\u0447\u0435\u043d\u0438\u044f \u0434\u0430\u043d\u043d\u044b\u0445"})})}}}]);
//# sourceMappingURL=7.e431cf0a.chunk.js.map