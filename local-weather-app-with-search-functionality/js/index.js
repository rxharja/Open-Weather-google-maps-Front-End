//Acquire geolocation data
var latitude, longitude;

$(document).ready(function(){
  function geolocation(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(handle_geolocation_query,handle_errors);
    } else {
        alert('Device probably not ready.');
    }

function handle_errors(error) {  
    // error handling here
}
function handle_geolocation_query(position){  
    latitude = (position.coords.latitude);
    longitude = (position.coords.longitude); 
    onPositionReady();
  
    setWeather(latitude,longitude);
}
function onPositionReady() {
    //alert(latitude, longitude);
    // proceed
}
  };
geolocation();
$('img').on('click',function(){
  geolocation();
});
  
$( "input" )
    .keyup(function() {
      setLocation($(this).val());
    })
    .keyup();

function setLocation(location){
    var locationURL = "https://maps.googleapis.com/maps/api/geocode/json?address="+location+"&key=AIzaSyAwRFmB_VCxyyI80PaInTTtru7p7hGIrJg";

  $.getJSON(locationURL,function(data){
     var lat = data.results[0].geometry.location.lat;
     var lon = data.results[0].geometry.location.lng;
    setWeather(lat,lon)
  });
}

function setWeather(lat,lon){
  var weatherURL = "https://fcc-weather-api.glitch.me/api/current?lat="+lat+"&lon="+lon;
  
  $.getJSON(weatherURL, function(data){
  var f = false; //keeps track of temperature mode
  var temperature = data.main.temp;
  $("#weatherInfo").html('<h1>'+data.weather[0].description+'<i class="wi wi-owm-'+data.weather[0].id+'"></i></h1>');
      $("#weatherInfo").append('<h2>'+"<span id='degrees'>"+Math.floor(temperature)+"</span>"+"&deg<a id='temp' href='#'>C</a></h2>");
  $("#location").html(data.name)
  
  $("#temp").click(function(){
    f = !f;
    if (f){
      $("#temp").html("F");
      temperature = Math.round(parseInt(data.main.temp)*9/5+32);
    }
    else{
      $("#temp").html("C");
      temperature = Math.round(data.main.temp);
    }
    $("#degrees").html(temperature);
  });
});
}
});