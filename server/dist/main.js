"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const cookieParser = require("cookie-parser");
const body_parser_1 = require("body-parser");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.use((0, body_parser_1.json)({ limit: "5mb" }));
    app.useGlobalPipes(new common_1.ValidationPipe());
    app.enableCors();
    app.use(cookieParser());
    await app.listen(5000);
}
bootstrap();
//# sourceMappingURL=main.js.map