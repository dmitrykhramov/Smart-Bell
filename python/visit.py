import recognition
import log
import face_recognition
from datetime import datetime
import time
import pytz

LOCAL_TZ = pytz.timezone('Europe/Helsinki')

def visit(frame):
	'''
	This function is excuted when a visitor pushes a button.
	It checks whether the frame is enough to detect.
	If the frame is enough, it calls recognition.py and check the visitor is registered.
	If the visitor is recognized by id, it calls log.py to save the log about the visitor.
	Otherwise, it calls log.py to save the log about that Unkown visitor tried to access the place.
	'''
	# Detect face
	# If it cannot detect face, the library would return 0
	visitor_face = len(face_recognition.face_locations(frame))
	
	log_time = datetime.now(pytz.utc).astimezone(LOCAL_TZ).strftime('%Y-%m-%d %H:%M:%S')
	
	if visitor_face == 0:
		print("Cannot detect face. Try again")
	else:
		# Compare to registered faces and visitor's face
		__id = recognition.face_comparison(frame)
		if __id == 0:
			print("Does not register")
			log.save_log("Unkown", "Visitor", frame, 0, log_time, False)
			for n in range(2):
				log.led()
		else:
			print("I see someone id {}!".format(__id))
			log.permission_check(__id, frame, log_time)
