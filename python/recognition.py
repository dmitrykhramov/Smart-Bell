import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle

def face_comparison(frame):
	
	__id = 0
	
	# Read the text file which known faces are encoded  
	with open('faces_encodings.txt','r') as f:
		image_face_encoding = pickle.load(f)
	#print(image_face_encoding)
	s_time = time.time()
	# Initialize some variables
	face_locations = []
	face_encodings = []
	
	face_locations = face_recognition.face_locations(frame)
	# Encode unknown's face who pushes the physical button
	face_encodings = face_recognition.face_encodings(frame, face_locations)
	
	# Compare known faces and unkown face
	for i in range(len(image_face_encoding)):
		for face_encoding in face_encodings:
			if len(image_face_encoding) == 2 and len(image_face_encoding[0]) == 1:
				ret, encoding_data = image_face_encoding
				match = face_recognition.compare_faces([[encoding_data]], face_encoding)
			else:	
				ret, encoding_data = image_face_encoding[i]
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			print(match)
			if match[0] == True:
				__id = ret
		if __id != 0:
			print(time.time()-s_time)
			break

	return __id

