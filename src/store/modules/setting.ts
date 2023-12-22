// 小仓库: layout相关配置
import { defineStore } from "pinia";

const useLayOutSettingStore = defineStore("SettingStore", {
  state: () => {
    return {
      fold: false,
      // 刷新
      refsh: false,
    };
  },
});

export default useLayOutSettingStore;
