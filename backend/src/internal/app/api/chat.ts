import { Request, Response } from "express"
import {  processUserPrompt, processUserPromptStream } from "../processOpenRouterPrompt"
import { isNullOrUndefined } from "../../../pkg/data-utils"
import { isEmpty } from "lodash"

export const processUserPromptStreamPostHandler = async (req: Request, res: Response) => {
    try {
        const { prompt } = req.body as { prompt: string };
        if (isNullOrUndefined(prompt) || typeof prompt !== "string" || isEmpty(prompt)) {
            return res.status(400).json({ error: "Prompt is a required string, and cannot be empty" });
        }

        if (req.query.stream === 'true') {
            res.setHeader('Content-Type', 'text/event-stream');
            res.setHeader('Cache-Control', 'no-cache');
            res.setHeader('Connection', 'keep-alive');
            res.flushHeaders();

            let completeResponse = '';

            await processUserPromptStream(
                prompt,
                (chunk) => {
                    // Send each chunk as an SSE event
                    res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
                    console.log(`Streaming chunk: ${chunk}`);
                    completeResponse += chunk;
                },
                (parsedResponse) => {
                }
            );

            try {
                const parsedResponse = JSON.parse(completeResponse);
                res.write(`data: ${JSON.stringify({ complete: true, response: parsedResponse })}\n\n`);
            } catch (e) {
                res.write(`data: ${JSON.stringify({ complete: true, response: completeResponse })}\n\n`);
            }

            res.end();
        } else {
            let completeResponse = '';
            
             await processUserPromptStream(
                prompt,
                (chunk) => {
                    console.log(`Chunk received: ${chunk}`);
                    completeResponse += chunk;
                },
                (parsedResponse) => {
                }
            );
            
            try {
                const parsedResponse = JSON.parse(completeResponse);
                return res.status(200).json(parsedResponse);
            } catch (e) {
                return res.status(200).send(completeResponse);
            }
        }
    } catch (error) {
        console.error("Error processing prompt:", error);
        return res.status(500).send({ 
            error: "Failed to process user prompt", 
            reason: error instanceof Error ? error.message : String(error)
        });
    }
};




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

