from tornado import websocket, web, ioloop
import base64
import cv2
import time
from stream2 import Stream

stream_thread = None

class SocketHandler(websocket.WebSocketHandler):
	def check_origin(self, origin):
		return True
        
	def open(self):
		global stream_thread
		print("client connected")
		stream_thread = Stream(self)
		stream_thread.start()
		
		'''
		self.camera = cv2.VideoCapture(0)
		
		while True:
			rval, frame = self.camera.read()
		
			if frame is None:
				self.camera.release()
				self.camera = cv2.VideoCapture(0)
				continue
				
			rvel, jpeg = cv2.imencode('.jpg', frame)
			
			encoding_data = jpeg.tobytes()
			self.write_message(encoding_data)
			#encode_string = base64.b64encode(jpeg)
			#self.write_message(encode_string)
		'''
	
	def on_message(self, message):
		print("message")
		# save frame

	def on_close(self):
		print("client disconnected")
		global stream_thread
		stream_thread.stop()
		
	
def main():
	
	app = web.Application([
		(r'/ws',SocketHandler)
	])
	app.listen(8000)
	ioloop.IOLoop.instance().start()

		
if __name__ == '__main__':
	main()
