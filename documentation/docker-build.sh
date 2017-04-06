#!/bin/bash

docker run --rm -v "$(pwd):/documents" moird/mkdocs bash -c "./build.sh"
