import i18n from "@/lang";
import router from "@/router";
import { useLangStore } from "@/store/module/lang";
import { useUserStore } from "@/store/module/user";
import axios, { AxiosError } from "axios";
import dayjs from "dayjs";
import { md5 } from "js-md5";
import { createDiscreteApi } from "naive-ui";


// API錯誤訊息處理
export const errorHandling = (err: AxiosError) => {

  // 脱离上下文的 API；因 useMessage 方法只能在 setup 內使用，所以這邊另外建立對應的API
  const { message } = createDiscreteApi(['message']);
  if (err.response == null || err.response.status == null) {
    message.error('Error Message.');
  } else {
    const userStore = useUserStore();
    switch (err.response.status) {
      case 400: // 參數錯誤
        message.error(i18n.global.t('error_code.' + err.response.status));
        break;
      case 401: // Token 失效
        userStore.logout();
        message.error(i18n.global.t('error_code.401'));
        break;
      case 452: // 盤口已關閉
      case 453: // 當前賠率不相同
      case 454: // 餘額不足
      case 455: // 交易訂單號重複
      case 456: // 签名错误
      case 457: // 重复推荐
      case 458: // 最多可添加10个选项
      case 459: // 盘口不支持串关
      case 460: // 游戏商错误
      case 461: // 系统维护中
      case 462: // 上一筆投注尚在處理中
      case 463: // 投注金额超出该玩法限额
        message.error(i18n.global.t('error_code.' + err.response.status));
        break;
      default: // 系統錯誤
        message.error(i18n.global.t('error_code.500'));
        break;
    }
  }
};

// 取得日期區間
export const getDateRange = (value: string): [number, number] => {
  let tmpStart = 0;
  let tmpEnd = 0;

  switch (value) {
    case 'today':
      tmpStart = dayjs().startOf('day').valueOf();
      tmpEnd = dayjs().endOf('day').valueOf();
      break;
    case 'yesterday':
      tmpStart = dayjs().subtract(1, 'day').startOf('day').valueOf();
      tmpEnd = dayjs().subtract(1, 'day').endOf('day').valueOf();
      break;
    case 'currentWeek':
      const weekday = dayjs().day(); // 判斷是不是星期日
      const we = weekday === 0 ? -1 : 0;
      tmpStart = dayjs().add(we, 'week').startOf('week').add(1, 'day').valueOf();
      tmpEnd = dayjs().add(we, 'week').endOf('week').add(1, 'day').valueOf();
      break;
    case 'last7Days':
      tmpStart = dayjs().subtract(6, 'day').startOf('day').valueOf();
      tmpEnd = dayjs().endOf('day').valueOf();
      break;
    case 'last30Days':
      tmpStart = dayjs().subtract(29, 'day').startOf('day').valueOf();
      tmpEnd = dayjs().endOf('day').valueOf();
      break;
    case 'currentMonth':
      tmpStart = dayjs().startOf('month').valueOf();
      tmpEnd = dayjs().endOf('month').valueOf();
      break;
    case 'perviousMonth':
      tmpStart = dayjs().subtract(1, 'month').startOf('month').valueOf();
      tmpEnd = dayjs().subtract(1, 'month').endOf('month').valueOf();
      break;
  }

  return [tmpStart, tmpEnd];
};

// 數字千分位(小數兩位)
export const numberFormate = (number: number) => {
  const locale = i18n.global.locale.value;
  const map = new Map<string, string>([
    ['en', 'en-US'],
    ['zh_cn', 'zh-CN']
  ]);
  return number.toLocaleString(map.get(locale), { minimumFractionDigits: 2, maximumFractionDigits: 2 });
};

// 整數千分位
export const integerFormate = (number: number) => {
  const locale = i18n.global.locale.value;
  const map = new Map<string, string>([
    ['en', 'en-US'],
    ['zh_cn', 'zh-CN']
  ]);
  return number.toLocaleString(map.get(locale));
};

export const apiSrv = axios.create({
  baseURL: import.meta.env.VITE_SCS_API_URL
});

export const cryptoMd5Password = (pwd: string) => {
  return crypto.randomUUID() + md5(pwd) + crypto.randomUUID();
};

export const getLangText = (item: Array<any>, key: string, showFirst: any = null) => {
  const langStore = useLangStore();
  let x = '';
  item?.map((i) => {
    if (i.lang == langStore.current) {
      x = i[key];
    }
  });

  // 若沒有資料 是否顯示第一筆
  if (showFirst !== false) {
    if (x == '' && item?.length > 0) {
      x = item[0][key];
    }
  }

  return x;
};