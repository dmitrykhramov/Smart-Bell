import face_recognition
import numpy as np
from pymongo import MongoClient
import time
import cv2
import pickle

def face_comparison(visitor_face):
	'''
	This function is to recognize whether visitor's face is registered or not.
	First, we reads file which has encoding data of registered faces.
	we detects visitor's face and encoding that part.
	we compares to encoding data of registered faces and encoding data of visitor's face.
	Then, if visitor is registered, we would return visitor's id, or if not, it would return 0. 
	'''
	__id = 0
	
	# Read the text file which known faces are encoded  
	with open('faces_encodings.txt','r') as f:
		try:
			image_face_encoding = pickle.load(f)
		except EOFError:
			return 0
	
	s_time = time.time()
	
	# Initialize some variables
	face_locations = []
	face_encodings = []
	
	# Detect visitor's face
	face_locations = face_recognition.face_locations(visitor_face)
	# Encode detected face
	face_encodings = face_recognition.face_encodings(visitor_face, face_locations)
	
	for i in range(len(image_face_encoding)):
		for face_encoding in face_encodings:
			# Exception : If there is registered face, the encoding data shape would be different between other cases. It's like (2,1).
			if (len(image_face_encoding) == 2 and len(image_face_encoding[0]) == 1):
				ret, encoding_data = image_face_encoding
				# Compare registered faces and visitor's face 
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			# If there are more than 2 registered faces, the encoding data shape would be like (2,2), (3,2), (4,2), etc. 
			else:	
				ret, encoding_data = image_face_encoding[i]
				# Compare registered faces and visitor's face 
				match = face_recognition.compare_faces([encoding_data], face_encoding)
			
			# If visitor's face is registered
			if match[0].all() == True:
				__id = ret
		if __id != 0:
			print(time.time()-s_time)
			break
			
	return __id
