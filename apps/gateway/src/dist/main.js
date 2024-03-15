"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const APP_PORT = configService.get('APP_PORT') || 3000;
    const GLOBAL_PREFIX = 'api';
    app.setGlobalPrefix(GLOBAL_PREFIX);
    app.enableCors();
    app.enableShutdownHooks();
    process.on('SIGTERM', async () => {
        await app.close();
        process.exit(0);
    });
    await app.listen(APP_PORT);
}
bootstrap();
//# sourceMappingURL=main.js.map