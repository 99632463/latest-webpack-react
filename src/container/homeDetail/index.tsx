import React from 'react';
import { inject, observer } from 'mobx-react';

@inject()
@observer
export default class HomeDetail extends React.Component<IHomeDetailProps, IHomeDetailState> {
  constructor(props: IHomeDetailProps) {
    super(props);
  }

  render() {
    return <div>HomeDetail</div>;
  }
}

interface IHomeDetailProps {

}

interface IHomeDetailState {

}