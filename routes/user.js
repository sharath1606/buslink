var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  let products=[{
    name:"IPHONE 11",
    category:"mobiles",
    description:"this is a good phone",
    image:"https://rukminim2.flixcart.com/image/850/1000/k2jbyq80pkrrdj/mobile-refurbished/z/a/f/iphone-11-pro-max-256-u-mwhm2hn-a-apple-0-original-imafkg2ftc5cze5n.jpeg?q=20&crop=false"
    
  },
{
  name:"samsung galaxy s24",
  category:"mobiles",
  description:"with ai facility",
  image:"https://m.media-amazon.com/images/I/31W9+sE8McL._SY300_SX300_.jpg"

},
{
  name:"nothing phone 2",
  category:"mobiles",
  description:"with ai facility",
  image:"https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1710251216/Croma%20Assets/Communication/Mobiles/Images/305351_0_uzmhao.png?tr=w-360"

},{
name:"vivo v30",
category:"mobiles",
description:"10X zoom",
image:"https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcRT1rU9oLRIOFRdi6RTxZwEm36CMNY7otJlVMhlkPDm_XqPZBlOBiZFqjoUVNhh-CjwcJuU-PIlyDezmsafjgg2TU_d8hb7sMI2SEOntW3IcNVq6BNYxsUjm8W4ZvEv8-f4sSmu1A&usqp=CAc"
}
]

  res.render('index', {products,admin:false});
});

module.exports = router;
