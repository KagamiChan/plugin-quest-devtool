import { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import styled from 'styled-components';
import { Button } from 'antd';

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
      </ToolbarWrapper>
    );
  }
}
