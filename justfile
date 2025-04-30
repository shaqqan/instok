#!/usr/bin/env just --justfile

start:
	deno run --allow-all mod.ts

dev:
	deno run --watch-hmr --allow-all mod.ts

fmt:
	deno fmt

lint:
	deno lint

cache:
	deno cache ./deps.ts
