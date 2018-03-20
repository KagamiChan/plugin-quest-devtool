import { Component } from 'react';
import styled from 'styled-components';
import { observer, PropTypes } from 'mobx-react';
import { Controlled } from 'react-codemirror2';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/selection/active-line';
import 'codemirror/addon/search/search';
import 'codemirror/addon/search/searchcursor';
import 'codemirror/addon/search/jump-to-line';
import 'codemirror/addon/dialog/dialog';

import 'antd/dist/antd.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import 'codemirror/addon/dialog/dialog.css';
import './app.css';

import Result from './result';
import Toolbar from './toolbar';

import jsonlint from './lib/jsonlint';

window.jsonlint = jsonlint;

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  padding: 20px;
`;

const Left = styled.div`
  flex: 9;
  width: 0;
  display: flex;
  flex-direction: column;
`;

const CodeMirror = styled(Controlled)`
  flex: 1;
  border: 1px solid #777;
  overflow: auto;
  .CodeMirror {
    height: 100%;
  }
`;

@observer
export default class App extends Component {
  static propTypes = {
    dataStore: PropTypes.observableObject.isRequired,
  }

  handleCodeChange = (editor, data, value) => {
    this.props.dataStore.update(value);
  }

  handleCodeMirrorMounted = (editor) => {
    editor.setOption('extraKeys', {
      Tab: () => editor.execCommand('insertSoftTab'),
    });
  }

  render() {
    const { dataStore } = this.props;
    return (
      <AppWrapper>
        <Left>
          <CodeMirror
            value={dataStore.data}
            options={{
              mode: 'application/json',
              lineNumbers: true,
              matchBrackets: true,
              lint: true,
              gutters: ['CodeMirror-lint-markers'],
              indentWithTabs: true,
              tabSize: 2,
              styleActiveLine: true,
            }}
            onBeforeChange={this.handleCodeChange}
            editorDidMount={this.handleCodeMirrorMounted}
          />
          <Toolbar dataStore={dataStore} />
        </Left>
        <Result dataStore={dataStore} />
      </AppWrapper>
    );
  }
}
