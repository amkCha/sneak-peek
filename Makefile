build-front:
	npm --prefix ./frontend-app/ install 
	npm --prefix ./frontend-app/ run build

docker-build:
	docker build -t sneak-peek-front ./frontend-app

start: 
	docker run -p 3000:8080 sneak-peek-front:latest

run: build-front docker-build start
	

