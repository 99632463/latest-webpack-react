import React from 'react';
import { inject, observer } from 'mobx-react';
import { HomeBusiness, IHomeBusiness } from '@business/home';

@inject(HomeBusiness)
@observer
export default class Home extends React.Component<IHomeProps, IHomeState> {
  constructor(props: IHomeProps) {
    super(props);
  }

  render() {
    return <div>

    </div>;
  }
}

interface IHomeProps extends Partial<IHomeBusiness> {
}

interface IHomeState {

}