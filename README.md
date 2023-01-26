# Test redux-toolkit, rtk-query, react-hook-form, with automatic renewal jwt

## To run

- в каталоге программы выполните команды
```
 npm run all-install
```
- создайте файл .env в корне проекта
```
ACCESS_JWT_SECRET='jwtAccessSecretKey'
ACCESS_JWT_LIFETIME='5m'
REFRESH_JWT_SECRET='jwtRefreshSecretKey'
REFRESH_JWT_LIFETIME='10d'
MDB_SERVER='localhost'
MDB_DATABASE='database'
SMTP_HOST="smtp.gmail.com"
SMTP_PORT="587"
SMTP_USER="YourMail@gmail.com"
SMTP_PASS="YourPassKey"
```
где MDB_SERVER   - адрес сервера MongoDB, 
    MDB_DATABASE - имя базы данных на этом сервере

- запустите все в режиме разработки
```
 npm run dev
```
- подключитесь к [приложению](http://localhost:3000)
