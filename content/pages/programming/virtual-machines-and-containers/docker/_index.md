---
author: gbmhunter
date: 2017-01-23 13:17:48+00:00
draft: false
title: Docker
type: page
url: /programming/virtual-machines-and-containers/docker
---

# Overview




Docker is container software. It is commonly used as a lightweight alternative to a virtual machine.




[![](/images/2017/01/docker-logo.png)
](/images/2017/01/docker-logo.png)




# Child Pages




[sb_child_list template=2 orderby=title order=asc nest_level=1]




# Running Docker Without sudo




By default, Docker has to be run with sudo commands otherwise you will experience errors such as:



    
    dial unix /var/run/docker.sock: connect: permission denied




(this particular error was trying to run docker pull ...)





	  1. Create a new docker group:  

 sudo groupadd docker 
	  2. Add the current user (you) to the docker group:  


    
    sudo gpasswd -a ${USER} docker



	  3. Restart the docker service:  


    
    sudo service docker restart



	  4. Apply the changed settings to the current terminal process (logging out and back in would have the same effect):  


    
    newgrp docker



	  5. All done! You should now be able to use docker commands without sudo.



# What Are Images? What Are Containers?




An image is a file which contains all the information/data about a particular system setup. When you run an image, you create a container of this image. You can create many containers based of the same image.




# Getting Images (docker pull)




Images can be downloaded from [Docker Hub](https://hub.docker.com/) using the docker pull command.



    
    docker pull image_name




Images can be removed with:



    
    docker rmi image_name




# Inspecting Local Images




You can view all of the docker images present on the local machine with:



    
    docker images




# Containers




## Inspecting




To show only running containers:



    
    docker ps




To show all containers (included those that are not running):



    
    docker ps -a




## To Start A New Bash Session Within A Container




Enter this on the a shell session running in the host computer to enter a shell session inside the docker container.



    
    docker exec -it <container_id> bash




Note: This assumes you already have a container running!




## To Exit A Container Without Stopping It




If the container is being run inside a bash shell, you can press Ctrl-P then Ctrl-Q.




## How To Stop/Remove All Containers At Once



    
    docker stop $(docker ps -a -q)
    docker rm $(docker ps -a -q)




If there are many docker containers, these commands can take some time (seconds).




# Dockerfiles




Dockerfiles are configuration files which tell Docker how to build an image.




Below is an example Dockerfile:



    
    # Extend base image ubuntu 16.04
    FROM ubuntu:16.04
    
    # Update Ubuntu Software repository
    RUN apt-get update
    
    # Install git
    RUN apt-get install -y git




If you are currently in the directory which has a Dockerfile, you can compile it with the following command:



    
    docker build -t my-docker-image .



