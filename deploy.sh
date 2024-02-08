#! /bin/bash

pm2 delete listofacil
sed -i "s/-dev/-$1/g" package.json
npm cache clean -f
npm install
pm2 start "npm run start:$2" --name listofacil && pm2 logs listofacil
