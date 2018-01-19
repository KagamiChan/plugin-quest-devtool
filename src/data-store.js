import { observable, computed } from 'mobx';
import { map, isString, get } from 'lodash';
import { vsprintf } from 'sprintf-js';

import zhCNLocale from './plugin-quest/assets/i18n/zh-CN.json';
import generateReqstr from './plugin-quest/reqstr.es';

const translate = (str, ...args) => {
  const found = get(zhCNLocale, str);
  if (isString(found)) {
    return vsprintf(found, args);
  }
  return str.includes('.') ? found : str;
};

const reqstr = generateReqstr(translate);

class DataStore {
  @observable data = ''

  @computed get quests() {
    try {
      const data = JSON.parse(this.data);
      return map(data, (quest) => {
        try {
          return {
            ...quest,
            condition: reqstr(quest.requirements),
          };
        } catch (e) {
          return quest;
        }
      });
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
