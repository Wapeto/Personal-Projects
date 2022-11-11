def scores24Pred():
    url = "https://scores24.live/en/predictions/soccer/today"
    page = requests.get(url)

    scores24 = BeautifulSoup(page.content, "html.parser")

    placeholders = scores24.find_all("a", class_ = "link kqsbri-0 fBpYHe")

    for p in placeholders:
        print(p["href"], '\n')

    return placeholders
