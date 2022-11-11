import requests
from bs4 import BeautifulSoup

#* Betting abreviations
#* 1 -> Home team wins
#* 2 -> Away team wins
#* X -> Draw
#* BTTS -> Both teams score
#* O{goals} -> total over {goals}
#* U{goals} -> total over {goals}
#* 1-O{goals} -> Home team scores over {goals} goals
#* 1-U{goals} -> Home team scores less than {goals} goals




def forebetPred():
    url = "https://www.forebet.com/"
    page = requests.get(url)

    forebet = BeautifulSoup(page.content, "html.parser")

    teams = forebet.find_all("span", itemprop="name")

    preds = forebet.find_all("span", class_="forepr")

    matches = []
    for i in range(0, len(teams), 2):
        matches.append([teams[i].text, teams[i+1].text])

    for i in range(len(matches)):
        matches[i].append(preds[i].text)

    return matches
 

def sportyPred():
    url = "https://www.sportytrader.com/en/betting-tips/football/"
    page = requests.get(url)

    forebet = BeautifulSoup(page.content, "html.parser")

    teams = []
    matches = []
    preds = []

    for team in forebet.select('img.h-bet-card-img.w-bet-card-img~span'):
        teams.append(team.text)

    for i in range(0, len(teams), 2):
        matches.append([teams[i], teams[i+1]])

    for p in forebet.select('p[data-trans="tips.our.tip"]~p'):
        preds.append(p.text)

    for i in range(len(matches)):
        matches[i].append(preds[i])
    # print(f'Number of matches : {len(matches)}\nNumber of predictions : {len(preds)}')

    return matches


def scores24Pred():
    url = "https://scores24.live/en/predictions/soccer"
    page = requests.get(url)

    scores24 = BeautifulSoup(page.content, "html.parser")

    cards = []
    matches = []
    for c in scores24.find_all("a", class_ = "link kqsbri-0 fBpYHe"):
        cards.append(c['href'])
    # print(f'There are {len(cards)} matches :\n{cards}')
    counter = 0
    for c in cards:
        counter += 1
        c_url = 'https://scores24.live' + c
        c_page = requests.get(c_url)
        c_soup = BeautifulSoup(c_page.content, "html.parser")

        teams = c_soup.find('h2', class_='bsgv8x-0 etxUlq').text[14:].split(' vs ')

        match = [teams[0], teams[1], c_soup.find('div', class_='bsgv8x-2 kgzcOt').text[5:]]


        # match = [c_soup.find('div', class_='bg2qft-3 hIqWPL').text, c_soup.find('div', class_='kkrfw6-0 kHsnKB').text, \
        #     c_soup.find('div', class_='bsgv8x-2 kgzcOt').text[5:]]

        print(f'{counter}/{len(cards)}')
        
        matches.append(match)

        if counter >= 50:
            for m in matches:
                print(m, '\n')
            return matches

    print(matches)


scores24Pred()