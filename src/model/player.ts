import { BaseballResult, BasketballResult, FootballResult, TableTennisResult, TennisResult, VolleyballResult } from "./sport";

export class ReqPlayerBalance {
  playerSessionKey = "";
}

export class RespPlayerBalance {
  balance = 0;
}

export class ReqPlayerBet {
  playerSessionKey = "";
  time = 0; // 当前时间戳（毫秒），允许前后2分钟误差
  sign = ""; // 签名 md5(OperatorId + 凭证密钥 + time)
  transactionId = ""; // 交易序號
  amount = 0; // 總投注金額
  bets = new Array<BetInfo>();
  oddsMode = 1; // 賠率處理模式 (1=自动接受更好的赔率, 2=自动接受任何赔率, 3=不接受任何赔率变动)
}

export class BetInfo {
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
  matchId = ""; // 賽事ID
  bet = 0; // 投注金額
  eoIor = 0; // 包含本金的实际赔率值
  outcomeId = ""; // 投注項id
  sourceId = ""; // 來源的原始 ID
}

export class ReqBetHistory {
  playerSessionKey = "";
  startTime = 1714000000000; // 查詢起始時間(時間戳)
  endTime = 1770000000000; // 查詢結束時間(時間戳)
  pageIndex = 1; // 頁碼
  pageSize = 10; // 每頁數量
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  betStatus = -1; // 注单状态(-1=全部, 0=未结算, 1=结算, 2=取消)
}

export class RespBetHistory {
  total = 0; // 總筆數
  count = 0; // 顯示筆數
  datas = new Array<BetHistoryInfo>();
}

export class BetHistoryInfo {
  betId = ""; // 注单号
  productId = ""; // 產品Id (livesports、fb)
  oddsType = 1; // 盤口類型(1=香港盤, 2=歐洲盤)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  bet = 0; // 投注金額
  odds = 0; // 赔率值
  eoIor = 0; // 包含本金的实际赔率值
  win = 0; // 派彩金額
  winLose = 0; // 輸贏金額
  betTime = 0; // 投注時間
  settlementTime = 0; // 結算時間
  details = new Array<BetHistoryDetailInfo>(); // 詳情
  betResult = 0; // 投注結果(0=未結算, 1=贏一半, 2=贏, 3=輸一半, 4=輸, 5=和, 6=取消)
  isCombo = false; // 是否串關
}

export class BetHistoryDetailInfo {
  leagueName = ""; // 聯賽名稱
  matchName = ""; // 賽事名稱
  marketName = ""; // 玩法名稱
  outcomeName = ""; // 投注項名稱
  footballData = new FootballResult; // 足球數據
  basketballData = new BasketballResult(); // 籃球數據
  tennisData = new TennisResult(); // 網球數據
  volleyballData = new VolleyballResult(); // 排球數據
  tabletennisData = new TableTennisResult(); // 乒乓球數據
  baseballData = new BaseballResult(); // 棒球數據
}

export class ReqPlayerVerifyBet {
  playerSessionKey = "";
  bets = new Array<VerifyBetInfo>();
}

export class VerifyBetInfo {
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
  matchId = ""; // 賽事ID
  outcomeId = ""; // 投注項id
  sourceId = ""; // 來源的原始 ID
}

export class RespPlayerVerifyBet {
  datas = new Array<SingleBetInfo>();
}

export class ResultBetInfo {
  sourceId = ""; // 來源的原始 ID
  ior = 0; // 不含本金的纯赔率
  eoIor = 0; // 包含本金的实际赔率值
  sourceRatio = ""; // 來源的原始比率
  sourceStrong = ""; // 來源的原始讓分方
  isSupportCombo = false; // 是否支持串關
  isMarketOpen = true; // 是否開放盤口
}

export class SingleBetInfo {
  sourceId = ""; // 來源的原始 ID
  ior = 0; // 不含本金的纯赔率
  eoIor = 0; // 包含本金的实际赔率值
  sourceRatio = ""; // 來源的原始比率
  sourceStrong = ""; // 來源的原始讓分方
  isSupportCombo = false; // 是否支持串關
  isMarketOpen = true; // 是否開放盤口
  minBet = 0; // 最小投注額
  maxBet = 0; // 最大投注額
}

export class ReqPlayerComboBet {
  playerSessionKey = ""; // 玩家令牌
  time = 0; // 当前时间戳（毫秒），允许前后2分钟误差
  sign = ""; // 签名 md5(OperatorId + 凭证密钥 + time)
  transactionId = ""; // 交易流水号
  productId = ""; // 產品Id (livesports、bf)
  sportType = 1; // 体育类型（1=足球，2=篮球，3=网球，4=排球，5=乒乓球，6=棒球，7=其他）
  oddsType = 1; // 盘口类型（1=香港盘，2=欧洲盘）
  amount = 0; // 总投注金额
  series = 0; // 串关选项个数
  seriesOdds = 0; // 串关对应的赔率
  comboBets = new Array<ComboBetInfo>();
  oddsMode = 1; // 賠率處理模式 (1=自动接受更好的赔率, 2=自动接受任何赔率, 3=不接受任何赔率变动)
}

export class ComboBetInfo {
  matchId = ""; // 賽事ID
  outcomeId = ""; // 投注項id
  sourceId = ""; // 來源的原始 ID
  eoIor = 0; // 包含本金的实际赔率值
}

export class ReqPlayerVerifyCombo {
  playerSessionKey = "";
  comboBets = new Array<VerifyBetInfo>();
}

export class RespPlayerVerifyCombo {
  series = 0; // 串关选项个数
  seriesOdds = 0; // 串关对应的赔率
  minBet = 0; // 最小投注額
  maxBet = 0; // 最大投注額
  datas = new Array<ResultBetInfo>();
}

export class ReqBetHistoryDetails {
  playerSessionKey = "";
  productId = ""; // 產品Id (liveSports、bf)
  betId = ""; // 注单号
}

export class RespBetHistoryDetails {
  betId = ""; // 注單號
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
  bet = 0; // 投注金額
  odds = 0; // 赔率值
  eoIor = 0; // 包含本金的实际赔率值
  betResult = 0; // 投注結果(0=未結算, 1=贏一半, 2=贏, 3=輸一半, 4=輸, 5=和, 6=取消)
  datas = new Array<BetDetailsDataInfo>();
}

export class BetDetailsDataInfo {
  odds = 0; // 赔率值
  eoIor = 0; // 包含本金的实际赔率值
  betResult = 0; // 投注結果(0=未結算, 1=贏一半, 2=贏, 3=輸一半, 4=輸, 5=和, 6=取消)
  leagueInfos = new Array<LangInfo>(); // 聯賽多語系資訊
  matchInfos = new Array<LangInfo>(); // 賽事多語系資訊
  marketInfos = new Array<LangInfo>(); // 玩法多語系資訊
  outcomeInfos = new Array<LangInfo>(); // 投注項多語系資訊
  footballData = new FootballResult; // 足球數據
}

export class LangInfo {
  lang = '';
  name = '';
}