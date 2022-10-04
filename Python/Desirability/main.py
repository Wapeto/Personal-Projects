import store


# print("Welcome to the desirability app\nThis app is currently in developpment",
# "For now you can only enter what you find desirable")

# if(input("Do you wish to continue ? [Y/n]") in ["Y", ""]):
#     print("Thank you !")
# else: print("We are sorry to here that"),quit()


# print("You will have to answer a series of questions about your tastes\n",
# "For each question, answer with a numerical value, and if you have more than",
# "one answer, separate them with a space.\n At last, if you don't have a particular",
# "answer in mind or you just don't care, enter 0\n\n")

empty_dict = {
    "sex":0,
    "size":0,
    "hair_color":0,
    "eye_color":0,
    "sport":0,
    "money":0,
    "funny":0,
    "play_videogame":0,
    "possessive":0,
    "honesty":0,
    "tactile":0,
    "religious":0,
    "patient":0,
    "artist":0,
    "introvert":0,
    #Long test part
    "polyglote":0,
    
}

questions = {
    "sex":"Are you interested in :\n 1.Men\t2.Women\t3.Both\t4.Other\n",
    "size":"What is your ideal hight for a partner (in cm), if you were going to give a 'fork' (ex. [150-170]), just put the everage (ex. 160)\n",
    "hair_color":"What is your favorite hair color for a partner? If you have multiple, seperate them with a space\n1.Black\t 2.Brown\t 3.Blond\t 4.Chestnut\t 5.Red\t 6.Other\n",
    "eye_color":"What is your favorite eye color for a partner? If you have multiple, seperate them with a space\n1.Brown\t2.Green\t3.Blue\t4.Grey\t5.Hazel\t6.Other\n",
    "sport":"Rate on a scale of 1 to 10 how athletic you'd want your partner to be\n",
    "money":"Rate on a scale of 1 to 10 how rich you would want your partner to be\n",
    "funny":"Rate on a scale of 1 to 10 how funny you would want your partner to be\n",
    "play_videogame":"Rate on a scale of 1 to 10 how much of a 'gamer' you'd want your partner to be\n",
    "possessive":"Rate on a scale of 1 to 10 how possessive you'd like your partner to be\n",
    "honesty":"Rate on a scale of 1 to 10 how honnest you want your partner to be\n",
    "tactile":"Rate on a scale of 1 to 10 how tactile you'd want your partner to be\n",
    "religious":"Rate on a scale of 1 to 10 how religious you'd want your partner to be\n",
    "patient":"Rate on a scale of 1 to 10 how patient you'd want your partner to be\n",
    "artist":"Rate on a scale of 1 to 10 how much of an artist you want your partner to be\n",
    "introvert":"Rate on a scale of 1 to 10 how much of an introvert you want your partner to be. 1 would be very introvert, 10 would be very extravert"
}


new_dict = empty_dict
keys=empty_dict.keys()

for k in keys:
    answer = input(questions[k])
    if (answer == ""): 
        new_dict.update({k:"0"})
    else:
        new_dict.update({k:answer})

store.save_data(new_dict)

print("Saved !")

print("\nYou have now answered all the questions, would you like to test your desirability ?")

