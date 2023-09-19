# simple-asamit-frontend

## 構成
- Hosting
    - React

## Getting Started
First, prepare .env file and set API key.
```sh
touch .env
echo "REACT_APP_LIFF_ID=xxxxxxxxxxxxx" >> .env
```
Second, install dependencies.
And then run the development server:
```sh
npm i
npm run dev
```
### deploy
```sh
touch .env.prod
echo "REACT_APP_LIFF_ID=xxxxxxxxxxxxx" >> .env.prod
npm run build
firebase deploy --only hosting
```
