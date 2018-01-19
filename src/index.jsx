import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import DataStore from './data-store';
import App from './app';

const dataStore = new DataStore();

const root = document.getElementById('root');
const load = () => render(
  (
    <AppContainer>
      <App dataStore={dataStore} />
    </AppContainer>
  ), root,
);

// This is needed for Hot Module Replacement
if (module.hot) {
  module.hot.accept('./app', load);
}

load();
