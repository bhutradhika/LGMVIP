const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));
// app.use(__dirname + "/public/images/favicon.ico");

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res) {
  const fisrtName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  console.log(fisrtName, lastName, email);

  const data = {
    members: [{
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: fisrtName,
        LNAME: lastName
      }
    }]
  };

  const jsonData = JSON.stringify(data);

  const url = "https://us6.api.mailchimp.com/3.0/lists/473da93472";
  const options = {
    method: "post",
    auth: "radhika:d45933c47e262c6fc0fc7cf45c0ce875-us6"
  }

  const request = https.request(url, options, function(response) {
    response.on("data", function(data) {
      if (response.statusCode == 200) {
        res.sendFile(__dirname + "/success.html");
      }
      else {
        res.sendFile(__dirname + "/failure.html");
      }

      console.log(JSON.parse(data));
    });
  });
  request.write(jsonData);
  request.end();
});

app.post("/failure", function(req, res) {
  res.redirect("/");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running.");
});


// API Key: d45933c47e262c6fc0fc7cf45c0ce875-us6
// List ID: 473da93472
