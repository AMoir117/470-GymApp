"""username, userPassword, firstName, lastName, DoB, imagePath, email, profileBio"""

import random
import names

from random import randrange
from datetime import timedelta
from datetime import datetime

def random_date(start, end):
    """
    This function will return a random datetime between two datetime
    objects.
    """
    delta = end - start
    int_delta = (delta.days * 24 * 60 * 60) + delta.seconds
    random_second = randrange(int_delta)
    return str(start + timedelta(seconds=random_second)).split(" ")[0]



d1 = datetime.strptime('1/1/2012 1:30 PM', '%m/%d/%Y %I:%M %p')
d2 = datetime.strptime('1/1/2022 4:50 AM', '%m/%d/%Y %I:%M %p')

inserts = []
for i in range(250):
    username_suffix = random.randint(2, 999)
    firstName, lastName = names.get_full_name().split(' ')

    if i % 2 == 0:
        suf = 'am'
        username = firstName+str(username_suffix)

    else:
        suf = 'weigh'
        username = (firstName+str(username_suffix)).lower()


    if i % 10 == 0:
        feet = 6
    else:
        feet = 5
    userPassword = random.getrandbits(128)

    profileBio = f"""My name is {firstName}, I {suf} {random.randint(115, 280)}lbs at {feet} foot {random.randint(2, 11)} and I love Gym Notebook!"""
    email = f"{firstName}{lastName[0]}{random.randint(1, 555)}@gmail.com"

    password_suffix = '@$&!#'
    password = lastName[0]+firstName+str(random.randint(1, 999))+password_suffix[random.randint(0,4)]
    inserts.append(f"INSERT INTO Users(username, userPassword, firstName, lastName, DoB, email, profileBio) VALUES ('{username}', '{password}','{firstName}', '{lastName}', '{random_date(d1, d2)}', '{email.lower()}','{profileBio}');\n")


with open('users_inserts.txt', 'w') as f:
    f.writelines(inserts)
