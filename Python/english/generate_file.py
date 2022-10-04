from datetime import date
import random

with open("english/report.tex", "r") as file:
    string_list = file.readlines()
    print('Done')


time_spent = [
    "45 minutes",
    "1 hour", 
    "30 minutes",
    "10 minutes",
    "1 hour and a half",
    "2 hours"
]


netflix_movies = [
    "Forest Gump",
    "Shutter Island"
]

youtube_video = [
    "phone tech",
    "minecraft",
    "horror stories",
    "gaming",
    "scientific discoveries",
    "baskball"
]


activities = [
    "Movie",
    "Video",
    "I talked with someone in english (debate or not)",
    "Read",
    f"I wrote for {random.choice(time_spent)} on my computer. I continued writing a story"
]

why_activity = [
    "Because it's something I often do",
    "Because someone told me it would be a good idea to",
    "It's not necessarily related to my objectives but like doing this activity",
    "Because it fully fulfills at least one of my objectives",
    "Because I felt like doing it",
    "Because I wanted to improve my English",
    "Because I love doing it"
]

preparations = [
    "I just didn't",
    "I didn't"
]

space = '\indent'

first_name = "First name : Joshua\n"
last_name = "Last name : PAVIUS GALTIER\n"
date_ = "Date : " + str(date.today()) + '\n'
group = "Group : L1\_MI\_ang\_4\n"

cla_o_home = "It was completed at home"
participated = "I was the only one"
activity_type = random.choice(activities)
if activity_type == "Movie":
    ressources = "Netflix.com"
    activity = f"I watched a movie on Netflix called {random.choice(netflix_movies)}"
elif activity_type == "Video":
    ressources = "Youtube.com"
    activity = f"I watched a video on Youtube about {youtube_video}"

elif activity_type == "Read":
    ressources = "Games people play"
    activity = "I read a book"

else : 
    ressources = "I didn't use any"
    activity = activity_type

reason = random.choice(why_activity)
prep = random.choice(preparations)
worth_it = "Yes it was and I would highly recommend it. And I couldn't think about anything I would change for next time"

string_list[7] = first_name
string_list[9] = last_name
string_list[12] = date_
string_list[14] = group
string_list[18] = space + "\emph{" + cla_o_home + '}\n'
string_list[21] = space + "\emph{" + participated + '}\n'
string_list[24] = space + "\emph{" + activity + '}\n'
string_list[27] = space + "\emph{" + ressources + '}\n'
string_list[30] = space + "\emph{" + reason + '}\n'
string_list[33] = space + "\emph{" + prep + '}\n'
string_list[37] = space + "\emph{" + worth_it + '}\n'



print (len(string_list))

with open(f'english/reports/report-{date.today()}.tex', 'w') as file:
    file.writelines( string_list )