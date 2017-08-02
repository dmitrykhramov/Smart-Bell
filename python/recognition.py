import sys
import dlib
from skimage import io
import time
import cv2
import openface

# You can download the required pre-trained face detection model here:
# http://dlib.net/files/shape_predictor_68_face_landmarks.dat.bz2
predictor_model = "shape_predictor_68_face_landmarks.dat"

# Create a HOG face detector using the built-in dlib class
face_detector = dlib.get_frontal_face_detector()
face_pose_predictor = dlib.shape_predictor(predictor_model)
face_aligner = openface.AlignDlib(predictor_model)

win = dlib.image_window()

camera = cv2.VideoCapture(0)
success, image = camera.read()

detected_faces = face_detector(image, 1)

win.set_image(image)

for i, face_rect in enumerate(detected_faces):

	# Draw a box around each face we found
	win.add_overlay(face_rect)

	# Get the the face's pose
	pose_landmarks = face_pose_predictor(image, face_rect)

	# Draw the face landmarks on the screen.
#	win.add_overlay(pose_landmarks)
	alignedFace = face_aligner.align(534, image, face_rect, landmarkIndices=openface.AlignDlib.OUTER_EYES_AND_NOSE)
	#win.add_overlay(alignedFace)
	# Save the aligned image to a file
	#cv2.imwrite("aligned_face_{}.jpg".format(i), alignedFace)
	        
dlib.hit_enter_to_continue()
