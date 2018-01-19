import { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import styled from 'styled-components';

const ResultWrapper = styled.div`
  flex-grow: 7;
  min-width: 600px;
  padding: 0 20px;
`;

/* eslint-disable */
@observer
export default class Result extends Component {
  static propTypes = {
    dataStore: PropTypes.observableObject.isRequired,
  }

  render() {
    const { dataStore } = this.props;

    const { quests } = dataStore;
    const validQuests = quests.filter(quest => quest.condition);

    console.log(quests);

    return (
      <ResultWrapper>
        <div>
          <div>
            任务总数：{quests.length}
          </div>
          <div>
            错误数量：{quests.length - validQuests.length}
          </div>
        </div>

      </ResultWrapper>
    );
  }
}
