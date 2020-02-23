# E-store on Node.JS

### First step install docker & docker-compose

### Create ENV with config it's require!!!
```bash
touch .env

next step...
DOCKER_PREFIX=<project_name>
DB_DATABASE=<db_name>
DB_PASSWORD=<db_password>
```

### Start DB service 
```bash
make start
```

### Stop DB service 
```bash
make stop
```

### Connect to DB service 
```bash
make connect_db
```

### Set user permission
```bash
sudo chmod -R $USER:$USER $PWD
```

#### Watch table info
```bash
DESCRIBE table_name;
```