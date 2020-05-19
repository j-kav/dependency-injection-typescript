import {Service, Module} from "./di/decorators"
import Injector from "./di/injector";

interface HttpClient {
    post(url: string, data: unknown): Promise<unknown>

    get(url: string, data: unknown): Promise<unknown>
}

@Service()
class HttpClient implements HttpClient {

    constructor(private baseUrl: string) {
    }

    async get(url: string, data: unknown): Promise<unknown> {
        throw new Error('Not implemented')
    }

    async post(url: string, data: unknown): Promise<unknown> {
        console.log(`Sending to server: ${JSON.stringify(data)}:`)
        return undefined
    }

}

@Service()
class ApiService {

    constructor(protected httpClient: HttpClient) {
    }

    async sendErrorMessage(message: string) {
        await this.httpClient.post('collect/logging/error', message)
    }
}

interface LoggerInterface {
    error(message: string, ...args: unknown[]): void

    warn(message: string, ...args: unknown[]): void
}

@Service()
class Logger implements LoggerInterface {
    constructor(protected apiService: ApiService) {
    }

    warn(message: string, ...args: unknown[]): void {
        throw new Error('Not implemented')
    }

    error(message: string, ...args: unknown[]): void {
        this.apiService.sendErrorMessage(message)
            .then(() => {
            })
            .catch(console.error)
    }
}

@Module()
class Entry {

    constructor(protected logger: Logger) {
    }

    main() {
        try {
            throw new Error('demonstrative error message')
        } catch (error) {
            this.logger.error(error.message)
        }
    }
}

const entry = Injector.resolve<Entry>(Entry)
entry.main()
