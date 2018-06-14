var request = require('request');

request.post('https://textbelt.com/text', {
  form: {
    phone: '+66991270737',
    message: 'Hello world',
    key: '1b2130e748aa13c6cdd76864c4cefcf7217ec86dLhw1o036Zg5AdT978G9NKju6M',
  },
}, function(err, httpResponse, body) {
  if (err) {
    console.error('Error:', err);
    return;
  }
  console.log(JSON.parse(body));
})
