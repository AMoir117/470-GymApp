

# get list of excerciseIDs for dbfiller to use
for i in range(999):
    if i < 10:
        print(f"000{i}", end=',')
    elif i < 100:
        print(f"00{i}", end=',')
    else:
        print(f"0{i}", end=',')



# follower inserts
for i in range(1, 5):
    for j in range(6, 49):
        print(f"INSERT INTO Follower (followedUserID, followerUserID) VALUES ({i}, {j});")
