start: #Start DB
	@sudo docker-compose up -d

stop: #Stop DB
	@sudo docker-compose down

show: #Show containers
	@sudo docker ps

connect_db: #Stop DB
	@sudo docker-compose exec db bash

delete_all: #docker stop $(docker ps -aq)
	@sudo docker container prune && sudo docker image prune -a && sudo docker volume prune
