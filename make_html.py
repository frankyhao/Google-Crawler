import os



with open('index.html', 'w') as f:
	f.write('<!DOCTYPE html>')
	f.write('<html>')
	f.write('<body>')
	limit = 5
	for entry in os.scandir('maps/'):
		if (entry.is_dir()):
			f.write('<h1>{}</h1>'.format(entry.name))
			files = os.listdir(entry.path)
			files.sort()
			counter = 0
			for mapfile in files:
				if (counter >= limit):
					break
				print(os.path.join(entry.path, mapfile))
				f.write('<div class="link"><a href="{}">{}</a></div>'.format(os.path.join(entry.path, mapfile), mapfile.split('_')[1][:-5]))
				counter += 1
	f.write('</body>')
	f.write('</html>')
