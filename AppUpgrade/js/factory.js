angular.module('myApp', ["Homeserver"]);
angular.module('Homeserver', [])
	.factory('$data', function($http) {
		return {
			getSheQu: function(page, id) {
				var url = $$$.siturl + "m=App&c=Discuz&a=getTopPicReplsy&boardid=" + id + "&page=" + page;
				return $http.get(url, {});
			},
			getSheQuXiangQing: function(id) {
				var url = $$$.siturl + "m=App&c=Discuz&a=getTopDis&id=" + id;
				return $http.get(url, {});
			},
			getSheQuDengLu: function() {
				var url = $$$.siturl + " m=App&c=Discuz&a=islogin";
				return $http.get(url, {});
			},

			postSheQuDZ: function(topid) {
				var url = $$$.siturl + "m=App&c=Discuz&a=setFamousTop&id=" + topid;
				return $http.get(url, {});
			},
			//回复数
			getSheQuHFcount: function() {
				var url = $$$.siturl + "m=App&c=DiscuzMsg&a=getXiaoxiCount";
				return $http.get(url, {});
			},
			//回复我的
			getSheQuHFme: function() {
				var url = $$$.siturl + "m=App&c=DiscuzMsg&a=getMsgToNOtlook";
				return $http.get(url, {});
			},
			//回复我的详情
			getSheQuHFdetail: function(id) {
				var url = $$$.siturl + "m=App&c=DiscuzMsg&a=xiaoxixiangqing&id=" + id;
				return $http.get(url, {});
			},
			//消除回复数
			dijijiru: function(x, a, b) {
				var url = $$$.siturl + "m=App&c=DiscuzMsg&a=dijijiru";
				return $http.post(url, {
					id: x,
					uid1: a,
					uid2: b
				});
			},
			//消息
			xiaoxi: function() {
				var url = $$$.siturl + "m=App&c=XiTongMsg&a=xiTongxiaoxi";
				return $http.get(url, {});
			},
			//消息详情
			xiaoxidetail: function(id) {
				var url = $$$.siturl + "m=App&c=XiTongMsg&a=newsDetal&id=" + id;
				return $http.get(url, {});
			},
			//最新面试
			mianshi: function() {
				var url = $$$.siturl + "m=App&c=XiTongMsg&a=ZuixinMianshi";
				return $http.get(url, {});
			},
			//消息内容
			xiaoxineirong: function(id) {
				var url = $$$.siturl + "m=App&c=XiTongMsg&a=newsDetalcount&id=" + id;
				return $http.get(url, {});
			},
			//职位详情
			jobdetail: function(jid) {
				var url = $$$.siturl + "m=App&c=index&a=compangprofil&jid=" + jid;
				return $http.get(url, {});
			},

			//登录
			dengl: function() {
				var url = $$$.siturl + "m=App&c=Tool&a=islogin";
				return $http.get(url, {});
			},
			//公司详情
			companydetail: function(cid) {
				var url = $$$.siturl + "m=App&c=index&a=companyfile&cid=" + cid;
				return $http.get(url, {});
			},
			//index数据
			indexdata: function(page, city, job, min, max, welfare) {
				var url = $$$.siturl + "m=App&c=IndeToNew&a=Jollist&page=" + page + "&dist=" + city + "&job=" + job + "&min=" + min + "&max=" + max + "&welfare=" + welfare;
				return $http.get(url, {});
			},
			//index轮播
			indexlunbo: function() {
				var url = $$$.siturl + "m=app&c=IndeToNew&a=getSiled";
				return $http.get(url, {});
			},
			//index区域
			indexquyu: function(cityid) {
				var url = $$$.siturl + "m=App&c=CityTolist&a=cityTodetaile&id=" + cityid;
				return $http.get(url, {});
			},
			//index职位
			indexzhiwei: function() {
				var url = $$$.siturl + "m=App&c=TagToli&a=zhiwei";
				return $http.get(url, {});
			},
			//index薪资
			indexxinzi: function() {
				var url = $$$.siturl + "m=App&c=TagToli&a=wge";
				return $http.get(url, {});
			},
			//index福利
			indexfuli: function() {
				var url = $$$.siturl + "m=App&c=TagToli&a=welfare";
				return $http.get(url, {});
			},
			//			//index筛选
			//			indexshaixuan: function(a, b, c, d) {
			//				var url = $$$.siturl + "m=App&c=IndeToNew&a=Jollist" + a + b + c + d;
			//				return $http.get(url, {});
			//			},
			//wode
			wodexuanran: function(a, b) {
				var url = $$$.siturl + "m=App&c=Mumber&a=logoin";
				return $http.post(url, {
					uname: a,
					password: b
				});
			},
			//wodesq
			indexwodesq: function() {
				var url = $$$.siturl + "m=App&c=MyAllTodis&a=index";
				return $http.get(url, {});
			},
			//kefu
			kefu: function(a) {
				var url = a + "home/home/getadmin?";
				return $http.get(url, {});
			},
			//clientid
			conn: function(a, uid, clientid) {
				var url = a + "home/home/servertobind?uid=" + uid + "&clientid=" + clientid;
				return $http.get(url, {});
			},
			//fasong
			fasong: function(a, touid) {
				var url = a + "home/home/isonline?uid=" + touid;
				return $http.get(url, {});
			},
			//lixianfasong
			lixianfasong: function(a, msg, touid, uid, userinfo) {
				var url = a + "home/home/offlinemsg?msg=" + msg + "&touid=" + touid + '&fromuid=' + uid + "&info=" + userinfo;
				return $http.get(url, {});
			},
			//zaixianfasong
			zaixianfasong: function(a, msg, touid, uid, clientid, userinfo) {
				var url = a + "home/home/sedtouid?msg=" + msg + "&touid=" + touid + '&fromuid=' + uid + '&clientid=' + clientid + "&info=" + userinfo;
				return $http.get(url, {});
			},
			//lixianxuanran
			lixianxuanran: function(a, userid) {
				var url = a + "home/home/getallformong?uid=" + userid;
				return $http.get(url, {});
			},
			//历史记录
			lishijilu: function(a, userid, fromuid, page) {
				var url = a + "home/home/gethmomehistory?uid=" + userid + "&fromuid=" + fromuid + "&page=" + page;
				return $http.get(url, {});
			},
			//job判断是否有客服

			jobkf: function(uid) {
				var url = $$$.siturl + "m=App&c=Kefu&uid=" + uid;
				return $http.get(url, {});
			},
			//fujin
			fujin: function(a, b) {
				var url = $$$.siturl + "m=App&c=Index&a=nearbyJobApp";

				return $http.post(url, {
					lat: a,
					lng: b,

				});
			},
			//社区板块
			topic: function() {
				var url = $$$.siturl + "m=app&a=discuzbord&c=discuz";
				return $http.get(url, {});
			},
			kefunihao: function() {
				var url = $$$.siturl + "m=App&c=tool&a=zidonghuifu";
				return $http.get(url, {});
			},
			//城市
			citylist: function() {
				var url = $$$.siturl + 'm=App&c=CityTolist&a=cityToAllApi';
				return $http.get(url, {});
			},
			//职场资讯
			zhichang: function() {
				var url = 'http://www.zhizhaojob.cn/index.php?m=app&c=Tool&a=apptype';
				return $http.get(url, {});
			},
			shengqingchengong: function() {
				var url = $$$.siturl + "m=App&c=XiTongMsg&a=applysuccess";
				return $http.get(url, {});
			}
		}
	});