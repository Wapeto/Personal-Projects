import random
from Answers import*

exited  = False

print("Welcome to the conversation")

greetings = ["hey", "yo", "hi"]
actions = ["what are you doing", "up to"]

while not exited:
    user_input = input().lower()

    greetings_check = any(i in user_input for i in greetings)
    actions_check = any(i in user_input for i in actions)


    if (greetings_check):
        print(random.choice(greetings_ans))
    elif(actions_check):
        print(random.choice(actions_ans))
    else:
        print("Watcha sayin\' ?")

