import * as React from 'react';
import classnames from 'classnames';
import './GroupInput.less';
import { CharactersRemaining } from '@components';

export default class GroupInput extends React.Component<IGroupInputProps, {}> {
  dom: HTMLInputElement;

  constructor(props: IGroupInputProps) {
    super(props);
  }

  focus() {
    if (this.dom && !this.props.component) {
      this.dom.focus();
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { onChange = () => { } } = this.props;
    const value = e.target.value;
    onChange(value);
  }

  render() {
    const { formGroupClassName, labelClassName, inputClassName, label, value, required,
      component, error, showCharactersRemaining, maxLength, textareaStyle = { background: '#fff' }, errorText } = this.props;

    const renderElement = () => {
      return <React.Fragment>
        {(component &&
          React.cloneElement(component, {
            ...this.props,
            onChange: this.onChange,
            ref: (dom: HTMLInputElement) => { this.dom = dom; }
          })) ||
          <React.Fragment>
            <input
              type="text"
              className={classnames("form-control", inputClassName)}
              ref={dom => { this.dom = dom; }}
              {...this.props}
              value={value}
              onChange={this.onChange}
            />
            <p style={{ color: 'red' }}>{errorText}</p>
          </React.Fragment>
        }
      </React.Fragment>;
    };

    return <div className={classnames("form-group", error && 'has-error', formGroupClassName)}>
      <label className={labelClassName}>{label} {required && '*'}</label>
      {
        showCharactersRemaining ?
          <div className="textarea position-relative" style={textareaStyle}>
            {renderElement()}
            <ul className="nav justify-content-end align-items-center tab-head-fixed m-0">
              <li className="nav-item">
                <CharactersRemaining value={value} maxLength={maxLength} />
              </li>
            </ul>
          </div> :
          renderElement()
      }
    </div>;
  }
}

interface ICloneElementComponent extends IGroupBase {
  ref?: (dom: HTMLInputElement) => void;
  onChange?: (e?: React.ChangeEvent<HTMLInputElement>) => void;
}

interface IGroupInputProps extends IGroupBase {
  value: string;
  errorText?: string;
  onChange?: (value?: string) => void;
}

interface IGroupBase {
  formGroupClassName?: string;
  labelClassName?: string;
  inputClassName?: string;
  label?: string;
  required?: boolean;
  component?: React.ReactElement<ICloneElementComponent>;
  error?: boolean;
  showCharactersRemaining?: boolean;
  maxLength?: number;
  textareaStyle?: Object;
}