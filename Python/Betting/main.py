from fractions import Fraction


def break_even(cote: int) -> int:
    odd = odd_convert(cote)[0]
    return round(1/(odd)*100, 1)


def odd_convert(odd: str) -> tuple:
    if '.' in odd:
        print("Decimal !")
        if float(odd) >= 2.0:
            us_odds = int(round((float(odd)-1)*100, 1))
        else:
            us_odds = int(round((-100)/(float(odd)-1), 1))

        fr_odds = Fraction(float(odd))
        de_odds = float(odd)

        print(f"American odds would be : {us_odds}")

    elif '/' in odd:
        print("Fractional !")
        odd_lst = odd.split('/')
        de_odds = 1 + int(odd_lst[0])/int(odd_lst[1])

        if de_odds > 2:
            us_odds = int(odd_lst[0] + odd_lst[1] + '0')
        else:
            us_odds = int(-100/(de_odds-1))

        fr_odds = Fraction(int(odd_lst[0]), int(odd_lst[1]))

        print(f"Decimal odds would be : {de_odds}")
        print(f"American odds would be : {us_odds}")

    else:
        print("American !")
        odd = int(odd)
        if odd > 0:
            de_odds = round((odd/100)+1, 1)
            fr_odds = Fraction(odd/100)
        else:
            de_odds = round(1-((100/odd)), 1)
            fr_odds = Fraction(100/odd)

        us_odds = odd

        print(f"Decimal odds would be : {de_odds}")

    return (de_odds, us_odds)


while True:
    query = input("What is the odd for the match ?\n")
    print(f"The implied probability for this match is : {break_even(query)}%\n")
    input("Press Enter to continue...\n\n")

