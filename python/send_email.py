import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

gmail_user = 'faceit.metropolia@gmail.com'  
gmail_password = '@mUAS@FI'

#def send_email(email_address):
#	try:  
#		server = smtplib.SMTP('smtp.gmail.com', 587)
#		server.starttls()
#		server.login(gmail_user, gmail_password)
#		print("good")
 #   
#	msg = MIMEText(u'<form type="get"><button type="submit">link</button></form>','html')
	#	server.sendmail(gmail_user, email_address, msg)
	#	server.quit()
	#except:  
	#	print 'Something went wrong...'

server = smtplib.SMTP('smtp.gmail.com', 587)
server.starttls()
server.login(gmail_user, gmail_password)
print("good")
msg = MIMEMultipart('alternative')
msg['Subject'] = "SHIT"
msg['From']='no-reply@gmail.com'
msg['To'] = 'thdmsdia@gmail.com'
link_part = """\
<html>
	<head></head>
	<body>
		<a href="http://localhost:8000/lock">Emergency lock</a>
	</body>
</html>
"""
links = MIMEText(link_part,'html')
msg.attach(links)
print("good job")
server.sendmail(gmail_user, 'thdmsdia@gmail.com', msg.as_string())
print("good job2")
server.quit()

