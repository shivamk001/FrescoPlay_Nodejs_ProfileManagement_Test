const express = require("express");
const fs = require("fs");
const data = require('./get.json')
const post_data = require('./post.json')
//setting up the express router
const app = express();

app.use(express.json());

//write the code for routes here
app.post('/add', function (req, res) {
    console.log(req.body)
    console.log(post_data)
    post_data.push(req.body)
    console.log(post_data)

    fs.writeFile('./post.json', JSON.stringify(post_data), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("post.json", "utf8"));
        }
    })
    res.status(200).end()
    //res.send('In Add')
})

app.get('/view', function (req, res) {
    //console.log('DATA:', data)
    console.log('REQ.QUERY:', req.query)
    if (req.query.hasOwnProperty('id')) {
        console.log('In ID', req.query.id)
        const obj = data.filter(x =>
            //console.log(parseInt(x.id), parseInt(req.query.id), parseInt(x.id) === parseInt(req.query.id))
            parseInt(x.id) === parseInt(req.query.id)
        )
        console.log('OBJ:', obj)
        res.json(obj).status(200).end()
    }
    else {
        res.json(data).end()
    }
    //res.send('In View')
})

app.patch('/edit/:id', function (req, res) {
    //res.send('In Edit')
    //console.log('In Edit REQ.QUERY:', req.query.id)
    console.log('In EDIT req.url', req.url.split('/'))
    const id = req.url.split('/')[2]
    console.log('ID:', id)
    //if (req.query.hasOwnProperty('id')) {
    for (let i = 0; i < post_data.length; i++) {
        console.log()
        if (parseInt(post_data[i].id) === parseInt(req.query.id)) {
            console.log('IN EDIT post_data:', post_data[i])
            Object.getOwnPropertyNames(req.body).forEach((prop) => {
                post_data[i][prop] = req.body[prop]
            })
        }
    }
    console.log('POSTDATA:', post_data)
    fs.writeFile('./post.json', JSON.stringify(post_data), (err) => {
        if (err)
            console.log(err);
        else {
            console.log("File written successfully\n");
            console.log("The written has the following contents:");
            console.log(fs.readFileSync("post.json", "utf8"));
        }
    })
    res.status(200).end()

    //}
})

app.listen(3000, function () {
    console.log('Listening on port 3000')
})