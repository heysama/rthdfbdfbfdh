(function(a){a.fn.maxlength=function(b){var c=a(this);return c.each(function(){b=a.extend({},{counterContainer:!1,text:"%left characters left"},b);var c=a(this),d={options:b,field:c,counter:a('<div class="maxlength"></div>'),maxLength:parseInt(c.attr("maxlength"),10),lastLength:null,updateCounter:function(){var b=this.field.val().length,c=this.options.text.replace(/\B%(length|maxlength|left)\b/g,a.proxy(function(a,c){return"length"==c?b:"maxlength"==c?this.maxLength:this.maxLength-b},this));this.counter.html(c),b!=this.lastLength&&this.updateLength(b)},updateLength:function(a){this.field.trigger("update.maxlength",[this.field,this.lastLength,a,this.maxLength,this.maxLength-a]),this.lastLength=a}};d.maxLength&&(d.field.data("maxlength",d).bind({"keyup change":function(){a(this).data("maxlength").updateCounter()},"cut paste drop":function(){setTimeout(a.proxy(function(){a(this).data("maxlength").updateCounter()},this),1)}}),b.counterContainer?b.counterContainer.append(d.counter):d.field.after(d.counter),d.updateCounter())}),c}})(jQuery);(function(factory){if(typeof define==='function'&&define.amd){define(['jquery'],factory);}else{factory(window.jQuery);}}(function($){$.fn.numeric=function(config,callback){if(typeof config==="boolean"){config={decimal:config,negative:true,decimalPlaces:-1}}config=config||{};if(typeof config.negative=="undefined"){config.negative=true}var decimal=config.decimal===false?"":config.decimal||".";var negative=config.negative===true?true:false;var decimalPlaces=typeof config.decimalPlaces=="undefined"?-1:config.decimalPlaces;callback=typeof callback=="function"?callback:function(){};return this.data("numeric.decimal",decimal).data("numeric.negative",negative).data("numeric.callback",callback).data("numeric.decimalPlaces",decimalPlaces).keypress($.fn.numeric.keypress).keyup($.fn.numeric.keyup).blur($.fn.numeric.blur)};$.fn.numeric.keypress=function(e){var decimal=$.data(this,"numeric.decimal");var negative=$.data(this,"numeric.negative");var decimalPlaces=$.data(this,"numeric.decimalPlaces");var key=e.charCode?e.charCode:e.keyCode?e.keyCode:0;if(key==13&&this.nodeName.toLowerCase()=="input"){return true}else if(key==13){return false}var allow=false;if(e.ctrlKey&&key==97||e.ctrlKey&&key==65){return true}if(e.ctrlKey&&key==120||e.ctrlKey&&key==88){return true}if(e.ctrlKey&&key==99||e.ctrlKey&&key==67){return true}if(e.ctrlKey&&key==122||e.ctrlKey&&key==90){return true}if(e.ctrlKey&&key==118||e.ctrlKey&&key==86||e.shiftKey&&key==45){return true}if(key<48||key>57){var value=$(this).val();if($.inArray("-",value.split(""))!==0&&negative&&key==45&&(value.length===0||parseInt($.fn.getSelectionStart(this),10)===0)){return true}if(decimal&&key==decimal.charCodeAt(0)&&$.inArray(decimal,value.split(""))!=-1){allow=false}if(key!=8&&key!=9&&key!=13&&key!=35&&key!=36&&key!=37&&key!=39&&key!=46){allow=false}else{if(typeof e.charCode!="undefined"){if(e.keyCode==e.which&&e.which!==0){allow=true;if(e.which==46){allow=false}}else if(e.keyCode!==0&&e.charCode===0&&e.which===0){allow=true}}}if(decimal&&key==decimal.charCodeAt(0)){if($.inArray(decimal,value.split(""))==-1){allow=true}else{allow=false}}}else{allow=true;if(decimal&&decimalPlaces>0){var dot=$.inArray(decimal,$(this).val().split(""));if(dot>=0&&$(this).val().length>dot+decimalPlaces){allow=false}}}return allow};$.fn.numeric.keyup=function(e){var val=$(this).val();if(val&&val.length>0){var carat=$.fn.getSelectionStart(this);var selectionEnd=$.fn.getSelectionEnd(this);var decimal=$.data(this,"numeric.decimal");var negative=$.data(this,"numeric.negative");var decimalPlaces=$.data(this,"numeric.decimalPlaces");if(decimal!==""&&decimal!==null){var dot=$.inArray(decimal,val.split(""));if(dot===0){this.value="0"+val;carat++;selectionEnd++}if(dot==1&&val.charAt(0)=="-"){this.value="-0"+val.substring(1);carat++;selectionEnd++}val=this.value}var validChars=[0,1,2,3,4,5,6,7,8,9,"-",decimal];var length=val.length;for(var i=length-1;i>=0;i--){var ch=val.charAt(i);if(i!==0&&ch=="-"){val=val.substring(0,i)+val.substring(i+1)}else if(i===0&&!negative&&ch=="-"){val=val.substring(1)}var validChar=false;for(var j=0;j<validChars.length;j++){if(ch==validChars[j]){validChar=true;break}}if(!validChar||ch==" "){val=val.substring(0,i)+val.substring(i+1)}}var firstDecimal=$.inArray(decimal,val.split(""));if(firstDecimal>0){for(var k=length-1;k>firstDecimal;k--){var chch=val.charAt(k);if(chch==decimal){val=val.substring(0,k)+val.substring(k+1)}}}if(decimal&&decimalPlaces>0){var dot=$.inArray(decimal,val.split(""));if(dot>=0){val=val.substring(0,dot+decimalPlaces+1);selectionEnd=Math.min(val.length,selectionEnd)}}this.value=val;$.fn.setSelection(this,[carat,selectionEnd])}};$.fn.numeric.blur=function(){var decimal=$.data(this,"numeric.decimal");var callback=$.data(this,"numeric.callback");var negative=$.data(this,"numeric.negative");var val=this.value;if(val!==""){var re=new RegExp("^"+(negative?"-?":"")+"\\d+$|^"+(negative?"-?":"")+"\\d*"+decimal+"\\d+$");if(!re.exec(val)){callback.apply(this)}}};$.fn.removeNumeric=function(){return this.data("numeric.decimal",null).data("numeric.negative",null).data("numeric.callback",null).data("numeric.decimalPlaces",null).unbind("keypress",$.fn.numeric.keypress).unbind("keyup",$.fn.numeric.keyup).unbind("blur",$.fn.numeric.blur)};$.fn.getSelectionStart=function(o){if(o.type==="number"){return undefined}else if(o.createTextRange&&document.selection){var r=document.selection.createRange().duplicate();r.moveEnd("character",o.value.length);if(r.text=="")return o.value.length;return Math.max(0,o.value.lastIndexOf(r.text))}else{try{return o.selectionStart}catch(e){return 0}}};$.fn.getSelectionEnd=function(o){if(o.type==="number"){return undefined}else if(o.createTextRange&&document.selection){var r=document.selection.createRange().duplicate();r.moveStart("character",-o.value.length);return r.text.length}else return o.selectionEnd};$.fn.setSelection=function(o,p){if(typeof p=="number"){p=[p,p]}if(p&&p.constructor==Array&&p.length==2){if(o.type==="number"){o.focus()}else if(o.createTextRange){var r=o.createTextRange();r.collapse(true);r.moveStart("character",p[0]);r.moveEnd("character",p[1]-p[0]);r.select()}else{o.focus();try{if(o.setSelectionRange){o.setSelectionRange(p[0],p[1])}}catch(e){}}}}}));var $jscomp={scope:{},findInternal:function(a,f,c){a instanceof String&&(a=String(a));for(var l=a.length,g=0;g<l;g++){var b=a[g];if(f.call(c,b,g,a))return{i:g,v:b}}return{i:-1,v:void 0}}};$jscomp.defineProperty="function"==typeof Object.defineProperties?Object.defineProperty:function(a,f,c){if(c.get||c.set)throw new TypeError("ES3 does not support getters and setters.");a!=Array.prototype&&a!=Object.prototype&&(a[f]=c.value)};$jscomp.getGlobal=function(a){return"undefined"!=typeof window&&window===a?a:"undefined"!=typeof global&&null!=global?global:a};$jscomp.global=$jscomp.getGlobal(this);$jscomp.polyfill=function(a,f,c,l){if(f){c=$jscomp.global;a=a.split(".");for(l=0;l<a.length-1;l++){var g=a[l];g in c||(c[g]={});c=c[g]}a=a[a.length-1];l=c[a];f=f(l);f!=l&&null!=f&&$jscomp.defineProperty(c,a,{configurable:!0,writable:!0,value:f})}};$jscomp.polyfill("Array.prototype.find",function(a){return a?a:function(a,c){return $jscomp.findInternal(this,a,c).v}},"es6-impl","es3");(function(a,f,c){"function"===typeof define&&define.amd?define(["jquery"],a):"object"===typeof exports?module.exports=a(require("jquery")):a(f||c)})(function(a){var f=function(b,h,e){var d={invalid:[],getCaret:function(){try{var a,n=0,h=b.get(0),e=document.selection,k=h.selectionStart;if(e&&-1===navigator.appVersion.indexOf("MSIE 10"))a=e.createRange(),a.moveStart("character",-d.val().length),n=a.text.length;else if(k||"0"===k)n=k;return n}catch(A){}},setCaret:function(a){try{if(b.is(":focus")){var p,d=b.get(0);d.setSelectionRange?d.setSelectionRange(a,a):(p=d.createTextRange(),p.collapse(!0),p.moveEnd("character",a),p.moveStart("character",a),p.select())}}catch(z){}},events:function(){b.on("keydown.mask",function(a){b.data("mask-keycode",a.keyCode||a.which);b.data("mask-previus-value",b.val())}).on(a.jMaskGlobals.useInput?"input.mask":"keyup.mask",d.behaviour).on("paste.mask drop.mask",function(){setTimeout(function(){b.keydown().keyup()},100)}).on("change.mask",function(){b.data("changed",!0)}).on("blur.mask",function(){c===d.val()||b.data("changed")||b.trigger("change");b.data("changed",!1)}).on("blur.mask",function(){c=d.val()}).on("focus.mask",function(b){!0===e.selectOnFocus&&a(b.target).select()}).on("focusout.mask",function(){e.clearIfNotMatch&&!g.test(d.val())&&d.val("")})},getRegexMask:function(){for(var a=[],b,d,e,k,c=0;c<h.length;c++)(b=m.translation[h.charAt(c)])?(d=b.pattern.toString().replace(/.{1}$|^.{1}/g,""),e=b.optional,(b=b.recursive)?(a.push(h.charAt(c)),k={digit:h.charAt(c),pattern:d}):a.push(e||b?d+"?":d)):a.push(h.charAt(c).replace(/[-\/\\^$*+?.()|[\]{}]/g,"\\$&"));a=a.join("");k&&(a=a.replace(new RegExp("("+k.digit+"(.*"+k.digit+")?)"),"($1)?").replace(new RegExp(k.digit,"g"),k.pattern));return new RegExp(a)},destroyEvents:function(){b.off("input keydown keyup paste drop blur focusout ".split(" ").join(".mask "))},val:function(a){var d=b.is("input")?"val":"text";if(0<arguments.length){if(b[d]()!==a)b[d](a);d=b}else d=b[d]();return d},calculateCaretPosition:function(a,d){var h=d.length,e=b.data("mask-previus-value"),k=e.length;8===b.data("mask-keycode")&&e!==d?a-=d.slice(0,a).length-e.slice(0,a).length:e!==d&&(a=a>=k?h:a+(d.slice(0,a).length-e.slice(0,a).length));return a},behaviour:function(e){e=e||window.event;d.invalid=[];var h=b.data("mask-keycode");if(-1===a.inArray(h,m.byPassKeys)){var h=d.getMasked(),c=d.getCaret();setTimeout(function(a,b){d.setCaret(d.calculateCaretPosition(a,b))},10,c,h);d.val(h);d.setCaret(c);return d.callbacks(e)}},getMasked:function(a,b){var c=[],p=void 0===b?d.val():b+"",k=0,g=h.length,f=0,l=p.length,n=1,v="push",w=-1,r,u;e.reverse?(v="unshift",n=-1,r=0,k=g-1,f=l-1,u=function(){return-1<k&&-1<f}):(r=g-1,u=function(){return k<g&&f<l});for(var y;u();){var x=h.charAt(k),t=p.charAt(f),q=m.translation[x];if(q)t.match(q.pattern)?(c[v](t),q.recursive&&(-1===w?w=k:k===r&&(k=w-n),r===w&&(k-=n)),k+=n):t===y?y=void 0:q.optional?(k+=n,f-=n):q.fallback?(c[v](q.fallback),k+=n,f-=n):d.invalid.push({p:f,v:t,e:q.pattern}),f+=n;else{if(!a)c[v](x);t===x?f+=n:y=x;k+=n}}p=h.charAt(r);g!==l+1||m.translation[p]||c.push(p);return c.join("")},callbacks:function(a){var f=d.val(),p=f!==c,g=[f,a,b,e],k=function(a,b,d){"function"===typeof e[a]&&b&&e[a].apply(this,d)};k("onChange",!0===p,g);k("onKeyPress",!0===p,g);k("onComplete",f.length===h.length,g);k("onInvalid",0<d.invalid.length,[f,a,b,d.invalid,e])}};b=a(b);var m=this,c=d.val(),g;h="function"===typeof h?h(d.val(),void 0,b,e):h;m.mask=h;m.options=e;m.remove=function(){var a=d.getCaret();d.destroyEvents();d.val(m.getCleanVal());d.setCaret(a);return b};m.getCleanVal=function(){return d.getMasked(!0)};m.getMaskedVal=function(a){return d.getMasked(!1,a)};m.init=function(c){c=c||!1;e=e||{};m.clearIfNotMatch=a.jMaskGlobals.clearIfNotMatch;m.byPassKeys=a.jMaskGlobals.byPassKeys;m.translation=a.extend({},a.jMaskGlobals.translation,e.translation);m=a.extend(!0,{},m,e);g=d.getRegexMask();if(c)d.events(),d.val(d.getMasked());else{e.placeholder&&b.attr("placeholder",e.placeholder);b.data("mask")&&b.attr("autocomplete","off");c=0;for(var f=!0;c<h.length;c++){var l=m.translation[h.charAt(c)];if(l&&l.recursive){f=!1;break}}f&&b.attr("maxlength",h.length);d.destroyEvents();d.events();c=d.getCaret();d.val(d.getMasked());d.setCaret(c)}};m.init(!b.is("input"))};a.maskWatchers={};var c=function(){var b=a(this),c={},e=b.attr("data-mask");b.attr("data-mask-reverse")&&(c.reverse=!0);b.attr("data-mask-clearifnotmatch")&&(c.clearIfNotMatch=!0);"true"===b.attr("data-mask-selectonfocus")&&(c.selectOnFocus=!0);if(l(b,e,c))return b.data("mask",new f(this,e,c))},l=function(b,c,e){e=e||{};var d=a(b).data("mask"),h=JSON.stringify;b=a(b).val()||a(b).text();try{return"function"===typeof c&&(c=c(b)),"object"!==typeof d||h(d.options)!==h(e)||d.mask!==c}catch(u){}},g=function(a){var b=document.createElement("div"),c;a="on"+a;c=a in b;c||(b.setAttribute(a,"return;"),c="function"===typeof b[a]);return c};a.fn.mask=function(b,c){c=c||{};var e=this.selector,d=a.jMaskGlobals,h=d.watchInterval,d=c.watchInputs||d.watchInputs,g=function(){if(l(this,b,c))return a(this).data("mask",new f(this,b,c))};a(this).each(g);e&&""!==e&&d&&(clearInterval(a.maskWatchers[e]),a.maskWatchers[e]=setInterval(function(){a(document).find(e).each(g)},h));return this};a.fn.masked=function(a){return this.data("mask").getMaskedVal(a)};a.fn.unmask=function(){clearInterval(a.maskWatchers[this.selector]);delete a.maskWatchers[this.selector];return this.each(function(){var b=a(this).data("mask");b&&b.remove().removeData("mask")})};a.fn.cleanVal=function(){return this.data("mask").getCleanVal()};a.applyDataMask=function(b){b=b||a.jMaskGlobals.maskElements;(b instanceof a?b:a(b)).filter(a.jMaskGlobals.dataMaskAttr).each(c)};g={maskElements:"input,td,span,div",dataMaskAttr:"*[data-mask]",dataMask:!0,watchInterval:300,watchInputs:!0,useInput:!/Chrome\/28/.test(window.navigator.userAgent)&&g("input"),watchDataMask:!1,byPassKeys:[9,16,17,18,36,37,38,39,40,91],translation:{0:{pattern:/\d/},9:{pattern:/\d/,optional:!0},"#":{pattern:/\d/,recursive:!0},A:{pattern:/[a-zA-Z0-9]/},S:{pattern:/[a-zA-Z]/}}};a.jMaskGlobals=a.jMaskGlobals||{};g=a.jMaskGlobals=a.extend(!0,{},g,a.jMaskGlobals);g.dataMask&&a.applyDataMask();setInterval(function(){a.jMaskGlobals.watchDataMask&&a.applyDataMask()},g.watchInterval)},window.jQuery,window.Zepto);(function(root,factory){'use strict';if(typeof define==='function'&&define.amd){define([],factory)}else if(typeof exports==='object'){module.exports=factory()}else{root.autosize=factory()}}(this,function(){function main(ta){if(!ta||!ta.nodeName||ta.nodeName!=='TEXTAREA'||ta.hasAttribute('data-autosize-on')){return}var maxHeight;var heightOffset;function init(){var style=window.getComputedStyle(ta,null);if(style.resize==='vertical'){ta.style.resize='none'}else if(style.resize==='both'){ta.style.resize='horizontal'}ta.style.wordWrap='break-word';var width=ta.style.width;ta.style.width='0px';ta.offsetWidth;ta.style.width=width;maxHeight=style.maxHeight!=='none'?parseFloat(style.maxHeight):false;if(style.boxSizing==='content-box'){heightOffset=-(parseFloat(style.paddingTop)+parseFloat(style.paddingBottom))}else{heightOffset=parseFloat(style.borderTopWidth)+parseFloat(style.borderBottomWidth)}adjust()}function adjust(){var startHeight=ta.style.height;var htmlTop=document.documentElement.scrollTop;var bodyTop=document.body.scrollTop;ta.style.height='auto';var endHeight=ta.scrollHeight+heightOffset;if(maxHeight!==false&&maxHeight<endHeight){endHeight=maxHeight;if(ta.style.overflowY!=='scroll'){ta.style.overflowY='scroll'}}else if(ta.style.overflowY!=='hidden'){ta.style.overflowY='hidden'}ta.style.height=endHeight+'px';document.documentElement.scrollTop=htmlTop;document.body.scrollTop=bodyTop;if(startHeight!==ta.style.height){var evt=document.createEvent('Event');evt.initEvent('autosize.resized',true,false);ta.dispatchEvent(evt)}}if('onpropertychange'in ta&&'oninput'in ta){ta.addEventListener('keyup',adjust)}window.addEventListener('resize',adjust);ta.addEventListener('input',adjust);ta.addEventListener('autosize.update',adjust);ta.addEventListener('autosize.destroy',function(style){window.removeEventListener('resize',adjust);ta.removeEventListener('input',adjust);ta.removeEventListener('keyup',adjust);ta.removeEventListener('autosize.destroy');Object.keys(style).forEach(function(key){ta.style[key]=style[key]});ta.removeAttribute('data-autosize-on')}.bind(ta,{height:ta.style.height,overflow:ta.style.overflow,overflowY:ta.style.overflowY,wordWrap:ta.style.wordWrap,resize:ta.style.resize}));ta.setAttribute('data-autosize-on',true);ta.style.overflow='hidden';ta.style.overflowY='hidden';init()}if(typeof window.getComputedStyle!=='function'){return function(elements){return elements}}else{return function(elements){if(elements&&elements.length){Array.prototype.forEach.call(elements,main)}else if(elements&&elements.nodeName){main(elements)}return elements}}}));