import React from 'react';
import Viewerjs from 'viewerjs';

export default class MultipleViewer extends React.Component<IMultipleViewerProps, IMultipleViewerState> {
  viewer: Viewerjs;
  viewerRef: HTMLDivElement;

  constructor(props: IMultipleViewerProps) {
    super(props);

    this.state = {
      attachmentList: []
    };
  }

  static getDerivedStateFromProps(nextProps: IMultipleViewerProps, prevState: IMultipleViewerState) {
    if (JSON.stringify(nextProps.attachmentList) !== JSON.stringify(prevState.attachmentList)) {
      return {
        attachmentList: nextProps.attachmentList
      };
    }

    return null;
  }

  componentDidUpdate(prevProps: IMultipleViewerProps, prevState: IMultipleViewerState) {
    const { attachmentList } = this.state;
    const { onViewer } = this.props;

    if (JSON.stringify(attachmentList) !== JSON.stringify(prevState.attachmentList)) {
      requestAnimationFrame(() => {
        const { options } = this.props;
        this.viewer && this.viewer.destroy();
        this.viewer = new window.Viewer(this.viewerRef, options);
        onViewer && onViewer(this.viewer);
      });
    }
  }

  render() {
    const { children, className } = this.props;

    return <div className={className} ref={ref => this.viewerRef = ref}>
      {children}
    </div>;
  }
}

interface IMultipleViewerProps {
  className?: string;
  attachmentList: IKeyValueMap[];
  options?: Viewerjs.Options;
  onViewer?: (viewer: Viewerjs) => Viewerjs;
}

interface IMultipleViewerState {
  attachmentList: IKeyValueMap[];
}