# 470-GymApp

-   Authors: Josh Mayeda, Andrew Moir, Christopher Murray

# Description

-   A common difficulty of going to the gym is remembering what it is you need to work on. What muscles you need to exercise, which specific workouts you intend to do, how much of said exercises. So we thought of an app that keeps track of your days and the exercises for said days. You will have a front page of your daily schedule, an option of changing/adding to your weekly calendar, and a search function of varying exercises. There is also the possibility of posting/grabbing other users' schedules from a feed of exercises.

# Links

-   G Drive: https://drive.google.com/drive/u/1/search?q=parent:120TVYiX77iZ9f-Gxws-So0fuccFgMkQt

-   API: https://rapidapi.com/justin-WFnsXH_t6/api/exercisedb

# ExerciseDB API

> Route to list body parts: https://exercisedb.p.rapidapi.com/exercises/bodyPartList?rapidapi-key={API-KEY}

| List      | of         | body       | parts      |
| --------- | ---------- | ---------- | ---------- |
| Back      | Cardio     | Lower-arms | Lower-legs |
| Shoulders | Upper-arms | Upper-legs | Waist      |
| Neck      | Chest      |

> Route to list target body part: https://exercisedb.p.rapidapi.com/exercises/targetList?rapidapi-key={API-KEY}

| List      | of                    | target            | muscles          |
| --------- | --------------------- | ----------------- | ---------------- |
| abductors | abs                   | adductors         | biceps           |
| calves    | cardiovascular system | delts             | forearms         |
| glutes    | hamstrings            | lats              | levator scapulae |
| pectorals | quads                 | serratus anterior | spine            |
| traps     | triceps               | upper back        |

> Route to get all equipments https://exercisedb.p.rapidapi.com/exercises/equipmentList?rapidapi-key={API-KEY}

| List           | of                   | training         | equipments         |
| -------------- | -------------------- | ---------------- | ------------------ |
| assisted       | band                 | barbell          | body weight        |
| bosu ball      | cable                | dumbbell         | elliptical machine |
| ez barbell     | hammer               | kettlebell       | leverage machine   |
| medicine ball  | olympic barbell      | resistance band  | roller             |
| rope           | skierg machine       | sled machine     | smith machine      |
| stability ball | stationary bike      | stepmill machine | tire               |
| trap bar       | upper body ergometer | weighted         | wheel roller       |

> Route to get all exercises: https://exercisedb.p.rapidapi.com/exercises?rapidapi-key={API-KEY}
