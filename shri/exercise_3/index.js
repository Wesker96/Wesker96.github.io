(function () {
    var video = document.querySelector('.camera__video'),
        canvas = document.querySelector('.camera__canvas');

    var getVideoStream = function (setFilter) {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia;

        if (navigator.getUserMedia) {
            navigator.getUserMedia({video: true},
                function (stream) {													
                    video.src = window.URL.createObjectURL(stream);
                    video.onloadedmetadata = function (e) {
                        setFilter();
                    };
                },
                function (err) {
                    console.log("The following error occured: " + err.name);
                }
            );
        } else {
            console.log("getUserMedia not supported");
        }
    };

	

	getVideoStream(function () {													//при вызове getVideoStream в нее передается функция, которая отслеживает выбор фильтра
		var selectElement = document.getElementsByTagName('select');
		var filterName = document.querySelector('.controls__filter').value;
		var videoElement = document.getElementsByClassName('camera__video');
		videoElement[0].setAttribute("class","camera__video "+filterName);			//установка фильтра по дефолту
		
		selectElement[0].addEventListener("change",function () {					//регистрация обработчика события onchange
					filterName = document.querySelector('.controls__filter').value;
					videoElement[0].setAttribute("class","camera__video "+filterName);
				},false
			);
    });
})();
