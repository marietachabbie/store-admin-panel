# store-admin-panel

Admin panel for clothes store written on `React` and `Node.js`. This is not a full operating app, but rather a simple version that follows given task requirements.

Note: Your `.env` file must contain these values:

```
DATABASE="YOUR_DATABASE"
DB_USER="YOUR_USER"
DB_PASSWORD="YOUR_PASSWORD"
DB_HOST="YOUR_HOST"
DB_DIALECT="YOUR_DIALECT"
```

### To run backend:
```sh
cd server && npm i && npm start
```

### To run frontend:
```sh
cd client && npm i && npm start
```

---

If you are having any issues displaying images in the browser (error: Not allowed to load local resource), a good solution could be the following:

```sh
npm install -g http-server
```
Go to the root folder that you want to serve your files and type:
```sh
http-server ./
```
Read the output, it should display a URL where the files will be accessible, e.g. `http://localhost:8080` is where the React app looks for images.
