import { IStoreContainer } from '@common/interface/base';

export const HomeBusiness = ({ store }: IStoreContainer): IHomeBusiness => {
  const { homeStore } = store;

  const propsConnect = {
    testData: homeStore.testData
  };

  const dispatchConnect = {
    test: () => homeStore.test()
  };

  return {
    ...propsConnect,
    ...dispatchConnect
  };
};

export interface IHomeBusiness {
  testData: any[];
  test: () => Promise<any>;
}