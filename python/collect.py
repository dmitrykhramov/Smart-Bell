import cv2
import numpy as np
import face_recognition
import dlib
import pickle
import os
import save
from pymongo import MongoClient

mongo_db = MongoClient('localhost',27017)
db = mongo_db.smartbell.visitors

def encoding_picture(picture_path, __id):
	'''
	This function is to collect encoding face features.
	The photo is encoded and saved with associated visitor's id.
	If it's first time to dump, just dump it.
	Otherwise, load 'faces_encodings.txt', append it to registered data, then dump.
	'''
	try:
		print("encoding")
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
		return "success"
		
	except EOFError:
		return "fail"
		
def upload_photo():
	'''
	This function is one of ways for collecting face features and is executed When administrator uploads the new visitor' photo.
	It saves the photo to static path which is 'pics/upload'.
	'''
	print("upload photo func")
	save.make_directory('pics/upload')
	visitors = db.find_one(sort=[('_id',-1)])
	
	return encoding_picture('pics/upload/img0.jpg', visitors['_id'])
	
def cancel_add():
	'''
	This function is executed when administrator cancles to add a visitor.
	It finds last person in database and deletes it.
	'''
	print("cancel add visitor")
	visitors = db.find_one(sort=[('_id',-1)])
	db.remove({'_id':visitors['_id']})
	print("cancel success")
	
def make_photo(frame):
	'''
	This function is one of ways for collecting face features and is exctued when administrator makes photo.
	It checks whether the photo is enough to encode or not.
	If the photo is enough, it saves the photo to static path which is 'pics/img0.jpg' and calls encoding_picture function.
	If you don't save the photo as .jpg format and immediately save the photo from usb camera, encoding face features should be different and incorrect.
	So, the photo has to be saved as .jpg format before excuting encoding function.
	Otherwise, it returns fail.
	'''
	save.make_directory('pics')
	visitors = db.find_one(sort=[('_id',-1)])
	
	# It affects dlib speed. If frame size is small, dlib would be faster than normal size frame
	small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	# Detect face in the frame
	face_locations = face_recognition.face_locations(small_frame)
	
	# If not detect face
	if len(face_locations) == 0:
		print("face detection fails")
		return "fail"
	
	else:
		path = 'pics/img0.jpg'
		# Save the visitor's face as '.jpg'
		save.save_photo(path, frame)
		result = encoding_picture(path, visitors['_id'])
		
		if result == "success":
			print("Success to register")
		else:
			print("Chcek picture path")
			
		return result
