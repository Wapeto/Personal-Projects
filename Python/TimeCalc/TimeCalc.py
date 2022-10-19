import json
import os
from BuildTime import *
from pick import pick



def inputNewTime() -> Time: 
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
        data['type'] = Time.type
        data['name'] = Time.name
        data['timeSpent'] = Time.timeSpent

        # First we load existing data into a dict.
        times_data = json.load(file)

        # Join new_data with file_data inside "times"
        times_data["times"].append(data)

        # Sets file's current position at offset.
        file.seek(0)

        # convert back to json.
        json.dump(times_data, file, indent=4)


def retrieveTime(name="", type="") -> list:
    """gets the list if times that correspond to the name or type specified

    Args:
        name (str, optional): name of the time data. Defaults to "".
        type (str, optional): type of the time data. Defaults to "".

    Returns:
        list: list of times
    """
    with open('/home/josh/Documents/Code/Personal-Projects/Python/TimeCalc/Data/times.json') as json_file:
        times = json.load(json_file)

    list = []
    name = name.split('-')
    if len(name) == 2:
        for t in times["times"]:
            if name[0] in t["name"] or name[1] in t["name"] and 'Trip' in t["type"]:
                list.append(t["timeSpent"])
    else:
        for t in times["times"]:
            if name != [""] and type != "":
                if t["name"] == name[0] and t["type"] == type:
                    list.append(t["timeSpent"])
            elif name == t["name"]:
                print('name match')
                list.append(t["timeSpent"])
            elif type == t["type"]:
                list.append(t["timeSpent"])

    return list


def averageTime(time_lst):
    total = 0
    for t in time_lst:
        total += t
    res = round(total / len(time_lst), 1)
    return unitConverter(res)


def unitConverter(value):
    intPart = 0
    decPart = 0
    unit = ''
    if value > 3600:
        intPart = int(value // 3600)
        decPart = str(value % 3600)[:2]
        unit = 'hours'
    elif value > 60:
        intPart = int(value // 60)
        decPart = str(value % 3600)[:2]
        unit ='minutes'
    return f"{intPart}.{decPart} {unit}"



def getAverageTime(type='', name=''):
    return averageTime(retrieveTime(name, type))


#*! Create a new time object and save it
# test = inputNewTime()
# saveTime(test)


#*!             MAIN FUNCTION

def main():
    # a = input("Do you want to add a new time or get time information ? (1-2)\n")
    sel, a = pick(['Enter new Time data', 'Search for a Time', 'Exit'], "What do you want to do ?", indicator=">>")
    if a == 0:
        time = buildNewTime() if buildNewTime() != 'back' else main()
        saveTime(time)

    elif a == 1:
        # b = input("Do you wish to search by name, type, or both ? (1-2-3)\n")
        sel, b = pick(['1.Name', '2.Type', '3.Both', 'Back'], "What type of search do you want to do ?", indicator=">>")

        if b == 0:
            name = input("Name: ")
            avTime = getAverageTime(name=name)
            print(f"The average time for {name} is {avTime}")
        elif b == 1:
            type = input("Type: ")
            avTime = getAverageTime(type=type)
            print(f"The average time for {type} is {avTime}")
        elif b == 2:
            type = input("Type: ")
            name = input("Name: ")
            avTime = getAverageTime(name=name, type=type)
            print(f"The average time for {type} : {name} is {avTime}")
        elif b == 3:
            main()
        else:
            print("Wrong input")
            main()
    elif a == 2:
        exit()

    else:
        print("Please enter 1 or 2")
        main()
    print('\n')
    input()
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
