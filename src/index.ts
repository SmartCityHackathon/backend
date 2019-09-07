import { app } from './app';
import { PORT } from './config';
import { logger } from './utils/logger';

app.listen(PORT, () => {
    console.log(`█████████████████████████████████████████████████████████████████████`);
    logger.info(`API is running at http://localhost:${PORT}`);
});
