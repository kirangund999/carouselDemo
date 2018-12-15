(function(global){
    
    var Slider = function(sliderEl){
        this.sliderEl = sliderEl;
        this.initialize();
    }
    

    global.Slider = Slider;

    Slider.prototype = {

        initialize : function(config){

            this.slides = this.sliderEl.querySelectorAll(".slide");
            this.slidescount = this.slides.length;
            this.currSlideIdx = 0;
            this.slideWidth = this.slides.item(0).offsetWidth;
            this.prevBtn = this.sliderEl.querySelector(".slider-btn.btn-prev");
            this.nextBtn = this.sliderEl.querySelector(".slider-btn.btn-next");
            this.resetSlides();
            this.attachSliderEvents();
        },

        resetSlides : function(){
        
            this.sliderEl.classList.add("no-transition");    
            this.currSlideIdx = 0;
            this.slides.item(0).style.transform = "translate(0px)";
            for(var i = 1; i< this.slidescount; i++){
                this.slides.item(i).style.transform = "translate(" + -((i-1) * this.slideWidth) + "px)";
            }
            setTimeout(function(inst){
                inst.sliderEl.classList.remove("no-transition");
            }, 700, this);
            
            
        },

        autoplay : function(){

            if(this.autoplay){
                this.autoplay = false;
                clearInterval(this.autoplayIId);
            }
            
            this.autoplay = true;
            this.resetSlides();

            var i = 0;
            var delay = 0;
           this.autoplayIId =  setInterval(function(inst){
                i++;
                if(i == inst.slidescount){
                    inst.autoplay = false;
                   clearInterval(inst.autoplayIId);
               }
               inst.nextSlide();
           }, 1000, this);

            

        },


        nextSlide : function(){
            
            if(this.currSlideIdx == this.slidescount - 1){
                return;
            }

            var currentSlide = this.slides.item(this.currSlideIdx);
            if(currentSlide.classList.contains("in-transition")){
                return;
            }
            this.currSlideIdx++;
            var nextSlide = this.slides.item(this.currSlideIdx);
            var translateVal = -(this.currSlideIdx * this.slideWidth);
            currentSlide.style.transform = "translate(" + translateVal + "px)";      
            nextSlide.style.transform = "translate(" + translateVal + "px)";
            
            nextSlide.classList.add("in-transition");
            setTimeout(function(inst){
                nextSlide.classList.remove("in-transition");
            }, 600, this);


        },

        prevSlide : function(){
            
            if(this.currSlideIdx == 0){
                return;
            }

            var currentSlide = this.slides.item(this.currSlideIdx);
            if(currentSlide.classList.contains("in-transition")){
                return;
            }

            this.currSlideIdx--;
            var prevSlide = this.slides.item(this.currSlideIdx);
            var translateVal = "translate(" + -(this.currSlideIdx * this.slideWidth) + "px)";
            currentSlide.style.transform = translateVal;   
            prevSlide.style.transform = translateVal;

            prevSlide.classList.add("in-transition");
            setTimeout(function(inst){
                prevSlide.classList.remove("in-transition");
            }, 600, this);

        },

        attachSliderEvents : function(){

            this.boundPrevSlide = this.prevSlide.bind(this);
            this.boundNextSlide = this.nextSlide.bind(this);
            this.prevBtn.addEventListener("click", this.boundPrevSlide);
            this.nextBtn.addEventListener("click", this.boundNextSlide);
            
        },

        detachSliderEvents : function(){

            this.prevBtn.removeEventListener("click", this.boundPrevSlide);
            this.nextBtn.removeEventListener("click", this.boundNextSlide);

        },

        destroy : function(){

            this.detachSliderEvents(); 
            this.sliderEl.remove();
            var inst = this;
            Object.keys(this).forEach(function(key) {
                delete inst[key];
            });


        }




    }


}(window));