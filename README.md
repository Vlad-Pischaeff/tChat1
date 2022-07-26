# Test redux-toolkit, rtk-query, react-hook-form, jwt

## To run

- запустите сервер MongoDB
- в каталоге программы выполните команды
```
 npm install
 npm run client-install
 npm run server-install
```
- создайте файл .env в корне проекта
```
JWT_SECRET='jwtSecretKey'
TOKEN_LIFETIME='5m'
MDB_SERVER='192.168.0.1'
MDB_DATABASE='database'
```
- запустите все в режиме разработки
```
 npm run dev
```
- подключитесь к [приложению](http://localhost:3000)