import { Component } from 'react';
import styled from 'styled-components';
import { observer, PropTypes } from 'mobx-react';
import { UnControlled } from 'react-codemirror2';

import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/edit/matchbrackets';
import 'codemirror/addon/lint/lint';
import 'codemirror/addon/lint/json-lint';
import 'codemirror/addon/selection/active-line';

import 'antd/dist/antd.css';
import 'codemirror/lib/codemirror.css';
import 'codemirror/addon/lint/lint.css';
import './app.css';

import Result from './result';

import jsonlint from './lib/jsonlint';

window.jsonlint = jsonlint;

const AppWrapper = styled.div`
  height: 100%;
  display: flex;
  padding: 20px;
`;

const CodeMirror = styled(UnControlled)`
  flex-grow: 9;
  border: 1px solid #777;
  height: 100%;
  overflow: hidden;
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
        <CodeMirror
          value=""
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
          onChange={this.handleCodeChange}
          editorDidMount={this.handleCodeMirrorMounted}
        />
        <Result dataStore={dataStore} />
      </AppWrapper>
    );
  }
}
