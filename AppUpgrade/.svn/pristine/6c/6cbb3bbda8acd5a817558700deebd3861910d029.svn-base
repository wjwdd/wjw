
					
					function quangouxz(){
						
						mui.openWindow({
								url: 'app/citylist/citylist.html',
								id: 'citylist.html'
							})
					}
					function search(){
						
						mui.openWindow({
								url: "app/search/search.html",
								id: 'search.html'
							})
					}
					function zhaopin(){
						
						mui.openWindow({
								url: "app/zhaopin/zhao.html",
								id: 'zhao.html'
							})
					}
					function kuaisu(){
						
						mui.openWindow({
								url: "app/circle/kuaisu/kuaisu.html",
								id: 'kuaisu.html'
							})
					}
					function fujin(){
						
						mui.openWindow({
								url: "app/circle/fujin/fujin.html",
								id: 'fujin.html'
							})
					}
					function famousenterprise(){
						
						mui.openWindow({
								url: "app/circle/mingqi/famousenterprise.html",
								id: 'famousenterprise.html'
							})
					}
					function zhichang(){
						
						mui.openWindow({
								url: "app/circle/zhichang/zhichang.html",
								id: 'zhichang.html'
							})
					}

					var page = 1;
					mui.init({});
					var _self;
					if(window.plus) {
						plusReady();
					} else {
						document.addEventListener("plusready", function() {
							plusReady();
						}, false);
					}
					
					function plusReady() {
						_self = plus.webview.currentWebview();
						_self.setPullToRefresh({
							support: true,
							height: '100px',
							range: '150px',
							style: 'circle',
							offset: '1px'
						}, pulldownRefresh);
					}
					
					/**
					 * 下拉刷新具体业务实现
					 */
					function pulldownRefresh() {
						setTimeout(function() {
							page=1;
							sssrequest(page);
							_self.endPullToRefresh();
						}, 1500);
					}
	
	<!--首页筛选框实现-->
	
	
		//		document.addEventListener('DOMContentLoaded', function() {
		//			document.querySelector('main').className += 'loaded';
		//		});
		//		localStorage.setItem('cityName','青岛');
		var cityName = localStorage.getItem('cityName');
		var area222 = document.querySelector('#area');
		//		area222.innerHTML = cityName;
		if(localStorage.getItem('cityChanged')) {
			area222.innerHTML = cityName;
		} else {
			area222.innerHTML = '全国';
			localStorage.setItem('cityid', 805);
		}

		var selector1 = document.querySelector('#selector1');
		var selector2 = document.querySelector('#selector2');
		var selector3 = document.querySelector('#selector3');
		var selector4 = document.querySelector('#selector4');
		var quyu = document.querySelector('#quyu');
		var zhiwei = document.querySelector('#zhiwei');
		var xinzi = document.querySelector('#xinzi');
		var fuli = document.querySelector('#fuli');
		var bg = document.getElementById('bg');

		var selectorFlag = false; // false时表示不显示筛选框筛选出的数据
		var selectPage = 1; // 筛选框页数标识
		var sel_box = document.querySelector('#sel_box');
		var tabbar = document.querySelector('#tabbar');
		var flag = document.querySelector('#sel_box').style.display;
		var tu = document.querySelector('.tu')
		var tu2 = document.querySelector('.tu2')
		var tu3 = document.querySelector('.tu3')
		var tu4 = document.querySelector('.tu4')
		//		console.log(flag)

		selector1.onclick = function() {
			bg.style.display = "block";
		}
		selector2.onclick = function() {
			bg.style.display = "block";
			if(flag == 'none') {
				tu2.src = 'images/blue.png';
			}
		}
		selector3.onclick = function() {
			bg.style.display = "block";
			if(flag == 'none') {
				tu3.src = 'images/blue.png';
			}
		}
		selector4.onclick = function() {
			bg.style.display = "block";
			if(flag == 'none') {
				tu4.src = 'images/blue.png';
			}
		}
		bg.onclick = function() {
			bg.style.display = "none";
			sel_box.style.display = "none";
			if(flag == 'none') {
				tu.src = 'images/xiala.png';
			}
			if(flag == 'none') {
				tu2.src = 'images/xiala.png';
			}
			if(flag == 'none') {
				tu3.src = 'images/xiala.png';
			}
			if(flag == 'none') {
				tu4.src = 'images/xiala.png';
			}
		}

		//var mask = mui.createMask(function() {
		//sel_box.style.display = 'none';
		//	tabbar.style.overflow = 'auto';
		//});

		// 地区(注：地区不能使用下边定义的函数)
		selector1.addEventListener('click', function() {
			if(flag == 'none') {
				tu.src = 'images/blue.png';
			} else {
				tu.src = 'images/xiala.png';
			}
			var event = window.event || event;　
			if(event.stopPropagation) {　　
				event.stopPropagation();　　
			} else {　　　　
				event.cancelBubble = true;　　
			}

			//tabbar.style.overflow = 'hidden';
			//tabbar.style.backgroundColor = 'red';
			//tabbar.style.filter = 'alpha(opacity=60)';

			document.body.style.height = '100%';
			var cityid = localStorage.getItem('cityid');
			var cityName = localStorage.getItem('cityName');
			mui.ajax($$$.siturl + 'm=App&c=CityTolist&a=cityTodetaile&id=' + cityid, {
				type: 'get',
				dataType: 'json',
				success: function(data) {
					//					console.log(JSON.stringify(data));
					sel_box.innerHTML = '';
					sel_box.style.display = "block";
					var sel_areas = data.data;
					// 创建不限小标签
					var div2 = document.createElement('div');
					div2.innerHTML = '不限';
					div2.setAttribute('data-did', '');
					//					alert(1)
					//										div2.setAttribute('id', 'xiao');

					// 小标签点击事件
					//					div2.id = 'xiao';
					//						//					console.(div2)
					var sdd = document.querySelector('#xiao');
					//					console.dir(sdd);
					div2.addEventListener('click', function() {
						if(flag == 'none') {
							tu.src = 'images/xiala.png';
						}
						if(this.innerHTML == "不限") {
							quyu.innerHTML = "区域"
						};
						bg.style.display = "none";
						sel_box.style.display = "none";
						//						sel_box.style.display = 'none';

						// ajax请求相应的数据
						// 准备数据(4项数据都需要提交)
						var did = this.getAttribute('data-did');
						sessionStorage.setItem('sel_did', did);
						//                  alert(did);
						// 创建好用于上传的数据
						var updata = createUpData();
						//						alert(updata)
						//						console.log(updata)
						//
						//alert($$$.siturl + 'm=App&c=index&a=qxhj' + updata);	               	                
						mui.ajax($$$.siturl + 'm=App&c=index&a=qxhj' + updata, {
							type: 'get',
							dataType: 'json',
							success: function(data) {
								//																alert(data)
								console.log(JSON.stringify(data.data));
								//    						alert(JSON.stringify(data));
								//        						var data = JSON.stringify(data);
								selectorFlag = true;
								// 职位详细信息
								var jobs_sel = data.data;
								//								console.log(jobs_sel);
								// if(jobs_sel==null||jobs_sel=='')return;
								var job_list = document.querySelector('#job_list');
								job_list.innerHTML = '';
								for(var x = 0; x < jobs_sel.length; x++) {
									new CreateList_index({
										id: 'job_list',
										data: jobs_sel[x]
									})
								}
								// 给每个条目绑定事件
								var ul = document.querySelector('#job_list')
								var lis = ul.children;
								for(var x = 0; x < lis.length; x++) {
									lis[x].addEventListener('click', function() {
										//																				alert(1)
										var id = this.children[0].getAttribute('data-id');
										localStorage.setItem('jid', id);
										console.log(jid)
										bg.style.display = "none";
										sel_box.style.display = "none";
									})
								}
							},
							error: function(xhr, err) {
								
							}
						});

					});

					if(sel_box.appendChild) {
						sel_box.appendChild(div2);
					} else {
						sel_box.append(div2);
					}

					for(var x = 0; x < sel_areas.length; x++) {
						var div = document.createElement('div');
						div.innerHTML = sel_areas[x].categoryname;
						div.setAttribute('data-did', sel_areas[x].categoryname);
						//						var did = this.getAttribute('data-did');
						div.addEventListener('click', function() {
							if(flag == 'none') {
								tu.src = 'images/xiala.png';
							}
							//							alert(did)
							//							alert(3)
							quyu.innerHTML = this.innerHTML;
							//							console.log(this.innerHTML)
							//							console.log(sel_areas[x].cnane)
							//mask.close();
							bg.style.display = "none";
							sel_box.style.display = "none";

							// ajax请求相应的数据
							// 准备数据(4项数据都需要提交)
							var did = this.getAttribute('data-did');
							sessionStorage.setItem('sel_did', did);
							//                      alert(did); 
							// 创建好用于上传的数据
							var updata = createUpData();

							mui.ajax($$$.siturl + 'm=App&c=index&a=qxhj' + updata, {
								type: 'get',
								dataType: 'json',
								success: function(data) {
									//        						alert(JSON.stringify(data));
									//        						var data = JSON.stringify(data);
									selectorFlag = true;
									// 职位详细信息
									var jobs_sel = data.data;
									var job_list = document.querySelector('#job_list');
									job_list.innerHTML = '';

									for(var x = 0; x < jobs_sel.length; x++) {
										//				                	alert('done'); 
										new CreateList_index({
											id: 'job_list',
											data: jobs_sel[x]
										})
									}
									// 给每个条目绑定事件
									var ul = document.querySelector('#job_list')
									var lis = ul.children;
									for(var x = 0; x < lis.length; x++) {
										lis[x].addEventListener('click', function() {
											//											alert(2)
											var id = this.children[0].getAttribute('data-id');
											localStorage.setItem('jid', id);
											//alert(localStorage.getItem('jid'))
										})
									}

								},
								error: function(xhr, err) {
									
								}
							});

						});
						if(sel_box.appendChild) {
							sel_box.appendChild(div);
						} else {
							sel_box.append(div);
						}
					}
				},
				error: function(xhr) {
					
				}
			});
			//区域结束 
		});

		// 职位
		selector2.addEventListener('click', function() {

			getSelData({
				urls: 'm=App&c=TagToli&a=zhiwei',
				dataName: 'zhiwei',
				parseNum: 'id',
				parseName: 'categoryname',
				mark: 'data-zid', // 标签的自定义属性名称
				localMark: 'sel_zid' // 用来存放本地缓存的特有字段
			});
		});

		// 薪资
		selector3.addEventListener('click', function() {

			getSelData({
				urls: 'm=App&c=TagToli&a=wge',
				dataName: 'wge',
				parseNum: 'c_id',
				parseName: 'c_name',
				mark: 'data-xid', // 标签的自定义属性名称
				localMark: 'sel_xid' // 用来存放本地缓存的特有字段
			});
		});

		// 福利
		selector4.addEventListener('click', function() {
			getSelData({
				urls: 'm=App&c=TagToli&a=welfare',
				dataName: 'welfare',
				parseNum: 'c_id',
				parseName: 'c_name',
				mark: 'data-fid', // 标签的自定义属性名称
				localMark: 'sel_fid' // 用来存放本地缓存的特有字段
			});
		});

		// 单个筛选框的实现
		function getSelData(options) {
			// 准备变量
			var urls = options.urls;
			var dataName = options.dataName;
			var parseNum = options.parseNum;
			var parseName = options.parseName;
			var mark = options.mark;
			var localMark = options.localMark;
			// 用于放数据的sel_box盒子

			document.body.style.height = '100%';
			//tabbar.style.overflow = 'hidden';

			// 打开遮罩层
			//      var mask = mui.createMask(function (){
			//          sel_box.style.display = 'none';
			//          tabbar.style.overflow = 'auto';
			//      }); 

			//callback为用户点击蒙版时自动执行的回调；
			//mask.show();//显示遮罩


			// 获取数据
			mui.ajax($$$.siturl + urls, {
				type: 'get',
				dataType: 'json',
				success: function(data) {
					var sel_data = data[dataName];
					//					alert(data[dataName])
					//										console.log(JSON.stringify(data[dataName]))

					// 创建不限小标签
					sel_box.innerHTML = '';
					sel_box.style.display = "block";
					var div2 = document.createElement('div');
					div2.innerHTML = '不限';
					div2.setAttribute('data-did', '');
					div2.addEventListener('click', function() {
						//点击不限
						//						console.log(this.innerHTML)
						//						alert(8)
						//mask.close();
						if(dataName == "zhiwei") {
							if(this.innerHTML == "不限") {
								zhiwei.innerHTML = "职位"
							};
							if(flag == 'none') {
								tu2.src = 'images/xiala.png';
							}
						}
						if(dataName == "wge") {
							if(this.innerHTML == "不限") {
								xinzi.innerHTML = "薪资"
							};
							if(flag == 'none') {
								tu3.src = 'images/xiala.png';
							}
						}
						if(dataName == "welfare") {
							if(this.innerHTML == "不限") {
								fuli.innerHTML = "福利"

							};
							if(flag == 'none') {
								tu4.src = 'images/xiala.png';
							}
						}
						sel_box.style.display = "none";
						bg.style.display = "none";
						//						$('#sel_box').fadeOut(600);
						sessionStorage.setItem(localMark, ''); // 将选中的id放入本地以待后期存取使用						
						// 创建提交字符串
						updata = createUpData();
						//alert($$$.siturl + 'm=App&c=index&a=qxhj' + updata);
						mui.ajax($$$.siturl + 'm=App&c=index&a=qxhj' + updata, {
							type: 'get',
							dataType: 'json',
							success: function(data) {
								//        						alert(JSON.stringify(data));
								//        						var data = JSON.stringify(data);
								selectorFlag = true;
								// 职位详细信息
								var jobs_sel = data.data;
								var job_list = document.querySelector('#job_list');
								job_list.innerHTML = '';
								//				                alert(jobs_sel);
								for(var x = 0; x < jobs_sel.length; x++) {
									//				                	alert('done'); 									
									new CreateList_index({
										id: 'job_list',
										data: jobs_sel[x]
									})
								}
								// 给每个条目绑定事件
								var ul = document.querySelector('#job_list')
								var lis = ul.children;
								for(var x = 0; x < lis.length; x++) {
									lis[x].addEventListener('click', function() {
										var id = this.children[0].getAttribute('data-id');
										localStorage.setItem('jid', id);
										//							alert(localStorage.getItem('jid'))
									})
								}
							},
							error: function(xhr, err) {
								
							}
						});
					});
					//点击不限结束
					if(sel_box.appendChild) {
						sel_box.appendChild(div2);
					} else {
						sel_box.append(div2);
					}
					for(var x = 0; x < sel_data.length; x++) {
						var div = document.createElement('div');
						div.innerHTML = sel_data[x][parseName];
						//						alert(div.innerHTML)
						//						console.log(sel_data[x][parseName])
						div.setAttribute(mark, sel_data[x][parseName]);
						// 单个元素的点击事件
						//						console.log(mark)
						div.addEventListener('click', function() {
							//mask.close();
							//							alert(dataName)
							if(dataName == "zhiwei") {
								zhiwei.innerHTML = this.innerHTML;
								if(flag == 'none') {
									tu2.src = 'images/xiala.png';
								}

							}
							if(dataName == "wge") {
								xinzi.innerHTML = this.innerHTML;
								if(flag == 'none') {
									tu3.src = 'images/xiala.png';
								}
							}
							if(dataName == "welfare") {
								fuli.innerHTML = this.innerHTML;
								//								fuli.style.fontSize = "10px";
								console.dir(fuli)
								if(flag == 'none') {
									tu4.src = 'images/xiala.png';
								}
							}
							sel_box.style.display = "none";
							bg.style.display = "none";
							//							sel_box.style.display = "none";
							// ajax请求相应的数据
							// 准备数据
							var id = this.getAttribute(mark);
							sessionStorage.setItem(localMark, id); // 将选中的id放入本地以待后期存取使用
							//							alert(id); // 质检员						
							// 创建提交字符串
							updata = createUpData();
							//						alert($$$.siturl + 'm=App&c=index&a=qxhj' + updata);      
							mui.ajax($$$.siturl + 'm=App&c=index&a=qxhj' + updata, {
								type: 'get',
								dataType: 'json',
								success: function(data) {
									//        						alert(JSON.stringify(data));
									//        						var data = JSON.stringify(data);
									selectorFlag = true;
									// 职位详细信息
									var jobs_sel = data.data;
									//									alert(jobs_sel.length)
									var job_list = document.querySelector('#job_list');
									job_list.innerHTML = '';
									//小标签的点击事件
									//				                alert(jobs_sel);
									if(jobs_sel == null || jobs_sel == '') return;
									for(var x = 0; x < jobs_sel.length; x++) {
										//				                	alert('done'); 
										new CreateList_index({
											id: 'job_list',
											data: jobs_sel[x]
										})
									}
									// 给每个条目绑定事件
									var ul = document.querySelector('#job_list')
									var lis = ul.children;
									for(var x = 0; x < lis.length; x++) {
										lis[x].addEventListener('click', function() {
											var id = this.children[0].getAttribute('data-id');
											localStorage.setItem('jid', id);
										})
									}
								},
								error: function(xhr, err) {
								
								}
							});

						});
						// 插入放置小标签的盒子
						if(sel_box.appendChild) {
							sel_box.appendChild(div);
						} else {
							sel_box.append(div);
						}
					}
				},
				error: function(xhr, err) {
					
				}
			});
		}

		// 将选中的值传给筛选框，还没有写内容
		function bindStrToSel() {

		}

		// 准备好筛选框将要提交的数据
		function createUpData() {
			var up_xid; // 薪资
			var str = ''; // 用于返回的字符串
			var min = ''; // 最低薪资
			var max = ''; // 最高薪资
			// 校验数据，如果贝蒂可以拿到四个数据，则直接赋值，否则令其为空。
			// 地区 
			if(!sessionStorage.getItem('sel_did')) {
				str += '&dist=';
			} else {
				str += '&dist=' + sessionStorage.getItem('sel_did');
			}
			// 职位
			if(!sessionStorage.getItem('sel_zid')) {
				str += '&job=';
			} else {
				str += '&job=' + sessionStorage.getItem('sel_zid');
			}
			// 薪资
			var sel_xid_flag = sessionStorage.getItem('sel_xid');

			if(!sel_xid_flag) {

				str += '&min=&max=';
			} else {
				up_xid = sessionStorage.getItem('sel_xid');
				var re = /([0-9]+)([0-9]+)/g;
				min = up_xid.match(re)[0];
				max = up_xid.match(re)[1];
				str += '&min=' + min + '&max=' + max;
			}
			// 福利
			if(!sessionStorage.getItem('sel_fid')) {
				str += '&welfare=';
			} else {
				str += '&welfare=' + sessionStorage.getItem('sel_fid');
			}
			return str;
		}
	
	<!--主要js区域-->
	
