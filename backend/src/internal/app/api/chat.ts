import { Request, Response } from "express"
import { processUserPrompt } from "../processOpenRouterPrompt"
import { isNullOrUndefined } from "../../../pkg/data-utils"
import { isEmpty } from "lodash"

export const processUserPromptPostHandler = async (req: Request, res: Response) => {
    try{
        const { prompt } = req.body as { prompt: string }
        if(isNullOrUndefined(prompt) || typeof prompt !== "string" || isEmpty(prompt)) {
            res.status(400).json({ error: "Prompt is a required string, and cannot be empty" })
            return
        }
        const response = await processUserPrompt(prompt)
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send({ error: "Failed to process user prompt", reason: (error as Error).message })
    }
}

