.PHONY: local-create-venv backend-migrate backend-make-migrations backend-setup docker-build docker-run remove-unused-frontends

#
# Development environment (local)
#
local-create-venv:
	python3 -m venv venv
	venv/bin/python3 -m pip install -r backend/requirements.txt


#
# development environment (docker container)
#
backend-migrate:
	docker exec -it vyrix-backend-1 python3 opt/backend/manage.py migrate

backend-make-migrations:
	docker exec -it vyrix-backend-1 python3 opt/backend/manage.py makemigrations

backend-setup:	backend-migrate
	docker exec -it vyrix-backend-1 python3 opt/backend/manage.py load_fixtures
	docker exec -it vyrix-backend-1 python3 opt/backend/manage.py setup_dev

docker-build:
	env_file=postgres.env frontend_directory=frontend db_host=postgres port=3000 docker-compose -f docker-compose.yml -f docker-compose.postgres.yml build

docker-run:
	env_file=postgres.env frontend_directory=frontend db_host=postgres port=3000 docker-compose -f docker-compose.yml -f docker-compose.postgres.yml up
