import { Injector } from '@angular/core';

export class MasterInjector {
  private static injector: Injector;

  static setInjector(injector: Injector) {
    MasterInjector.injector = injector;
  }

  static getInjector(): Injector {

    return MasterInjector.injector;

  }
}
