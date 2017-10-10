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

class EmailRequestHandler(web.RequestHandler):
	def get(self):
		print("Emergency! Lock the door")
		self.write("Success to lock")
		
class SocketHandler(websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
        
	def open(self):
		print("client connected")
		stream_thread.add_client(self)
		stream_thread.change_socket_flag()

	def on_message(self, message):
		# when making a photo
		if message == "photo_make":
			print("photo")
			stream_thread.change_capture_flag()
		# when uploading a photo
		elif message == "photo_upload":
			print("upload")
			result = collect.upload_photo()
			print(result)
			self.write_message(result)
		# when canceling to add visitor
		elif message == "cancel":
			collect.cancel_add()
		# when deleting a visitor
		else:
			print("delete")
			print(delete_face(message))
		
	def on_close(self):
		print("client disconnected")
		stream_thread.change_socket_flag()
		stream_thread.remove_client(self)
		
	
def main():
	
	app = web.Application([
		(r'/ws',SocketHandler),
		(r'/lock',EmailRequestHandler)
	])
	app.listen(8000)
	ioloop.IOLoop.instance().start()

		
if __name__ == '__main__':
	main()
