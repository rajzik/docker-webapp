# College project for web applications

> This project was created in very short time, quality of this project isn't great. 
> Front-end of this project whasn't main purpose, also was created in 12 hours.
> Main goal was to learn graphql and how to write backend for it. There are some things that aren't great, I was learning python and graphQL at the same time. 
> But I am satisfied with it.

## Installation



### Prerequisites

1. Docker
2. docker-compose
3. virtual-box ()

### First run

```bash
$ docker-compose up
```

### Following build
```bash
$ docker-compose up --build
```

This will start server database and adminer

Server is running on localhost:5555
Database is postgres so default port
Adminer is running on 8080


### Swarm

Init docker swarm

```bash
docker swarm init
```
> Possible error with multiple ip addresses
>
> **run:** `docker swarm init --advertise-addr <ipaddress>`

Build images

```bash
docker-compose build
``` 

Run stack and scaling

```bash
docker stack deploy -c docker-swarm.yml webapp
```

Cleanup

```bash
docker stack rm webapp
docker swarm leave --force
```


### To clean things up

```bash
./cleanup.sh
```
