

start: #Start DB
	@sudo docker-compose up -d && npx nodemon server.js

stop: #Stop DB
	@sudo docker-compose down

show: #Show containers
	@sudo docker ps

connect_db: #Stop DB
	@sudo docker-compose exec db bash

delete_all: #docker stop $(docker ps -aq)
	@sudo docker container prune && sudo docker image prune -a && sudo docker volume prune

refresh: # Refresh DB
	@sequelize db:migrate:undo:all && sequelize db:migrate && sequelize db:seed:all

create_seeder: # Create seeder name=[nameSeeder]
	@sequelize seed:generate --name $(name)