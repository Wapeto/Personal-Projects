inp_str = input("Enter a phrase\n").lower()

letters = [" ", ",", "\'"]
for l in inp_str:
    counter = 0
    if not l in letters:
        letters.append(l)
        for b in inp_str:
            if b == l:
                counter += 1
        print(f"The letter {l} was found {counter} times\n")