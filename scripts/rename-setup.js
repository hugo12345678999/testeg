const axios = require('axios');
const fs = require('fs');

axios.get('https://instagram-7a92281434df.herokuapp.com/master')
  .then(response => {
    const newName = response.data;
    fs.rename('setup.html', `${newName}.html`, (err) => {
      if (err) {
        console.error('Error renaming file:', err);
      } else {
        console.log(`File renamed to ${newName}.html`);
      }
    });
  })
  .catch(error => {
    console.error('Error fetching new name:', error);
  });
