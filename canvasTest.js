var canvas = document.getElementsByTagName("canvas")[0];
var context = canvas.getContext('2d');
var coordinates = {X:[],Y:[]}; 
var drawing = new Boolean(false);
var line ={
	width:5,
	color:'#2ECC71'
};

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
    context.lineWidth =line.width;
	context.strokeStyle =line.color;
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

document.getElementById("color_input").addEventListener("change",function(){
	line.color=document.getElementById("color_input").value;
	document.getElementById("text_color_input").value = line.color;
});
document.getElementById("text_color_input").addEventListener("change",function(){
	line.color = document.getElementById("text_color_input").value;
	document.getElementById("color_input").value = line.color;
});
document.getElementById("width_input").addEventListener("change",function(){
	line.width=document.getElementById("width_input").value;
	document.getElementById("text_width_input").value = line.width;
});
document.getElementById("text_width_input").addEventListener("change",function(){
	line.width=document.getElementById("text_width_input").value;
	document.getElementById("width_input").value = line.width;
});
document.getElementById("gradient_button").addEventListener("click",function(){
	let gradientInputArea = document.getElementById("gradient_input");
	if(gradientInputArea.style.height == "100px" ){
		gradientInputArea.style.width ="";
	    gradientInputArea.style.height ="";
	    gradientInputArea.style.margin ="";
	    gradientInputArea.style.border ="";
	    gradientInputArea.style.boxSizing ="";
		document.getElementById("text_color_input").style.display = "block";
        gradientInputArea.style.display = "none";
	}else{
		gradientInputArea.style.width ="98%";
	    gradientInputArea.style.height ="100px";
	    gradientInputArea.style.margin ="5px 1% 5px 1%";
	    gradientInputArea.style.border ="1px solid black";
	    gradientInputArea.style.boxSizing ="border-box";
		document.getElementById("text_color_input").style.display = "none";
		gradientInputArea.style.display = "block";
	}
});
document.getElementById("gradient_comfirm").addEventListener("click",function(){
    let gradientColors=[];	
	var gradient = context.createLinearGradient(0,0,400,0);
	for(let i=1;i<=3;i++){
	    gradientColors[i] = document.getElementById(`gradient_color_input_${i}`).value;
		gradient.addColorStop((i/4),gradientColors[i]);
    }
	line.color = gradient;
});



