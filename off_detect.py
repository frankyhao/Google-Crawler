import datetime
import geopy.distance as dist
import matplotlib.pyplot as plt
import numpy as np
from xml.dom import minidom
import pytz

def plot_bar(labels, times):
    indexes = np.arange(len(times))
    plt.bar(indexes, times, align='center')
    plt.xticks(indexes, labels, fontsize=5, rotation=30, horizontalalignment='right')
    plt.xlabel("Dates")
    plt.ylabel("Duration (minutes)")
    plt.title("Time Duration Between Google Sends Data")
    plt.show()


def plot_scatter(distances, duration):
    plt.plot(distances, duration, 'o')
    plt.xlabel("Distances (miles)")
    plt.ylabel("Duration (minutes)")
    plt.title("Time Duration Between Two Coordinates VS Distance Between Two Coordinates")
    plt.show()

def kml_total():
    xmldoc = minidom.parse("full_kml_andrew.kml")
    kml = xmldoc.getElementsByTagName("kml")[0]
    document = kml.getElementsByTagName("Document")[0]
    #placemark = document.getElementsByTagName("Placemark")[0]
    track = document.getElementsByTagName("gx:Track")[0]
    times = track.getElementsByTagName("when")
    coordinates = track.getElementsByTagName("gx:coord")
    index = 0
    timediffList = []
    dateLabel = []
    distances = []
    timezone = pytz.timezone("America/Chicago")
    while (index < len(times)-1):
        # calculate distance 
        coord = coordinates[index].firstChild.data[:-1]
        coord_next = coordinates[index+1].firstChild.data[:-1]
        coord = coord.split(' ')
        coord_next = coord_next.split(' ')
        coord = tuple([float(coord[1]), float(coord[0])])
        coord_next = tuple([float(coord_next[1]), float(coord_next[0])])
        distance = dist.distance(coord_next, coord).miles
        distances.append(distance)

        # calculate time duration
        timevalue = times[index].firstChild.data[:-1]
        timevalue_next = times[index+1].firstChild.data[:-1]
        timevalue = datetime.datetime.strptime(timevalue, "%Y-%m-%dT%H:%M:%S")
        timevalue_next = datetime.datetime.strptime(timevalue_next, "%Y-%m-%dT%H:%M:%S")
        timevalue = pytz.utc.localize(timevalue)
        timevalue_next = pytz.utc.localize(timevalue_next)
        timevalue = timevalue.astimezone(timezone)
        timevalue_next = timevalue_next.astimezone(timezone)
        timediff = (timevalue_next - timevalue) / datetime.timedelta(minutes=1)
        timediffList.append(timediff)
        label = "{}-{}".format(timevalue.strftime("%Y-%m-%dT%H:%M:%S"), timevalue_next.strftime("%Y-%m-%dT%H:%M:%S"))
        dateLabel.append(label)
        index += 1
        if (index == 48):
            break
    plot_bar(dateLabel, timediffList)
    plot_scatter(distances, timediffList)

if __name__ == '__main__':
    kml_total()
