var xmlhttp;

if (window.XMLHttpRequest)
{
	// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
}
else
{
	// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
}

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
	var html = "";

	for(var i=0; i < govs.length; i++)
	{
		html += "<option value=" + (i + 1) + ">" + govs[i] + "</option>";
	}

	govElement.innerHTML = html;
}

function load_cities()
{
	var gov = govElement.options[govElement.selectedIndex].value;

	send_req("req.php", "gov=" + gov);

	set_on_ready_fn(function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		if(!xmlhttp.responseText)
    		{
    			cityElement.innerHTML = "<option value=->-------------</option>";;
    			return;
    		}

    		var cities = xmlhttp.responseText.split("\n");
    		var html = "";

    		for(var i=0; i < cities.length; i++)
    		{
    			if(cities[i])
    				html += "<option value=" + (i + 1) + ">" + cities[i] + "</option>";
    		}
    		cityElement.innerHTML = html;
    	}
    	else
    		cityElement.innerHTML = "---------";
	});
}

function load_places()
{
	var city = cityElement.options[cityElement.selectedIndex].value;

	send_req("req.php", "city=" + city);

	set_on_ready_fn(function() {
  		if (xmlhttp.readyState==4 && xmlhttp.status==200)
    	{
    		var places = xmlhttp.responseText.split("\n");

    		for(var i=0; i < places.length; i++)
    		{
    			place = places[i].split(",");

    			var id = place[0];
    			var name = place[1];
    			var lat = place[2];
    			var lon = place[3];

    			addMarker(new maps.google.LatLng(lat, lon), name);
    		}
    	}
	});
}

function init()
{
	load_govs(govElement);
	load_cities(govElement);
}

init();