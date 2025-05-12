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

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');
        res.flushHeaders();

        let completeResponse = '';

        const handleChunk = (chunk: string) => {
            completeResponse += chunk;
            res.write(`data: ${JSON.stringify({ chunk })}\n\n`);
        };

        const handleError = (error: Error) => {
            console.error("Stream error:", error);
            res.write(`event: error\ndata: ${JSON.stringify({
                error: "Stream error",
                message: error.message
            })}\n\n`);
            res.end();
        };

        try {
            await processUserPromptStream(
                prompt,
                handleChunk,
                () => {} 
            );

            res.write(`event: complete\ndata: ${JSON.stringify({
                complete: true,
                response: completeResponse
            })}\n\n`);
            
        } catch (error) {
            handleError(error instanceof Error ? error : new Error(String(error)));
            return;
        }

        res.end();
      
    } catch (error) {
        console.error("Error processing prompt:", error);
        if (!res.headersSent) {
            return res.status(500).send({ 
                error: "Failed to process user prompt", 
                reason: error instanceof Error ? error.message : String(error)
            });
        }
        console.error("Error after headers were sent:", error);
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

