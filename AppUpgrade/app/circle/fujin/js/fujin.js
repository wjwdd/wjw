mui.init();
var divaq = "";
document.querySelector('#beijind').src = $$$.imgurl + 'data/app/beijin.png';
document.addEventListener("plusready", onPlusReady, false);

function onPlusReady() {

	var latitude = localStorage.getItem('latitude');
	var longitude = localStorage.getItem('longitude');
	if(latitude != null && longitude != null) {
		plus.nativeUI.showWaiting("搜寻中...");
		mui.ajax($$$.siturl + 'm=App&c=Index&a=nearbyJobApp', {
			type: 'get',
			data: {
				lat: latitude,
				lng: longitude
			},
			success: function(str) {
				var data = JSON.parse(str);
				if(data.staus === 0)
					mui.toast(data.staus);
				if(data.staus === 1)
					divaq += '<div style="width:100%;text-align center;margin-left: 30%;margin-top: 50%;">';

					divaq += '您的附近暂无职位';

				divaq += '</div>';
				// 职位详细信息
				var dataotlist = data.data;
				if(dataotlist == undefined) {
					document.querySelector("#job_list").innerHTML += divaq;
					plus.nativeUI.closeWaiting();
					return;
				}
				if(dataotlist.length == undefined) {
					document.querySelector("#job_list").innerHTML += divaq;
					plus.nativeUI.closeWaiting();
					return
				}
				for(var j = 0; j < dataotlist.length; j++) {
					new CreateList_index({
						id: 'job_list',
						data: dataotlist[j]
					})
					mui(document).imageLazyload({
						placeholder: '../../../images/zhizhao.png'
					});
				}

				plus.nativeUI.closeWaiting();
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
			error: function(e) {
				//mui.alert(e);
			}
		})
	} else {
		if(mui.os.android) {
			getGEO_status();
		} else if(mui.os.ios) {
			var CLLocationManager = plus.ios.import("CLLocationManager");
			var authorizationStatus = CLLocationManager.authorizationStatus();
			//		alert(authorizationStatus);
			switch(authorizationStatus) {
				case 0:
					plus.nativeUI.showWaiting("搜寻中..."); //这里是开始显示原生等待框
					break;
				case 1:
					plus.nativeUI.showWaiting("搜寻中..."); //这里是开始显示原生等待框
					break;
				case 2:
					// User has explicitly denied authorization for this application, or
					// location services are disabled in Settings.
					mui.alert('请打开gps');
					break;
				case 3:
					plus.nativeUI.showWaiting("搜寻中..."); //这里是开始显示原生等待框
					break;
				case 4:
					plus.nativeUI.showWaiting("搜寻中..."); //这里是开始显示原生等待框
					break;
				case 5:
					// This value is deprecated, but was equivalent to the new -Always value.
					break;
					defalut:
						break;
			}
		}
	}
	//	
	function jiantinggps() {
		var context = plus.android.importClass("android.content.Context");
		var locationManager = plus.android.importClass("android.location.LocationManager");
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		//		alert(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER));
		if(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
			mui.plusReady(function() {
				plus.geolocation.getCurrentPosition(function(p) {
					//								alert('Geolocation\nLatitude:' + p.coords.latitude + '\nLongitude:' + p.coords.longitude + '\nAltitude:' + p.coords.altitude);
					localStorage.setItem('latitude', p.coords.latitude);
					localStorage.setItem('longitude', p.coords.longitude);
					location.reload();
				}, function(e) {});
			})
		} else if(!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {
			jiantinggps();
		}
	}

	function getGEO_status() {
		var context = plus.android.importClass("android.content.Context");
		var locationManager = plus.android.importClass("android.location.LocationManager");
		var main = plus.android.runtimeMainActivity();
		var mainSvr = main.getSystemService(context.LOCATION_SERVICE);
		//		            console.log(mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER));
		if(!mainSvr.isProviderEnabled(locationManager.GPS_PROVIDER)) {

			var btnArray = ['否', '是'];
			mui.confirm('开启定位，可推荐您附近的好工作', '友情提示', btnArray, function(e) {
				if(e.index == 1) {
					var main = plus.android.runtimeMainActivity(); //获取activity
					var Intent = plus.android.importClass('android.content.Intent');
					var Settings = plus.android.importClass('android.provider.Settings');
					var intent = new Intent(Settings.ACTION_LOCATION_SOURCE_SETTINGS); //可设置表中所有Action字段
					main.startActivity(intent);
					jiantinggps();

				} else {
					mui.alert('您点击了取消');
				}
			})
		} else {
			//		plus.nativeUI.showWaiting("搜寻中...",{loading:{icon:'../../../../images/ljqd.png',interval:"100ms",height:"100px",display:"block",},width:'100px;',height:'100px',background:'rgba(0,0,27,0.8)'}); //这里是开始显示原生等待框

		}
	}
}

/*****************获取用户信息失败*******************/

<!--函数定义-->

function CreateList_index(option) {
	this.id = option.id || 'work_detail';
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
			var tageclass = this.tagcolor(tags[i]);
			srce += '<span style="font-size:10px;line-height: 12px;height:16px;padding:2px 4px;box-sizing: border-box;display: inline-block;text-align: center;border-radius: 5px;margin-right:3px;" class="' + tageclass + '" >' + tags[i] + '</span>';
		}
		var result = '';
		// 立即执行函数，只是为了可以点击折叠按钮而已，没有实际功能。里边放置的是result(职位详细信息字符串)
		(function(data) {
			result += '';
			result += '<li  class="mui-table-view-cell" style="width:100%;padding-left:3px;padding-bottom:1px;padding-top:6px;margin-top:1px;background:#fff;margin-bottom:4px;" data-id="' + data.jid + '">';
			result += '<div style="padding:0px 0px;margin:0 0 0 0 ;">';
			result += '<div style="width:23%;float:left;padding-right:13px;">';
			result += '<img data-lazyload=="' + $$$.imgurl + data.logo + '" style="margin-left: 5px;width:100%;height:62px;border-radius: 8px;">';
			result += '</div>';
			result += '<div class="" style="float:left;width:77%;">';
			result += '<div class="" style="width:100%">';
			result += '<div  class="">';
			result += '<div class="" style="font-weight:700;font-size:14px;padding-bottom:5px;line-height: 14px;">' + data.jobs_name + '</div>';
			result += '</div>';
			result += '<div  class="" style="position: relative;font-size:12px;padding-bottom: 7px;line-height: 12px;">';
			result += '<div class="" style="color:#737373;">' + data.category_cn + '</div>';
			result += '<div class="wagecolor" style="font-size:1.5em;position:absolute;right:13px;top:0;">' + data.minwage + '-' + data.maxwage + '元</div>';
			result += '</div>';
			result += '<div  class="" style="position:relative;font-size:15px;">';
			result += '<div class="">';
			result += srce;
			result += '</div>';
			result += '<div class="dis" style="position: absolute;right:13px;bottom:0;font-size:14px;top:3px">' + data.dise + '</div>';
			result += '</div>';
			result += '</div>';
			result += '</div>';
			result += '</div>';
			result += '</li>';
			result += '';
		})(data);
		return result;
	},
	insert: function(id, result) {
		var div = document.createElement('div');
		div.innerHTML = result;
		div.addEventListener('click', function() {
			goJobLink();
		})
		var box = document.querySelector(id);
		if(box.appendChild) {
			box.appendChild(div);
		} else {
			box.append(div);
		}
	},
	tagcolor: function(y) {
		switch(y) {
			case '年终奖':
				return 'tag1';
				break;
			case '工作餐':
				return 'tag2';
				break;
			case '五险一金':
				return 'tag3';
				break;
			case '长白班':
				return 'tag4';
				break;
			case '两班倒':
				return 'tag5';
				break;
			case '双休':
				return 'tag6';
				break;
			case '工作轻松':
				return 'tag3';
				break;
			case '单休':
				return 'tag4';
				break;
			case '恒温车间':
				return 'tag5';
				break;
			case '坐着上班':
				return 'tag6';
				break;
			default:
				return 'tag7';
				break;
		}

	},
};

function goJobLink() {
	var jid = localStorage.getItem('jid');
	mui.openWindow({
		url: '../../job/job.html',
		id: 'job',
		extras: {
			jid: jid
		},
		createNew: false, //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
		waiting: {
			autoShow: true, //自动显示等待框，默认为true
			title: '正在加载...', //等待对话框上显示的提示内容
		}
	})
}