/* Toggle between adding and removing the "active" and "show" classes when the user clicks on one of the "Section" buttons. 
The "active" class is used to add a background color to the current button when its belonging panel is open. 
The "show" class is used to open the specific accordion panel */


// Accordion Script
var accordion = {
	run: function() {
		var acc = document.getElementsByClassName("accordion");
		var i;

		for (i = 0; i < acc.length; i++) {
		    acc[i].onclick = function() {
		        this.classList.toggle("active");
		        this.nextElementSibling.classList.toggle("show");
		    }
		}
	}
}
accordion.run();

//carousel script
var carousel = {
	index_slide: 1,
	slide_time: 3000,
	next: function() {
		this.index_slide += 1;
		this.stopSlide();
		this.runSlide();
	},
	prev: function() {
		this.index_slide -= 1;
		this.stopSlide();
		this.runSlide();
	},
	runBar: function() {
		var content = document.getElementById('carousel-bar');
	    if (content.className == 'short') {
	        content.className = 'long';
	        content.style.transitionDuration = (this.slide_time / 1000) + "s";
	        content.style.WebkitTransitionDuration = (this.slide_time / 1000) + "s";
	    }
	    else {
	    	content.className = 'short';
	        content.style.transitionDuration = (this.slide_time / 1000) + "s";
	        content.style.WebkitTransitionDuration = (this.slide_time / 1000) + "s";
	    }
	},
	runSlide:function() {
		  var n = this.index_slide;
		  var i;
		  var slides = document.getElementsByClassName("carousel-content");
		  var dots = document.getElementsByClassName("carousel-dot");
		  var text = document.getElementsByClassName("carousel-pagination-text");

		  if (n > slides.length) {this.index_slide = 1; n = 1;}
		  if (n < 1) {n = slides.length; this.index_slide = slides.length}
		  for (i = 0; i < slides.length; i++) {
		      slides[i].style.display = "none";
		  }
		  for (i = 0; i < dots.length; i++) {
		      dots[i].className = dots[i].className.replace(" carousel-dot-active", "");
		  }
		  text[0].innerHTML = n + " / "+ slides.length;
		  slides[n-1].style.display = "block"; 
		  dots[n-1].className += " carousel-dot-active";
		  this.runBar();
		  this.slideRunning();
	},
	slideTo: function(i) {
		this.stopSlide();
		this.index_slide = i;
		this.runSlide();
	},
	slideRunning: function() {
		myVar = setTimeout(function(){
	    	carousel.next();
	    }, this.slide_time);
	},
	stopSlide: function() {
		clearTimeout(myVar);
	}
}


// Alert Message Script
var alert_message = {
	close: function() {
		var close = document.getElementsByClassName("btn-close-alert");
		var i;

		for (i = 0; i < close.length; i++) {
		    close[i].onclick = function(){
		        var div = this.parentElement;
		        div.style.opacity = "0";
		        setTimeout(function(){ div.style.display = "none"; }, 300);
		    }
		}
	}
}
alert_message.close();

// Notification Script
var notify_message = {
	notifyTo: 0,
	show: function(type, title, body) {
		var notify_type = type;
		if (notify_type == "danger") {notify_type = "bg-red-12";}
		else if (notify_type == "success") {notify_type = "bg-green-12";}
		else if (notify_type == "info") {notify_type = "bg-blue-12";}
		else if (notify_type == "warning") {notify_type = "bg-orange-12";}
		else if (notify_type == undefined) {notify_type = "bg-grey-8";}
		else if (notify_type == "default") {notify_type = "bg-grey-8";}

		var elementTo = this.notifyTo;
		var element = '<div class="notify-message '+notify_type+'" id="notify-id-'+this.notifyTo+'">';
					        if ((title !== undefined) && (title !== "" )) {
					        	element += '<div class="p-bottom-medium bold">'+title+'</div>';
					        }
					        element += '<span class="btn-close-notify" onclick="notify_message.close('+this.notifyTo+')">&times;</span>'+
					        '';
					        if (body != undefined) {
					        	element += '<div class="notify-body">'+body+'</div>';
					        }
					        else if (body == "" && body == undefined) {
					        	element += '<div class="notify-body">Notification Message</div>';
					        }
					        element += '</div>';
		document.getElementsByClassName("notify-parent")[0].insertAdjacentHTML('afterbegin', element);
		this.notifyTo += 1;
		setTimeout(function(){ notify_message.close(elementTo) }, notify_message.show_time);
	},
	close: function(notifyIdTo) {
		var div = document.getElementById('notify-id-'+notifyIdTo)
		div.style.opacity = 0;
		setTimeout(function(){ div.remove(); }, 300);
	},
	show_time: 3000
}

// Sidenav Script
var sidenav = {
	class: "sidenav",
	open: function() {
		this.setMargin(0);
	},
	close: function() {
		this.setMargin(100);
	},
	setMargin: function(ex) {
		var element = document.getElementsByClassName(this.class)[0].style.marginLeft = "-"+ex+"%";
	}
}


var modalbox = {
	open: function() {
		document.getElementsByClassName('modalbox-container')[0].className  = "modalbox-container modalbox-show";
	},
	close: function() {
		document.getElementsByClassName('modalbox-container')[0].className = "modalbox-container modalbox-hide";
	},
	createModal: function(model) {
		switch(model) {
			case 0:
				alert("Case pertama");
				break;
			default:
				var container = document.createElement("div");
				container.className = "modalbox-container";
				container.onclick = function() {
					modalbox.close();
				}

				var header = document.createElement("div");
				header.className = "modalbox-header bg-red-12";
				header.textContent = "Modalbox Header";

				container.appendChild(header);
				
				document.getElementsByTagName('body')[0].appendChild(container);
				document.getElementsByClassName('modalbox-container')[0].className += " modalbox-show";
		}
	}
}