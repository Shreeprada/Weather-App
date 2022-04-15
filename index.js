

function weather(){
    let city=document.getElementById("city").value;
   // console.log(city);
    var url="https://api.openweathermap.org/data/2.5/weather?q=";
    var apikey="&APPID=a72c9871827a41cfe95a66e0f055bbd1";
    url=url+city+apikey;
    fetch(url).then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log("res:",res);
        appenddata(res);
        let lat = res.coord.lat;
      let lon = res.coord.lon;
      getDatafor7days(lat, lon);
    })
    .catch(function(err){
        console.log("Error:",err);
    });
}

function appenddata(data){
    let container=document.getElementById("container");
    let map=document.getElementById("gmap_canvas");
    let city=document.createElement("p");
    city.innerText="City : "+data.name;
    let temp=document.createElement("p");
    temp.innerText="Temperature : "+(parseFloat(data.main.temp-273.15).toFixed(2))+" °C";
    let min=document.createElement("p");
    min.innerText="Min Temperature : "+(parseFloat(data.main.temp_min-273.15).toFixed(2))+" °C";
    let max=document.createElement("p");
    max.innerText="Max temperature : "+(parseFloat(data.main.temp_max-273.15).toFixed(2))+" °C";
    let humidity=document.createElement("p");
    humidity.innerText="Humidity : "+data.main.humidity+" %";
    var iconcode = data.weather[0].icon;
    var des=document.createElement("p");
    des.innerText=data.weather[0].description;
    var mysunrise = new Date( data.sys.sunrise *1000);
    var srise=document.createElement("p");
    srise.innerText="Sunrise : "+mysunrise.toLocaleTimeString();
    var mysunset = new Date( data.sys.sunset *1000);
    var sset=document.createElement("p");
    sset.innerText="Sunset : "+mysunset.toLocaleTimeString();
    
// document.write(myDate.toGMTString()+"<br>"+myDate.toLocaleString());
    var div=document.createElement("div");
    div.setAttribute("id","icon");
    var image=document.createElement("img");
    image.src="http://openweathermap.org/img/w/" + iconcode + ".png";
    div.append(image,des);
    container.innerText="";
    container.append(city,temp,min,max,humidity,srise,sset,div);
    map.src='https://maps.google.com/maps?q='+data.name+'&t=&z=13&ie=UTF8&iwloc=&output=embed';
    //console.log("city:${data.name}");

}

function getcurrentloc(){
navigator.geolocation.getCurrentPosition(success);
function success(pos){
    var crd = pos.coords;
    var lat=crd.latitude;
    var lon=crd.longitude;
    console.log('Your current position is:');
    console.log(`Latitude : ${crd.latitude}`);
    console.log(`Longitude: ${crd.longitude}`);
    console.log(`More or less ${crd.accuracy} meters.`);
    getweather(lat,lon);
}
}



function getweather(lat,lon){
    var url="https://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+lon+"&appid=a72c9871827a41cfe95a66e0f055bbd1";
 fetch(url).then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log("res:",res);
        appenddata(res);
        getDatafor7days(lat,lon);
    })
    .catch(function(err){
        console.log("Error:",err);
    });
}
  const getDatafor7days = async (lat, lon) => {
    let url = "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=current,hourly,minutely,alerts&units=metric&appid=a72c9871827a41cfe95a66e0f055bbd1";
    try {
      let res = await fetch(url);
      let data = await res.json();
      console.log("data", data);
      appendforecast(data);
    } catch (error) {
      console.log(error);
    }
  };
function appendforecast(data){
    var f=document.getElementById("forecast");
    f.innerText="";
			data.daily.forEach((value, index) => {
				if (index > 0) {
					var dayname = new Date(value.dt * 1000).toLocaleDateString("en", {
						weekday: "long",
					});
					var icon = value.weather[0].icon;
					var temp = value.temp.day.toFixed(0);
			        var dp=document.createElement("p");
                    dp.innerText=dayname;
                    var ip=document.createElement("img");
                    ip.src="http://openweathermap.org/img/w/" + icon + ".png";
                    var tp=document.createElement("p");
                    tp.innerText=temp+" °C";
                    var card=document.createElement("div");
                    card.append(dp,ip,tp);
                    f.append(card);

                }
            });
        }
