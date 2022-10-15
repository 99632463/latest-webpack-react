import React, { CSSProperties } from 'react';
import { throttle } from 'lodash-es';

function WithAutoHeightTextArea({ name }: ITextAreaOption) {
  class WrapTextArea extends React.Component<IWrapTextAreaProps, IWrapTextAreaState> {
    textAreaRef: HTMLElement;

    constructor(props: IWrapTextAreaProps) {
      super(props);
      this.state = {
        value: null
      };
    }

    componentDidMount() {
      window.addEventListener('resize', () => {
        throttle(() => requestAnimationFrame(() => this.autoTextAreaHeight()), 300, { trailing: false })();
      });
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.autoTextAreaHeight);
    }

    static getDerivedStateFromProps(nextProps: IWrapTextAreaProps, prevState: IWrapTextAreaState) {
      if (nextProps.value !== prevState.value) {
        return {
          value: nextProps.value
        };
      }

      return null;
    }

    componentDidUpdate(prevProps: IWrapTextAreaProps, prevState: IWrapTextAreaState) {
      const { value } = this.state;

      if (value && value !== prevState.value) {
        this.autoTextAreaHeight();
      }
    }

    autoTextAreaHeight() {
      this.textAreaRef.style.height = 'auto';

      this.textAreaRef.scrollHeight > this.textAreaRef.offsetHeight ?
        this.textAreaRef.style.height = `${this.textAreaRef.scrollHeight}px` : null;
    }

    render() {
      const { style, onChange } = this.props;
      const textAreaStyle = { ...style, ...{ overflowY: 'hidden' } } as CSSProperties;

      return <textarea
        {...this.props}
        style={textAreaStyle}
        ref={ref => this.textAreaRef = ref}
        onChange={e => {
          onChange(e);
          this.autoTextAreaHeight();
        }}
      />;
    }
  }

  return WrapTextArea;
}

interface ITextAreaOption {
  name?: string;
}

interface IWrapTextAreaProps extends React.DetailedHTMLProps<React.TextareaHTMLAttributes<HTMLTextAreaElement>, HTMLTextAreaElement> { }

interface IWrapTextAreaState {
  value: string;
}

export default WithAutoHeightTextArea;