import express from "express"
import { processUserPromptPostHandler, processUserPromptStreamPostHandler} from "../../internal/app/api/chat"

const router = express.Router()


router.post('/', processUserPromptPostHandler)

router.post("/stream", processUserPromptStreamPostHandler)

export const promptRouter  : [string, express.Router] = ['/v1/prompt', router];