import recognition
import log
import face_recognition

'''
This function is to check whether the visitor is registered or not.
First, we check whether the frame which is the visitor's face is enough to detect face or not.
If it is not enough to detect face, we would print that 'Cannot detect face. Try again'.
If it is enough to detect face, we would send the frame to recognition.py to recognize the face.
Then, recognition.py returns the visitor's id if the visitor is registered, or returns 0 and led blinks 5 times.
If the visitor is registered, we would send the id to log.py to check permission and save the entrance log.
'''

def visit(frame):
	# Detect face
	# If it cannot detect face, the library would return 0
	visitor_face = len(face_recognition.face_locations(frame))
	
	if visitor_face == 0:
		print("Cannot detect face. Try again")
	else:
		# Compare to registered faces and visitor's face
		__id = recognition.face_comparison(frame)
		if __id == 0:
			print("Does not register")
			for n in range(5):
				log.led()
		else:
			print("I see someone id {}!".format(__id))
			log.permission_check(__id)
