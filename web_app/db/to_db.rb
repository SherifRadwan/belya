# coding: utf-8
require 'sqlite3'
require 'csv'

include SQLite3

def list_of_govs()
	govs = []
	IO.readlines('govs.txt').each do |line|
		if line =~ /^\d/
			govs << line.gsub(/\d+\)\s/, '')
		end
	end
	govs.sort
end

def fill_gov(fn)
	db = Database.new(fn)
	list_of_govs.each do |gov|
		db.execute("insert into governorates(name) values(?)", gov)
	end
ensure
	db.close
end

def to_db(fn, csv)
	db = Database.new(fn)
	addresses = File.open('address.txt', 'w+')
	govs = File.open('govs.txt', 'w+')
	cities = File.open('cities.txt', 'w+')
	db.transaction
	CSV.foreach(csv) do |name, gov, city, address, lat, lon|
		if gov.nil? or city.nil? or gov.empty? or city.empty?
			next
		end

		p gov, city

		gov = gov.capitalize.strip
		city = city.capitalize.strip
	

		gov_id = db.execute("select id from governorates where name like '%#{gov}%'").first.first.to_i
		# check for city id first
		city_id = db.execute("select id from cities where name like '%#{city}%'")

		if city_id.empty?
			db.execute("insert into cities(gov_id, name) values(?,?)", gov_id, city)
			city_id = db.execute("select id from cities where name like '%#{city}%'").first.first.to_i
		end

		db.execute("insert into places(city_id, name, address, lat, lon) values(?, ?,?,?,?)", city_id, name.force_encoding("utf-8"), address.force_encoding("utf-8"), lat, lon)
	end
	db.commit
ensure
	db.close
end


#fill_gov("places.db")

to_db("places.db", "data.csv")