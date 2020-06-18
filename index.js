const express = require('express');
const bodyParser = require('body-parser');
const { query } = require('express');
const PORT = process.env.PORT || 8080;

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true }));

app.get('/', function (req, res){
   res.writeHead(200, {"Content-Type": "text/html"});
   res.write('index.html');
});

app.post('/', function (req, res){
   let price = calculateRate(req.body.pkg, req.body.weight);
   console.log(req.body.weight);
   console.log(price);
   res.render('postage', {body: req.body, result: price});
});

app.listen(PORT)


function calculateRate(type, weight) {
   let rate;
   weight = parseFloat(weight);
   if (type == 'Letters(Stamped)') {
      if(weight < 1) {
         rate = 0.55;
      } else if (weight < 2) {
         rate = 0.70;
      } else if (weight < 3) {
         rate = 0.85;
      } else if (weight < 3.5) {
         rate = 1.00;
      } else {
         rate = 1.00;
      }
   } else if (type == 'Letters(Metered)') {
      if(weight < 1) {
         rate = 0.50;
      } else if (weight < 2) {
         rate = 0.65;
      } else if (weight < 3) {
         rate = 0.80;
      } else if (weight < 3.5) {
         rate = 0.95;
      } else {
         rate = 0.95;
      }
   } else if (type == 'Large Envelopes(Flats)') {
      if(weight < 1) {
         rate = 1.00;
      } else if (weight < 2) {
         rate = 1.20;
      } else if (weight < 3) {
         rate = 1.40;
      } else if (weight < 4) {
         rate = 1.60;
      } else if (weight < 5){
         rate = 1.80;
      } else if (weight < 6){
         rate = 2.00;
      } else if (weight < 7){
         rate = 2.20;
      } else if (weight < 8){
         rate = 2.40;
      } else if (weight < 9){
         rate = 2.60;
      } else if (weight < 10){
         rate = 2.80;
      } else if (weight < 11){
         rate = 3.00;
      } else if (weight < 12){
         rate = 3.20;
      } else if (weight < 13){
         rate = 3.40;
      } else {
         rate = 3.40;
      }
   } else if (type == 'First-Class Package Service—Retail') {
      if (weight < 4) {
         rate = 3.80;
      } else if (weight < 8){
         rate = 4.60;
      } else if (weight < 12){
         rate = 5.30;
      } else if (weight < 13){
         rate = 5.90;
      } else {
         rate = 5.90;
      }
   }
}