CREATE VIEW ViewFriends
AS
SELECT ID1,ID2
FROM Friend
UNION ALL
SELECT ID2,ID1
FROM Friend