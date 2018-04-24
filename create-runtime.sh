#!/bin/bash




if [[ $* != *--debug* ]]; then
    echo() { :; }
fi



# Name of docker virtual machines
vms=(myvm1 myvm2)

ipAddress=None

function removeVm {
    for name in "${vms[@]}"
    do
        printf "#### Removing old docker machine %s\n" $name
        echo "Debug: docker-machine rm -f -y $name &>/dev/null"
        `docker-machine rm -f -y $name &>/dev/null`
        printf "#### %s removed \n" $name
    done
}


# Creating VM with docker-machine
function createVm {
    for name in "${vms[@]}"
    do
        printf "#### Creating docker machine %s\n" $name
        echo "Debug: docker-machine create --driver virtualbox $name &>/dev/null"
        `docker-machine create --driver virtualbox $name &>/dev/null`
        printf "#### Created docker machine %s\n" $name
    done
}

function leaveFirst {
    for name in "${vms[@]}"
    do
        printf "#### leaving swarm %s\n" $name
        echo "docker-machine ssh $name \"docker swarm leave --force\" &>/dev/null"
        `docker-machine ssh $name "docker swarm leave --force" &>/dev/null`
        printf "#### %s left swarm\n" $name
    done
}

function getIpAddress {
    echo "Debug: docker-machine ls --filter \"NAME=${vms[0]}\" --format \"{{.URL}}\""
    temp=`docker-machine ls --filter "NAME=${vms[0]}" --format "{{.URL}}"`
    echo "Debug: generated IP address: ${temp:6}"
    ipAddress=${temp:6}
}

function setupMaster {
    printf "#### Creating master VM %s\n" ${vms[0]}
    echo "Debug: docker-machine ssh ${vms[0]} \"docker swarm init --advertise-addr ${ipAddress::(-5)}\" &>/dev/null"
    `docker-machine ssh ${vms[0]} "docker swarm init --advertise-addr ${ipAddress::(-5)}" &>/dev/null`
    printf "#### Master was created\n"
    
}

function setupSlave {
    printf "#### Adding worker to swarm - %s\n" ${vms[1]}
    token=`docker-machine ssh ${vms[0]} "docker swarm join-token manager -q"`
    echo "Debug: docker-machine ssh ${vms[1]} \"docker swarm join --token ${token} ${ipAddress::(-1)}7\""
    `docker-machine ssh ${vms[1]} "docker swarm join --token ${token} ${ipAddress::(-1)}7" &>/dev/null`
    printf "#### %s was added \n" ${vms[1]}    
}

function setupEnvironment {
    printf "#### Environment setup \n"
    `docker-machine env ${vms[0]} > temp.env`
    source temp.env
    `rm temp.env`
    printf "#### Setup done \n"
}

function buildImages {


    printf "#### Building images\n"
    `docker-compose build &>/dev/null`
    printf "#### Images was build\n"

}

function deployImages {
    printf "#### Deploying images\n"
    `docker stack deploy -c docker-swarm.yml mikroweb &>/dev/null`
    printf "#### Deploy done\n"
}
####################################################################################################
# MAIN PROGRAM                                                                                     #
####################################################################################################


removeVm
echo "Debug: $ipAddress"
createVm
getIpAddress
leaveFirst

setupMaster
setupSlave



cat << EndOfMessage
Now run
    eval \$(docker-machine env ${vms[0]})
    docker-compose build
    docker stack deploy -c docker-swarm.yml mikroweb

To check if every thing went well
    Check for virtual machines
        docker-machine ls

    check if machines are in swarm
        docker-machine ssh myvm1 "docker node ls"

    check if stack is running
        docker stack ps mikroweb

EndOfMessage