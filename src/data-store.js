import { observable, computed } from 'mobx';
import { map, isString } from 'lodash';
import { sprintf } from 'sprintf-js';

import zhCNLocale from './plugin-quest/assets/i18n/zh-CN.json';
import generateReqstr from './plugin-quest/reqstr.es';

const translate = (str, ...args) => {
  const found = zhCNLocale[str];
  if (!found) {
    return '';
  }
  if (isString(found)) {
    return sprintf(found, ...args);
  }
  return found;
};

const reqstr = generateReqstr(translate);

class DataStore {
  @observable data = ''

  @computed get quests() {
    try {
      const data = JSON.parse(this.data);
      return map(data, quest => ({
        ...quest,
        condition: reqstr(quest.requirements),
      }));
    } catch (e) {
      console.error(e); // eslint-disable-line no-console
      return [];
    }
  }

  update = (data) => {
    this.data = data;
  }
}

export default DataStore;
