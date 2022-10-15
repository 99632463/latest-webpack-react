import { configure } from 'mobx';
import HomeStore from './home';

configure({ enforceActions: 'observed' });
export class Store {
  homeStore: HomeStore;

  constructor() {
    this.homeStore = new HomeStore();
  }
}

export default new Store();