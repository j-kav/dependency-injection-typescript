
export interface ServiceType<T> {
    new(...args: any[]): T
}

export type GenericClassDecorator<T> = (target: T) => void;
