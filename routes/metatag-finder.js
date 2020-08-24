const express = require('express');
const router = express.Router();
const request = require('request')
const cheerio = require('cheerio')
const dns = require('dns')

router.get('/find-metatag', (req, res) => {
    if (!req.body.url || !req.body.metatag_name){
        return res.status(400).send({ status: "ERROR", errorCode: "invalid-api-parameters" });
    }
    request(req.body.url, function (error, response, html) {
        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html)
            let meta_name = []
            $('meta').each(function(i, e){
                if ($(this).attr('name') == req.body.metatag_name){
                    res.send({
                        "content": $(this).attr('content')
                    })
                    console.log("found")
                }
            })
        }
    });
})

router.get('/dns-lookup', (req, res) => {
    if (!req.body.url){
        return res.status(400).send({ status: "ERROR", errorCode: "invalid-api-parameters" });
    }
    dns.resolve(req.body.url, rrtype=req.body.dns_txt, (err, address) => {
        if (address){
            res.send({
                "status": "found",
                "domain": address
            })
        } else{
            res.send({
                "status": "not found"
            })
        }
    })
})

module.exports = router;


