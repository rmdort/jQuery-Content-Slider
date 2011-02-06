// Slideshow Plugin
(function($){
  
  $.fn.slideshow=function(options,callback){    
    
    var settings={
      pager:'.pager',
      autoplay:true,
      delay:5000,
      pagerthumbs:false,
      perpage:5,
      pagerid:'#Thumbs',
      pauseonhover:false
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
          imageReelWidth = imageWidth * imageSum,
          imageReelHeight =$slideimages.height();
      
          $slidereel.css({
            width:imageReelWidth,
            height:imageReelHeight,
            position:"relative"
            });
  	  
      	  // Append Page Numbers
  	  
      	  $slideimages.each(function(i){
      	    pageli += '<li><a href="#">'+(i+1)+'</a></li>';  	      	    
      	  });  	  
  	  
      	  if(!settings.pagerthumbs){
      	    $(settings.pager).append(pageli).find('li:first').addClass("active").end()
        	  .find("li").live('click',function(e) {	
        	    e.preventDefault();
          		$active = $(this); 
          		if(settings.autoplay) clearInterval(play); 
          		rotate(); 
          		if(settings.autoplay) rotateSwitch();
          	});
          	
      	  }
      	  else{
            paginate(settings.pagerid,settings.perpage);
            startshow();
      	  }
  	  
  	  
  	  
      	  //Paging + Slider Function
        	function rotate(){	
        		var triggerID = $active.prevAll().length; //Get number of times to slide
        		var image_reelPosition = triggerID * imageWidth; //Determines the distance the image reel needs to slide

        		$(settings.pager).find("li").removeClass('active'); //Remove all active class
        		$active.addClass('active'); //Add active class (the $active is declared in the rotateSwitch function)

        		//Slider Animation
        		$slidereel.animate({ 
        			left: -image_reelPosition
        		}, 500);
        
        	}; 
    	
        	//Rotation + Timing Event
        	function rotateSwitch(){	
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
          if(settings.pauseonhover){
          	$slideshow.hover(function() {
          		if(settings.autoplay) clearInterval(play); //Stop the rotation
          	}, function() {
          		if(settings.autoplay) rotateSwitch(); //Resume rotation
          	});
          
          }  	  
  	  
      	  // Pagination
  	      
      	  function paginate(id,perpage){
      	    $id = $(id);
      	    $items =$id.find('li');
      	    var numPages = Math.ceil($items.length / perpage) - 1;
      	    var current = 0;
  	    
      	    var $next = $('#Next');
      	    var $back = $('#Prev');
  	    
      	    $back
              .addClass('paging-disabled')
              .click(function(e) {
                pagination('<');
                e.preventDefault();
              });
          
            $next.click(function(e) {
              pagination('>');
              e.preventDefault();
            });
        
            $items
              .hide()
              .click(function(e){
                i = $(this).prevAll().length;
                $slideimages.hide().eq(i).show();
                $items.removeClass("active").eq(i).addClass("active");
                e.preventDefault();
              })
              .slice(0,perpage)
              .show();
              
            
              pagination = function (direction){
                reveal = function (current){
                  $back.removeClass('paging-disabled');
                  $next.removeClass('paging-disabled');

                  $items
                    .hide()
                    .slice(current * perpage, current * perpage + perpage)
                    .fadeIn(300);

                };
                // 4. Move previous and next  
              	if (direction == '<') { // previous
                  if (current > 1) {
                    reveal(current -= 1);
                  }
                  else if (current == 1) {
                    reveal (current -= 1);
                    $back.addClass('paging-disabled');
                  }
                } else {
                  if (current < numPages - 1) {
                    reveal(current += 1);
                  }
                  else if (current == numPages - 1) {
                    reveal(current += 1);
                    $next.addClass('paging-disabled');
                  }
                }
              }
              
          
      	  };
      	  
      	  function startshow(){
      	    $slideimages.hide().eq(0).show();
      	    $items.eq(0).addClass("active");
      	  };
  	  
  	});
  	
  }; // End Slideshow
  
})(this.jQuery);