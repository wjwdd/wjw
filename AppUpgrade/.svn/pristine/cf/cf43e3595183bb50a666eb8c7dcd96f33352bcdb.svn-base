
	var gonsjianjie = document.querySelector('.gonsjianjie');
	var showbtn = document.querySelector('.show-btn');
	text_flag = true;
/*	showbtn.onclick = function(){
		if(text_flag){
			gonsjianjie.classList.toggle('content-hide');
			this.innerHTML = '折叠信息';
			text_flag = false;
		}else {
			gonsjianjie.classList.toggle('content-hide');
			this.innerHTML = '展开信息';
			text_flag = true;
		}
	}
*/
	
			// 轮播图
			var fenxiangurl,fengxianglog,fengxiangtext,fengxiangtop;
			var cid = localStorage.getItem('cid');	
			console.log(cid);
	        mui.ajax($$$.siturl+'m=App&c=index&a=companyfile&cid='+cid,{
				type:'get',
				success:function(data){
					var jsons=JSON.parse(data);
					console.log(JSON.stringify(jsons));
					fengxiangtop="直招帮";
					fengxianglog=$$$.imgurl+'data/weixin/1.png';
					fengxiangtext="【直招帮】 " + jsons.data.companyname + "多个岗位正在招聘，就等你来报名。";
					//console.log(fengxiangtext);
					fengxiangtop=fengxiangtext;
					var sliderbox = document.querySelector('#slider');
					var jobs=jsons.jobs;	
					var reslut="";
					var reslut1=""; 
//					for(var i=0;i< jobs.length;i++ ){
//						
//						reslut+='<li class="mui-table-view-cell mui-media li_togo_next" id="'+jobs[i].jid+'">';
//						reslut+='<a href=":;">';
//						reslut+=' <img class="mui-media-object mui-pull-left" src="'+$$$.imgurl+jobs[i].logo+'" style="height: 3.2em;width:3.3em;border-radius: 3px;margin-top: .4em;max-width: none;">';	
//						reslut+=' <div class="mui-media-body">';	
//						reslut+='<p class="mui-ellipsis" style="color: #8f8f94;">' + jobs[i].companyname + ' </p>';	
//						reslut+='<span class="mui-ellipsis; " style="color: #8f8f94;">'+jobs[i].category_cn+'</span><span class="mui-ellipsis mui-pull-right" style="color: #8f8f94;">'+jobs[i].minwage+'-'+jobs[i].maxwage+'元</span>';	
//						reslut+='<p class=""></p><span style="color: #8f8f94;" class="mui-ellipsis">全请将</span><span style="color: #8f8f94;" class="mui-ellipsis mui-pull-right">'+jobs[i].district_cn+'</span>';	
//						reslut+='</div>';	
//						reslut+='</a>';
//						reslut+='</li>';
//					}
					for(var i=0;i< jobs.length;i++ ){	
						
						var tags = jobs[i].tag_cn.split(',');
			            var leng=0;
			            if(tags.length>3){
			                leng=3;
			
			            }else{
			                leng=tags.length;
			            }
			            var srce='';
			            for (var x=0; x <leng; x++) {
			                // alert(tags[i]);
			                srce+='<span style="font-size:12px;line-height: 12px;height:18px;padding:2px 0;box-sizing: border-box;display: inline-block;text-align: center;border:1px solid #5CA8FC;border-radius: 5px;color:#5CA8FC;margin-right:3px;">';
			                srce+=tags[x]+'</span>';
			                
			            }
						reslut+='<li class="mui-table-view-cell mui-media li_togo_next" style="border-bottom:1px solid #efefef;" id="'+jobs[i].jid+'">';
						reslut+='<a href=" ">';
							reslut+=' <div class="mui-media-body" style="">';	
								// 公司名称 + 薪资
								reslut+='<span class="mui-ellipsis" style="color: #8f8f94;color:#000;font-size:15px;font-weight:600;color: #626262;">' + jobs[i].jobs_name + ' </span><span class="mui-ellipsis mui-pull-right" style="color: #EB793B;">'+jobs[i].minwage+'-'+jobs[i].maxwage+'元</span>';	
								
								// 第二行工种 + 地区 + 小标签
								reslut+='<p class=""><span class="mui-ellipsis; " style="color: #737373;">'+jobs[i].category_cn+'</span><span style="margin-left:20%;" class="mui-ellipsis">'+srce+'</span><span style="color: #000;font-size:13px;color: #626262;" class="mui-ellipsis mui-pull-right" >'+jobs[i].district_cn+'</span></p >';
								
							reslut+='</div>';	
						reslut+='</ a>';
						reslut+='</li>';
					
					}
					reslut1+='<div class="bt" style="background:#EFEFF4;margin:0px 0 20px;padding: 20px 0 20px;text-align: center;color:#fff;">您想要的职位没有找到？<a href="../search/search.html">立即搜索</a></div>';
					var str2='<li class="mui-table-view-cell " style="list-style: none;background-color: #fff;margin-top: 3px;"><img class="pro2" src="image/pro2.png" alt="" /><div class="profile" style="font-size: 16px;">该企业正在招聘职位</div></li>';;
					
					document.querySelector('.uilist').innerHTML=str2+reslut+reslut1; 					
					//点击事件
					var alist=document.querySelectorAll('.li_togo_next');					
					for (var i=0;i< alist.length;i++){							
						alist[i].addEventListener('click',function(e){
							e.preventDefault();
								localStorage.setItem("jid", this.getAttribute('id'));
								//localStorage.getItem("jid");
								mui.openWindow({
								    url: '../job/job.html',  
								    id:localStorage.getItem("jid")
								  });
							e.stopPropagation();
						}) 
					}
					//alert(JSON.stringify(jsons.data));
					document.querySelector('.gongsimigncheng').innerHTML=jsons.data.companyname;
					document.querySelector('.gongzhng').innerHTML=jsons.data.nature_cn+'|'+jsons.data.district_cn ;
					document.querySelector('.gonsjianjie').innerHTML=jsons.data.contents
					//document.querySelector('.qiyexinxi-li').innerHTML=jsons.data.nature_cn+'|'+jsons.data.scale_cn+'|'+jsons.data.district_cn; 
					//document.querySelector('.gongsimingchneg-li').setAttribute('data-id',jsons.data.cid);
//					document.querySelector('.gongsimingchneg-li').addEventListener('click',function(e){
//						e.preventDefault();
//						var cid=this.getAttribute('data-id');
//							localStorage.setItem("cid", cid);
//						mui.openWindow({
//						    url:'../company/company.html',
//						    id:'company',
//						})
//						e.stopPropagation();
//					});
					//轮播图
					var result = '';
	               
	                function lunbotu(jsons){
	                	var result = '';
		                var tar = jsons;
		                //(JSON.stringify(tar));
		                var url = $$$.imgurl;
		                result  += '<div class="mui-slider-item"><a href="#"><img style="height:140px;" src="'+ url + tar[tar.length -1 ] +'" /></a></div>';
						result  += '<div class="mui-slider-item"><a href="#"><img style="height:140px;" src="'+ url + tar[0] +'" /></a></div>';
		                for(var x = 1; x < tar.length-1; x++){
							result  += '<div class="mui-slider-item"><a href="#"><img style="height:140px;" src="'+ url + tar[x] +'" /></a></div>';
						}
	                	result  += '<div class="mui-slider-item"><a href="#"><img style="height:140px;" src="'+ url + tar[tar.length -1 ] +'" /></a></div>';
	                	result  += '<div class="mui-slider-item"><a href="#"><img style="height:140px;" src="'+ url + tar[0] +'" /></a></div>';
		                sliderbox.innerHTML = result;
		                
		                // 创建轮播图对象
		                var gallery = mui('.mui-slider');
						gallery.slider({
						  interval:0  //自动轮播周期，若为0则不自动播放，默认为0；
						});
	                }
	                
	                lunbotu(jsons.img);
	           }    
		});	
		document.addEventListener( "plusready",  function(){},true);
