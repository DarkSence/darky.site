var slideNow = 1;
var slideCount = $('#slidewrapper').children().length;
var slideInterval = 3000;
var navBtnId = 0;
var translateWidth = 0;

$(document).ready(function() {
    var switchInterval = setInterval(nextSlide, slideInterval);

    $('#viewport').hover(function() {
        clearInterval(switchInterval);
    }, function() {
        switchInterval = setInterval(nextSlide, slideInterval);
    });

    $('#next-btn').click(function() {
        nextSlide();
    });

    $('#prev-btn').click(function() {
        prevSlide();
    });

    $('.slide-nav-btn').click(function() {
        navBtnId = $(this).index();

        if (navBtnId + 1 != slideNow) {
            translateWidth = -$('#viewport').width() * (navBtnId);
            $('#slidewrapper').css({
                'transform': 'translate(' + translateWidth + 'px, 0)',
                '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
                '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
            });
            slideNow = navBtnId + 1;
        }
    });
});


function nextSlide() {
    if (slideNow == slideCount || slideNow <= 0 || slideNow > slideCount) {
        $('#slidewrapper').css('transform', 'translate(0, 0)');
        slideNow = 1;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow++;
    }
}

function prevSlide() {
    if (slideNow == 1 || slideNow <= 0 || slideNow > slideCount) {
        translateWidth = -$('#viewport').width() * (slideCount - 1);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow = slideCount;
    } else {
        translateWidth = -$('#viewport').width() * (slideNow - 2);
        $('#slidewrapper').css({
            'transform': 'translate(' + translateWidth + 'px, 0)',
            '-webkit-transform': 'translate(' + translateWidth + 'px, 0)',
            '-ms-transform': 'translate(' + translateWidth + 'px, 0)',
        });
        slideNow--;
    }
}


function Slider(element) {
	this.loadStatic();
	this.el = document.querySelector(element);
	this.init();
}

Slider.prototype = {
	init: function () {
		 this.links = this.el.querySelectorAll("#slider-nav a");
		 this.wrapper = this.el.querySelector("#slider-wrapper");
		 this.nextBtn = this.el.querySelector("#next");
		 this.prevBtn = this.el.querySelector("#prev");
		 this.navigate();
	},
	navigate: function () {

		 var self = this;

		 for (var i = 0; i < this.links.length; ++i) {
			  var link = this.links[i];
			  link.addEventListener("click", function (e) {
					self.slide(this);
			  });
		 }

		 self.prevBtn.style.display = 'none';

		 self.nextBtn.addEventListener('click', function (e) {
			  var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
			  var nextSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) + 1) + '"]');

			  nextSlide.click();
		 }, false);

		 self.prevBtn.addEventListener('click', function (e) {
			  var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
			  var prevSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) - 1) + '"]');

			  prevSlide.click();
		 }, false);

		 self.close();
	},

	slide: function (element) {
		 this.setCurrentLink(element);

		 var index = parseInt(element.getAttribute("data-slide"), 10) + 1;
		 var currentSlide = this.el.querySelector(".slide:nth-child(" + index + ")");

		 this.wrapper.style.left = "-" + currentSlide.offsetLeft + "px";

		 if (index < this.links.length)
			  this.nextBtn.style.display = 'block';
		 else if (index == this.links.length)
			  this.nextBtn.style.display = 'none';

		 if (index > 1)
			  this.prevBtn.style.display = 'block';
		 else if (index == 1)
			  this.prevBtn.style.display = 'none';
	},

	setCurrentLink: function (link) {
		 var parent = link.parentNode;
		 var a = parent.querySelectorAll("a");

		 link.className = "current";
		 this.currentElement = link;

		 for (var j = 0; j < a.length; ++j) {
			  var cur = a[j];
			  if (cur !== link) {
					cur.className = "";
			  }
		 }
	},

	loadStatic: function () {

		 var self = this;

		 var link = document.createElement('link');
		 link.rel = 'stylesheet';
		 link.href = 'assets/popupSlider.css';
		 document.head.appendChild(link);

		 var sliderHTML = '';

		 var xhr = new XMLHttpRequest();
		 xhr.open('GET', 'assets/popupSlider.html', false);
		 xhr.send();
		 if (xhr.status != 200) {
			  alert('Can not load the popupSlider.html. Got the error ' + xhr.status + ': ' + xhr.statusText);
		 } else {
			  sliderHTML = xhr.responseText;
		 }

		 var div = document.createElement('div');
		 div.innerHTML = sliderHTML;
		 document.body.appendChild(div);
	},

	close: function () {
		 document.getElementById('cq-popup-btclose').onclick = function () {
			  document.getElementById('cq-popup-bg').remove();
			  document.getElementById('cq-popup').remove();
		 }
	}
};