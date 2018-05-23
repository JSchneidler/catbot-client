# Default: Build and serve dev
all:
	@make serve.dev





##### BUILD TASKS #####

# Create dist folder
dist-folder:
	rm -rf ./dist
	mkdir ./dist

webpack.build.dev:
	npm run webpack.dev

webpack.build.prod:
	npm run webpack.prod

# Start client dev server
webpack.watch:
	-npm i
	@make dist-folder
	@make build.common
	npm run webpack.devServer

# Common build tasks
build.common:
	cp -R app/index.html dist/

# Dev build
build.dev:
	-npm i
	@make dist-folder
	@make build.common
	npm run webpack.dev

# Prod build
build.prod:
	-npm i
	@make dist-folder
	@make build.common
	npm run webpack.prod

# Build and serve dev
serve.dev:
	@make build.dev
	npm start

# Build and serve prod
serve.prod:
	@make build.prod
	npm start





##### DB TASKS #####

migrate:
	sequelize db:migrate