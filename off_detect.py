import datetime
import matplotlib.pyplot as plt
import numpy as np
from xml.dom import minidom

def plot_bar(labels, times):
	indexes = np.arange(len(times))
	plt.bar(indexes, times)
	plt.xticks(indexes, labels, fontsize=5, rotation=30)
	plt.xlabel("Dates")
	plt.ylabel("Duration (minutes)")
	plt.title("Time Duration Between Google Sends Data")
	plt.show()
	

def kml_total():
	xmldoc = minidom.parse("full_kml_andrew.kml")
	kml = xmldoc.getElementsByTagName("kml")[0]
	document = kml.getElementsByTagName("Document")[0]
	placemark = document.getElementsByTagName("Placemark")[0]
	track = placemark.getElementsByTagName("gx:Track")[0]
	times = track.getElementsByTagName("when")
	index = 0
	timediffList = [] 
	dateLabel = []
	while (index < len(times)-1):
		timevalue = times[index].firstChild.data[:-1]
		timevalue_next = times[index+1].firstChild.data[:-1]
		label = "{}-{}".format(timevalue, timevalue_next)
		dateLabel.append(label)
		timevalue = datetime.datetime.strptime(timevalue, "%Y-%m-%dT%H:%M:%S")
		timevalue_next = datetime.datetime.strptime(timevalue_next, "%Y-%m-%dT%H:%M:%S")
		timediff = (timevalue_next - timevalue) / datetime.timedelta(minutes=1)
		timediffList.append(timediff)
		index += 1
	plot_bar(dateLabel, timediffList)

if __name__ == '__main__':
	kml_total()
