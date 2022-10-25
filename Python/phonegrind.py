def suite(t, k):
    som = 0
    for i in range(1, k+1):
        print(f"{i} --> {t/i*365/30} = {som}")
        som += t/i
    return som

print(suite(2.7777777, 30))