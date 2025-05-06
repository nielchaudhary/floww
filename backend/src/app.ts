import express from "express";
import cors from "cors";
import { Logger } from "./pkg/logger";
import { promptRouter } from "./cmd/router/prompt";
const app = express();
const logger = new Logger('server');

app.use(cors());
app.use(express.json());

app.use(promptRouter[0], promptRouter[1])

app.listen(8090, () => {
    logger.info('FLOW SERVICES LIVE ON PORT 8090!!!');
});


