import  'reflect-metadata';
import {ServiceType} from "./types";

//TODO: pass parameters; resolve singletons

export default class Injector {
    public static resolve<T>(target: ServiceType<T>): T {
        const constructorsSignaturesMetadata = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = constructorsSignaturesMetadata.map((signature: ServiceType<T>) => Injector.resolve<T>(signature));
        return new target(...injections);
    }
}
