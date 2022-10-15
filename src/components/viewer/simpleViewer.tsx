import React from 'react';
import Viewerjs from 'viewerjs';

export default class SimpleViewer extends React.Component<ISimpleViewerProps, ISimpleViewerState> {
  viewer: Viewerjs;
  viewerRef: HTMLDivElement;

  constructor(props: ISimpleViewerProps) {
    super(props);
  }

  componentDidMount() {
    const { options = {} } = this.props;

    this.viewer = new window.Viewer(this.viewerRef, options);
  }

  render() {
    const { children, className } = this.props;

    return <div className={className} ref={ref => this.viewerRef = ref}>
      {children}
    </div>;
  }
}

interface ISimpleViewerProps {
  className?: string;
  options?: IKeyValueMap;
}

interface ISimpleViewerState {

}