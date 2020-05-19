import {GenericClassDecorator, ServiceType} from "./types"

//TODO: implement singleton

export function Service<T>() : GenericClassDecorator<ServiceType<T>> {
    return (target: ServiceType<T>) => {}
}

export function Module(): ClassDecorator {
    return (target) => {}
}
