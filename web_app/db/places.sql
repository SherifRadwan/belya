CREATE TABLE governorates (
	id integer primary key autoincrement,
	name text 	
);


CREATE TABLE cities (
	id integer primary key autoincrement,
	gov_id integer,
	name text,

	foreign key(gov_id) references governorates(id) 	
);


CREATE TABLE places (
	id integer primary key autoincrement,
	city_id integer,
	name text,
	address text,
	phone varchar(25),
	lat real,
	lon real,
	rating integer,
	comments text,

	foreign key(city_id) references cities(id)
);
