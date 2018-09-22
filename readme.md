## Indie Books Reviews

Indie Books Reviews is a web app for reading literary reviews of selfpublished books.

### Install
```
npm install
```

### Connect to dataBase

After installing, please change the **.env.example** file to a **.env** file with your
environment variables.

Example: 
```
DB_HOST='http://localhost:8000/'
```

Then run JSON Server:

```
npm run db
```

Then, change the **db.example.json** file to **db.json** with your data

### Run Mode Development:

```
npm run dev
```

### Run Mode Production

```
npm run build
```