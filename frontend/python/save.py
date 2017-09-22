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

def save_photo(folder_name, file_name, frame):
	'''
	This function is to save photos.
	After making directory, it save a picture and returns path of the picture.
	'''
	file_name_path = folder_name + file_name
	cv2.imwrite(file_name_path, frame)
	
	return file_name_path
