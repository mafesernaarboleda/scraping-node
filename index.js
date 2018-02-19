const puppeteer = require('puppeteer');
const query = '"Batteries 911" site:linkedin.com/in OR site:linkedin.com/pub -intitle:profiles -inurl:"/dir';
const google = require('googleapis');
const customsearch = google.customsearch('v1');
const scrapper = require('./scrapperProfile');
const CX = '011950807694477757178:9i99ufr5wsi';
const API_KEY = 'AIzaSyBToIvgJXJsN12pY6nGteMnw8WUcTydmws';
const express = require('express')
const app = express()
const port = 3000

app.get('/:link', async (request, response) => {
  response.json(await scrapper.scrpProfile("https://www.linkedin.com/in/" + request.params.link));
})

app.listen(port, (err) => {
  if (err) {
    return console.log('something bad happened', err)
  }

  console.log(`server is listening on ${port}`)
})
