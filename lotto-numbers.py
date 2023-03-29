# Written by OpenAI
# Question: write python code generating lotto numbers
# Issues: N/A

import random

# Define the number of Lotto balls and the range of numbers
num_balls = 6
max_num = 49

# Generate Lotto numbers
lotto_numbers = random.sample(range(1, max_num + 1), num_balls)

# Print the Lotto numbers
print('Your Lotto numbers are:')
for num in sorted(lotto_numbers):
    print(num)