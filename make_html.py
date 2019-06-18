import os
from xml.dom import minidom


with open('index.html', 'w') as f:
	f.write('<!DOCTYPE html>')
	f.write('<html>')
	f.write('<body>')
	limit = 25
	for entry in os.scandir('maps/'):
		if (entry.is_dir()):
			f.write('<h1>{}</h1>'.format(entry.name))
			files = os.listdir(entry.path)
			files.sort()
			counter = 0
			user = entry.name.split('-')[1]
			for mapfile in files[:limit]:
				date = mapfile.split('_')[1][:-5]
				xmldoc = minidom.parse("kml_files/user-{}/history-{}.kml".format(user, date))
				kml = xmldoc.getElementsByTagName("kml")[0]  # getElementsByTagName always returns NodeList even if there is only one Node so always use [0] to get first Node
				document = kml.getElementsByTagName("Document")[0]
				placemarks = document.getElementsByTagName("Placemark")
				address = ''
				for placemark in placemarks:
					address = placemark.getElementsByTagName("address")[0].firstChild
					if (address != None):	
						address = address.data
						print(address)
						break		
				print(os.path.join(entry.path, mapfile))
				f.write('<div class="link"><a href="{}">{}({})</a></div>'.format(os.path.join(entry.path, mapfile), date, address))
	f.write('</body>')
	f.write('</html>')
