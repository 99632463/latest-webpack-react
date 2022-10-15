import React from 'react';
import classnames from 'classnames';


export default class Tabs extends React.Component<ITabsProps, ITabsState> {
  static Tab: typeof Tab;

  constructor(props: ITabsProps) {
    super(props);

    this.state = {
      selectedIndex: 0
    };
  }


  render() {
    const { children, toggleTab, tabHrefList, ulClassName } = this.props;
    return <React.Fragment>
      <ul className={classnames('nav nav-tabs rl-nav-tabs ', ulClassName)}>
        {React.Children.map(children, (Value, index) => {
          return <li className="nav-item">
            <a
              data-toggle="tab"
              href={tabHrefList[index] || 'javascript: void(0);'}
              onClick={() => {
                toggleTab && toggleTab(index);
                this.setState({ selectedIndex: index });
              }}
              className={classnames("nav-link", this.state.selectedIndex === index && "active")}
            >
              {Value.props.tab}
            </a>
          </li>;
        })}
      </ul>
      <div className="tab-content pt-4 pb-4">
        {React.Children.map(children, (child, index) => React.cloneElement(child, {
          style: { display: this.state.selectedIndex === index ? 'block' : 'none' }
        }))}
      </div>
    </React.Fragment>;
  }
}


class Tab extends React.Component<ISubTabProps> {
  render() {
    const { children, style = {} } = this.props;
    return <div style={style}>
      {children}
    </div>;
  }
}

Tabs.Tab = Tab;

interface ITabsProps {
  toggleTab?: (index: number) => void;
  children: any;
  tabHrefList?: string[];
  ulClassName?: string;
}

interface ITabsState {
  selectedIndex: number;
}

interface ISubTabProps {
  tab: string;
  style?: IKeyValueMap;
}