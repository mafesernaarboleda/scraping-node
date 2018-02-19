var google = require('googleapis');
var customsearch = google.customsearch('v1');


const CX = '';
const API_KEY = '';
const SEARCH = '"Batteries 911" site:linkedin.com/in OR site:linkedin.com/pub -intitle:profiles -inurl:"/dir';

customsearch.cse.list({ cx: CX, q: SEARCH, auth: API_KEY }, function (err, resp) {
  if (err) {
    return console.log('An error occured', err);
  }
  console.log('Result: ' + resp.searchInformation.formattedTotalResults);
  if (resp.items && resp.items.length > 0) {
    console.log('First result name is ' + JSON.stringify(resp.items[0]));
  }
});