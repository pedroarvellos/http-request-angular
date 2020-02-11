import { ErrorHandler } from '@angular/core';
import { AppError } from './app-error';

export class AppErrorHandler implements ErrorHandler {
    handleError(err: AppError) {

        console.log(err);
    }
}