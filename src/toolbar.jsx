import { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import styled from 'styled-components';
import { Button } from 'antd';

import questTemplate from './quest-template.json';

const ToolbarWrapper = styled.div`
  height: 50px;
  display: flex;
  align-items: center;
`;

@observer
export default class Toolbar extends Component {
  static propTypes = {
    dataStore: PropTypes.observableObject.isRequired,
  }

  state = {
    fetchLoading: false,
  }

  handleClean = () => {
    this.props.dataStore.update('');
  }

  handleFetchData = async () => {
    this.setState({ fetchLoading: true });
    try {
      const resp = await fetch('https://kcwikizh.github.io/kcdata/quest/poi.json');
      const content = await resp.text();
      this.props.dataStore.update(content);
    } catch (e) {
      console.warn(e, e.stack); // eslint-disable-line no-console
    } finally {
      this.setState({ fetchLoading: false });
    }
  }

  handleFormat = () => {
    const { data } = this.props.dataStore;
    if (!data) {
      return;
    }
    const formatted = JSON.stringify(JSON.parse(data), null, 2);
    this.props.dataStore.update(formatted);
  }

  handleLoadTemplate = () => {
    this.props.dataStore.update(JSON.stringify(questTemplate, null, 2));
  }

  render() {
    return (
      <ToolbarWrapper>
        <Button
          type="danger"
          icon="delete"
          onClick={this.handleClean}
        >
          清空数据
        </Button>
        <Button
          icon="download"
          disabled={!!this.props.dataStore.data}
          onClick={this.handleFetchData}
          loading={this.state.fetchLoading}
        >
          加载线上数据
        </Button>
        <Button
          disabled={!!this.props.dataStore.data}
          onClick={this.handleLoadTemplate}
        >
          加载任务模板
        </Button>
        <Button onClick={this.handleFormat}>格式化</Button>
      </ToolbarWrapper>
    );
  }
}
