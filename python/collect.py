import cv2
import numpy as np
import face_recognition
import dlib
import pickle
import os

# Get Face Detector from dlib
# This allows us to detect faces in images

# Collect 10 samples of your face from webcam input
def collect_picture(frame, folder_name, file_name):
	#If capturing image is not enough to detect face, we cannot compare face
	#When making a photo at first, we need to check if the image is correct
	small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	
	face_locations = face_recognition.face_locations(small_frame)
	
	if len(face_locations) == 0:
		print("face detection fails")
		return False
	else:
		file_name_path = folder_name + file_name
		cv2.imwrite(file_name_path, frame)
		
		image_face_encoding = face_recognition.face_encodings(small_frame)[0]
		
		if os.path.getsize('faces_encodings.txt') == 0:
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(image_face_encoding,f)
		
		else:
			with open('faces_encodings.txt','rb') as f:
				known_faces_encoding_data = pickle.load(f)
			known_faces_encoding_data = np.vstack((known_faces_encoding_data,image_face_encoding))
			print(known_faces_encoding_data)
			print(np.shape(known_faces_encoding_data))
				
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(known_faces_encoding_data, f)
			
		#with open('faces_encodings.txt','rb') as f:
		#	a = pickle.load(f)
			
		print("face detection successes")
		return True
