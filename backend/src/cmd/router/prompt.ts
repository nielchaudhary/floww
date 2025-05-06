import express from "express"
import { processUserPromptPostHandler } from "../../internal/app/api/chat"

const router = express.Router()

router.post("/", processUserPromptPostHandler)

export const promptRouter  : [string, express.Router] = ['/v1/prompt', router];