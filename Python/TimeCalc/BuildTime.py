from pick import pick
import choices as ch
from colorize import *


class Time:
    def __init__(self, type, name, timeSpent):
        self.type = type
        self.name = name
        self.timeSpent = timeSpent
        # if self.timeSpent.isdigit():
        #     self.timeSpent = int(timeSpent) if unit == 's' else int(
        #         timeSpent)*60 if unit == 'm' else int(timeSpent)*3600 if unit == 'h' else 0
        # else:
        #     if unit == 'h':
        #         self.timeSpent = float(self.timeSpent) * 3600
        #     elif unit == 'm':
        #         self.timeSpent = float(self.timeSpent) * 60
        #     else:
        #         self.timeSpent = float(timeSpent)
        # self.unit = unit

    def __str__(self):
        return f"{self.type} : {self.name} --> {self.timeSpent} seconds"

def buildNewTime():
    itinerary = ''
    task = ''
    chore = ''
    fValue = ''
    type = ''

    selected, index = pick(['1.Trip', '2.Task', '3.Chores',
                           '4.Other'], "What type of Time is it ?", indicator=">>")
    if index == 0:  # Trip
        type = 'Trip'
        placeA = ''
        placeB = ''

        selected, index = pick(
            ch.transports, "How did you travel ?", indicator=">>")
        if index == 0 or index == 1:  # By foot or Skate
            if index == 0:
                type += '-Foot'
            else : type += '-Skate'
            selectedA, indexA = pick(
                ch.places, 'Enter the first place :', indicator=">>")
            if indexA == len(ch.places)-1:
                placeA = input("Enter the name of the place :\n")
            else:
                placeA = ch.places[indexA]
            selectedB, indexB = pick(
                ch.places, 'Enter the second place :', indicator=">>")
            if indexB == len(ch.places)-1:
                placeB = input("Enter the name of the place :\n")
            else:
                placeB = ch.places[indexB]

        elif index == 2:  # By Tram
            type += '-Tram'
            selectedA, indexA = pick(
                ch.tramStops, 'Enter the first place :', indicator=">>")
            if indexA == len(ch.tramStops)-1:
                placeA = input("Enter the name of the place :\n")
            else:
                placeA = ch.tramStops[indexA]

            selectedB, indexB = pick(
                ch.tramStops, 'Enter the second place :', indicator=">>")
            if indexB == len(ch.tramStops)-1:
                placeB = input("Enter the name of the place :\n")
            else:
                placeB = ch.tramStops[indexB]

        elif index == 3:  # Train
            type += '-Train'
            selectedA, indexA = pick(
                ch.cities, 'Enter the first place :', indicator=">>")
            if indexA == len(ch.cities)-1:
                placeA = input("Enter the name of the place :\n")
            else:
                placeA = ch.cities[indexA]

            selectedB, indexB = pick(
                ch.cities, 'Enter the second place :', indicator=">>")
            if indexB == len(ch.cities)-1:
                placeB = input("Enter the name of the place :\n")
            else:
                placeB = ch.cities[indexB]

        elif index == 4:  # Car
            type += '-Car'
            selectedA, indexA = pick(
                ch.carPlaces, 'Enter the first place :', indicator=">>")
            if indexA == len(ch.carPlaces)-1:
                placeA = input("Enter the name of the place :\n")
            else:
                placeA = ch.carPlaces[indexA]

            selectedB, indexB = pick(
                ch.carPlaces, 'Enter the second place :', indicator=">>")
            if indexB == len(ch.carPlaces)-1:
                placeB = input("Enter the name of the place :\n")
            else:
                placeB = ch.carPlaces[indexB]

        itinerary = f"{placeA}-{placeB}"


    elif index == 1:  # Task
        type = 'Task'

        task = input("Enter the name of the task :\n").lower()

    elif index == 2: # Chores
        type = 'Chore'

        chore = input("Enter the name of the chore :\n").lower()

    if itinerary != '':
        fValue =  itinerary
    elif task != '':
        fValue = task
    elif chore != '':
        fValue = chore
    
    
    rawTimeValue = input("How much time did it take to complete :\n")

    timeValue = rawTimeValue[:-1]
    timeUnit = rawTimeValue[-1]

    time = timeConvert(timeValue, timeUnit)



    return Time(type, fValue, time)

# val = buildNewTime()
# print(val)

def timeConvert(val:str, unit:str):
    if val.isdigit():
        val = int(val)
    else:
        try:
            val = float(val)
        except:
            print("Input a number")
    if unit ==  'h':
        val = val * 3600
    elif unit == 'm':
        val = val * 60
    elif unit == 's':
        val = val
    else :
        print("Enter a correct time unit")
    return round(val, 1)


#*?  For testing purposes :
if __name__ == '__main__':
    print(buildNewTime())
    # print(timeConvert('45', 'm'))__main__