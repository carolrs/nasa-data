const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3001;

app.use(cors());

app.get('/events', (req, res) => {
  axios.get('https://eonet.gsfc.nasa.gov/api/v3/events?status=open&limit=20')
      .then(response => {
          console.log("Data from API:", response.data); 
          res.json(response.data.events);
      })
      .catch(error => {
          console.error("Error:", error);
          res.status(500).send(error);
      });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


