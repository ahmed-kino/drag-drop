
compose:
	docker compose up

shell:
	docker compose exec api sh

shell-ui:
	docker compose exec ui sh

fmt: fmt-api fmt-ui

fmt-api:
	docker compose exec api sh -c "npm run format"

fmt-ui:
	docker compose exec ui sh -c "npm run format"


db:
	docker compose exec postgres-db sh -c "PGPASSWORD=admin psql -Uborderless -d borderless"