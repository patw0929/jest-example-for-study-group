import React, { Component } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash.debounce';
import styles from './Timer.scss';

export default class Timer extends Component {
  static propTypes = {
    load: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = {
      now: new Date().toString(),
    };
  }

  refresh = debounce(() => {
    this.setState({
      now: new Date().toString(),
    });

    setTimeout(() => {
      this.props.load();
    }, 500);
  }, 500);

  render() {
    return (
      <div>
        <span>資料最後更新時間：{this.state.now}</span>
        <a className={styles.refresh} onClick={this.refresh}>更新</a>
      </div>
    );
  }
}
