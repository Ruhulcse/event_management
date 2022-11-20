

## Description

Event management crud 

SQL FILE contains in the sql file.zip

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

```


## API Documentation 

1. Get all active events with pagination

API endpoint: api/v1/events?page=number&per_page=number

example: http://localhost:4000/api/v1/events?page=1&per_page=3

Query param = page & per_page

Request method: GET

Response : 
```json
{
    "message": "successfully get data",
    "data": {
        "events": [
            {
                "id": 1,
                "title": "JS Meetup",
                "start_at": "2022-11-27T04:31:26.000Z",
                "end_at": "2022-11-28T04:31:35.000Z"
            },
            {
                "id": 2,
                "title": "BITPA",
                "start_at": "2022-11-27T04:31:26.000Z",
                "end_at": "2022-11-30T04:31:35.000Z"
            },
            {
                "id": 3,
                "title": "National Collegiate Programming Contest",
                "start_at": "2022-11-25T04:31:26.000Z",
                "end_at": "2022-11-29T04:31:35.000Z"
            }
        ],
        "paginate": {
            "total": 10,
            "per_page": "3",
            "total_page": 4,
            "current_page": "1"
        }
    }
}

``` 

2. GET single events

API endpoint:  api/v1/events/1

example: http://localhost:4000/api/v1/events/1

Request method: GET

Response 
```json
{
    "message": "successfully get data",
    "data": {
        "id": 1,
        "title": "JS Meetup",
        "start_at": "2022-11-27T04:31:26.000Z",
        "end_at": "2022-11-28T04:31:35.000Z",
        "workshops": 3
    }
}
````

3. Workshop List API, where we can get all the active workshops of a single
event

API endpoint: api/v1/events/1/workshops

Example:  http://localhost:4000/api/v1/events/1/workshops

Request method: GET

Response: 
```json
{
    "message": "successfully get data",
    "data": {
        "id": 1,
        "title": "JS Meetup",
        "start_at": "2022-11-27T04:31:26.000Z",
        "end_at": "2022-11-28T04:31:35.000Z",
        "workshops": [
            {
                "id": 1,
                "title": "introduction to javascript",
                "description": "basic javascript",
                "start_at": "2022-11-27T10:35:53.000Z",
                "end_at": "2022-11-28T10:36:05.000Z"
            },
            {
                "id": 2,
                "title": "Basic js",
                "description": "basic js description",
                "start_at": "2022-11-27T10:35:53.000Z",
                "end_at": "2022-11-28T10:36:05.000Z"
            },
            {
                "id": 3,
                "title": "Array in Js",
                "description": "Array in JS description",
                "start_at": "2022-11-27T10:35:53.000Z",
                "end_at": "2022-11-28T10:36:05.000Z"
            }
        ]
    }
}
```

4. Workshop Details API, where we can get single workshop information

API endpoint: api/v1/workshops/1

Example: http://localhost:4000/api/v1/workshops/1

Request method: GET

Response: 
```json
{
    "message": "successfully get data",
    "data": {
        "id": 1,
        "title": "introduction to javascript",
        "description": "basic javascript",
        "start_at": "2022-11-27T10:35:53.000Z",
        "end_at": "2022-11-28T10:36:05.000Z",
        "total_reservations": 2
    }
}
```

5. Workshop reservation API

API endpoint: api/v1/workshops/reservation

Example: http://localhost:4000/api/v1/workshops/reservation

Request method: POST

request body: 
```json
{
    "name": "Rakib",
    "email": "rakib@gmail.com",
    "workshop_id": 1
}
```

Response : 
```
{
    "message": "data inserted",
    "data": {
        "reservation": {
            "id": 5,
            "name": "Rakib",
            "email": "rakib@gmail.com",
        },
        "event": {
            "id": 1,
            "title": "JS Meetup",
            "start_at": "2022-11-27T04:31:26.000Z",
            "end_at": "2022-11-28T04:31:35.000Z"
        },
        "workshop": {
            "id": 1,
            "title": "introduction to javascript",
            "description": "basic javascript",
            "start_at": "2022-11-27T10:35:53.000Z",
            "end_at": "2022-11-28T10:36:05.000Z"
        }
    }
}

```


