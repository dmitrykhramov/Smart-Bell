import face_recognition
import picamera
import numpy as np
from pymongo import MongoClient
import time
import cv2

def face_comparison(frame):
	
	valid = False
	
	client = MongoClient('localhost',27017)
	db = client.smartbell.visitors
	
	visitors = db.find()
	__id = []
	for cur in visitors:
		__id.append(cur['_id'])
	s_time = time.time()
	for i in __id:
		# Load a sample picture and learn how to recognize it.
		print("Loading known face image(s)")
		image = face_recognition.load_image_file('pics/'+str(i)+'/img1.jpg')
		
		if len(image) == 0:
			print("Cannot find image")
			continue
			
		small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		image_face_encoding = face_recognition.face_encodings(small_image)[0]

		# Initialize some variables
		face_locations = []
		face_encodings = []

		# Find all the faces and face encodings in the current frame of video
		face_locations = face_recognition.face_locations(frame)
		print("Found {} faces in image.".format(len(face_locations)))
		face_encodings = face_recognition.face_encodings(frame, face_locations)

		# Loop over each face found in the frame to see if it's someone we know.
		for face_encoding in face_encodings:
			# See if the face is a match for the known face(s)
			match = face_recognition.compare_faces([image_face_encoding], face_encoding)

			if match[0]:
				valid = True
				print("I see someone id {}!".format(i))
		
		print(time.time()-s_time)
	return valid
