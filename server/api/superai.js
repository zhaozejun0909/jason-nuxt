
import { Configuration, OpenAIApi } from "openai"

const runtimeConfig = useRuntimeConfig()
const theKey = runtimeConfig.openaiKey
const configuration = new Configuration({
    apiKey: theKey, //process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration)

export default defineEventHandler(async (event) => {
    const body = await readBody(event)
    const reqWords = body.r
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-003',
            prompt: reqWords,
            temperature: 0.6,
        }, {
            timeout: 20000,
        })
        return completion.data
        // return completion.data.choices[0].text
    } catch (error) {
        // Consider adjusting the error handling logic for your use case
        if (error.response) {
            console.error(error.response.status, error.response.data)
            throw createError({
                statusCode: error.response.status,
                statusMessage: JSON.stringify(error.response.data),
            })
        } else {
            console.error(`Error with OpenAI API request: ${error.message}`)
            throw createError({
                statusCode: 500,
                statusMessage: 'An error occurred during your request.',
            })
        }
    }
    return {data: 'default'}
})
