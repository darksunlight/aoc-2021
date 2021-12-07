with open('input.txt') as f:
    initial = [int(x) for x in f.readline().split(',')]

school = [0 for i in range(9)]
for x in initial:
    school[x] += 1

for i in range(1000000):
    school = school[1:7] + [school[0] + school[7], school[8], school[0]]

print(sum(school))