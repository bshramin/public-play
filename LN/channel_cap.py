
f = 3
txs = 500000
probabilities = [1.0]
expectancy = 0

for i in range(txs):
    new_probabilities = [0.5 * probabilities[0]]
    for p in range(len(probabilities)-1):
        new_probabilities.append(
            0.5 * probabilities[p] + 0.5 * probabilities[p+1]
        )
    new_probabilities.append(0.5 * probabilities[-1])

    if len(new_probabilities) > f + 1:
        expectancy += i*(new_probabilities[0] + new_probabilities[-1])
        new_probabilities = new_probabilities[1:-1]

    probabilities = new_probabilities

print(expectancy)
