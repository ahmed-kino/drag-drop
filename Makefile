
compose:
	docker compose up

shell:
	docker compose exec api sh

fmt-api:
	docker compose exec api sh -c "npm run format"

db:
	docker compose exec postgres-db sh -c "PGPASSWORD=admin psql -Uborderless -d borderless"