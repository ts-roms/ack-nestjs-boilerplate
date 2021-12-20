import {
    BadRequestException,
    Controller,
    Get,
    InternalServerErrorException
} from '@nestjs/common';
import { AuthBasicGuard } from 'src/auth/auth.decorator';
import { ENUM_STATUS_CODE_ERROR } from 'src/error/error.constant';
import { Response } from 'src/response/response.decorator';
@Controller('/test')
export class AppController {
    @Response('app.hello')
    @Get('/hello')
    async hello(): Promise<void> {
        return;
    }

    @Response('app.error')
    @Get('/error')
    async error(): Promise<void> {
        throw new BadRequestException({
            statusCode: ENUM_STATUS_CODE_ERROR.TEST_ERROR,
            message: 'app.error.default'
        });
    }

    @Response('app.errorData')
    @Get('/error-data')
    async errorData(): Promise<void> {
        throw new InternalServerErrorException({
            statusCode: ENUM_STATUS_CODE_ERROR.TEST_ERROR,
            message: 'app.testErrorData',
            errors: [
                {
                    message: 'app.testErrors',
                    property: 'test'
                }
            ]
        });
    }

    @Response('app.helloBasicToken')
    @AuthBasicGuard()
    @Get('/hello-basic')
    async helloBasicToken(): Promise<void> {
        return;
    }
}
