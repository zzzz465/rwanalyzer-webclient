(function(t){function e(e){for(var r,s,c=e[0],o=e[1],u=e[2],h=0,f=[];h<c.length;h++)s=c[h],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(r in o)Object.prototype.hasOwnProperty.call(o,r)&&(t[r]=o[r]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,c=1;c<n.length;c++){var o=n[c];0!==i[o]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/rwanalyzer-webclient/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],o=c.push.bind(c);c.push=e,c=c.slice();for(var u=0;u<c.length;u++)e(c[u]);var l=o;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"547d":function(t,e,n){},"6d42":function(t,e,n){"use strict";n("547d")},"912f":function(t,e,n){},"92f6":function(t,e,n){},"9c3c":function(t,e,n){"use strict";n("bbb8")},bbb8:function(t,e,n){},bc77:function(t,e,n){"use strict";n("92f6")},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r,i=n("2b0e"),a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root"},[n("div",{staticClass:"left"},[n("Tab",{staticClass:"tab",attrs:{items:t.tabs,currentEntry:t.currentEntry}})],1),n("div",{staticClass:"right"},[n("div",{staticClass:"top"},[n("v-btn",{on:{click:function(e){t.yAxisReference="hit"}}},[t._v("change to hit")]),n("v-btn",{on:{click:function(e){t.yAxisReference="time"}}},[t._v("change to time")]),n("v-btn",{on:{click:t.toggleTick}},[t._v("toggle Tick")])],1),n("div",{staticClass:"top"},[n("h3",[t._v("current setting: "+t._s(t.yAxisReference))])]),n("BasicChart",{staticClass:"graph",attrs:{logManager:t.logManager,yAxisReference:t.yAxisReference}})],1)])},s=[],c=(n("b0c0"),n("4ec9"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"graphRoot"},[n("div",{ref:"graph",staticClass:"graph"})])}),o=[],u=(n("4de4"),n("7db0"),n("a15b"),n("d81d"),n("b65f"),n("a9e3"),n("b85c")),l=n("5698"),h=n("b400"),f=n("7338"),d=n("2909"),p=n("d4ec"),g=n("bee2"),k=n("c8bb"),v=n.n(k),y=(n("a4d3"),n("e01a"),n("d28b"),n("96cf"),function(){function t(e,n,r){if(Object(p["a"])(this,t),this.profileLog=e,this.chunkSize=n,n<=0)throw new Error("chunkSize is lower than 1, value: ".concat(n));this._logs=[],this.hit=0,this.time=0,this.tick=r}return Object(g["a"])(t,[{key:Symbol.iterator,value:regeneratorRuntime.mark((function t(){var e,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=Object(u["a"])(this._logs.values()),t.prev=1,e.s();case 3:if((n=e.n()).done){t.next=9;break}return r=n.value,t.next=7,r;case 7:t.next=3;break;case 9:t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),e.e(t.t0);case 14:return t.prev=14,e.f(),t.finish(14);case 17:case"end":return t.stop()}}),t,this,[[1,11,14,17]])}))},{key:"isFull",value:function(){return this._logs.length>=this.chunkSize}},{key:"appendLog",value:function(t){if(this._logs.length>=this.chunkSize)throw new Error("LogChunk is full");this._logs.push(t),this.hit+=t.hit,this.time+=t.time}}]),t}()),b=function(){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10;Object(p["a"])(this,t),this.label=e,this.key=n,this.tickLogLimit=r,this.chunkSize=i,this._tickLogs=[],this.queueSize=r/i,this._logChunks=new v.a}return Object(g["a"])(t,[{key:"appendLog",value:function(t){var e={start:t.tick-t.tick%this.chunkSize,end:t.tick-t.tick%this.chunkSize+this.chunkSize},n=this._logChunks.peekBack();(0==this._logChunks.length||n&&n.tick.end<t.tick)&&this._logChunks.push(new y(this,this.chunkSize,e)),this._logChunks.peekBack().appendLog(t),this._logChunks.length>=this.queueSize&&this._logChunks.removeFront()}},{key:"chunks",get:function(){return this._logChunks.toArray()}}]),t}(),m=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;Object(p["a"])(this,t),this._plogs=new Map,this._currentTick=0,this._logLimit=e,this._chunkSize=n}return Object(g["a"])(t,[{key:"clearLogs",value:function(){this._plogs.clear()}},{key:"processData",value:function(t){var e=t.globalTick,n=t.tickLogs;this._currentTick=e;var r,i=Object(u["a"])(n);try{for(i.s();!(r=i.n()).done;){var a=r.value,s=this._plogs.get(a.key);s||(s=new b(a.label,a.key,this._logLimit,this.chunkSize),this._plogs.set(a.key,s)),s.appendLog(a)}}catch(c){i.e(c)}finally{i.f()}}},{key:"tickRange",get:function(){return{start:this.currentTick-this._logLimit,end:this.currentTick}}},{key:"chunkRange",get:function(){return{start:Math.trunc((this.currentTick-this._logLimit)/this.chunkSize),end:Math.trunc(this.currentTick/this.chunkSize)}}},{key:"profileLogs",get:function(){return Object(d["a"])(this._plogs.values())}},{key:"currentTick",get:function(){return this._currentTick}},{key:"chunkSize",get:function(){return this._chunkSize}}]),t}(),_=i["default"].extend({props:{logManager:{type:m,required:!0},yAxisReference:{type:String,default:"time"},range:{type:Number,default:300}},watch:{yAxisReference:function(){this.paths.selectAll("path").remove()}},computed:{},data:function(){var t=l["c"]("svg").attr("width",1920).attr("height",720);t.node();var e=t.append("g").attr("transform","translate(1280, 100)"),n=t.append("g").attr("transform","translate(0, 700)").attr("color","white").style("font","20px times"),r=t.append("g").attr("transform","translate(50, 0)").attr("color","white").style("font","18px times"),i=t.append("g").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("stroke-linejoin","round").attr("stroke-linecap","round"),a=t.append("rect").style("fill","none").style("pointer-events","all").attr("width",1920).attr("height",720),s=t.append("g").append("text").style("opacity",0).attr("text-anchor","left").attr("alignment-baseline","middle"),c=t.append("circle").attr("stroke","red").attr("stroke-width","5").attr("cx","500").attr("cy","500").attr("r","8").attr("fill","#00000000");return{svg:t,xAxis:n,yAxis:r,paths:i,legend:e,rect:a,focusText:s,circle:c,mousePos:[0,0],isHover:!1,frameCounter:0}},mounted:function(){var t=this,e=this.svg.node();this.$refs.graph.append(e),setInterval((function(){t.updateGraph()}),12.5),setInterval((function(){console.log("framerate: ".concat(t.frameCounter)),t.frameCounter=0}),1e3),this.rect.on("mouseover",(function(e){return t.mouseover(e)})).on("mousemove",(function(e){return t.mousemove(e)})).on("mouseleave",(function(e){return t.mouseleave(e)}))},methods:{getColor:l["h"](l["i"]),updateGraph:function(){var t=this,e=this.logManager,n={start:Math.trunc(e.currentTick-this.range),end:Math.trunc(e.currentTick-e.chunkSize)},r=this.logManager.profileLogs.map((function(t){var e=Object(f["AsEnumerable"])(t.chunks).Where((function(t){return n.start<=t.tick.start&&t.tick.end<=n.end})).ToArray();return{label:t.label,key:t.key,filteredChunks:e}})),i=r;if(i.length<=0)this.paths.selectAll("path").remove();else{var a=Object(f["AsEnumerable"])(r).Select((function(t){return t.filteredChunks})).SelectMany((function(t){return t})).ToArray(),s=function(){var t=[n.start,n.end];return l["g"]().domain(t).range([30,1250])}(),c=function(){var e=l["e"](a,(function(e){return t.getYValue(e)}))||0;return l["g"]().domain([0,e]).nice().range([690,30])}();this.xAxis.call(l["b"](s)),this.yAxis.call(l["a"](c));var o=l["d"]().x((function(t,e){return s(t.tick.start)})).y((function(e){return c(t.getYValue(e))})),d=this.paths.selectAll("path").data(i,(function(t){return t.key})).join((function(e){return e.append("path").attr("stroke",(function(e){return t.getColor(e.key)})).attr("d",(function(t){return o(t.filteredChunks)}))}),(function(e){return e.attr("stroke",(function(e){return t.getColor(e.key)})).attr("d",(function(t){return o(t.filteredChunks)}))}),(function(t){return t.remove()}));this.isHover&&function(){var e,n=t.mousePos[0],i=t.mousePos[1],a=s.invert(n),o=c.invert(i),l=[],f=Object(u["a"])(r);try{for(f.s();!(e=f.n()).done;){var p=e.value,g=p.filteredChunks.find((function(t){return t.tick.start<=a&&a<=t.tick.end}));g&&l.push({profileLog:p,selectedChunk:g})}}catch(v){f.e(v)}finally{f.f()}var k=h["a"](l,(function(e){return Math.abs(o-t.getYValue(e.selectedChunk))}));k&&(d.attr("stroke",(function(t){return t.key===k.profileLog.key?"#ff0000":"#ffffff1f"})).filter((function(t){return t.key===k.profileLog.key})).raise(),t.circle.attr("cx",s(k.selectedChunk.tick.start)).attr("cy",c(t.getYValue(k.selectedChunk))))}(),this.frameCounter++}},getYValue:function(t){return"hit"===this.yAxisReference?t.hit:t.time},mouseover:function(t){this.isHover=!0},mousemove:function(t){this.mousePos=l["f"](t)},mouseleave:function(t){this.isHover=!1}}}),w=_,S=(n("9c3c"),n("2877")),x=Object(S["a"])(w,c,o,!1,null,"cb0cc850",null),C=x.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tabs"},t._l(t.items.entries(),(function(e){var r=e[0],i=e[1];return n("div",[n("Tab",{attrs:{name:r,set:i,currentEntry:t.currentEntry}})],1)})),0)},j=[],T=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root"},[n("div",{staticClass:"title"},[n("h2",[t._v(t._s(t.name))])]),n("div",{staticClass:"scroll"},t._l(t.entries,(function(e){return n("div",{staticClass:"entries"},[e===t.currentEntry?n("v-btn",{staticClass:"selected",attrs:{block:""}},[t._v(t._s(e))]):n("v-btn",{attrs:{block:""}},[t._v(t._s(e))])],1)})),0)])},E=[],A=i["default"].extend({props:{name:{type:String,required:!0},set:{type:Set,required:!0},currentEntry:{type:String,required:!0}},computed:{entries:function(){var t=Object(d["a"])(this.set.values());return t}},mounted:function(){console.log(this.name),console.log(this.set)},watch:{}}),L=A,M=(n("6d42"),Object(S["a"])(L,T,E,!1,null,"7bac39fe",null)),z=M.exports,R=i["default"].extend({components:{Tab:z},props:{items:{type:Map,required:!0,default:function(){return new Map}},currentEntry:{type:String,required:!0}},watch:{items:function(){console.log("watched")}},mounted:function(){},methods:{}}),P=R,q=(n("bc77"),Object(S["a"])(P,O,j,!1,null,null,null)),D=q.exports;(function(t){t["LogData"]="LogData",t["InitEntries"]="InitEntries",t["EntryAdded"]="EntryAdded",t["EntrySwapped"]="EntrySwapped",t["toggleTickState"]="ToggleGameState"})(r||(r={}));var $=function(){function t(){var e=this;Object(p["a"])(this,t),this.webSocket=new WebSocket("ws://localhost:4000/rw_analyzer"),this.webSocket.onmessage=function(t){var n,r=JSON.parse(t.data);null===(n=e.onDataReceive)||void 0===n||n.call(e,r)}}return Object(g["a"])(t,[{key:"sendMessage",value:function(t){this.webSocket.send(JSON.stringify(t))}}]),t}(),B=i["default"].extend({components:{BasicChart:C,Tab:D},data:function(){var t=new m(1e3,3),e=new $,n=e,i={logManager:t,tick:0,tabs:new Map,currentEntry:"",logs:[],yAxisReference:"avgTime",dataReceiver:n};return n.onDataReceive=function(e){switch(e.type){case r.LogData:t.processData(e);break;case r.InitEntries:Object(f["AsEnumerable"])(e.entries).GroupBy((function(t){return t.category}),(function(t){return t.name})).ToMap((function(t){return t.key}),(function(t){return new Set(t)}));break;case r.EntryAdded:break;case r.EntrySwapped:i.currentEntry=e.entryName;break}},i},computed:{},mounted:function(){},methods:{toggleTick:function(){this.dataReceiver.sendMessage({type:r.toggleTickState})}}}),I=B,V=(n("ffa4"),Object(S["a"])(I,a,s,!1,null,"e69df596",null)),Y=V.exports,G=n("ce5b"),H=n.n(G);n("bf40");i["default"].config.productionTip=!1,i["default"].use(H.a);var J={};new i["default"]({vuetify:new H.a(J),render:function(t){return t(Y)}}).$mount("#app")},ffa4:function(t,e,n){"use strict";n("912f")}});
//# sourceMappingURL=app.77a4ad2b.js.map