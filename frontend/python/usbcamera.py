from tornado import websocket, web, ioloop
import base64
import cv2
import time
from videostream import Stream
from delete import delete_face
import collect

stream_thread = Stream()
stream_thread.daemon = True
stream_thread.start()

class SocketHandler(websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
        
	def open(self):
		print("client connected")
		stream_thread.add_client(self)
		stream_thread.change_socket_flag()
		
		
	def on_message(self, message):
		command = message.split(';')
		print(command[0])
		if command[0] == "photo":
			print("photo")
			stream_thread.change_capture_flag()
		elif command[0] == "delete":
			print("delete")
			print(command[1])
			print(delete_face(command[1]))
		# here put upload something
		#elif command[0] == "upload":
		#	print("upload")
		#	print(command[1])
		#	print(command[2])
		#	print(collect.encoding_picture(command[1],command[2])
			
	def on_close(self):
		print("client disconnected")
		stream_thread.change_socket_flag()
		stream_thread.remove_client(self)
		
	
def main():
	
	app = web.Application([
		(r'/ws',SocketHandler)
	])
	app.listen(8000)
	ioloop.IOLoop.instance().start()

		
if __name__ == '__main__':
	main()
