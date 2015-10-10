<?php

require_once('db/db.php');

if(!isset($db))
	$db = new DB('../db/places.db');

if(isset($_GET['gov_id']) && !empty($_GET['gov_id'])) {
      $gov_id = $_GET['gov_id'];
      echo $db->gov_id($gov_id);

}

if(isset($_GET['city_id']) && !empty($_GET['city_id'])) {
      $city_id = $_GET['city_id'];
      echo $db->city_id($city_id);

}

if(isset($_GET['gov']) && !empty($_GET['gov'])) {
      $gov = (int) $_GET['gov'];
      foreach($db->list_cities($gov) as $row) {
            echo "{$row['id']},{$row['name']}\n";
      }
}


if(isset($_GET['city']) && !empty($_GET['city'])) {
      $city = (int) $_GET['city'];
      foreach($db->list_places($city) as $row) {
            echo "{$row['id']},{$row['name']},{$row['lat']},{$row['lon']},{$row['address']},{$row['phone']}<br>";
      }
}


// $GLOBALS['DB'] = $db;