# asamit-frontend
## Overview
第34回 高専プロコン作品 Asamit! のフロントエンド

## Getting Started
First, prepare .env file and set API key.
```sh
touch .env
echo "REACT_APP_LIFF_ID=xxxxxxxxxxxxx" >> .env
echo "BASE_URL=https://xxxxxxxxxx.ngrok-free.app" >> .env
```
Second, install dependencies.
And then run the development server:
```sh
npm i
npm run dev
```
### Debug mode
```sh
echo "DEBUG=TRUE" >> .env
```
defalut: FALSE
### deploy
```sh
touch .env.prod
echo "REACT_APP_LIFF_ID=xxxxxxxxxxxxx" >> .env.prod
echo "BASE_URL=https://xxxxxxxxxx.xxx" >> .env.prod
npm run build
firebase deploy --only hosting
```
