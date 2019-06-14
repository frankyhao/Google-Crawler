import os



with open('index.html', 'w') as f:
	f.write('<!DOCTYPE html>')
	f.write('<html>')
	f.write('<body>')
	for entry in os.scandir('maps/'):
		if (entry.is_dir()):
			f.write('<h1>{}</h1>'.format(entry.name))
			for mapfile in os.listdir(entry.path):
				print(os.path.join(entry.path, mapfile))
				f.write('<a href="{}">{}</a><br>'.format(os.path.join(entry.path, mapfile), mapfile.split('_')[1][:-5]))
	f.write('</body>')
	f.write('</html>')
