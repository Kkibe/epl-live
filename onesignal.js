const { response } = require('express');
const OneSignal = require('onesignal-node');    

const appId = 'bbac588d-364a-4fdc-9a2f-ee42ac804c05';
const apiKey = 'NjVhYjZkNGItN2MzOS00MzFmLTk5YzQtYzZhMThlZjI2NWRm'

const client = new OneSignal.Client(appId, apiKey);

const createNotification = async (title, content) => {
    const notification = {
        contents: {
            en: content
        },
        headings: {
            en: title,
        },
        //include_player_ids: ['playerId'],
        data: {
            foo: 'bar'
        },
          
        included_segments: ['Subscribed Users'],
    };

    try {
        const response = await client.createNotification(notification);
        console.log(response.body.id);
      } catch (e) {
        if (e instanceof OneSignal.HTTPError) {
          // When status code of HTTP response is not 2xx, HTTPError is thrown.
          console.log(e.statusCode);
          console.log(e.body);
        }
    }

    return response;
}


const viewApp = async () => {
    const response = await client.viewDevices({ limit: 200, offset: 0 });
    return response.body;
}

module.exports = {createNotification, viewApp}