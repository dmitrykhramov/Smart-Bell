import cv2
import os

def make_directory(path):
	if not os.path.exists(path):
		os.makedirs(path)

def save_photo(folder_name, file_name, frame):
	file_name_path = folder_name + file_name
	cv2.imwrite(file_name_path, frame)
	
	return file_name_path
