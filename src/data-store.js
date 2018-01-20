import { observable, computed } from 'mobx';
import { map } from 'lodash';
import I18n from 'i18n-2';

import zhCNLocale from './plugin-quest/assets/i18n/zh-CN.json';
import generateReqstr from './plugin-quest/reqstr.es';

const i18n = new I18n({
  locales: {
    'zh-CN': zhCNLocale,
  },
  defaultLocale: 'zh-CN',
  devMode: false,
});

const translate = i18n.__.bind(i18n); // eslint-disable-line

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
