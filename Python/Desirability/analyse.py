import json


with open('Desirability/Data/dataset.json') as json_file:
    dataset = json.load(json_file)

girls_data = {}
boys_data = {}


# print(dataset["datasets"][0])

print("There are currently " +
      str(len(dataset["datasets"])) + " entries in the databank\n")

tendencies_m = {
    "sport": [],
    "money": [],
    "funny": [],
    "play_videogame": [],
    "possessive": [],
    "honesty": [],
    "tactile": [],
    "religious": [],
    "patient": [],
    "artist": []
}
tendencies_f = {
    "sport": [],
    "money": [],
    "funny": [],
    "play_videogame": [],
    "possessive": [],
    "honesty": [],
    "tactile": [],
    "religious": [],
    "patient": [],
    "artist": []
}
keys = list(dataset["datasets"][0])




def sort(lst):
    n_lst = []
    for i in range(len(lst)):
        counter = 0
        for y in range(len(lst)):
            if lst[i] == lst[y]:
                counter += 1
        # print(f"The number of {lst[i]} is {counter}")
        nav = (lst[i], counter)
        if not nav in n_lst:
            n_lst.append(nav)

    for i in range(len(n_lst)-1):
        if n_lst[i][1] < n_lst[i+1][1]:
            n_lst[i], n_lst[i+1] = n_lst[i+1], n_lst[i]
    for i in range(len(n_lst)-1):
        if n_lst[i][1] < n_lst[i+1][1]:
            n_lst[i], n_lst[i+1] = n_lst[i+1], n_lst[i]
    # if n_lst[0][1] < n_lst[1][1]:
    #     n_lst[0], n_lst[1] = n_lst[1],n_lst[0]
    lst = []
    for i in range(len(n_lst)):
        lst.append(n_lst[i][0])
    return (n_lst)

def get_most_liked(set_name:str, data_id:int):
    list = []
    set = dataset["datasets"][data_id][set_name].split()
    for k in range(len(set)):
        if set[k] != '0':
            list.append(int(set[k]))
    return list

def tendency_av(list:list):
    value = 0
    for i in range(len(list)):
        value += int(list[i])
    if value != 0:
        value /= len(list)
    return value



def get_stats():
    med_size_f = []
    med_size_m = []

    hair_color_f = []
    hair_color_m = []

    eye_color_f = []
    eye_color_m = []

    sport_tendency_m = []

    for i in range(len(dataset["datasets"])):#parcour tout les models

        if (dataset["datasets"][i][keys[0]] == '1'):  # Male Stats
            # Get size
            if dataset["datasets"][i]["size"] != '0':
                med_size_m.append(dataset["datasets"][i]["size"])

            # Get hair color
            if get_most_liked("hair_color", i) != []:
                hair_color_m += get_most_liked("hair_color", i)

            # Get eye color
            if get_most_liked("eye_color", i) != []:
                eye_color_m += get_most_liked("eye_color", i)

            for k in range(4, len(keys)):
                if dataset["datasets"][i][keys[k]] != '0':
                    tendencies_m[keys[k]].append(dataset["datasets"][i][keys[k]])


        else:  # Women Stats
            # Get size
            if dataset["datasets"][i]["size"] != '0':
                med_size_f.append(dataset["datasets"][i]["size"])

            # Get hair color
            if get_most_liked("hair_color", i) != []:
                hair_color_f += get_most_liked("hair_color", i)

            # Get eye color
            if get_most_liked("eye_color", i) != []:
                eye_color_f += get_most_liked("eye_color", i)

            for k in range(4, len(keys)):
                if dataset["datasets"][i][keys[k]] != '0':
                    tendencies_f[keys[k]].append(dataset["datasets"][i][keys[k]])



    # Last adjustments

    med_size_m = tendency_av(med_size_m)
    med_size_f = tendency_av(med_size_f)

    hair_color_m = sort(hair_color_m)
    hair_color_f = sort(hair_color_f)

    eye_color_m = sort(eye_color_m)
    eye_color_f = sort(eye_color_f)


    for k in tendencies_m.keys():
        tendencies_m[k] = round(tendency_av(tendencies_m[k]), 1)
    for k in tendencies_m.keys():
        tendencies_f[k] = round(tendency_av(tendencies_f[k]), 1)


    print(tendencies_f["patient"])

    # # Print the results
    # print(f"The average size for men is : {med_size_m}\n")
    # print(f"The average size for women is : {med_size_f}\n")



    # print(f"The favorite hair color on men is the number {hair_color_m[0][0]}\n")
    # print(f"The favorite hair color on women is the number {hair_color_f[0][0]}\n")



    # print(f"The favorite eye color on men is the number {eye_color_m[0][0]}\n")
    # print(f"The favorite eye color on women is the number {eye_color_f[0][0]}\n")


    # print(f"The sport tendency for men is {tendencies_m['sport']}")
    # print(f"The sport tendency for women is {tendencies_f['sport']}")









get_stats()










