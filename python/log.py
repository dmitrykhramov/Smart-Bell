from pymongo import MongoClient
import RPi.GPIO as GPIO
from bson.objectid import ObjectId
import time
import send_email
import cv2
import base64

GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)
GPIO.setup(27, GPIO.OUT)

mongo_db = MongoClient('localhost',27017)
db_log = mongo_db.smartbell.logs

def led():
	'''
	This function is to blink led when checking a permission to access.
	'''
	GPIO.output(27,True)
	time.sleep(1)
	GPIO.output(27,False)
	time.sleep(1)


def save_log(firstname, lastname, frame, __id, log_time, access):
	'''
	This function is to save entrance log.

	'''
	flag, jpeg = cv2.imencode('.jpg', frame)
	encoding_frame = base64.b64encode(jpeg)
	
	if access == True:
		access_log = "allowed"
	else:
		access_log = "denied"
	# Save the log
	db_log.insert_one({"firstname":firstname, "lastname":lastname, "time":log_time, "photo": encoding_frame, "access":access_log})
	return log_time

def permission_check(__id, frame,log_time):
	'''
	This function is to check permission to access.
	It checks permission using visitor's id. (access value is 'true' or 'false') Then, it saves the log about all visitors.
	If the visitor doesn't have permission to access, led blinks 2 times and door stays close.
	Otherwise, if the visitor has permisson, it sends an email to the visitor about their entrance, then led blinks once.
	'''
	# Check permission to access 
	db_visitors = mongo_db.smartbell.visitors
	try:
		valid = db_visitors.find_one({"_id": ObjectId(__id[0])})
	except EOFError:
		return 0
	
	save_log(valid['firstname'], valid['lastname'], frame, valid['_id'], log_time, valid['access'])
	
	# If permission to access is true,
	if valid['access']:
		print("Available face")
		send_email.email(valid['email'],valid['firstname'],valid['lastname'],log_time)
		led()
		
	else:
		print("No permission, closed")
		for n in range(2):
			led()

