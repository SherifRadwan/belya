var map;
var pos;
var geocoder;
var markers = [];
var wins = [];
var ownMarker;
var ownWin;
var ownLatLon;
var ownAddress;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();
var results = [];
var renderers = [];
var htmls = [];

function detectSuccess(position) {
	pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
	makeMap(pos);
	goToLocation(ownLatLon);
}

function detectFailure(error) {
	makeMap(31.5, 31);
}	


function detectLocation()
{
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(
			detectSuccess,
			detectFailure
		);
	}
	else { 
		alert("Geocoding isn't supported, try to enter your city name");
		return null;
	}
}

function addMarker(latlon, title)
{
	var marker = new google.maps.Marker({
  		position: latlon,
  		map: map,
  		title: title
  	}); 

  	markers.push(marker);

  	return marker;
}

function clearMarkers()
{
	for(var i = 0; i < markers.length; i++)
	{
		if(ownMarker == markers[i])
			continue;

		markers[i].setMap(null);
	}

	markers = [];
}

function addIcon(path, latlon)
{
  	var marker = new google.maps.Marker({
  		position: latlon,
  		map: map,
  		icon: path,
  	}); 

  	marker.icon = path;
  	marker.anchorPoint = new google.maps.Point(latlon.lat(), latlon.lng());
	marker.setMap(map);
}

function openInfoWindow(html, latlon, marker)
{
	var win = new google.maps.InfoWindow({
		content: html,
		position: latlon,
	});

	win.open(map, marker);
	wins.push(win);

	return win;
}

function clearWindows()
{
	for(var i = 0; i < wins.length; i++)
	{
		if(wins[i] == ownWin)
			continue;

		wins[i].setMap(null);
	}

	wins = [];
}

function clearRoutes()
{
	for(var i=0; i < renderers.length; i++)
		renderers[i].setMap(null);

	renderers = [];
}

function makeMap(center) {
	directionsDisplay = new google.maps.DirectionsRenderer();

	var map_canvas = document.getElementById('map_canvas');

	var map_options = {
	  	center: center ,
	  	zoom: 7,
	  	mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	ownLatLon = center;

	map = new google.maps.Map(map_canvas, map_options);

	ownMarker = addMarker(center, "");

	geocoder = new google.maps.Geocoder();
	directionsDisplay.setMap(map);
}

function renderDirections(result) {
  	var directionsRenderer = new google.maps.DirectionsRenderer;
  	directionsRenderer.setMap(map);
  	directionsRenderer.setDirections(result);
  	results.push(result);
  	renderers.push(directionsRenderer);
	calculateShortest();

}

function requestDirections(start, end) {
  directionsService.route({
    origin: start,
    destination: end,
    travelMode: google.maps.DirectionsTravelMode.WALKING
  }, function(result) {
    renderDirections(result);
  });
}

// todo use prototype for google.maps.Distance
function distance(result)
{
	return result.routes[0].legs[0].distance.value;
}

function calculateShortest()
{
	if(results.length > 0)
	{
		var shortest = 0;
		var dist = distance(results[0]);

		for(var i = 1; i < results.length; i++)
		{
			if(distance(results[i]) < dist)
			{
				shortest = i;
				dist = distance(results[i]);
			}
		}
		
	}
	// var nearestPlace = places[shortest];
	var nearest_html = "<br><h1>Nearest Center/Workshop</h1><br>" + htmls[shortest];
	document.getElementById("shortest-info").innerHTML = nearest_html;
}

function gov_id(gov)
{
	send_req("req.php", "gov_id=" + gov);
	var id = -1;
 
 	set_on_ready_fn(function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		load_cities_for(xmlhttp.responseText);
    	}
    });

    return id;
}

function city_id(city)
{
	send_req("req.php", "city_id=" + city);
	var id = -1;

	set_on_ready_fn(function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		load_places_for(xmlhttp.responseText);
    	}
    });

    return id;
}

