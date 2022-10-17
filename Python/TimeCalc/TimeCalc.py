import json
import os


class Time:
    def __init__(self, name, type, timeSpent, unit='s'):
        self.name = name
        self.type = type
        self.timeSpent = timeSpent
        if self.timeSpent.isdigit():
            self.timeSpent = int(timeSpent) if unit == 's' else int(
            timeSpent)*60 if unit == 'm' else int(timeSpent)*3600 if unit == 'h' else 0
        else:
            if unit == 'h':
                self.timeSpent = float(self.timeSpent) * 3600
            elif unit == 'm':
                self.timeSpent = float(self.timeSpent) * 60
            else : self.timeSpent = float(timeSpent)
        self.unit = unit

    def __str__(self):
        return f"{self.name} : {self.type} --> {self.timeSpent} seconds"


def inputNewTime():
    print("Please enter a new time: ")
    name = input("Name of the input: ")
    type = input("Type of time: ")
    timeSpent = input("Time spent: ")
    unit = input("Time unit: ")
    newTime = Time(name, type, timeSpent, unit)
    print(newTime)
    return newTime


def saveTime(Time):
    with open('/home/josh/Documents/Code/Personal-Projects/Python/TimeCalc/Data/times.json', 'r+') as file:
        # Create a dictionary with the object's data
        data = {}
        data['name'] = Time.name
        data['type'] = Time.type
        data['timeSpent'] = Time.timeSpent

        # First we load existing data into a dict.
        times_data = json.load(file)

        # Join new_data with file_data inside "times"
        times_data["times"].append(data)

        # Sets file's current position at offset.
        file.seek(0)

        # convert back to json.
        json.dump(times_data, file, indent=4)


def retrieveTime(name="", type=""):
    with open('/home/josh/Documents/Code/Personal-Projects/Python/TimeCalc/Data/times.json') as json_file:
        times = json.load(json_file)

    list = []
    for t in times["times"]:
        if name != "" and type != "":
            if t["name"] == name and t["type"] == type:
                time = Time(t["name"], t["type"], t["timeSpent"])
                list.append(time)
        elif name == t["name"]:
            time = Time(t["name"], t["type"], t["timeSpent"])
            list.append(time)
        elif type == t["type"]:
            time = Time(t["name"], t["type"], t["timeSpent"])
            list.append(time)
    return list


def averageTime(time_lst):
    total = 0
    for t in time_lst:
        total += int(t.timeSpent)
    return round(total / len(time_lst), 1)


def formatTime(time):
    possible = True
    if time > 86400:
        time /= 86400
        unit = "days"
    elif time > 3600:
        time /= 3600
        unit = "hours"
    elif time > 60:
        time /= 60
        unit = "minutes"
    time = round(time, 1)
    return time, unit


def finalTime(name="", type=""):
    times_lst = retrieveTime(name, type)
    if len(times_lst) > 1:
        time = averageTime(times_lst)
    else:
        time = times_lst[0].timeSpent

    time, unit = formatTime(time)

    # obj = Time(name, type if type != "" else times_lst[0].type, comp_time, unit)
    print(f"{name} : {type} --> {time} {unit}")


# *! Create a new time object and save it
# test = inputNewTime()
# saveTime(test)


# *!         MAIN FUNCTION

def main():
    a = input("Do you want to add a new time or get time information ? (1-2)\n")
    if a == "1":
        time = inputNewTime()
        saveTime(time)

    elif a == "2":
        b = input("Do you wish to search by name, type, or both ? (1-2-3)\n")
        if b == "1":
            name = input("Name: ")
            finalTime(name=name)
        elif b == "2":
            type = input("Type: ")
            finalTime(type=type)
        elif b == "3":
            name = input("Name: ")
            type = input("Type: ")
            finalTime(name=name, type=type)
        else:
            print("Wrong input")
            main()

    else:
        print("Please enter 1 or 2")
        main()
    print('\n')
    main()


main()


# * Regulations for notations :
# * Names :
# *    - for tasks : Tidy, Dishes, Walk, ect.
# *    - for trips : home-dest
# * Types :
# *    - Trip
# *    - Task
# *    - Activity
