import React from 'react';
import moment from 'moment';
import DatePicker from 'rc-calendar/lib/Picker';
import Calendar from 'rc-calendar';
import 'rc-calendar/assets';
import { dateTimeText } from '@common/utils/format';

export default class Picker extends React.Component<ICanlandarProps, {}> {
  constructor(props: ICanlandarProps) {
    super(props);
  }

  getInputValue = (value: any) => {
    const { defaultValue } = this.props;

    if (defaultValue) {
      return dateTimeText(defaultValue, true) || '';
    }

    return dateTimeText(value, true) || '';
  }

  render() {
    const { className, style, animation, showToday, onChange, defaultValue, useDefaultBirth, zIndex } = this.props;
    const calendar = (<Calendar
      defaultValue={defaultValue || (useDefaultBirth ? moment('1950-01-01') : moment())}
      style={style}
      showToday={showToday}
    />);

    return (<DatePicker
      animation={animation || 'slide-up'}
      style={{ zIndex: zIndex || 0 }}
      calendar={calendar}
      value={defaultValue}
      onChange={(item: IKeyValueMap) => {
        const time = dateTimeText(item && item._d, true);
        onChange(time, item);
      }}
    >
      {
        ({ value }: any) => {
          return (
            <span>
              <input
                className={className}
                value={this.getInputValue(value)}
              />
            </span>
          );
        }
      }
    </DatePicker>);
  }
}

interface ICanlandarProps {
  defaultValue?: moment.Moment;
  showTime?: string;
  className?: string;
  style?: IKeyValueMap;
  showToday?: boolean;
  animation?: string;
  onChange?: (value: string, item: IKeyValueMap) => void;
  useDefaultBirth?: boolean;
  zIndex?: number;
}
