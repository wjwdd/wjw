
var image = document.getElementById('image');
var cropper = null;
var resImg = null;

image.src = localStorage.getItem('tximg');
//				console.log(image.src);

initCropper(image);
document.getElementById("save").addEventListener("tap", getImg);


function initCropper(image) {
	cropper = new Cropper(image, {
		aspectRatio: 1 / 1,
		dragMode: 'move',
		background:true,
		cropBoxMovable:false,
		cropBoxResizable:false,
		guides:false,
		center:false,
		crop: function(data) {}
	});
}

function getImg() {
	resImg = cropper.getCroppedCanvas({
		width: 200,
		height: 200
	}).toDataURL("image/png", 1 || 0.8);
	//				console.log(resImg);
	uploadHead(resImg);

}

function uploadHead(imgPath) {
	// console.log("imgPath = " + imgPath); 
	var getbase = imgPath.replace("data:image/png;base64,", "");
	var imgData = getbase;
	console.log(getbase);
	/*在这里调用上传接口*/
	mui.ajax($$$.siturl + 'm=App&c=InfoMeber&a=adavarse', {
		data: {
			files: imgData
		},
		dataType: 'json',
		type: 'post',
		timeout: 10000,
		//contentType:2,
		success: function(data) {
			if(data.staus == 1) {
				
				var list2 = plus.webview.getWebviewById('bianji.html');
				mui.fire(list2, 'backbj');
				var list = plus.webview.getWebviewById('wode.html');
				mui.fire(list, 'ymrefresh');
				mui.back();
			}

			if(data.staus == 0) {

			}

		},
		error: function(xhr, type, errorThrown) {
			
		}

	});

}