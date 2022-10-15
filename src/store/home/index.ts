import { observable, action, runInAction } from 'mobx';
import http, { Q } from '@http';

export default class HomeStore {
  @observable testData: any[] = [];

  @action
  async test() {
    const promise = this.api().test();
    const rawData = await promise;

    runInAction(() => {
      this.testData = rawData || [];
    });

    return promise;
  }

  api() {
    return {
      test: (): Promise<any> => {
        return Q(http.get(''));
      }
    };
  }
}