var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext('2d');
var coordinates = {X:[],Y:[]}; 
var drawing = new Boolean(false);

function dragStart(event){
	if(event.button == 0){
		drawing = true;
		coordinates.X = event.clientX-canvas.offsetLeft;	
	    coordinates.Y = event.clientY-canvas.offsetTop;	
	}

}
function drag(){
	if(drawing === true){
		draw(event);
	}
}
function dragEnd(){
	drawing = false;
}

canvas.addEventListener("mousedown",dragStart);
canvas.addEventListener("mousemove",drag);
canvas.addEventListener("mouseup",dragEnd);
canvas.addEventListener("mouseout",function(){
	drawing = false;
	coordinates.X.length =0;
	coordinates.Y.length =0;
});

function draw(event){
	context.beginPath();
    context.lineCap = 'round';
    context.lineWidth =5;
	context.strokeStyle = 'green';
	context.moveTo(coordinates.X, coordinates.Y);
    context.lineTo(event.clientX-canvas.offsetLeft,event.clientY-canvas.offsetTop);
    context.stroke();
	coordinates.X = event.clientX-canvas.offsetLeft;	
	coordinates.Y = event.clientY-canvas.offsetTop;	
}

document.getElementById("link_input").addEventListener("input",function(){
    let img = new Image();
	img.src = document.getElementById("link_input").value;
    imageLoad(img);
});

document.getElementById("image_upload_input").addEventListener("change",function(){
	console.log("load");
	var reader = new FileReader();
	var file    = document.getElementById("image_upload_input").files[0];
	reader.readAsDataURL(file);
	reader.addEventListener("load",function(){
		console.log(reader.result);
		let img = new Image();
	    img.src = reader.result;
		imageLoad(img);
	});
});

function imageLoad(img){
	img.onload = function() {
        canvas.height = img.height;
		canvas.width = img.width;
		context.drawImage(img, 0, 0);
    };
}