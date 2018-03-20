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

  handleClean = () => {
    this.props.dataStore.update('');
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
      </ToolbarWrapper>
    );
  }
}
