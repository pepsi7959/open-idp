var ldap = require('ldapjs');
const promisify = 
var client = ldap.createClient({
  url: 'ldap://10.2.2.3:389',
  connectTimeout: 10000,
});

client.bind('pathorn@etda.or.th', 'Path3417@', function(err) {
  const opts = {
    scope: 'sub',
    paged: true,
  }
  const users = [];
  if(!err) {
    client.search('CN=Pathorn Tengkiattrakul,OU=SDS,OU=OSD,OU=Main,DC=etda,DC=or,DC=th', opts, function(err, res) {
      res.on('searchEntry', function(entry) {
        console.log(entry.object);
      });

    });
  }
});


