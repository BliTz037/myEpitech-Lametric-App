const { default: axios } = require('axios');
const config = require('../config.json');
const api = require('./api');

function getCreditsScreen(credits, dataFormat) {
    dataFormat.frames.push({
        "text": "Crédits",
        "icon": config.icon.credit
    });
    dataFormat.frames.push(
        {
            "text": credits,
            "icon": config.icon.credit
        }
    )
}

function getGpaScreen(gpa, dataFormat) {
    dataFormat.frames.push({
        "text": "G.P.A",
        "icon": config.icon.gpa
    })
    dataFormat.frames.push(
        {
            "text": gpa,
            "icon": config.icon.gpa
        });
}

function getNetsoulScreen(netsoul, hoursWeek, dataFormat) {

    let chartData = [];

    for (let i of netsoul.slice(-10))
        chartData.push(i[i.length - 1]);

    dataFormat.frames.push({
        "text": "NETSOUL",
        "icon": config.icon.netsoul
    });
    dataFormat.frames.push(
        {
            "text": `${hoursWeek} h`,
            "icon": config.icon.netsoul
        }
    );
    dataFormat.frames.push(
        {
            "chartData": chartData
        }
    );
}


exports.getData = (req, res) => {
    const params = req.query;
    const dataFormat = {
        "frames": [
            {
                "text": "Epitech",
                "icon": 46869
            }
        ]
    };
    if (!params.hasOwnProperty('cookie') || !params.hasOwnProperty('show_data')) {
        dataFormat.frames.push({
            "text": "Bad Cookie",
            "icon": config.icon.error
        });
        return res.status(200).json(dataFormat);
    }

    const showData = req.query.show_data.split(",");
    api.getIntraData(params.cookie).then(result => {
        if (showData.includes("credits"))
            getCreditsScreen(result.profil.credits, dataFormat);
        if (showData.includes("gpa"))
            getGpaScreen(result.profil.gpa[0].gpa, dataFormat);
        if (showData.includes("netsoul"))
            getNetsoulScreen(result.netsoul, result.profil.nsstat.active, dataFormat);
        return res.status(200).json(dataFormat);
    }).catch(err => {
        console.error(err);
        dataFormat.frames.push({
            "text": "Bad Cookie",
            "icon": config.icon.error
        });
        return res.status(200).json(dataFormat);
    });
}