# TELUS

> The Name Game - a simple app for learning the names of TELUS Digital team members.

### Functional requirements

- 6 employee photos must be displayed
- The name of one of the 6 selected employees must be displayed
- The user must click on a photo: if they pick the correct employee, show positive feedback; if wrong, show negative feedback
- If the user picks the correct employee, reload with new photos and a new name different from the previous round
- Display a "Game Over" message if the user picks the wrong photo, and show the final score

## Important notes

- There are no automated tests to focus on the solution
- Express for build a simple API as fast as possible

## How to run

```
docker compose up -d
```

```
npm run dev
```

Mongo Express (or Mongo Compass) to access the database

```
http://localhost:8081/
```

## Database seed
```
npm run seed
```


### Fetch 6 random employees, excluding the last correct one in MongoDB

```
const options = [
    { $match: lastCorrectId ? { _id: { $ne: lastCorrectId } } : {} },
    { $sample: { size: 6 } },
];
```


### Pick one as the correct answer
```
const correct = employees[Math.floor(Math.random() * employees.length)];
```