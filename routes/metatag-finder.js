const express = require('express');
const router = express.Router();
const request = require('request')
const cheerio = require('cheerio')
const dns = require('dns')

router.get('/find-metatag', (req, res) => {
    if (!req.body.url || !req.body.metatag_name){
        return res.status(400).send({ status: "ERROR", errorCode: "invalid-api-parameters" });
    }
    try {
        request(req.body.url, function (error, response, html) {
            if (error){
                res.status(500).send({ status: "ERROR", errorCode: "Unhandled Error"})
            }
            if (!error && response.statusCode == 200) {
                var $ = cheerio.load(html)
                let found = false
                $('meta').each(function(i, e){
                    if ($(this).attr('name') == req.body.metatag_name){
                        res.send({
                            "content": $(this).attr('content')
                        })
                        found = true
                        console.log("found")
                    }
                });
                if (found == false){
                    res.send({
                        "status": "not found"
                    })
                }
            }
            else{
                res.status(400).send({ status: "ERROR", errorCode: "some error occurred"})
            }
        });
    } catch (error) {
        return res.status(400).send({ status: "ERROR", errorCode: "request not sent"})
    }
})

router.get('/dns-lookup', (req, res) => {
    if (!req.body.url || !req.body.dns_txt){
        return res.status(400).send({ status: "ERROR", errorCode: "invalid-api-parameters" });
    }
    try {
        dns.resolve(req.body.url, rrtype=req.body.dns_txt, (err, address) => {
            if (!err){
                return res.status(404).send({ status: "ERROR", errorCode: "website not found"})
            }
            console.log("err")
            console.log(err)
            console.log("err end")
            if (address){
                res.send({
                    "status": "found",
                    "dns_txt": req.body.dns_txt,
                    "domain": address
                })
            } else{
                res.send({
                    "status": "not found"
                })
            }
        })   
    } catch (error) {
        res.status(400).send({ status: "ERROR", errorCode: "dns resolve failed"})
    }
})

module.exports = router;


