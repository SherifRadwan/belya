<?php
require_once('./db/model.php');

class DB {
	private $db = NULL;

	function __construct($fname)
	{
		$this->connect($fname);
	}

	function connect($fname)
	{
		if($this->db)
			return;

		$this->db = new SQLite3($fname);
		if($this->db)
			return TRUE;
		else
			return FALSE;
	}

	function list_govs()
	{
		$res = $this->db->query(Model::ALL_GOVS);
		while($row = $res->fetchArray())
			yield $row;
	}

	function list_cities($gov_id)
	{
		$stmt = $this->db->prepare(Model::ALL_CITIES);
		$stmt->bindParam(":gov_id", $gov_id);
		$res = $stmt->execute();
		while($row = $res->fetchArray())
			yield $row;
	}

	function list_places($city_id)
	{
		$stmt = $this->db->prepare(Model::ALL_PLACES);
		$stmt->bindParam(":city_id", $city_id);
		$res = $stmt->execute();
		while($row = $res->fetchArray())
			yield $row;
	}

	function gov_id($gov)
	{
		$stmt = $this->db->prepare("SELECT id FROM governorates WHERE name like '%{$gov}%';");
		$res = $stmt->execute();
		if($row = $res->fetchArray())
		{
			return $row['id'];
		}
	}

	function city_id($city)
	{
		$stmt = $this->db->prepare("SELECT id FROM cities WHERE name like '%{$city}%'");
		$res = $stmt->execute();
		if($row = $res->fetchArray())
		{
			return $row['id'];
		}
	}
}