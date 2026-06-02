"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const swagger_1 = require("@nestjs/swagger");
const app_module_js_1 = require("./app.module.js");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_js_1.AppModule);
    app.setGlobalPrefix('api');
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        transform: true,
        forbidNonWhitelisted: true,
    }));
    app.enableCors({
        origin: process.env.CORS_ORIGIN ?? 'http://localhost:3000',
        credentials: true,
    });
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Fire Extinguisher Management API')
        .setDescription('API for managing fire extinguisher sales, expiry tracking, customer notifications, and police escalations.')
        .setVersion('1.0')
        .addTag('Customers')
        .addTag('Fire Extinguishers')
        .addTag('Notifications')
        .addTag('Escalations')
        .addTag('Compliance')
        .addTag('Dashboard')
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, swaggerConfig);
    swagger_1.SwaggerModule.setup('api/docs', app, document);
    const port = process.env.PORT ?? 3001;
    await app.listen(port);
    console.log(`API running on http://localhost:${port}`);
    console.log(`Swagger docs at http://localhost:${port}/api/docs`);
}
bootstrap();
//# sourceMappingURL=main.js.map