//		mui('body').on('tap', 'a', function() {
//			//		document.location.href = 'app/community/community.html';
//			document.location.href = this.href;
//		});

		function getScrollTop() {
			var scrollTop = 0;
			if(document.documentElement && document.documentElement.scrollTop) {
				scrollTop = document.documentElement.scrollTop;
			} else if(document.body) {
				scrollTop = document.body.scrollTop;
			}
			return scrollTop;
		}

		//获取当前可视范围的高度 
		function getClientHeight() {
			var clientHeight = 0;
			if(document.body.clientHeight && document.documentElement.clientHeight) {
				clientHeight = Math.min(document.body.clientHeight, document.documentElement.clientHeight);
			} else {
				clientHeight = Math.max(document.body.clientHeight, document.documentElement.clientHeight);
			}
			return clientHeight;
		}

		//获取文档完整的高度 
		function getScrollHeight() {
			return Math.max(document.body.scrollHeight, document.documentElement.scrollHeight);
		}
		window.onscroll = function() {
			if(getScrollTop() + getClientHeight() == getScrollHeight()) {
				page++;
				document.querySelector(".donghuacheng").style.display = "block";
				setTimeout(function() {
					sssrequest(page);
					document.querySelector(".donghuacheng").style.display = "none";
				}, 1000)

			}
		}

		document.addEventListener("plusready", function() {
			//var slider = mui("#slider");		
			//var slider =document.querySelector('#slider');	



			mui.ajax($$$.siturl + 'm=App&c=index&a=pingguo', {
				type: 'get',
				success: function(str) {
					var data = JSON.parse(str);
					// var sliderbox = document.querySelector('#slider');
					// lunbotu(data.lunbotu);
					creaimg(slider, data.lunbotu);
					//var job_list2 = document.querySelector('#job_list2');
					var jobs = data.data;
					for(var x = 0; x < jobs.length; x++) {
						if(x < 5) {
							zhiding = '<span class="" style="color:white;display: inline-block;width: 40px;height:17px;text-align:center;font-size:10px;border-bottom-left-radius:3px;border-top-left-radius: 3px;font-weight:400;position: absolute;top:8px;right:0px;background: #ff7113;">急招</span>';
						} else {
							zhiding = '';
						}
						new CreateList_index({
							id: 'job_list',
							bg: '',
							data: jobs[x]
						})
					}
					var ul = document.querySelector('#job_list')
					var lis = ul.children;
					for(var x = 0; x < lis.length; x++) {
						lis[x].addEventListener('click', function() {
							var id = this.children[0].getAttribute('data-id');
							localStorage.setItem('jid', id);
						})
					}
				}
			});
		})
		
		//轮播
		function creaimg(div, data) {
			var leng = data.length;
			var str = "";
			str += '<div class="mui-slider-group mui-slider-loop">';
			str += '<div class="mui-slider-item mui-slider-item-duplicate" data-id="' + data[leng - 1].isgot + '"  data-jid="' + data[leng - 1].jid + '" onclick="gotolintopost(this)">'

			str += '<img src="' + $$$.imgurl + data[leng - 1].img + '" data-id="' + data[leng - 1].isgot + '"  data-jid="' + data[leng - 1].jid + '" >'

			str += '</div>'
			for(var i = 0; i < leng; i++) {

				str += '<div class="mui-slider-item" data-id="' + data[i].isgot + '"  data-jid="' + data[i].jid + '" onclick="gotolintopost(this)">'

				str += '<img src="' + $$$.imgurl + data[i].img + '" data-id="' + data[i].isgot + '"  data-jid="' + data[i].jid + '" >'
				//console.log($$$.imgurl + data[i].img);

				str += '</div>'
			}
			str += '<div class="mui-slider-item mui-slider-item-duplicate" data-id="' + data[0].isgot + '"  data-jid="' + data[0].jid + '" onclick="gotolintopost(this)">'

			str += '<img src="' + $$$.imgurl + data[0].img + '" data-id="' + data[0].isgot + '"  data-jid="' + data[0].jid + '">'

			str += '</div>'
			str += '</div>'
			str += '<div class="mui-slider-indicator">'
			str += '<div class="mui-indicator mui-active"></div>'
			for(var x = 1; x < leng; x++) {
				str += '<div class="mui-indicator"></div>'
			}
			str += '</div>'

			//console.log(div); 
			div.innerHTML = str;
			var gallery = mui('.mui-slider');
			gallery.slider({
				//				preventDefault();
				interval: 3000 //自动轮播周期，若为0则不自动播放，默认为0；
			});

		}

		//轮播图，后台控制
		function gotolintopost(ti) {
			//alert(ti.getAttribute("data-id"));return;
			if(ti.getAttribute("data-id") == 1) {
				localStorage.setItem('jid', ti.getAttribute("data-jid"))
				mui.openWindow({
					url: 'app/job/job.html',
					id: 'job',
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...', //等待对话框上显示的提示内容
					}
				})
			}
			if(ti.getAttribute("data-id") == 2) {
				mui.openWindow({
					url: 'app/tianzhuan/tiaozhuan.html',
					id: 'job',
					createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...', //等待对话框上显示的提示内容
					}
				})
			}
		}

		function CreateList_index(option) {
			this.id = option.id || 'work_detail';
			this.bg = option.bg || '#fff';
			this.data = option.data;
			this.init();
		}
		CreateList_index.prototype = {
			init: function() {
				// 处理id
				var id = this.birthId(this.id);
				// 创建并插入预制组件
				var str = this.create(this.data);
				this.insert(id, str);
			},
			birthId: function(id) {
				var query = '#' + id;
				return query;
			},
			create: function(data) {
				/*定义组件字符串*/
				var tags = data.tag_cn.split(',');
				var leng = 0;
				if(tags.length > 3) {
					leng = 3;

				} else {
					leng = tags.length;
				}
				var srce = '';
				for(var i = 0; i < leng; i++) {
					// alert(tags[i]); 
					srce += '<span style="font-size:10px;line-height: 12px;height:16px;padding:2px 4px;box-sizing: border-box;display: inline-block;text-align: center;border:1px solid #5CA8FC;border-radius: 5px;color:#5CA8FC;margin-right:3px;">' + tags[i] + '</span>';
				}
				var result = '';
				// 立即执行函数，只是为了可以点击折叠按钮而已，没有实际功能。里边放置的是result(职位详细信息字符串)
				(function(data) {
					result += '<li id="2" class="mui-table-view-cell " style="width:100%;padding-left:3px;padding-bottom:1px;padding-top:6px;border-bottom:1px solid #CDCDCD;" data-id="' + data.jid + '">';
					result += '<div style="padding:3px 0;">';
					// 左侧头像
					result += '<div style="width:23%;float:left;padding-right:10px;">';
					result += '<img src="' + $$$.imgurl + data.logo + '" style="margin-left: 5px;width:100%;height:62px;border-radius: 8px;">';
					result += '</div>';
					// 右侧详细信息
					result += '<div class="" style="float:left;width:77%;">';
					result += '<div class="" style="width:100%">';

					result += '<div  class="">';
					result += '<div class="" style="font-weight:700;font-size:14px;padding-bottom:10px;line-height: 14px;">' + data.jobs_name + '</div>';
					result += '</div>';

					result += zhiding;

					result += '<div  class="" style="position: relative;font-size:14px;padding-bottom: 7px;line-height: 12px;">';
					result += '<div class="" style="color:#737373;">' + data.category_cn + '</div>';
					result += '<div class="" style="color:#ff7113;font-size:1.2em;position:absolute;right:0px;top:0;">' + data.minwage + '-' + data.maxwage + '元</div>';
					result += '</div>';

					result += '<div  class="" style="position:relative;font-size:10px;">';
					result += '<div class="">';
					result += srce;
					result += '</div>';
					result += '<div class="" style="position: absolute;right:0px;bottom:0;">' + data.district_cn + '</div>';
					result += '</div>';
					result += '</div>';
					result += '</div>';
					result += '</div>';
					result += '</li>';
				})(data);
				return result;
			},
			insert: function(id, result) {
				var div = document.createElement('div');
				div.innerHTML = result;
				div.addEventListener('click', function() {
					goJobLink(div.children[0]);

				})
				var box = document.querySelector(id);
				if(box.appendChild) {
					box.appendChild(div);

				} else {
					box.append(div);
				}
				//  	console.log(div);
			}
		};
		//到下一个页面
		function goJobLink(t) {

			var jid = t.getAttribute("data-id", jid);
			//alert(jid);
			localStorage.setItem('jid', jid);
			//var jid = localStorage.getItem('jid');	   
			// alert(jid);
			mui.openWindow({
				url: 'app/job/job.html',
				id: 'job',
				extras: {
					// jid:jid
				},
				createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
				waiting: {
					autoShow: false, //自动显示等待框，默认为true
					title: '正在加载...', //等待对话框上显示的提示内容
				}
			})
		}
		//上拉加载
		function sssrequest(page) {
			//			alert(1)

			mui.ajax($$$.siturl + 'm=App&c=IndeToNew&a=Jollist&page=' + page, {
				type: 'GET',
				dataType: 'json',
				success: function(data) {
					var jobs = data.data;
					if(jobs == '' || jobs == null) {
						document.querySelector(".donghuacheng").style.display = "none";
						document.querySelector(".wenzi").style.display = "block";
						setTimeout(function() {
							document.querySelector(".wenzi").style.display = "none";
						}, 1000)
						return;
					}
					// console.log(jobs);
					for(var x = 0; x < jobs.length; x++) {
						new CreateList_index({
							id: 'job_list',
							bg: '',
							data: jobs[x]
						})
					}
				},
				error: function(e) {
					//  alert(e);
				}
			});
		}
		
		
			window.addEventListener('lisindex', function(e) {
				//在父页面中添加监听事件，刷新页面
					console.log(11111);
				    var cityid = localStorage.getItem('cityid');
					var cityName = localStorage.getItem('cityName');
					if(localStorage.getItem('cityChanged')) {
						area222.innerHTML = cityName;
					} else {
						area222.innerHTML = '全国';
						localStorage.setItem('cityid', 805);
					}
					mui.ajax($$$.siturl + 'm=App&c=CityTolist&a=cityTodetaile&id=' + cityid, {
						type: 'get',
						dataType: 'json',
						success: function(data) {
							//					console.log(JSON.stringify(data));
							sel_box.innerHTML = '';
//							sel_box.style.display = "block";
							var sel_areas = data.data;
							// 创建不限小标签
							var div2 = document.createElement('div');
							div2.innerHTML = '不限';
							div2.setAttribute('data-did', '');
							//					alert(1)
							//										div2.setAttribute('id', 'xiao');
		
							// 小标签点击事件
							//					div2.id = 'xiao';
							//						//					console.(div2)
							var sdd = document.querySelector('#xiao');
							//					console.dir(sdd);
							div2.addEventListener('click', function() {
								if(flag == 'none') {
									tu.src = 'images/xiala.png';
								}
								if(this.innerHTML == "不限") {
									quyu.innerHTML = "区域"
								};
								bg.style.display = "none";
								sel_box.style.display = "none";
								//						sel_box.style.display = 'none';
		
								// ajax请求相应的数据
								// 准备数据(4项数据都需要提交)
								var did = this.getAttribute('data-did');
								sessionStorage.setItem('sel_did', did);
								//                  alert(did);
								// 创建好用于上传的数据
								var updata = createUpData();
								//						alert(updata)
								//						console.log(updata)
								//
								//alert($$$.siturl + 'm=App&c=index&a=qxhj' + updata);	               	                
								mui.ajax($$$.siturl + 'm=App&c=index&a=qxhj' + updata, {
									type: 'get',
									dataType: 'json',
									success: function(data) {
										//																alert(data)
										console.log(JSON.stringify(data.data));
										//    						alert(JSON.stringify(data));
										//        						var data = JSON.stringify(data);
										selectorFlag = true;
										// 职位详细信息
										var jobs_sel = data.data;
										//								console.log(jobs_sel);
										// if(jobs_sel==null||jobs_sel=='')return;
										var job_list = document.querySelector('#job_list');
										job_list.innerHTML = '';
										for(var x = 0; x < jobs_sel.length; x++) {
											new CreateList_index({
												id: 'job_list',
												data: jobs_sel[x]
											})
										}
										// 给每个条目绑定事件
										var ul = document.querySelector('#job_list')
										var lis = ul.children;
										for(var x = 0; x < lis.length; x++) {
											lis[x].addEventListener('click', function() {
												//																				alert(1)
												var id = this.children[0].getAttribute('data-id');
												localStorage.setItem('jid', id);
												console.log(jid)
												bg.style.display = "none";
												sel_box.style.display = "none";
											})
										}
									},
									error: function(xhr, err) {
										
									}
								});
		
							});
		
							if(sel_box.appendChild) {
								sel_box.appendChild(div2);
							} else {
								sel_box.append(div2);
							}
		
							for(var x = 0; x < sel_areas.length; x++) {
								var div = document.createElement('div');
								div.innerHTML = sel_areas[x].categoryname;
								div.setAttribute('data-did', sel_areas[x].categoryname);
								//						var did = this.getAttribute('data-did');
								div.addEventListener('click', function() {
									if(flag == 'none') {
										tu.src = 'images/xiala.png';
									}
									//							alert(did)
									//							alert(3)
									quyu.innerHTML = this.innerHTML;
									//							console.log(this.innerHTML)
									//							console.log(sel_areas[x].cnane)
									//mask.close();
									bg.style.display = "none";
									sel_box.style.display = "none";
		
									// ajax请求相应的数据
									// 准备数据(4项数据都需要提交)
									var did = this.getAttribute('data-did');
									sessionStorage.setItem('sel_did', did);
									//                      alert(did); 
									// 创建好用于上传的数据
									var updata = createUpData();
		
									mui.ajax($$$.siturl + 'm=App&c=index&a=qxhj' + updata, {
										type: 'get',
										dataType: 'json',
										success: function(data) {
											//        						alert(JSON.stringify(data));
											//        						var data = JSON.stringify(data);
											selectorFlag = true;
											// 职位详细信息
											var jobs_sel = data.data;
											var job_list = document.querySelector('#job_list');
											job_list.innerHTML = '';
		
											for(var x = 0; x < jobs_sel.length; x++) {
												//				                	alert('done'); 
												new CreateList_index({
													id: 'job_list',
													data: jobs_sel[x]
												})
											}
											// 给每个条目绑定事件
											var ul = document.querySelector('#job_list')
											var lis = ul.children;
											for(var x = 0; x < lis.length; x++) {
												lis[x].addEventListener('click', function() {
													//											alert(2)
													var id = this.children[0].getAttribute('data-id');
													localStorage.setItem('jid', id);
													//alert(localStorage.getItem('jid'))
												})
											}
		
										},
										error: function(xhr, err) {
											
										}
									});
		
								});
								if(sel_box.appendChild) {
									sel_box.appendChild(div);
								} else {
									sel_box.append(div);
								}
							}
						},
						error: function(xhr) {
							
						}
					});
				    
				});
	
	

