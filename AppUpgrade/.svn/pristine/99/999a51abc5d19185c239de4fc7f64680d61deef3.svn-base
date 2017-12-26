
		mui.ajax($$$.siturl + 'm=App&c=Tool&a=mingqilunbo5', {
			type: 'get',
			data: {

			},
			dataType: 'json',
			success: function(data) {
				var sliderbox = document.querySelector('#slider');

				lunbotu(data.data);
				//alert(JSON.stringify(data));
			}
		})
	
		function Creat_MQ(option) {
			this.id = option.id;
			this.data = option.data;

			this.init();
		}
		Creat_MQ.prototype = {
			init: function() {
				var lidata = this.creater(this.datafun());

				this.insert(lidata);
			},
			datafun: function() {
				return this.data;
			},
			creater: function(datas) {
				var result = "";
				(function(datas) {
					for(var i = 0; i < datas.length; i++) {
						var data = datas[i];
						result += '<li class="mui-table-view-cell mui-media" style="padding: 11px 0 11px 15px;" data-id=' + data.id + ' onclick="gotolind(this)">';
						result += '<a href="javascript:;" style="width: 100%;height: 90px;">';
						result += '<img class="mui-media-object mui-pull-left" src="' + $$$.imgurl + data.logo + '" style="position:relative;float:left;height: 60px;width:20%;border-radius: 3px;margin-top: .4em;max-width: none;">';
						result += '<div class="mui-media-body" style="position: relative;float:left;margin-top: 4px; width: 70%;">';
						result += '<p class="mui-ellipsis" style="padding-left: 0px; font-size: 13px; color: black;">' + data.companyname + '</p>';
						result += '<div class="" style=" height: 15px;margin-left: 0px; font-size: 17px; line-height: 15px; margin-bottom: 5px;">';
						result += '<span class="mui-icon mui-icon-star-filled staricon"></span>';
						result += '<span class="mui-icon mui-icon-star-filled staricon"></span>';
						result += '<span class="mui-icon mui-icon-star-filled staricon"></span>';
						result += '<span class="mui-icon mui-icon-star-filled staricon"></span>';
						result += '<span class="mui-icon mui-icon-star-filled staricon"></span>';
						result += '</div>';
						result += '<p class=""></p><span style="padding-left: 0px;font-size: 13px;color: black;" class="mui-ellipsis">' + data.district_cn + '</span>';
						result += '<span class="show" style="color:#26aa12;font-size: 13px;color: black; display: inline-block; float: right; height: 17px;line-height: 17px;" class="mui-ellipsis" onclick="show(this)">' + "在招" + '' + data.count + '' + "个职位" + '<img src="../../../images/jiantou.png" style="width: 18px; padding-left: 2px;"></span>';
						result += '</div>';
						result += '</a>';
						result += '<div class="bg" style="background-color:#ECEAEA; padding-top: 15px; padding-left: 15px; display:none;">';
						for(var x = 0; x < data.tagUrl.length; x++) {
							result += '<span class="bg2" style="font-size: 13px; display: inline-block; padding:3px 15px; border:1px solid #8D8D8D;border-radius: 5px; margin-bottom: 15px; margin-right: 25px; color: #000;" data-jobid="' + data.tagUrl[x].id + '" onclick="openjob(this)">' + data.tagUrl[x].tag + '</span>'
						}
						result += '</div>';
						result += '</li>';
					}
				})(datas)
				return result;
			},
			insert: function(data) {
				var self = this;
				var div = document.createElement('div');
				var list = document.querySelector(this.id);
				//				console.log(list);

				div.innerHTML = data;

				if(list.append) {
					list.append(div);
				} else {
					list.appendChild(div);
				}
				var lilist = div.children;
				/*  	for(var i=0;i<lilist.length;i++){
							//alert(lilist[i]);
						lilist[i].onclick=function(){
			            	var li=this;
			            	var cid=li.getAttribute('data-id');
							localStorage.setItem("cid", cid);
							mui.openWindow({
							    url:'../../company/company.html',
							    id:'company',
							})
		           		}
					}
				*/
			},
		};
		//阻止冒泡
		function stopPropagation() {
			var event = window.event || event;　
			if(event.stopPropagation) {　　
				event.stopPropagation();　　
			} else {　　　　
				event.cancelBubble = true;　　
			}
		}

		function show(data, e) {

			stopPropagation(e);
//			console.log(data)
			var bg = data.parentNode.parentNode.parentNode.childNodes[1];
			if(bg.style.display == "none") {
				bg.style.display = "block";
			} else {
				bg.style.display = "none";
			}
		}

		function openjob(data, e) {
			stopPropagation(e);
			var datajobid = data.getAttribute("data-jobid");
			localStorage.setItem("jid", datajobid);
			mui.openWindow({
				url: '../../job/job.html',
				id: 'job',
				extras: {
					// jid:jid
				},
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				waiting: {
					autoShow: true, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
				}
			})
		}

		var page = 1;

		mui.ajax($$$.siturl + 'm=App&c=index&a=minqitj&page=' + page, {
			type: 'get',
			data: {},
			dataType: 'json',
			success: function(str) {
				crea('.uilist', str.data);

				function crea(id, data) {
					var list = new Creat_MQ({
						id: id,
						data: data,
					})
				}
			},
			error: function(xhr, type, errorThrown) {
				mui.toast('遇到问题，正在完善', {
					duration: 'short',
					type: 'div'
				});
			}
		})

		//		mui.init({
		//		  pullRefresh : {
		//			    container:'#refreshContainer',//待刷新区域标识，querySelector能定位的css选择器均可，比如：id、.class等
		//			    up : {
		//		      height:50,//可选.默认50.触发上拉加载拖动距离
		//		      auto:true,//可选,默认false.自动上拉加载一次
		//		      contentrefresh : "正在加载...",//可选，正在加载状态时，上拉加载控件上显示的标题内容
		//		      contentnomore:'没有更多数据了',//可选，请求完毕若没有更多数据时显示的提醒内容；
		//		      callback :pullfresh_function //必选，刷新函数，根据具体业务来编写，比如通过ajax从服务器获取新数据；
		//		    }
		//		  } 
		//		});

		function pullfresh_function() {
			page++;
			request();
			this.endPullupToRefresh(false);

			function request() {
				mui.ajax($$$.siturl + 'm=App&c=index&a=minqitj&page=' + page, {
					type: 'get',
					data: {},
					dataType: 'json',
					success: function(str) {

						crea('.uilist', str.data);

						function crea(id, data) {
							var list = new Creat_MQ({
								id: id,
								data: data,
							})
						}

					},
					error: function(xhr, type, errorThrown) {
						mui.toast('遇到问题，正在完善', {
							duration: 'short',
							type: 'div'
						});
					}
				})
			}
		}

		var sliderbox = document.querySelector('#slider');
		function lunbotu(data) {
			var result = '';
			var tar = data;
			var url = $$$.imgurl;
			result += '<div class="mui-slider-item"><a onclick="tiaozhuan(this)" data-id="' + tar[tar.length - 1]['cid'] + '"><img style="height:120px;" src="' + url + tar[tar.length - 1]['img'] + '" /></a></div>';
			result += '<div class="mui-slider-item"><a onclick="tiaozhuan(this)" data-id="' + tar[0]['cid'] + '"><img style="height:120px;" src="' + url + tar[0]['img'] + '" /></a></div>';
			for(var x = 1; x < tar.length - 1; x++) {
				result += '<div class="mui-slider-item"><a onclick="tiaozhuan(this)" data-id="' + tar[x]['cid'] + '"><img style="height:120px;" src="' + url + tar[x]['img'] + '" /></a></div>';
			}
			result += '<div class="mui-slider-item"><a onclick="tiaozhuan(this)" data-id="' + tar[tar.length - 1]['cid'] + '"><img style="height:120px;" src="' + url + tar[tar.length - 1]['img'] + '" /></a></div>';
			result += '<div class="mui-slider-item"><a onclick="tiaozhuan(this)" data-id="' + tar[0]['cid'] + '"><img style="height:120px;" src="' + url + tar[0]['img'] + '" /></a></div>';
			sliderbox.innerHTML = result;
			// 创建轮播图对象
			var gallery = mui('.mui-slider');
			gallery.slider({
				interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
			});
		}
		function tiaozhuan(data) {
			//				var gosid = data.getAttribute('data-id');
			//				console.log(gosid);
			//				alert(gosid);return;
			//var cid = data.getAttribute('data-cid');
			gotolind(data)
		}
		function gotolind(t) {
			var gosid = t.getAttribute('data-id');
			localStorage.setItem('cid', gosid);
			mui.openWindow({
					url: '../../company/company.html',
					id: '../../company/company.html',
					extras: {

					},
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
					}
				})
				//mui.alert(gosid,'id');
		}
		//		var bg2 = document.querySelector('.bg2');
		//		alert(bg2.innerHTML)
