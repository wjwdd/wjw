(function(window){var svgSprite="<svg>"+""+'<symbol id="icon-brush" viewBox="0 0 1024 1024">'+""+'<path d="M766.88 435.264l-176.608-176.64 66.72-66.752 176.544 176.704-66.656 66.688zM401.44 800.96L224.64 624.192l0.256 0.064L545.024 303.904l176.64 176.64L401.376 800.96zM224 801.92v-87.872l87.712 87.68-87.68 0.192z m655.04-478.528l-176.768-176.736A60.96 60.96 0 0 0 656.96 128a63.968 63.968 0 0 0-45.12 18.848L179.584 579.008a63.936 63.936 0 0 0-17.92 54.368c-0.768 2.688-1.696 5.312-1.696 8.256v160.288c0 35.136 28.576 63.68 63.712 63.68h160.32c2.88 0 5.504-0.896 8.192-1.632 2.976 0.416 5.952 0.832 8.96 0.832 16.416 0 32.896-6.272 45.44-18.816l432.16-432.16a64 64 0 0 0 0.224-90.432z"  ></path>'+""+"</symbol>"+""+"</svg>";var script=function(){var scripts=document.getElementsByTagName("script");return scripts[scripts.length-1]}();var shouldInjectCss=script.getAttribute("data-injectcss");var ready=function(fn){if(document.addEventListener){if(~["complete","loaded","interactive"].indexOf(document.readyState)){setTimeout(fn,0)}else{var loadFn=function(){document.removeEventListener("DOMContentLoaded",loadFn,false);fn()};document.addEventListener("DOMContentLoaded",loadFn,false)}}else if(document.attachEvent){IEContentLoaded(window,fn)}function IEContentLoaded(w,fn){var d=w.document,done=false,init=function(){if(!done){done=true;fn()}};var polling=function(){try{d.documentElement.doScroll("left")}catch(e){setTimeout(polling,50);return}init()};polling();d.onreadystatechange=function(){if(d.readyState=="complete"){d.onreadystatechange=null;init()}}}};var before=function(el,target){target.parentNode.insertBefore(el,target)};var prepend=function(el,target){if(target.firstChild){before(el,target.firstChild)}else{target.appendChild(el)}};function appendSvg(){var div,svg;div=document.createElement("div");div.innerHTML=svgSprite;svgSprite=null;svg=div.getElementsByTagName("svg")[0];if(svg){svg.setAttribute("aria-hidden","true");svg.style.position="absolute";svg.style.width=0;svg.style.height=0;svg.style.overflow="hidden";prepend(svg,document.body)}}if(shouldInjectCss&&!window.__iconfont__svg__cssinject__){window.__iconfont__svg__cssinject__=true;try{document.write("<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>")}catch(e){console&&console.log(e)}}ready(appendSvg)})(window)