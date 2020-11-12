(function(t){function e(e){for(var r,s,o=e[0],c=e[1],u=e[2],h=0,f=[];h<o.length;h++)s=o[h],Object.prototype.hasOwnProperty.call(i,s)&&i[s]&&f.push(i[s][0]),i[s]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(t[r]=c[r]);l&&l(e);while(f.length)f.shift()();return a.push.apply(a,u||[]),n()}function n(){for(var t,e=0;e<a.length;e++){for(var n=a[e],r=!0,o=1;o<n.length;o++){var c=n[o];0!==i[c]&&(r=!1)}r&&(a.splice(e--,1),t=s(s.s=n[0]))}return t}var r={},i={app:0},a=[];function s(e){if(r[e])return r[e].exports;var n=r[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.m=t,s.c=r,s.d=function(t,e,n){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)s.d(n,r,function(e){return t[e]}.bind(null,r));return n},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/rwanalyzer-webclient/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=e,o=o.slice();for(var u=0;u<o.length;u++)e(o[u]);var l=c;a.push([0,"chunk-vendors"]),n()})({0:function(t,e,n){t.exports=n("cd49")},"022c":function(t,e,n){"use strict";n("a3f7")},"0e87":function(t,e,n){"use strict";n("a8e1")},2465:function(t,e,n){},3826:function(t,e,n){"use strict";n("2465")},"3aa3":function(t,e,n){},"857d":function(t,e,n){"use strict";n("8cbe")},"895f":function(t,e,n){},"8bf9":function(t,e,n){"use strict";n("895f")},"8cbe":function(t,e,n){},"90ab":function(t,e,n){"use strict";n("3aa3")},a3f7:function(t,e,n){},a42c:function(t,e,n){"use strict";n("d072")},a8e1:function(t,e,n){},cd49:function(t,e,n){"use strict";n.r(e);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),i=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"background"},[n("div",{staticClass:"root"},[n("div",{staticClass:"left"},[n("Tab",{attrs:{items:t.entries,currentEntry:t.currentEntry}})],1),n("div",{staticClass:"main"},[n("div",{staticClass:"content"},[n("div",{staticClass:"list border"},[n("ProfileTable",{attrs:{logManager:t.logManager}})],1),n("div",{staticClass:"graph border"},[n("BasicChart",{attrs:{logManager:t.logManager,range:500}})],1),n("div",{staticClass:"tickGraph border"},[n("TPSChart",{attrs:{tpsLogManager:t.tpsLogManager}})],1)]),n("div",{staticClass:"optional"},[n("div",{staticClass:"information-panel"}),n("div",{staticClass:"control-panel"}),n("FPSTPSChart",{staticClass:"FPSTPS border",attrs:{logManager:t.fpstpsLogManager}})],1)])])])},a=[],s=(n("b0c0"),n("4ec9"),n("d3b7"),n("6062"),n("3ca3"),n("ddb0"),function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"graph",staticClass:"graph"})}),o=[],c=(n("4de4"),n("7db0"),n("a15b"),n("d81d"),n("b65f"),n("a9e3"),n("b85c")),u=n("3835"),l=n("5698"),h=n("b400"),f=n("7338"),d=n("2909"),g=n("d4ec"),p=n("bee2"),v=n("c8bb"),k=n.n(v),m=(n("a4d3"),n("e01a"),n("d28b"),n("96cf"),function(){function t(e,n,r){if(Object(g["a"])(this,t),this.profileLog=e,this.chunkSize=n,n<=0)throw new Error("chunkSize is lower than 1, value: ".concat(n));this._logs=[],this.hit=0,this.time=0,this.tick=r}return Object(p["a"])(t,[{key:Symbol.iterator,value:regeneratorRuntime.mark((function t(){var e,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:e=Object(c["a"])(this._logs.values()),t.prev=1,e.s();case 3:if((n=e.n()).done){t.next=9;break}return r=n.value,t.next=7,r;case 7:t.next=3;break;case 9:t.next=14;break;case 11:t.prev=11,t.t0=t["catch"](1),e.e(t.t0);case 14:return t.prev=14,e.f(),t.finish(14);case 17:case"end":return t.stop()}}),t,this,[[1,11,14,17]])}))},{key:"isFull",value:function(){return this._logs.length>=this.chunkSize}},{key:"appendLog",value:function(t){if(this._logs.length>=this.chunkSize)throw new Error("LogChunk is full");this._logs.push(t),this.hit+=t.hit,this.time+=t.time}}]),t}()),y=function(){function t(e,n){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1e4,i=arguments.length>3&&void 0!==arguments[3]?arguments[3]:10;Object(g["a"])(this,t),this.label=e,this.key=n,this.tickLogLimit=r,this.chunkSize=i,this._logChunks=new k.a,this._average=0,this._total=0,this._hits=0,this.queueSize=Math.floor(r/i)}return Object(p["a"])(t,[{key:"appendLog",value:function(t){var e={start:t.tick-t.tick%this.chunkSize,end:t.tick-t.tick%this.chunkSize+this.chunkSize},n=this._logChunks.peekBack();(0==this._logChunks.length||n&&n.tick.end<t.tick)&&(this.updateData(),this._logChunks.push(new m(this,this.chunkSize,e))),this._logChunks.peekBack().appendLog(t),this._logChunks.length>=this.queueSize&&this._logChunks.removeFront()}},{key:"updateData",value:function(){if(0!==this._logChunks.length){if(this._logChunks.length===this.queueSize-1){var t=this._logChunks.peekFront(),e=this._logChunks.peekBack();this._total=this._total-t.time+e.time,this._hits=this._hits-t.hit+e.hit}else{var n=this._logChunks.peekBack();this._total+=n.time,this._hits+=n.hit}this._average=this.total/this._logChunks.length*this.chunkSize}}},{key:"chunks",get:function(){return this._logChunks.toArray()}},{key:"average",get:function(){return this._average}},{key:"total",get:function(){return this._total}},{key:"hits",get:function(){return this._hits}}]),t}(),b=function(){function t(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1e4,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:10;Object(g["a"])(this,t),this._plogs=new Map,this._currentTick=0,this._logLimit=e,this._chunkSize=n}return Object(p["a"])(t,[{key:"clearLogs",value:function(){this._plogs.clear()}},{key:"processData",value:function(t){var e=t.globalTick,n=t.tickLogs;this._currentTick=e;var r,i=Object(c["a"])(n);try{for(i.s();!(r=i.n()).done;){var a=r.value,s=this._plogs.get(a.key);s||(s=new y(a.label,a.key,this._logLimit,this.chunkSize),this._plogs.set(a.key,s)),s.appendLog(a)}}catch(o){i.e(o)}finally{i.f()}}},{key:"tickRange",get:function(){return{start:this.currentTick-this._logLimit,end:this.currentTick}}},{key:"chunkRange",get:function(){return{start:Math.trunc((this.currentTick-this._logLimit)/this.chunkSize),end:Math.trunc(this.currentTick/this.chunkSize)}}},{key:"profileLogs",get:function(){return Object(d["a"])(this._plogs.values())}},{key:"currentTick",get:function(){return this._currentTick}},{key:"chunkSize",get:function(){return this._chunkSize}}]),t}();function _(t){var e,n=Object(c["a"])(t);try{for(n.s();!(e=n.n()).done;){var r=e.value;clearInterval(r)}}catch(i){n.e(i)}finally{n.f()}return[]}var S,C=r["default"].extend({props:{logManager:{type:b,required:!0},yAxisReference:{type:String,default:"time"},range:{type:Number,default:300}},watch:{yAxisReference:function(){this.paths.selectAll("path").remove()}},computed:{},data:function(){var t=l["d"]("svg").attr("width",0).attr("height",0);t.node();var e=t.append("g").attr("transform","translate(1280, 100)"),n=t.append("g").attr("transform","translate(0, 700)").attr("color","white").style("font","20px times"),r=t.append("g").attr("transform","translate(50, 0)").attr("color","white").style("font","18px times"),i=t.append("g").attr("fill","none").attr("stroke","steelblue").attr("stroke-width",1.5).attr("stroke-linejoin","round").attr("stroke-linecap","round"),a=t.append("rect").style("fill","none").style("pointer-events","all").attr("width",1920).attr("height",720),s=t.append("g").append("text").style("opacity",0).attr("text-anchor","left").attr("alignment-baseline","middle"),o=t.append("circle").attr("stroke","red").attr("stroke-width","5").attr("cx","500").attr("cy","500").attr("r","8").attr("fill","#00000000");return{svg:t,xAxis:n,yAxis:r,paths:i,legend:e,rect:a,focusText:s,circle:o,mousePos:[0,0],isHover:!1,frameCounter:0,rootRectSize:[0,0],updateKeys:[]}},mounted:function(){var t=this,e=this.svg.node(),n=this.$refs.graph;n.append(e),this.rootRectSize=[n.offsetWidth,n.offsetHeight],this.svg.attr("width",this.rootRectSize[0]).attr("height",this.rootRectSize[1]),this.updateKeys=_(this.updateKeys);var r=5;this.updateKeys=[setInterval((function(){t.updateGraph()}),12.5),setInterval((function(){console.log("framerate: ".concat(t.frameCounter/r)),t.frameCounter=0}),1e3*r)],this.rect.on("mouseover",(function(e){return t.mouseover(e)})).on("mousemove",(function(e){return t.mousemove(e)})).on("mouseleave",(function(e){return t.mouseleave(e)}))},methods:{getColor:l["k"](l["l"]),updateGraph:function(){var t=this,e=Object(u["a"])(this.rootRectSize,2),n=e[0],r=e[1],i=40;this.xAxis.attr("transform","translate(".concat(0,", ",r-i/2,")")),this.yAxis.attr("transform","translate(".concat(i,", ",0,")"));var a=this.logManager,s={start:Math.trunc(a.currentTick-this.range),end:Math.trunc(a.currentTick-a.chunkSize)},o=this.logManager.profileLogs.map((function(t){var e=Object(f["AsEnumerable"])(t.chunks).Where((function(t){return s.start<=t.tick.start&&t.tick.end<=s.end})).ToArray();return{label:t.label,key:t.key,filteredChunks:e}})),d=o;if(d.length<=0)this.paths.selectAll("path").remove();else{var g=Object(f["AsEnumerable"])(o).Select((function(t){return t.filteredChunks})).SelectMany((function(t){return t})).ToArray(),p=function(){var t=[s.start,s.end];return l["j"]().domain(t).range([i,n-i])}(),v=function(){var e=l["h"](g,(function(e){return t.getYValue(e)}))||0;return l["j"]().domain([0,e]).nice().range([r-i,i])}();this.xAxis.call(l["c"](p).tickValues([])),this.yAxis.call(l["b"](v));var k=l["g"]().x((function(t,e){return p(t.tick.start)})).y((function(e){return v(t.getYValue(e))})),m=this.paths.selectAll("path").data(d,(function(t){return t.key})).join((function(e){return e.append("path").attr("stroke",(function(e){return t.getColor(e.key)})).attr("d",(function(t){return k(t.filteredChunks)}))}),(function(e){return e.attr("stroke",(function(e){return t.getColor(e.key)})).attr("d",(function(t){return k(t.filteredChunks)}))}),(function(t){return t.remove()}));this.isHover&&function(){var e,n=t.mousePos[0],r=t.mousePos[1],i=p.invert(n),a=v.invert(r),s=[],u=Object(c["a"])(o);try{for(u.s();!(e=u.n()).done;){var l=e.value,f=l.filteredChunks.find((function(t){return t.tick.start<=i&&i<=t.tick.end}));f&&s.push({profileLog:l,selectedChunk:f})}}catch(g){u.e(g)}finally{u.f()}var d=h["a"](s,(function(e){return Math.abs(a-t.getYValue(e.selectedChunk))}));d&&(m.attr("stroke",(function(t){return t.key===d.profileLog.key?"#ff0000":"#ffffff1f"})).filter((function(t){return t.key===d.profileLog.key})).raise(),t.circle.attr("cx",p(d.selectedChunk.tick.start)).attr("cy",v(t.getYValue(d.selectedChunk))))}(),this.frameCounter++}},getYValue:function(t){return"hit"===this.yAxisReference?t.hit:t.time},mouseover:function(t){this.isHover=!0},mousemove:function(t){this.mousePos=l["i"](t)},mouseleave:function(t){this.isHover=!1}}}),x=C,w=(n("022c"),n("2877")),L=Object(w["a"])(x,s,o,!1,null,"7d949117",null),T=L.exports,O=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"tabs"},t._l(t.items.entries(),(function(e){var r=e[0],i=e[1];return n("div",[n("Tab",{staticClass:"tab",attrs:{name:r,set:i,currentEntry:t.currentEntry}})],1)})),0)},z=[],j=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root text"},[n("div",{staticClass:"title"},[n("h2",[t._v(t._s(t.name))])]),n("div",{staticClass:"scroll"},t._l(t.entries,(function(e){return n("div",{staticClass:"entry"},[e===t.currentEntry?n("button",{staticClass:"selected",attrs:{block:""}},[t._v(t._s(e))]):n("button",{attrs:{block:""}},[t._v(t._s(e))])])})),0)])},M=[],A=r["default"].extend({props:{name:{type:String,required:!0},set:{type:Set,required:!0},currentEntry:{type:String,required:!0}},computed:{entries:function(){var t=Object(d["a"])(this.set.values());return t}},mounted:function(){console.log(this.name),console.log(this.set)},watch:{}}),P=A,E=(n("3826"),Object(w["a"])(P,j,M,!1,null,"48e74706",null)),R=E.exports,q=r["default"].extend({components:{Tab:R},props:{items:{type:Map,required:!0},currentEntry:{type:String,required:!0}},watch:{items:function(){console.log("watched")}},mounted:function(){},methods:{}}),F=q,K=(n("90ab"),Object(w["a"])(F,O,z,!1,null,"5e87b5a1",null)),W=K.exports,$=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"root-ProfileTable"},[n("div",{staticClass:"table"},[t._m(0),n("div",{staticClass:"divider"}),n("div",{staticClass:"content"},t._l(t.profileLogs,(function(e){return n("div",{staticClass:"row"},[n("div",{staticClass:"col average"},[t._v(t._s(t._f("number")(e.average)))]),n("div",{staticClass:"col percent"},[t._v("NULL")]),n("div",{staticClass:"col total"},[t._v(t._s(t._f("number")(e.total)))]),n("div",{staticClass:"col hits"},[t._v(t._s(e.hits))]),n("div",{staticClass:"col large-col"},[t._v(t._s(e.label))])])})),0)])])},D=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"header"},[n("div",{staticClass:"col"},[t._v("Average")]),n("div",{staticClass:"col"},[t._v("Percent")]),n("div",{staticClass:"col"},[t._v("Total")]),n("div",{staticClass:"col"},[t._v("Hits")]),n("div",{staticClass:"col large-col"},[t._v("Name")])])}],G=(n("b680"),n("25f0"),r["default"].extend({props:{logManager:{type:b,required:!0}},computed:{},filters:{number:function(t){return t.toFixed(3).toString()+"ms"}},data:function(){return{profileLogs:[],updateKeys:[]}},mounted:function(){var t=this;_(this.updateKeys),this.updateKeys=[setInterval((function(){t.updateValues()}),100)]},methods:{updateValues:function(){this.profileLogs=this.logManager.profileLogs.sort((function(t){return t.average}))}}})),I=G,V=(n("8bf9"),Object(w["a"])(I,$,D,!1,null,"0f6a1a3e",null)),B=V.exports,H=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"graph",staticClass:"graph"})},N=[],Y=(n("13d5"),function(){function t(e,n){Object(g["a"])(this,t),this.tickRange=e,this.chunkSize=n,this._timeSum=0,this._percentage=0,this._timeSumOfWatchedLogs=0,this._tpsLogs=[]}return Object(p["a"])(t,[{key:"appendLog",value:function(t){this._tpsLogs.push(t),this._timeSum+=t.totalTime,this._timeSumOfWatchedLogs+=t.totalTimeOfWatchedLogs,this._percentage=this.timeSumOfWatchedLogs/this.timeSum}},{key:"tpsLogs",get:function(){return this._tpsLogs}},{key:"timeSum",get:function(){return this._timeSum}},{key:"timeSumOfWatchedLogs",get:function(){return this._timeSumOfWatchedLogs}},{key:"percentage",get:function(){return this._percentage}},{key:"isFull",get:function(){return this._tpsLogs.length===this.chunkSize}}]),t}()),J=function(){function t(e,n){Object(g["a"])(this,t),this.logLimit=e,this.chunkSize=n,this._logChunks=new k.a,this.queueSize=Math.trunc(e/n),this._currentTick=0}return Object(p["a"])(t,[{key:"processData",value:function(t){var e=t.globalTick,n=t.tickLogs,r=t.totalTime;this._currentTick=e;var i=n.reduce((function(t,e){return t+e.time}),0),a=this._logChunks.peekBack();if(!a||a.isFull){var s={start:e-e%this.chunkSize,end:e-e%this.chunkSize+this.chunkSize};a=new Y(s,this.chunkSize),this._logChunks.push(a),this._logChunks.length>=this.queueSize&&this._logChunks.dequeue()}a.appendLog({tick:e,totalTime:r,totalTimeOfWatchedLogs:i})}},{key:"logChunks",get:function(){return this._logChunks.toArray()}},{key:"currentTick",get:function(){return this._currentTick}}]),t}(),U=r["default"].extend({props:{tpsLogManager:{type:J,required:!0},range:{type:Number,default:300}},data:function(){var t=l["d"]("svg").attr("width",0).attr("height",0),e=t.append("g").attr("color","white").style("font","20px times"),n=t.append("g").attr("color","white").attr("font","18px times"),r=t.append("path").attr("class","tpsPath"),i=t.append("path").attr("class","area"),a=t.append("defs");a.append("linearGradient").attr("id","area_gradient").attr("x1","0%").attr("x2","0%").attr("y1","0%").attr("y2","100%").selectAll("stop").data([{offset:"0%",color:"green"},{offset:"100%",color:"red"}]).enter().append("stop").attr("offset",(function(t){return t.offset})).attr("stop-color",(function(t){return t.color}));return{svg:t,xAxis:e,yAxis:n,tpsPath:r,area:i,rootRectSize:[0,0],updateKeys:[]}},mounted:function(){var t=this,e=this.svg.node(),n=this.$refs.graph;n.append(e),this.rootRectSize=[n.offsetWidth,n.offsetHeight],this.svg.attr("width",this.rootRectSize[0]).attr("height",this.rootRectSize[1]),console.log("rect size: ".concat(this.rootRectSize)),_(this.updateKeys),this.updateKeys=[setInterval((function(){t.updateGraph()}),12.5)]},methods:{updateGraph:function(){var t={start:this.tpsLogManager.currentTick-this.range,end:this.tpsLogManager.currentTick},e=Object(f["AsEnumerable"])(this.tpsLogManager.logChunks).Where((function(e){return t.start<=e.tickRange.start&&e.tickRange.end<=t.end})).ToArray(),n=Object(u["a"])(this.rootRectSize,2),r=n[0],i=n[1],a=40;if(this.xAxis.attr("transform","translate(".concat(0,", ",i-a/2,")")),this.yAxis.attr("transform","translate(".concat(a,", ",0,")")),e.length<=0)this.tpsPath.selectAll("path").remove();else{var s=l["j"]().domain([t.start,t.end]).range([a,r-a]),o=l["j"]().domain([0,1]).nice().range([i-a,a]);this.xAxis.call(l["c"](s).tickValues([])),this.yAxis.call(l["b"](o).ticks(1));var c=l["a"]().x((function(t){return s(t.tickRange.start)})).y0(o(0)).y1((function(t){return o(t.percentage)})),h=l["g"]().x((function(t){return s(t.tickRange.start)})).y((function(t){return o(t.percentage)}));this.tpsPath.attr("d",h(e)),this.area.attr("d",c(e))}}}}),Q=U,X=(n("857d"),Object(w["a"])(Q,H,N,!1,null,null,null)),Z=X.exports,tt=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"root",staticClass:"root-FPSTPSChart"})},et=[],nt=(n("8ba4"),function(){function t(){Object(g["a"])(this,t),this._queue=new k.a,this._queueSize=10}return Object(p["a"])(t,[{key:"appendLog",value:function(t){this._queue.push(t),this.omitExcessLog()}},{key:"omitExcessLog",value:function(){while(this._queue.length>this.queueSize)this._queue.dequeue()}},{key:"queueSize",get:function(){return this._queueSize},set:function(t){this._queueSize=t,this.omitExcessLog()}},{key:"logs",get:function(){return this._queue.toArray()}}]),t}()),rt=r["default"].extend({props:{logManager:{type:nt,required:!0}},computed:{},data:function(){var t=l["d"]("svg").attr("width",10).attr("height",10),e=t.append("g"),n=t.append("g"),r=t.append("path").attr("fill","none").attr("stroke","#FF0000"),i=t.append("path").attr("fill","none").attr("stroke","#FFFFFF");return{svg:t,xAxis:e,yAxis:n,tpsPath:i,targetTPSLine:r,rootRectSize:[0,0],updateKeys:[]}},mounted:function(){var t=this,e=this.$refs.root;e.append(this.svg.node()),this.rootRectSize=[e.offsetWidth,e.offsetHeight],this.svg.attr("width",this.rootRectSize[0]).attr("height",this.rootRectSize[1]),_(this.updateKeys),this.updateKeys=[setInterval((function(){t.updateGraph()}),10)]},methods:{updateGraph:function(){var t=Object(u["a"])(this.rootRectSize,2),e=t[0],n=t[1],r=40;this.xAxis.attr("transform","translate(".concat(0,", ",n-r/2,")")),this.yAxis.attr("transform","translate(".concat(r,", ",0,")"));var i=this.logManager,a=i.logs;if(!(a.length<=0)){var s=a[a.length-1].tpsTarget,o=Math.trunc(1.2*s),c=l["j"]().domain([0,a.length-1]).range([r,e-r]),h=l["j"]().domain([0,o]).range([n-r,r]);this.xAxis.call(l["c"](c).tickValues(c.ticks().filter(Number.isInteger)).tickFormat(l["f"]("d"))),this.yAxis.call(l["b"](h));var f=l["g"]().curve(l["e"]).x((function(t,e){return c(e)})).y((function(t){return h(t.tps)}));this.tpsPath.attr("d",f(a));var d=l["g"]().x((function(t){return c(t[0])})).y((function(t){return h(t[1])}));this.targetTPSLine.attr("d",d([[0,s],[a.length-1,s]]))}}}}),it=rt,at=(n("a42c"),Object(w["a"])(it,tt,et,!1,null,"9f7c7f76",null)),st=at.exports;(function(t){t["LogData"]="LogData",t["InitEntries"]="InitEntries",t["EntryAdded"]="EntryAdded",t["EntrySwapped"]="EntrySwapped",t["toggleTickState"]="ToggleGameState",t["FPSTPS"]="FPSTPS"})(S||(S={}));var ot=function(){function t(){var e=this;Object(g["a"])(this,t),this.webSocket=new WebSocket("ws://localhost:4000/rw_analyzer"),this.webSocket.onmessage=function(t){var n,r=JSON.parse(t.data);null===(n=e.onDataReceive)||void 0===n||n.call(e,r)}}return Object(p["a"])(t,[{key:"sendMessage",value:function(t){this.webSocket.send(JSON.stringify(t))}}]),t}(),ct=r["default"].extend({components:{BasicChart:T,TPSChart:Z,Tab:W,ProfileTable:B,FPSTPSChart:st},data:function(){var t=1e3,e=3,n=new b(t,e),r=new J(t,e),i=new ot,a=i,s=new nt,o={logManager:n,tpsLogManager:r,fpstpsLogManager:s,tick:0,tabs:new Map,currentEntry:"",entries:new Map,logs:[],yAxisReference:"avgTime",dataReceiver:a};return a.onDataReceive=function(t){switch(t.type){case S.LogData:n.processData(t),r.processData(t);break;case S.InitEntries:var e=Object(f["AsEnumerable"])(t.entries).GroupBy((function(t){return t.category}),(function(t){return t.name})).ToMap((function(t){return t.key}),(function(t){return new Set(t)}));o.entries=e;break;case S.EntryAdded:break;case S.EntrySwapped:o.currentEntry=t.entryName;break;case S.FPSTPS:s.appendLog(t);break}},o},computed:{},mounted:function(){},methods:{toggleTick:function(){this.dataReceiver.sendMessage({type:S.toggleTickState})}}}),ut=ct,lt=(n("0e87"),Object(w["a"])(ut,i,a,!1,null,"7e270494",null)),ht=lt.exports,ft=n("ce5b"),dt=n.n(ft);n("bf40");r["default"].config.productionTip=!1,r["default"].use(dt.a);var gt={};new r["default"]({vuetify:new dt.a(gt),render:function(t){return t(ht)}}).$mount("#app")},d072:function(t,e,n){}});
//# sourceMappingURL=app.828f310a.js.map