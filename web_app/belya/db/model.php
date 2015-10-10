<?php

class Model {
	const ALL_GOVS = "SELECT * FROM governorates";
	const ALL_CITIES = "SELECT * FROM cities WHERE gov_id = :gov_id";
	const ALL_PLACES = "SELECT * FROM places WHERE city_id = :city_id";
	const GOV_ID = "";
	const CITY_ID = "";
}
