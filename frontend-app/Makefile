.PHONY: build push

build:
	npm install
	npm run build
	docker build -t christiantran/sneak-peek-front:pitchday4 .

push:
	docker push christiantran/sneak-peek-front:pitchday4
