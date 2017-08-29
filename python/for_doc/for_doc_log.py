def permission_check(__id):
	db_visitors = mongo_db.smartbell.visitors
	valid = db_visitors.find_one({"_id": ObjectId(__id[0])})
	
	if valid['access']:
		print("Available face, open")
		led()
		log_time = datetime.now(pytz.utc).astimezone(LOCAL_TZ).strftime('%Y-%m-%d %H:%M:%S')
		db_log.insert_one({"firstname":valid['firstname'], "lastname":valid['lastname'], "time":log_time})
	else:
		print("No permission, closed")
		for n in range(5):
			led()


