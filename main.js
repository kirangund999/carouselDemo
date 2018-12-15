window.onload = function(){

    var sliderEl =  document.querySelector('.slider');
    window.slider1 = new Slider(sliderEl);
    document.getElementById("autoplay").addEventListener("click", window.slider1.autoplay.bind(window.slider1));

}