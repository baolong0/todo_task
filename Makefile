TEST_LOCAL_ENV=\
	NODE_ENV=test \
	SERVER_PORT=3000 \
	FIREBASE_CONFIG_FILE=../../seepick_firebase.test.json \
	REDIS_URL=redis://redis:6379 \
	PSQL_HOST=localhost \
	PSQL_PORT=5432 \
	PSQL_USER=phattn \
	PSQL_PASSWORD=Abc12345 \
	PSQL_DATABASE=seepick_test \
  THUMBOR_HOST=http://149.28.152.72 \
  THUMBOR_PORT=81

build:
	npm run build

run.dev:
	docker-compose -f docker-compose.dev.yml up

rm.dev:
	docker-compose -f docker-compose.dev.yml down -v

run.dev.fresh:
	docker-compose -f docker-compose.dev.yml up --build --force-recreate --no-deps

run.staging:
	docker-compose -f docker-compose.staging.yml up

run.test:
	docker-compose -f docker-compose.test.yml up

migrate.dev:
	export NODE_ENV=development; npx knex migrate:latest && npx knex seed:run

migrate.staging:
	export NODE_ENV=staging; npx knex migrate:latest && npx knex seed:run

migrate.test:
	export NODE_ENV=test; npx knex migrate:latest && npx knex seed:run

test.all:
	$(TEST_LOCAL_ENV) \
	npx jest --runInBand --detectOpenHandles --forceExit --bail

test.integration:
	$(TEST_LOCAL_ENV) \
	npx jest int\.test --runInBand --detectOpenHandles --forceExit --bail

test.with-pattern:
	$(TEST_LOCAL_ENV) \
	npx jest ${pattern} --runInBand --detectOpenHandles --forceExit --bail

test.unit:
	$(TEST_LOCAL_ENV) \
	npx jest unit
