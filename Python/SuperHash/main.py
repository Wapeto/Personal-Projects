import random
import math







def hash(input):
    output = ""

    for e in input :
        m = random.random()
        m = math.exp(m)*math.log1p(m)

        m*=100
        m = int(m)
        
        print(m)
        print(chr(m))



hash("sdf")