function gotAddress(results, status)
{
    if (status == google.maps.GeocoderStatus.OK) {
      //map.setCenter(results[0].geometry.location);
      //addMarker(results[0].geometry.location, results[0].formatted_address);
      ownAddress = results[0].formatted_address;
	  ownWin = openInfoWindow("<b>You may be here!</b><br>" + ownAddress, ownLatLon, ownMarker);
	  var addrComp = ownAddress.split(",");

	  var gov = addrComp[addrComp.length - 2].trim();
	  var city = addrComp[addrComp.length - 3].trim();

	  gov_id(gov);
	  city_id(city);

	  // load_cities_for(gov_id(gov));
	  // load_places_for(city_id(city));

    } else {
      console.log('Geocoding error: ' + status);
    }
}

function goToAddress(address)
{

	geocoder.geocode( { 'address': address}, gotAddress);
}

function goToLocation(latlon)
{
	geocoder.geocode({'latLng': latlon}, gotAddress);
}

var xmlhttp;
xmlhttp = new XMLHttpRequest();

function set_on_ready_fn(fn)
{
	xmlhttp.onreadystatechange = fn;
}

function send_req(path, parm)
{
	xmlhttp.open("GET", path+"?"+parm, true);
	xmlhttp.send(path);
}

function parse_resp(xml_txt)
{

}

var govs = ["6th of October ","Alexandria ","Aswan ","Asyut ","Beheira ","Beni Suef ","Cairo ","Dakahlia ","Damietta ","Faiyum ","Gharbia ","Giza ","Helwan ","Ismailia ","Kafr el-Sheikh ","Luxor ","Matruh ","Minya ","Monufia ","New Valley ","North Sinai ","Port Said ","Qalyubia ","Qena ","Red Sea ","Sharqia ","Sohag ","South Sinai ","Suez "];
var govElement = document.getElementById("gov");
var cityElement = document.getElementById("city");




function load_govs()
{
	var html = "<option value=0>Select... </option>";
	
	for(var i=0; i < govs.length; i++)
	{
		html += "<option value=" + (i + 1) + ">" + govs[i] + "</option>";
	}

	govElement.innerHTML = html;
}

function load_cities_for(gov_id)
{
	send_req("req.php", "gov=" + gov_id);

	set_on_ready_fn(function() {
  		if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
    	{
    		if(!xmlhttp.responseText)
    		{
    			cityElement.innerHTML = "<option value=->-------------</option>";;
    			return;
    		}

    		var cities = xmlhttp.responseText.split("\n");
		var html = "<option value=-1>Select... </option>";

    		for(var i=0; i < cities.length; i++)
    		{
    			if(!cities[i]) continue;

    			var city = cities[i].split(",");
    			var id = city[0];
    			var name = city[1];

    			if(city)
    				html += "<option value=" + id + ">" + name + "</option>";
    		}
    		cityElement.innerHTML = html;
		// alert("cities loaded");
    	}
    	else
    		cityElement.innerHTML = "---------";
	});
}


function load_cities()
{
	var gov_id = govElement.options[govElement.selectedIndex].value;
	if(gov_id != "0") load_cities_for(gov_id);
}

function load_places_for(city_id)
{
	send_req("req.php", "city=" + city_id);

	set_on_ready_fn(function() {
  	if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		var places = xmlhttp.responseText.split("<br>");
    		// delete all markers
    		clearMarkers();
    		clearWindows();
		    clearRoutes();
    		results = [];
    		htmls = [];

    		for(var i=0; i < places.length; i++)
    		{
    			if(!places[i])
    				continue;

    			place = places[i].split(",");

    			var id = place[0];
    			var name = place[1];
    			var lat = place[2];
    			var lon = place[3];
    			var address = place[4];
    			var phone = place[5];

    			var latlon = new google.maps.LatLng(lat, lon);

    			var marker = addMarker(latlon, "Cener/Workshop");
    			var info_html = 	"<b>Name:</b> " + name + "<br>";
    				info_html += 	"<b>Address:</b> " + address + "<br>";
    				info_html += 	"<b>Phone:</b> " + phone + "<br>";

    			htmls.push(info_html);

    			requestDirections(ownLatLon, new google.maps.LatLng(lat, lon));
    			openInfoWindow(info_html, latlon, marker);
    		}
    	}
	});
}

function load_places()
{
	var city_id = cityElement.options[cityElement.selectedIndex].value;
	if(city_id != "-1") load_places_for(city_id);
}

function init()
{
	load_govs();
	// load_cities();
	// load_places();
}

init();
google.maps.event.addDomListener(window, 'load', detectLocation);
//goToLocation(new google.maps.LatLng(100, 50));
