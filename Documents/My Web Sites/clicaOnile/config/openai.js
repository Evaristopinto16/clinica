const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()

module.exports = class Openai{

    static configuration(){
        const configuration = new Configuration({
            apiKey: process.env.OPENAI_API_KEY,
          });
          return new OpenAIApi(configuration)
    }

    static textCompletion({prompt}){
        return {
            model: "text-davinci-003",
            prompt: `${prompt},mais informações, e conselhos adequados ao tratamento e medição a seguir, quais medicamentos tenho que tomar, modo tratamentos e prevenção`,
            temperature: 0.7,
            max_tokens: 3500,
            top_p: 1,
            frequency_penalty: 0.5,
            presence_penalty: 0,
        }
    }
}
