# Installation

## Prerequisites

1. Docker
2. docker-compose

## First run

```bash
$ docker-compose up
```

## Following build
```bash
$ docker-compose up --rebuild
```

This will start server database and adminer

Server is running on localhost:8000
Database is postgres so default port
Adminer is running on 8080

# To clean things up

```bash
./cleanup.sh
```
