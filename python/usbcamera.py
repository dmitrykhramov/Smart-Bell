from tornado import websocket, web, ioloop
import base64
import cv2
import time
from videostream import Stream

#open video stream

stream_thread = Stream()
stream_thread.daemon = True
stream_thread.start()

class SocketHandler(websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
        
	def open(self):
		print("client connected")
		stream_thread.add_client(self)
	
	def on_message(self, message):
		global stream_thread
		stream_thread.change_flag()
		print(message)

	def on_close(self):
		print("client disconnected")
		
	
def main():
	
	app = web.Application([
		(r'/ws',SocketHandler)
	])
	app.listen(8000)
	ioloop.IOLoop.instance().start()

		
if __name__ == '__main__':
	main()
