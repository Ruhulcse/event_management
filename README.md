

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

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

# production mode
$ npm run start:prod
```


## API Documentation 

1. Get all active events with pagination

API endpoint: http://localhost:4000/api/v1/events?page=1&per_page=3

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

API endpoint:  http://localhost:4000/api/v1/events/1

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

API endpoint:  http://localhost:4000/api/v1/events/1/workshops

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

API endpoint: http://localhost:4000/api/v1/workshops/1

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
## Stay in touch


## License


