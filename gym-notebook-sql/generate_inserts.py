

# get list of excerciseIDs for dbfiller to use
for i in range(999):
    if i < 10:
        print(f"000{i}", end=',')
    elif i < 100:
        print(f"00{i}", end=',')
    else:
        print(f"0{i}", end=',')


n = 5
while n < 300:
    print(n, end=',')
    n+=5
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
# # follower inserts
# for i in range(1, 5):
#     for j in range(6, 49):
#         print(f"INSERT INTO Follower (followedUserID, followerUserID) VALUES ({i}, {j});")
