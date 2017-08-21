from pymongo import MongoClient
import RPi.GPIO as GPIO
import datetime
from bson.objectid import ObjectId

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(27, GPIO.OUT)

mongo_db = MongoClient('localhost',27017)
db_log = mongo_db.smartbell.log

def save_log(__id):
	if __id == 0:
		print("Does not register")
		for n in range(5):
			led()
	else:
		print("I see someone id {}!".format(__id))
		permission_check(__id)

def led():
	GPIO.output(27,True)
	time.sleep(5)
	GPIO.output(27,False)

def permission_check(__id):
	db_visitors = mongo_db.smartbell.visitors
	valid = db_visitors.find_one({"_id": ObjectId(__id[0])})
	print(valid['access'])

	if valid['access']:
		print("Available face, open")
		led()
		log_time = datetime.datetime.now().strftime('%Y-%m-%d %H:%M:%S')
		db_log.insert_one({"firstname":valid['firstname'], "lastname":valid['lastname'], "time":log_time})
	else:
		print("No permission, closed")
		for n in range(5):
			led()


