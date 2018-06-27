.PHONY: all build-prod build-dev run-dev test run-prod

# Variables
BUILD_TAG := $(shell date +%Y%m%d-%H%M%S)
REGISTRY := registry.staging.aivision.cloud
IMAGE_NAME := vision-webapp

REG_USER := xxx
REG_PASS := xxx
REG_URL := registry.staging.aivision.cloud

REMOTE_IMAGE := "${REGISTRY}/${IMAGE_NAME}"


all: build-dev run-dev

help:
	@echo "Type 'make build-dev' and then 'make run-dev' to start docker development env on port 6600"


# Development
build-dev:
	docker build -t $(IMAGE_NAME):dev		\
        -f Dockerfile-local                 \
        .

run-dev:
	@echo "Dev server will be accessible on port 3000"
	docker run --rm -it						        \
		--name $(IMAGE_NAME)-dev-run		        \
		-v $(shell pwd)/src:/usr/src/app/src        \
		-p 3000:3000						        \
		$(IMAGE_NAME):dev                           \
        start

test:
	docker run --rm -it									\
		$(IMAGE_NAME):dev								\
		test

run-prod: build-prod
	@echo "Nginx server will be accessible on port 80"
	docker run --rm -it						        \
		--name $(IMAGE_NAME)-prod-run		        \
		-v $(shell pwd)/src:/usr/src/app/src        \
		-p 80:80						            \
		$(IMAGE_NAME):prod


build-prod:
	docker build -t $(IMAGE_NAME):prod .


# CI/CD
ci-dev-build-push: ci-login
	docker pull $(REMOTE_IMAGE):dev || true
	docker build --cache-from $(REMOTE_IMAGE):dev	\
		-t $(REMOTE_IMAGE):$(BUILD_TAG)				\
		-t $(REMOTE_IMAGE):dev .
	docker push $(REMOTE_IMAGE):$(BUILD_TAG)
	docker push $(REMOTE_IMAGE):dev

ci-prod-build-push: ci-login
	docker pull $(REMOTE_IMAGE):latest || true
	docker build --cache-from $(REMOTE_IMAGE):latest	\
		-t $(REMOTE_IMAGE):latest 						\
		-t $(REMOTE_IMAGE):latest-$(BUILD_TAG) .
	docker push $(REMOTE_IMAGE):latest
	docker push $(REMOTE_IMAGE):latest-$(BUILD_TAG)

ci-login:
	docker login -u $(REG_USER) -p $(REG_PASS) $(REG_URL)

ci-coverage: build-dev
	docker run --rm -it						        \
		--name $(IMAGE_NAME)-dev-run		        \
		-v $(shell pwd)/src:/usr/src/app/src        \
		-p 3000:3000						        \
		$(IMAGE_NAME):dev                           \
        coverage

