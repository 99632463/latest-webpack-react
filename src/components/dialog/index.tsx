
import React from 'react';
import classnames from 'classnames';
import RCDialog from 'rc-dialog';
import { IPosition } from '@common/interface/base';

export default class Dialog extends React.Component<IDialogProps, {}> {
  constructor(props: IDialogProps) {
    super(props);
  }

  render() {
    const { visible, center = true, style, onClose, afterClose, mousePosition = null, destroyOnClose = true,
      title, iconClass, showClose = true, maskClosable = false, buttons, children } = this.props;

    return <RCDialog
      style={style}
      visible={visible}
      animation="zoom"
      maskAnimation="fade"
      onClose={onClose}
      afterClose={afterClose}
      mousePosition={mousePosition}
      destroyOnClose={destroyOnClose}
      maskClosable={maskClosable}
      wrapClassName={classnames({ center, dialog_show_close: showClose })}
    >
      {children}
    </RCDialog>;
  }
}

interface IDialogProps {
  visible?: boolean;
  center?: boolean;
  style?: Object;
  onClose?: (e: React.SyntheticEvent<HTMLDivElement>) => any;
  afterClose?: () => any;
  mousePosition?: IPosition;
  destroyOnClose?: boolean;
  title?: string;
  iconClass?: string;
  showClose?: boolean;
  maskClosable?: boolean;
  buttons?: React.ComponentClass[];
}