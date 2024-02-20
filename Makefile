
compose:
	docker compose up

shell:
	docker compose exec api sh

db:
	docker compose exec postgres-db sh -c "PGPASSWORD=admin psql -Uborderless -d borderless"