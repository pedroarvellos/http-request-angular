export class AppError {
    private status: number;
    private message: string;

    constructor(public originalError?: any, errorMessage?: string) {
        this.status = originalError && originalError.status;
        this.message = errorMessage;
    }

    get errorDescription() {
        return {
            status: this.status,
            message: this.message
        }
    }
}