		/*
		 * 心跳，每个页面到一条有，所以会影响性能，隐藏的页面
		 */	
		var es = new EventSource($$$.siturl+"m=App&c=Ac&a=xitiao");
        es.addEventListener("message",function(e){
//        	console.log(e.data);
        },false);//使用false表示在冒泡阶段处理事件，而不是捕获阶段。	