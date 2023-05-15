#!/usr/bin/env bash

DOCKERHUB_USERNAME=$1
DOCKERHUB_REPO_NAME=$2

sudo apt-get update -y
sudo apt-get install -y --no-install-recommends --no-install-suggests \
     wget python3-minimal

BASE_URL=https://registry.hub.docker.com/v2/repositories

export DOCKERHUB_IMAGE_VERSION=$(wget -q \
"${BASE_URL}/${DOCKERHUB_USERNAME}/${DOCKERHUB_REPO_NAME}/tags" -O - \
| python3 -c \
"""
import sys, json
results = json.load(sys.stdin)
if not results['results']:
   print(0)
else:
    print(int(results['results'][0]['name']) + 1)
"""
)
