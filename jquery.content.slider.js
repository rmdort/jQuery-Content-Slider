// Slideshow Plugin
(function($){
  
  $.fn.slideshow=function(options,callback){    
    
    var settings={
      pager:'.pager',
      autoplay:true,
      delay:5000
    };
    
    if(options) $.extend(settings,options)
  
  	return this.each(function(){
  	  
  	  // Init Variables
  	  
  	  var $this = $(this),
  	    	$slideshow = $(this).children('div'),
  	    	$slidereel = $slideshow.find('ul');
  	    	$slideimages = $slidereel.find('li'),
  	    	pageli='',
  	    	imageWidth = $slideshow.width(),
          imageSum = $slideimages.size(),
          imageReelWidth = imageWidth * imageSum;
      
      $slidereel.css({
        width:imageReelWidth,
        position:"relative"
        });
  	  
  	  // Append Page Numbers
  	  
  	  $slideimages.each(function(i){
  	    pageli += '<li><a href="#">'+(i+1)+'</a></li>';  	      	    
  	  });  	  
  	  
  	  $(settings.pager).append(pageli).find('li:first').addClass("active").end()
  	  .find("li").live('click',function(e) {	
    		$active = $(this); 
    		if(settings.autoplay) clearInterval(play); 
    		rotate(); 
    		rotateSwitch(); 
    		e.preventDefault();
    		
    	});;
  	  
  	  
  	  //Paging + Slider Function
    	rotate = function(){	
    		var triggerID = $active.text() - 1; //Get number of times to slide
    		var image_reelPosition = triggerID * imageWidth; //Determines the distance the image reel needs to slide

    		$(settings.pager).find("li").removeClass('active'); //Remove all active class
    		$active.addClass('active'); //Add active class (the $active is declared in the rotateSwitch function)

    		//Slider Animation
    		$slidereel.animate({ 
    			left: -image_reelPosition
    		}, 500 );
        
    	}; 
    	
    	//Rotation + Timing Event
    	rotateSwitch = function(){	
    		play = setInterval(function(){ 
    			$active = $(settings.pager).find('.active').next();
    			if ( $active.length === 0) { //If paging reaches the end...
    				$active = $(settings.pager).find('li:first'); //go back to first
    			}
    			rotate(); 
    		}, settings.delay); 
    	};
      
      if(settings.autoplay) rotateSwitch();
            
      //On Hover
      	$slideshow.hover(function() {
      		clearInterval(play); //Stop the rotation
      	}, function() {
      		rotateSwitch(); //Resume rotation
      	});
  	  
  	  
  	});
  	
  }; // End Slideshow
  
})(this.jQuery);