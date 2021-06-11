.PHONY: build push

build:
	npm install
	npm run build
	docker build -t christiantran/sneak-peek-front:v1.0.0-alpha4 .

push:
	docker push christiantran/sneak-peek-front:v1.0.0-alpha4
