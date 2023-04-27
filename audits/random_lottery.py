import time
import random
import matplotlib.pyplot as plt


def reconstruct_ticket(random_number, selection_size, selection_max):
    mask = 2**selection_max - 1
    masked_portion = random_number & mask
    while bin(masked_portion).count('1') != selection_size:
        random_number = hash(str(random_number))
        masked_portion = random_number & mask

    selected = [False] * selection_max

    for i in range(selection_max):
        if masked_portion & 1:
            selected[i] = True
        masked_portion >>= 1

    return selected


stats = {}
random.seed(int(time.time()))
for i in range(100000):
    random_number = random.randint(0, 2**256-1)
    selected = reconstruct_ticket(random_number, 7, 35)
    for j in range(len(selected)):
        if selected[j]:
            stats[j] = stats.get(j, 0) + 1

print(stats)

values = []
keys = []
for key in stats.keys():
    keys.append(key)
    values.append(stats[key])

plt.hist(keys, weights=values, bins=35)
plt.show()
