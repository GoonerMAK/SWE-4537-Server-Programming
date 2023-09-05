const express = require("express");
const router = express.Router();
const fs = require("fs");
const bodyParser = require("body-parser");
const os = require("os");

router.use(express.json());
router.use(bodyParser.json());


router.get("/getRequest", (req,res)=>{
    res.send("<h1>This is a GET request!</h1>")
});


router.get('/', function (req, res) {
    res.send("<h1>Welcome to my Web Application!<h1>")
})


router.get("/data", (req, res) => {
    fs.readFile("data.json", "utf8", (err, data) => {
        if (err) {
            return res.status(500).send("Error reading data");
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseError) {
            res.status(500).send("Error parsing data");
        }
    });
});


router.put('/data', (req, res) => {
    const newData = req.body;

    fs.readFile("data.json", "utf8", (readError, existingData) => {
        if (readError) {
            return res.status(500).send("Error reading data");
        }

        try {
            const jsonData = JSON.parse(existingData);

            Object.assign(jsonData, newData);

            fs.writeFile("data.json", JSON.stringify(jsonData, null, 2), (writeError) => {
                if (writeError) {
                    return res.status(500).send("Error writing data");
                }

                res.send("Data updated successfully!");
            });
        } catch (parseError) {
            return res.status(500).send("Error parsing existing data");
        }
    });
})


router.post('/data', (req, res) => {
    const newData = req.body;

    fs.writeFile("data.json", JSON.stringify(newData, null, 2), (err) => {
        if (err) {
            res.status(500).send("Error updating data");
        } else {
            res.send("Data updated again successfully!");
        }
    });
});


router.delete('/data', (req, res) => {
    const filePath = "data.json";

    if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
            if (err) {
                res.status(500).send("Error deleting data file");
            } else {
                res.send("Data file deleted successfully!");
            }
        });
    } else {
        res.status(404).send("Data file not found");
    }
});


router.get("/os-info", (req, res) => {
    fs.readFile("os-data.json", "utf8", (readError, existingData) => {
        if (readError) {
            return res.status(500).send("Error reading data");
        }

        try {
            const jsonData = JSON.parse(existingData);

            jsonData.timestamp = new Date();
            jsonData.osInfo = {
                platform: os.platform(),
                release: os.release(),
                architecture: os.arch(),
                totalMemory: os.totalmem(),
                freeMemory: os.freemem(),
            };

            fs.writeFile("os-data.json", JSON.stringify(jsonData, null, 2), (writeError) => {
                if (writeError) {
                    return res.status(500).send("Error writing data");
                }

                res.send("OS data updated successfully! Go check the os-data.json file");
            });
        } catch (parseError) {
            return res.status(500).send("Error parsing existing data");
        }
    });
});


module.exports = router;