import { Component } from 'react';
import { observer, PropTypes } from 'mobx-react';
import styled from 'styled-components';
import { Tabs, Select, Divider, Tag } from 'antd';
import { get, keyBy, zip } from 'lodash';

const { TabPane } = Tabs;
const { Option } = Select;

const ResultWrapper = styled.div`
  flex: 7;
  min-width: 600px;
  padding: 0 20px;
  height: 100%;
  overflow: auto;
`;

const Text = styled.div`
  font-size: 20px;
  font-weight: 500;
`;

@observer
export default class Result extends Component {
  static propTypes = {
    dataStore: PropTypes.observableObject.isRequired,
  }

  state = {
    panes: [],
    activeKey: '',
    value: '',
  }

  handleChange = activeKey => this.setState({ activeKey })

  handleEdit = (targetKey, action) => {
    if (action === 'remove') {
      const panes = this.state.panes.slice();
      const index = panes.findIndex(pane => pane.title === targetKey);
      panes.splice(index, 1);
      this.setState({
        panes,
        activeKey: get(panes, [0, 'title'], ''),
      });
    }
  }

  handleSearch = value => this.setState({ value })

  handleSelect = (key) => {
    const { panes } = this.state;
    this.setState({ value: '' });
    if (panes.findIndex(pane => pane.title === key) > -1) {
      return;
    }
    this.setState({
      panes: [...panes, { title: key }],
      activeKey: key,
    });
  }

  handleClickInvalid = key => () => this.handleSelect(String(key))

  render() {
    const { dataStore } = this.props;
    const { panes, activeKey, value } = this.state;

    const { quests } = dataStore;
    const invalidQuests = quests.filter(quest => !quest.condition);

    const filteredOptions = quests.filter(quest =>
      [String(quest.game_id), (quest.wiki_id || '').toLowerCase()].some(str => str.includes(value.toLowerCase())));

    const keyedQuests = keyBy(quests, 'game_id');

    return (
      <ResultWrapper>
        <div>
          <div>
            任务总数：{quests.length}
          </div>
          <div>
            错误数量：{invalidQuests.length}
            {
              invalidQuests.map(quest => (
                <Tag
                  key={quest.game_id}
                  onClick={this.handleClickInvalid(quest.game_id)}
                >
                  {quest.wiki_id || quest.game_id}
                </Tag>
              ))
            }
          </div>
        </div>
        <div>
          输入任务 ID 或 WIKI ID 来定位任务：
          <Select
            style={{ width: 300 }}
            mode="combobox"
            value={value}
            onChange={this.handleSearch}
            onSelect={this.handleSelect}
            filterOption={false}
            defaultActiveFirstOption={false}
          >
            {
              filteredOptions.map(quest => (
                <Option key={quest.game_id} >{quest.game_id} {quest.wiki_id} - {quest.name}</Option>
              ))
            }
          </Select>
        </div>
        <Tabs
          hideAdd
          onChange={this.handleChange}
          activeKey={activeKey}
          type="editable-card"
          onEdit={this.handleEdit}
        >
          {
            panes.map(pane => (
              <TabPane tab={pane.title} key={pane.title}>
                <h2>
                  <Tag>{get(keyedQuests, [pane.title, 'wiki_id'])}</Tag>{get(keyedQuests, [pane.title, 'name'])}
                </h2>
                <Divider />
                <Text>
                  <Tag>说明</Tag>
                  {
                    get(keyedQuests, [pane.title, 'condition'], '解析失败')
                  }
                </Text>
                <Divider />
                <Text>
                  <Tag>原文</Tag>
                  {
                    get(keyedQuests, [pane.title, 'detail'])
                  }
                </Text>
                <Divider>结构解析</Divider>
                <div>
                  <Tag>基础奖励</Tag>
                  {
                    zip(
                      ['油 ', ' 弹 ', ' 钢 ', ' 铝 '],
                      ['reward_fuel', 'reward_ammo', 'reward_steel', 'reward_bauxite']
                      .map(name => get(keyedQuests, [pane.title, name], '解析失败')),
                    )
                  }
                </div>
                <Divider>原始数据</Divider>
                <pre>
                  <code>
                    {
                      JSON.stringify(keyedQuests[pane.title] || {}, null, 2)
                    }
                  </code>
                </pre>
              </TabPane>
            ))
          }
        </Tabs>
      </ResultWrapper>
    );
  }
}
