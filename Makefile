build-front:
	npm --prefix ./frontend-app/ install 
	npm --prefix ./frontend-app/ run build
	docker build -t sneak-peek-front ./frontend-app

run: build-front
	docker run -p 3000:80 sneak-peek-front:latest

