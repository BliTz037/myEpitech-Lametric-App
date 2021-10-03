const config = require('../config.json');

/*
params
&cookie=abcdefg1234567
&show_data=credits,netsoul,gpa,agenda
*/
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
    if (!params.hasOwnProperty('cookie') || !params.hasOwnProperty('show_data'))
        return res.status(400).json({msg: "Missing parameter"});

    const showData = req.query.show_data.split(",")
    console.log(params);
    console.log(showData);
    for (const data of showData) {
        
    }
    return res.status(200).json(dataFormat)
}