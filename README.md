# mern-user-app
mern-user-app

git clone https://github.com/saulitalja/mern-user-app.git
cd mern-user-app
npm init -y
npm install express mongoose cors body-parser dotenv

npx create-react-app client
cd client
npm install axios

cd ..
node index.js
cd client
npm start

Avaa Chrome-selain: http://localhost:3000
Avaa kehittäjän työkalut ja sieltä console välilehti. Syötä henkilön etunimi ja sukunimi ja katso mitä consoleen tulostuu.

Avaa uusi Chrome-selain: http://localhost:5000/api/users
Katso mitä nimiä sivu tulostaa.
