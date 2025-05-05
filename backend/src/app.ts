import express from "express";
import cors from "cors";
import { Logger } from "./internal/app/logger";

const app = express();
const logger = new Logger('server');
app.use(express.json());

app.use(cors());

app.listen(8090, () => {
    logger.info('FLOW SERVICES LIVE ON PORT 8090!!!');
});


