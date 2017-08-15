import cv2
import numpy as np
import face_recognition
import dlib
import pickle
import os
from pymongo import MongoClient

# Get Face Detector from dlib
# This allows us to detect faces in images

# Collect 10 samples of your face from webcam input
def collect_picture(frame, folder_name, file_name):
	# Exception :
	# If capturing image is not enough to detect face, we cannot compare face
	# When making a photo at first, we need to check if the image is correct
	small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	# Detect face
	face_locations = face_recognition.face_locations(small_frame)
	
	# If not detect face
	if len(face_locations) == 0:
		print("face detection fails")
		return False
	
	else:
		# Save the face
		file_name_path = folder_name + file_name
		cv2.imwrite(file_name_path, frame)
		
		client = MongoClient('localhost',27017)
		db = client.smartbell.visitors
		visitors = db.find_one(sort=[('_id',-1)])
		__id = visitors['_id']
		
		image = face_recognition.load_image_file('pics/'+str(__id)+'/img0.jpg')
		small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		# Encode the face as known face
		image_face_encoding = face_recognition.face_encodings(small_image)[0]
		data = [[__id],image_face_encoding]
		# If it's first person, just dump it
		if os.path.getsize('faces_encodings.txt') == 0:
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(data,f)
		# If it's not first person, read existing file and append it
		else:
			with open('faces_encodings.txt','rb') as f:
				known_faces_encoding_data = pickle.load(f)
			known_faces_encoding_data = np.vstack((known_faces_encoding_data,data))
			print(known_faces_encoding_data)
				
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(known_faces_encoding_data, f)

		print("face detection successes")
		return True
