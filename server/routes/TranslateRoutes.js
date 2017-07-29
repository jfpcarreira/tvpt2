const router = require('express').Router();
const path = require('path');
const fs = require("fs");

router.get('/:lang', function (req, res) {
    let filename = 'messages_' + req.params.lang + '.json';
    let file = path.join(__dirname, '../..', '/tools/i18n', filename);
    let obj = JSON.parse(fs.readFileSync(file, 'utf8'));

    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify(obj));
});

module.exports = router;
