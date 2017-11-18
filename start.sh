#!/bin/bash
#start by typing ./start.sh &
#shutdown with ctrl + c

ng build -prod
npm run service-worker
npm run static-serve
