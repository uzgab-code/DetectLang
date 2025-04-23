import express from "express";
import bodyParser from "body-parser";
import axios from "axios";

const app = express();
const port = 8080;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.render("home.ejs")
})

app.get("/detect", async (req, res) => {
    try {
        const text = ""
        const apiKey = "<YOUR_API-KEY>"
        const response = await axios.get(`https://ws.detectlanguage.com/0.2/detect?q=${text}%C3%B1or&key=${apiKey}`);
        const result = response.data
        res.render("detect.ejs", {
            data: "",
            result: result
        })
    } catch (error) {
        res.render("detect.ejs", {
            data: "",
            result: error.message
        })
    }
})

app.post("/response", async (req, res) => {
    try {
        const yourInput = req.body.userText
        const text = yourInput.replace(/[^a-zA-Z ]/g, "")
        const apiKey = "<YOUR_API-KEY>"
        const response = await axios.get(`https://ws.detectlanguage.com/0.2/detect?q=${text}%C3%B1or&key=${apiKey}`);
        const result = response.data
        res.render("detect.ejs", {
            data: req.body.userText,
            result: result
        })
    } catch (error) {
        res.render("detect.ejs", {
            data: "",
            result: error.message
        })
    }
})

app.get("/about", (req, res) => {
    res.render("about.ejs")
})

app.listen(port, () => {
    console.log(`Listening on port ${port}`)
})
