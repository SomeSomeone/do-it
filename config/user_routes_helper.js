const basicAuth    = require('basic-auth');





module.exports = function(db) {
   return{
    auth : function (req, res, next) {
      if (req.cookies.globals===undefined) {
        res.redirect('/log_in');
      }
      var userData=JSON.parse(req.cookies.globals).currentUser
      if (!userData || !userData.authdata || !userData.username) {
        res.redirect('/log_in');
      }else{
        db.collection('users').findOne({name:userData.username}, (err, item) => {
          if (item && Base64.decode(userData.authdata) === item.pass) {
            next();
          } else {
            res.redirect('/log_in');
          }
        })
      }
    },
    current_user:function(req ,callback) {
      if (req.cookies.globals===undefined) {
        res.redirect('/log_in');
      }
      var userData=JSON.parse(req.cookies.globals).currentUser
      if (userData && userData.username) {  
        db.collection('users').findOne({name:userData.username}, (err, item) => {
          callback(err, item)
        })
      }
    },
    log_in : function(req, res) {
        var user = basicAuth(req);
        if (!user || !user.name || !user.pass) {
          res.status(500).send('Something broke!');
           console.log(3)
        }else{
          db.collection('users').findOne({name:user.name}, (err, item) => {

            if (item && user.name === item.name && user.pass === item.pass) {
              res.status(200).send('Something Ok!');
               console.log(2)
            } else {
              res.status(500).send('Something broke!');
              console.log(1)
            }
          })
        }
        
    },
    registrate : function (req, res) {
      var user = basicAuth(req);
        if (!user || !user.name || !user.pass) {
          res.status(500).send('Something broke!');
        }else{
          const userItems = { name: user.name , pass: user.pass };
          db.collection('users').insert(userItems, (err, result) => {
            if (err) { 
              res.status(500).send({ 'error': 'An error has occurred' });
            } else {
              res.status(200).send('Something Ok!');
            }
          });         
        } 
    }
  }
}

var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

const Base64    =  {
        encode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            do {
                chr1 = input.charCodeAt(i++);
                chr2 = input.charCodeAt(i++);
                chr3 = input.charCodeAt(i++);

                enc1 = chr1 >> 2;
                enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
                enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
                enc4 = chr3 & 63;

                if (isNaN(chr2)) {
                    enc3 = enc4 = 64;
                } else if (isNaN(chr3)) {
                    enc4 = 64;
                }

                output = output +
                    keyStr.charAt(enc1) +
                    keyStr.charAt(enc2) +
                    keyStr.charAt(enc3) +
                    keyStr.charAt(enc4);
                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";
            } while (i < input.length);

            return output;
        },

        decode: function (input) {
            var output = "";
            var chr1, chr2, chr3 = "";
            var enc1, enc2, enc3, enc4 = "";
            var i = 0;

            // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
            var base64test = /[^A-Za-z0-9\+\/\=]/g;
            if (base64test.exec(input)) {
                window.alert("There were invalid base64 characters in the input text.\n" +
                    "Valid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\n" +
                    "Expect errors in decoding.");
            }
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

            do {
                enc1 = keyStr.indexOf(input.charAt(i++));
                enc2 = keyStr.indexOf(input.charAt(i++));
                enc3 = keyStr.indexOf(input.charAt(i++));
                enc4 = keyStr.indexOf(input.charAt(i++));

                chr1 = (enc1 << 2) | (enc2 >> 4);
                chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
                chr3 = ((enc3 & 3) << 6) | enc4;

                output = output + String.fromCharCode(chr1);

                if (enc3 != 64) {
                    output = output + String.fromCharCode(chr2);
                }
                if (enc4 != 64) {
                    output = output + String.fromCharCode(chr3);
                }

                chr1 = chr2 = chr3 = "";
                enc1 = enc2 = enc3 = enc4 = "";

            } while (i < input.length);

            return output;
        }
    };

