const express = require('express');
const onesignal = require('./onesignal');
const { getEvents } = require('./google-calendar');

const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send(onesignal.viewApp());
    
});

let array = [];

app.get('/calendar', (request, response) => {
    let start = '2023-08-03T00:00:00.000Z';
    let end = '2023-10-04T00:00:00.000Z';
    getEvents(start, end)
    .then((res) => {
        let i = 0;
        while(i <= 10) { 
            array.push(res[i].summary);
            i++;
        }
        response.send(array);
     }).catch((err) => {
        console.log(err);
        return err;
     });
    
})

app.get('/send', (req, res) => {
    res.send(onesignal.createNotification('English Premier League', '⚽️ Fulham v Brentford'));
})


app.listen(3000);