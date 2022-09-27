from colorize import*
from words import*
import random
import enchant

Dict=enchant.Dict("en_US")

print(highlight('yellow', "Welcome to MORTUS (the cheap SUTOM)"))

mys_word = random.choice(word_lst)
guess_str = ''

for l in mys_word:
    guess_str += "_ "

print (Dict.check('Hello'))
