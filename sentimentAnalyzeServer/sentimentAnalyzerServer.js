const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
        version: '2020-08-01',
        authenticator: new IamAuthenticator({
            apikey: api_key
        }),
        serviceUrl: api_url
    });
    return naturalLanguageUnderstanding;
}

const app = new express();
app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {
    const url = req.query.url;
    const analyzeParams = {
        'url': url,
        'features':{
            'keywords': {
                //'sentiment': true,
                'emotion': true,
                'limit': 1
            }
        }
    };
    const watson = getNLUInstance();

    watson.analyze(analyzeParams).then(results => {
        list = results.result.keywords;
        let emotions = list.map((elem) => {
            return elem.emotion;
        });
        return res.send(emotions[0]);
    }).catch(err => {
        console.log(err);
    });
    return "Algo ocurrio";
});

app.get("/url/sentiment", (req,res) => {
    const url = req.query.url;
    const analyzeParams = {
        'url': url,
        'features':{
            'keywords': {
                'sentiment': true,
                //'emotion': true,
                'limit': 1
            }
        }
    };
    const watson = getNLUInstance();

    watson.analyze(analyzeParams).then(results => {
        list = results.result.keywords;
        let sentiments = list.map((elem) => {
            return elem.sentiment;
        });
        return res.send(sentiments[0]);
    }).catch(err => {
        console.log(err);
    });
    return "Algo ocurrio";
});

app.get("/text/emotion", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
        'text': text,
        'features':{
            'keywords': {
                //'sentiment': true,
                'emotion': true,
                'limit': 1
            }
        }
    };
    const watson = getNLUInstance();

    watson.analyze(analyzeParams).then(results => {
        list = results.result.keywords;
        let emotions = list.map((elem) => {
            return elem.emotion;
        });
        return res.send(emotions[0]);
    }).catch(err => {
        console.log(err);
    });
    return "Algo ocurrio";
});

app.get("/text/sentiment", (req,res) => {
    const text = req.query.text;
    const analyzeParams = {
        'text': text,
        'features':{
            'keywords': {
                'sentiment': true,
                //'emotion': true,
                'limit': 1
            }
        }
    };
    const watson = getNLUInstance();

    watson.analyze(analyzeParams).then(results => {
        list = results.result.keywords;
        let sentiments = list.map((elem) => {
            return elem.sentiment;
        });
        return res.send(sentiments[0]);
    }).catch(err => {
        console.log(err);
    });
    return "Algo ocurrio";
});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})

