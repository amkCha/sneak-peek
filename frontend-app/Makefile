.PHONY: build push

build:
	npm install
	npm run build
	docker build -t christiantran/sneak-peek-front:pitchday .

push:
	docker push christiantran/sneak-peek-front:pitchday
