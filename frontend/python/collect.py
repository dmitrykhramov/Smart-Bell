import cv2
import numpy as np
import face_recognition
import dlib
import pickle
import os
import save

def encoding_picture(picture_path, __id):
	try:
		image = face_recognition.load_image_file(picture_path)
		small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		# Encode the visitor's face
		image_face_encoding = face_recognition.face_encodings(small_image)[0]
		# Associate visitor's id and encoding data of visitor's face
		data = [[__id],image_face_encoding]
	
		# Save the associated data
		# If it's first time, just dump
		if os.path.getsize('faces_encodings.txt') == 0:
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(data,f)
		else:
			# Load the registered data
			with open('faces_encodings.txt','rb') as f:
				known_faces_encoding_data = pickle.load(f)
			# Append [[visitor's id],[the encoding data of visitor's face]] to the registered data
			known_faces_encoding_data = np.vstack((known_faces_encoding_data,data))
			# Then, dump
			with open('faces_encodings.txt','wb') as f:
				pickle.dump(known_faces_encoding_data, f)
		return True
	except EOFError:
		return False

def collect_picture(frame, folder_name, file_name, __id):
	'''
	This function is to collect encoding face data.
	we detects face in the frame and check whether the frame is enough to detect face or not.
	If not enough, it would returns False.
	If enough, we would save the frame as '.jpg' and load the image which is saved as '.jpg'.
	If you encode immediately the frame, it would make incorrect encoding data, because the frame is different format with '.jpg'.
	And we associates visitor's id with the encoding data. When you want to delete visitor, you would use visitor's id. That's why we associates visitor's id with encoding data of the visitor.
	Then, we save the associated data.
	If it's first time to dump, just dump it.
	If not, load 'faces_encodings.txt', append it to registered data, then dump.
	'''
	# It affects dlib speed. If frame size is small, dlib would be faster than normal size frame
	small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	# Detect face in the frame
	face_locations = face_recognition.face_locations(small_frame)
	
	# If not detect face
	if len(face_locations) == 0:
		print("face detection fails")
		return False
	
	else:
		
		# Save the visitor's face as '.jpg'
		save.save_photo(folder_name, file_name, frame)
		
		# Load the visitor's face which is saved as '.jpg'
		#image = face_recognition.load_image_file('pics/'+str(__id)+'/img0.jpg')
		#small_image = cv2.resize(image, (0, 0), fx=0.25, fy=0.25)
		# Encode the visitor's face
		#image_face_encoding = face_recognition.face_encodings(small_image)[0]
		# Associate visitor's id and encoding data of visitor's face
		#data = [[__id],image_face_encoding]
		path = 'pics/'+str(__id)+'/img0.jpg'
		result = encoding_picture(path, __id)
		
		if result == True:
			print("face detection successes")
			return True
		else:
			print("Chcek picture path")
			return False
