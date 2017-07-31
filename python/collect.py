import cv2
import numpy as np
import face_recognition

# Get Face Detector from dlib
# This allows us to detect faces in images

# Collect 10 samples of your face from webcam input
def collect_pictures(frame, folder_name, file_name):
    print('method collect pictures')
    face = face_extractor(frame)
    if face is not None:
        print('face found')
        face = cv2.resize(face, (200, 200))
        face = cv2.cvtColor(face, cv2.COLOR_BGR2GRAY)

        # Save file in specified directory with unique name
        file_name_path = folder_name + file_name
        cv2.imwrite(file_name_path, face)

        return True
        
    else:
        print("Face not found")
        return False

def face_extractor(img):
    # Function detects faces and returns the cropped face
    # If no face detected, it returns the input image
        
    face_locations = face_recognition.face_locations(img)

    print("I found {} face(s) in this photograph.".format(len(face_locations)))

    if len(face_locations) == 0:
        return None

    for face_location in face_locations:

        # Print the location of each face in this image
        top, right, bottom, left = face_location
        print("A face is located at pixel location Top: {}, Left: {}, Bottom: {}, Right: {}".format(top, left, bottom, right))

        # You can access the actual face itself like this:
        face_image = img[top:bottom, left:right]
            
    return face_image
    
