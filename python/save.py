import cv2
import os

def make_directory(path):
	'''
	This function is to make directory for pictures.
	It checks whether a directory exists or not befor saving a picture.
	If it exists, just pass. If not, it makes the directory.
	'''
	if not os.path.exists(path):
		os.makedirs(path)

def save_photo(file_path, frame):
	'''
	This function is to save photos.
	After making directory, it save a picture and returns path of the picture.
	'''
	cv2.imwrite(file_path, frame)
