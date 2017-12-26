
			var tiaozhuan = document.querySelector('#tiaozhuan');
			//跳转动态页面
			tiaozhuan.onclick = function() {
				//alert(2);
				mui.ajax($$$.siturl + 'm=App&c=Tool&a=islogin', {
					type: 'get',
					data: {

					},
					dataType: 'json',
					success: function(data) {
						console.log(data);
						if(data == 0) {
							mui.openWindow({
								url: 'app/login/login.html',
								id: 'login.html'
							})
						}
						if(data == 1) {
							mui.openWindow({
								url: 'app/community/editTie.html',
								id: 'editTie.html'
							})
						}
					}
				})
			}

			mui('body').on('tap', 'a', function() {
				//		document.location.href = 'app/community/community.html';
				document.location.href = this.href;
			});
			mui.init({
				pullRefresh: {
					container: '#refreshContainer',
					down: {
						//contentrefresh: '刷新数据',
						//callback: pulldownRefresh
					},
					up: {
						//contentrefresh: '正在加载...',
						//callback: pullupRefresh
					}
				}
			});
			var count = 0;
			var page = 1;

			function pulldownRefresh() {
				//this.endPullupToRefresh(false);
				//alert(3);			
			}

			function pullupRefresh() {
				//s				page++;	
				//alert(2);
				//sssrequest(page);
			}
		
			sssrequest(page);
			function sssrequest(page) {
				mui.ajax($$$.siturl + 'm=App&c=Index&a=discuzInde&page=' + page, {
					type: 'GET',
					success: function(str) {
						var data = JSON.parse(str);

						// 职位详细信息
						// console.log(str);
//						console.log(page)
						var ties = data.data;
						if(ties == '' || ties == null) {
							document.querySelector(".icon").style.display = "none";
							document.querySelector(".wenzi").style.display = "block";
							setTimeout(function() {
								document.querySelector(".wenzi").style.display = "none";
							}, 2000)
//							return;
						}
						for(var x = 0; x < ties.length; x++) {
							new cretlist({
								id: 'tie_list2',
								data: ties[x]
							})
						}
					},
					error: function(e) {

					}
				});
			}

			function goTieLink(t) {
				//alert(t);
				//window.location.href='app/community/community_detail.html';
				var tid = t.getAttribute('data-tid');
				localStorage.setItem('t_id', tid)
				mui.openWindow({
					url: 'app/community/community_detail.html',
					id: 'community_detail',
					extras: {},
					waiting: {
						autoShow: true, //自动显示等待框，默认为true
						title: '正在加载...', //等待对话框上显示的提示内容
					}
				})
			}

			function cretlist(option) {
				this.id = option.id || 'work_detail';
				this.data = option.data;
				this.init();
			}
			cretlist.prototype = {
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
						var result = '';
						// 立即执行函数，只是为了可以点击折叠按钮而已，没有实际功能。里边放置的是result(职位详细信息字符串)
						(function(data) {
							var pingdata = data.reply;
							var genderdata = data;

							/*性别*/
							if(genderdata.sex == 1) {
								sex = '<img style="padding-left: 7px;vertical-align: middle;width: 16px;" src="images/nan.png" alt="" />';
							} else if(genderdata.sex == 2) {
								sex = '<img style="padding-left: 7px;vertical-align: middle;width: 16px;" src="images/nv.png" alt="" />';
							} else {
								sex = '';
							}
							/*图片*/
							var lis = '';
							var imgs = data.img;
							if(imgs[0] != undefined) {
								for(var i = 0; i < imgs.length; i++) {
									lis += '<li class="smallImg"><img src="' + $$$.imgurl + imgs[i] + '" style="width: 100%;height: 100%; " /></li>';
								}
							}
							var pingluncontent = '';
							if(pingdata != 'null' && pingdata != undefined && pingdata != '') {
								if(pingdata.length > 3) {
									var uyu = 3;

								} else {
									uyu = pingdata.length;
								}

								for(var i = 0; i < uyu; i++) {
									pingluncontent += '<li style="list-style: none;"><span style="color:#5CA8FC">' + pingdata[i].uname + '</span>：' + pingdata[i].content + '</li>'
								}
							}
							/***********************************************************/

							result += '		<li style="width:100%;border-top: 8px #EFEFF4 solid" data-id = "' + data.uid + '" data-tid="' + data.id + '" >		'
								//动态下面的线
								//result+='				<div class="mui-card mui-clearfix"> 								'
							result += '					<div class="mui-card-header mui-card-media ">					'
							result += '							<img style="width: 42px;height:42px;border-radius: 21px; " src="' + $$$.imgurl + data.ulog + '" />			'
							result += '							<div class="mui-media-body " style="font-size: 15px;margin-left: 58px; ">						'
							result += '									<p style="margin-top: 6px;color: #5ca8fc;font-weight: 800; ">' + data.realname + '										'
							result += sex;
							result += '									</p>	'
							result += '									<p style="color: #646464;font-size: 12px;padding-top: 8px; ">' + data.times + '	</p>									'
							result += '							</div>'
							result += '				 	 </div>'
							result += '						<div class="mui-card-content" style="padding-left: 13px;">			'
							result += '							<p style="font-size: 13px;color: #323232; ">' + data.content + '</p>					'
							result += '							<ul class="smallUl" style="">													'
							result += lis;
							//result+='	两个图片区域						<li class="smallImg"><img src="' + $$$.imgurl +  imgs[i] +'" style="width: 100%;height: 100%; " /></li>		'
							//result+='									<li class="smallImg"><img src="' + $$$.imgurl +  imgs[i] +'" style="width: 100%;height: 100%; " /></li>		'
							result += '							</ul>				'
							result += '						</div>					'
							result += '				</div>            			'
							result += '						<div class="mui-card-footer " style="position:reletive; ">		'
							result += '									<div class="weizhi" style="width:50%;height:21px;position:absolute;left:10px;word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">		'
							result += '									</div> 					'
							result += '									<div  class="zanping " style="text-align:right;">			'
							result += '										<div onclick="dianzan(this,event)" class="zan_button" data-tid="' + data.id + '" style="display:inline-block;width: 16px;height: 15px;margin-right: 25px;background: url(images/dianzan_sprite.png) 0 0;background-size: 16px 32px;background-position: left bottom; ">	'
							result += '												<span  class="number" id = "div_' + data.uid + '" style="padding-right: 13px;padding-left: 15px;display : inline ;font-size:13px;margin-left:10px;margin-bottom:10px">' + data.onfabulous + '</span>			'
							result += '										</div>'
							result += '								           <img src="images/pinglun.png" style="width: 16px;height: 15px;margin-right: 7px; " />			'
							result += '									</div>																	'
							result += '						</div>						'
								// 评论内容
							if(pingluncontent != '') {
								//result+= '<ul class="pkuang" style="border-top: 2px #ccc solid;padding: 20px 0;padding-left: 10px;">'
								//result+=	pingluncontent;
								//result+='</ul>';
								result += '<div class="entry-trangle-top" style="width: 0;height: 0;	border-left: 10px solid transparent;border-right: 10px solid transparent;border-bottom: 10px solid #f6f6f6;margin-left: 90%">'
								result += '</div>'
								result += '<ul class="pinglun" style="width: 95%; border: 2px solid #f6f6f6; border-radius: 6px; margin-left: 2%;padding-left: 6px;background-color: #f6f6f6;margin-bottom: 3%;font-size:12px;">'
								result += pingluncontent;
								result += '</ul>'
							}
							//console.log(result);	
							result += '			</li>'
								/***********************************************************/

						})(data)
						return result;
					},
					insert: function(id, result) {
						var div2 = document.createElement('div');
						div2.innerHTML = result;
						div2.addEventListener('click', function() {
							goTieLink(div2.children[0]);
						})
						var box = document.querySelector(id);
						if(box.appendChild) {
							box.appendChild(div2);
						} else {
							box.append(div2);
						}
					}
				}
				//解决上拉加载与点击冲突事件
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
					//					alert(page++);

					document.querySelector(".icon").style.display = "block";
					setTimeout(function() {
						sssrequest(page);
						document.querySelector(".icon").style.display = "none";
					}, 1000)

				}
			}

			function dianzan(obj, event) {
				var self = obj;
				var event = window.event || event;　
				if(event.stopPropagation) {　　
					event.stopPropagation();　　
				} else {　　　　
					event.cancelBubble = true;　　
				}
				mui.ajax($$$.siturl + 'm=App&c=Tool&a=islogin', {
						type: 'get',
						data: {

						},
						dataType: 'json',
						success: function(data) {
							if(data == 0) {
								mui.toast('还没登陆');
								setTimeout(function() {
									mui.openWindow({
										url: 'app/login/login.html',
										id: 'login.html'
									})
								}, 2000)
							}
						}
					})
					// 准备点赞需要提交的数据

				var t_id = obj.getAttribute('data-tid');
				//console.log("div_"+t_id);
				//var tdivcv=document.querySelector("#div_"+t_id);
				//mui.alert("");
				var tdiv = document.querySelector("#div_" + t_id)
					//console.log(tdiv);

				var zan_count = self.children[0];
				///var zan_count = self.nextSibling //|| self.nextElementSibling;						
				//		alert(self.innerHTML=='');				
				//	console.log(self.getAttribute('data-tid'));
				//	console.log(zan_count);
				//alert(zan_count);
				//return;

				//	mui.alert(obj);
				// 点赞按钮 

				mui.ajax($$$.siturl + 'm=App&c=IsLogo&a=fabous', {
					type: 'post',
					data: {
						t_id: t_id
					},
					dataType: 'json',
					success: function(data) {

						if(data.staus == '0') {

							//location.href="../login/login.html";
						}
						if(data.staus == '5') {

							//							alert('取消点赞成功');
							obj.style.backgroundPosition = 'left bottom';
							//赞的数量减一
							if(zan_count.innerHTML == '赞' || zan_count.innerHTML == '0' || zan_count.innerHTML == '1') {

								zan_count.innerHTML = '赞';

							} else {
								zan_count.innerHTML = +zan_count.innerHTML - 1;
							}
						}

						if(data.staus == '1') {
							//alert('点赞成功');
							obj.style.backgroundPosition = 'left top';

							if(zan_count.innerHTML == '赞') {
								zan_count.innerHTML = 1;
							} else {
								zan_count.innerHTML = +zan_count.innerHTML + 1;
							}
						}

					},
					error: function(xhr, err) {
//						mui.alert(err);
					}
				});
			}

			//全局变量，触摸开始位置
			
			var slideDown1 = document.getElementById("slideDown1");
			var slideDown2 = document.getElementById("slideDown2");
			var scroll = document.querySelector('.scroll');
			var xianshi = document.querySelector('.xianshi');
			var outerScroller = document.querySelector('.outerScroller');
			var touchStart = 0;
			var touchDis = 0;
			outerScroller.addEventListener('touchstart', function(event) {
				var touch = event.touches[0];
				touchStart = touch.clientY;
			}, false);
			var a;
			outerScroller.addEventListener('touchmove', function(event) {
				var touch = event.touches[0];
				scroll.style.height = (touch.clientY - touchStart) / 10 + 'px';
				console.log(touch.clientY - touchStart);
				a = (touch.clientY - touchStart) / 5
				console.log(a)
				if(a > 20) {
					slideDown1.style.display = "block";
				}
			}, false);
			outerScroller.addEventListener('touchend', function(event) {
				var yuasu = document.querySelector("#tie_list2");
				if(a > 20) {
					slideDown1.style.display = "none";
					slideDown2.style.display = "block";
				}
				if(a > 0) {
					var time = setInterval(function() {
						a -= 2;
						scroll.style.height = a + 'px';
						if(parseInt(a) < 30) {
							setTimeout(function() {
								//							alert(1)
								slideDown2.style.display = "none";
								slideDown1.style.display = "none";
								yuasu.innerHTML = '';
								//							page++;
								sssrequest(page);
							}, 1200);
						}
						if(a <= 0) {
							clearInterval(time)
						}
					}, 1)

				}
			}, false);
	
