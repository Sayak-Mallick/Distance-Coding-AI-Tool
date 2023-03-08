const express = require('express');
const cors = require("cors");
const OPENAI_API_KEY = "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"
const  app = express();
const { Configuration, OpenAIApi } = require("openai");
const {response} = require("express");
const configuration = new Configuration({
    // organization: "org-AgqaPMzIoLhBilPoWlksHlvr",
    apiKey: OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.json({
        message: "Greetings from Distance Coding",
    })
})

app.post("/chat", (req,res) => {
    const question = req.body.question;
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: question,
        max_tokens: 4000,
        temperature: 0,
    }).then((response) => {
        console.log({response});
        return response?.data?.choices?.[0]?.text;
    }).then((answer= "") => {
        console.log({ answer })
        const array = answer?.split("\n").filter((value) => value).map((value) => value.trim());
        return array;
    }).then((answer) => {
        res.json({
            answer: answer,
            prompt: question,
        });
    });

    // console.log({question});

});

app.listen(3080, () => {
    console.log(`The Server is listening on http://localhost:3080`);
});