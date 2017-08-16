import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle

# Check whether visitor's face is registered or not
# Compare registered faces and visitor's face
# This can make us to recognize the face

def face_comparison(visitor_face):
	
	__id = 0
	
	# Read the text file which known faces are encoded  
	with open('faces_encodings.txt','r') as f:
		image_face_encoding = pickle.load(f)
	s_time = time.time()
	
	# Initialize some variables
	face_locations = []
	face_encodings = []
	
	# Encode visitor's face
	face_locations = face_recognition.face_locations(visitor_face)
	face_encodings = face_recognition.face_encodings(visitor_face, face_locations)
	
	# Compare known faces and unkown face
	for i in range(len(image_face_encoding)):
		for face_encoding in face_encodings:
			if len(image_face_encoding) == 2 and len(image_face_encoding[0]) == 1:
				ret, encoding_data = image_face_encoding
				match = face_recognition.compare_faces([[encoding_data]], face_encoding)
			else:	
				ret, encoding_data = image_face_encoding[i]
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			# If visitor's face is registered
			if match[0] == True:
				__id = ret
		if __id != 0:
			print(time.time()-s_time)
			break

	return __id

