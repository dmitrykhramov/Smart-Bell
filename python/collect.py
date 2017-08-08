import cv2
import numpy as np
import face_recognition
import dlib

# Get Face Detector from dlib
# This allows us to detect faces in images

# Collect 10 samples of your face from webcam input
def collect_picture(frame, folder_name, file_name):
	#If capturing image is not enough to detect face, we cannot compare face
	#When making a photo at first, we need to check if the image is correct
	small_frame = cv2.resize(frame, (0, 0), fx=0.25, fy=0.25)
	face_locations = face_recognition.face_locations(small_frame)
	if len(face_locations) == 0:
		print("fail")
		return False
	else:
		file_name_path = folder_name + file_name
		cv2.imwrite(file_name_path, frame)
		print("success")
		return True

