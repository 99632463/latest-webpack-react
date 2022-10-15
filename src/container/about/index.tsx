import React from 'react';
import { inject, observer } from 'mobx-react';

@inject()
@observer
export default class About extends React.Component<IAboutProps, IAboutState> {
  constructor(props: IAboutProps) {
    super(props);
  }

  render() {
    return <div>About</div>;
  }
}

interface IAboutProps {

}

interface IAboutState {

}