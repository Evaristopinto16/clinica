const InputPrompt = require("../model/input-model")
const openai = require("../config/openai")


module.exports = {

    async sendText(req, res){

        const OpenAIApi = openai.configuration()
        const inputModel = new InputPrompt(req.body)

        try {
            const response = await OpenAIApi.createCompletion(
                openai.textCompletion(inputModel)
            )
            const answer = response.data.choices[0].text
            
            return res.render("pagina/resposta",{resposta: answer }); 
            
            
            
            
            /*res.status(200).json({
                sucess: true,
                data: response.data.choices[0].text
            })*/
        } catch (error) {
            return res.status(400).json({
                sucess: false,
                error: error.response ? error.response.data: "tem erro no servidor"
            })
        }   
    }
}