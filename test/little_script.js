var rotate = document.getElementsByClassName("batton_main")[0];
var grad = 0;

console.log(rotate);

function repitt(obj) {
	var str = 'rotate(' + grad + 'deg)';
	obj.style.transform = str;
	grad+=1;
	console.log(str);
	console.log(obj.style.transform);
}

var Timer = setInterval("repitt(rotate)",30);
