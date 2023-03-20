var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
  console.log(`First Name : ${req.body.firstname}`);
  console.log(`Last Name : ${req.body.lastname}`);
  res.send('POST recieved');
});

router.use(bodyParser.urlencoded({extended: true}))

router.post('/user', (req, res) => {
  const { firstname, lastname } = req.body;
  console.log(`FirstName: ${req.body.firstname}`);
  console.log(`LastName: ${req.body.lastname}`);

  res.send("POST received!");
})

module.exports = router;
