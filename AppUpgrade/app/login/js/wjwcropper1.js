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
		background: true,
		cropBoxMovable: false,
		cropBoxResizable: false,
		guides: false,
		center: false,
		crop: function(data) {}
	});
}

function getImg() {
	resImg = cropper.getCroppedCanvas({
		width: 200,
		height: 200
	}).toDataURL("image/png", 1 || 0.8);
	localStorage.setItem('resImg', resImg);

	var list3 = plus.webview.getWebviewById('fzbianji_delete');
	mui.fire(list3, 'fzbackbj');
	mui.back();
	

}