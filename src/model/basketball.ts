import { SideScore } from "./sport";

export class ReqBasketballAnalysis {
  productId = ""; // 产品Id (dcr)
  matchId = ""; // 赛事Id
  lang = "zh_cn"; // 语言 (zh_cn=简中, en=英文)
}

export class RespBasketballAnalysis {
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  history = new BasketballHistory(); // 历史交锋
  future = new BasketballHistory(); // 未来赛程
}

export class BasketballHistory {
  vs = new Array<BasketballMatchInfo>(); // 历史交锋
  vsStats = new BasketballMatchResultStats(); // 历史交锋统计
  home = new Array<BasketballMatchInfo>(); // 主队近期战绩
  homeStats = new BasketballMatchResultStats(); // 主队近期战绩统计
  away = new Array<BasketballMatchInfo>(); // 客队近期战绩
  awayStats = new BasketballMatchResultStats(); // 客队近期战绩统计
}

export class BasketballMatchInfo {
  namiMatchId = ""; // nami赛事Id
  namiHomeTeamId = ""; // NAMI主队Id
  namiAwayTeamId = ""; // NAMI客队Id
  homeTeamName = ""; // 主队名称
  awayTeamName = ""; // 客队名称
  statusId = 0; // 比赛状态 0:比赛异常, 1:未开赛, 2:第一节, 3:第一节完, 4:第二节, 5:第二节完, 6:第三节, 7:第三节完, 8:第四节, 9:加时, 10:完场, 11:中断, 12:取消, 13:延期, 14:腰斩, 15:待定
  matchTime = 0; // 比赛时间
  score = new SideScore();
  result = 0; // 比赛结果 (1=赢, 2=输, 3=平)
}

export class BasketballMatchResultStats {
  totalMatches = 0; // 总赛事数
  win = 0; // 胜场数
  lose = 0; // 负场数
  draw = 0; // 平局数
  odd = 0; // 单数
  even = 0; // 双数
}

export class ReqBasketballLive {
  productId = ""; // 产品Id (dcr)
  matchId = ""; // 赛事Id
  lang = "zh_cn"; // 语言 (zh_cn=简中, en=英文)
}

export class RespBasketballLive {
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  stats = new BasketballStatsInfo(); // 统计
  shootPoint = new Array<BasketballShotPoint>(); // 投篮点数据
  tlive = new Array<BasketballTliveInfo>(); // 文字直播
  liveScore = new BasketballLiveScore(); // 比分
}

export class BasketballStatsInfo {
  threePointGoals = new SideScore(); // 3分球进球数
  twoPointGoals = new SideScore(); // 2分球进球数
  freeThrowGoals = new SideScore(); // 罚球进球数
  timeoutsRemainingInPeriod = new SideScore(); // 小节剩余暂停数
  foulsInPeriod = new SideScore(); // 小节犯规数
  freeThrowPercentage = new SideScore(); // 罚球命中率
  totalTimeouts = new SideScore(); // 总暂停数
}

export class BasketballShotPoint {
  team = 0; // 所属队伍，1.主队、2.客队
  shooterId = 0; // 投篮球员id
  assistId = 0; // 助攻球员id
  isMadeRaw = 0; // 是否命中，1.是、0.否
  points = 0; // 投篮动作的分值
  x = 0; // x坐标，最大50
  y = 0; // y坐标，最大81（半场40.5）
  period = 0; // 小节数
  remainingTime = ""; // 小节剩余时间
}

export class BasketballTliveInfo {
  period = 0; // 节数
  remainingTime = ""; // 小节剩余时间
  description = ""; // 说明
  position = 0; // 主客队（0-中立，1-主队，2-客队）
  homeScore = 0;
  awayScore = 0;
  score = ""; // 比分
}

export class BasketballLiveScore {
  matchId = 0; // 比赛id
  status = 0; // 比赛状态
  periodRemaining = 0; // 小节剩余时间(秒)
  home = new BasketballPeriodScores(); // 主队每节分数
  away = new BasketballPeriodScores(); // 客队每节分数
}

export class BasketballPeriodScores {
  q1 = 0;
  q2 = 0;
  q3 = 0;
  q4 = 0;
  ot = 0;
}

export class ReqBasketballStatistics {
  productId = ""; // 产品Id (dcr)
  matchId = ""; // 赛事Id
  lang = "zh_cn"; // 语言 (zh_cn=简中, en=英文)
}

export class RespBasketballStatistics {
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  playerStats = new BasketballPlayerStats(); // 球员统计
  teamStats = new BasketballTeamStats(); // 球隊統計
}

export class BasketballPlayerStats {
  home = new Array<BasketballPlayerItem>(); // 主队球员列表
  away = new Array<BasketballPlayerItem>(); // 客队球员列表
}

export class BasketballTeamStats {
  home = new BasketballTeamStatsSide(); // 主队每节分数
  away = new BasketballTeamStatsSide(); // 客队每节分数
}

export class BasketballPlayerItem {
  playerId = 0; // 球员Id
  name = ""; // 名称
  jerseyNo = ""; // 球衣号
  duration = ""; // 在场持续时间
  points = 0; // 得分
  rebounds = 0; // 总篮板
  assists = 0; // 助攻
  fieldGoals = ""; // 投篮（命中-出手）
  threePointers = ""; // 三分（命中-出手）
  freeThrows = ""; // 罚球（命中-出手）
  offensiveRebounds = 0; // 前场篮板
  defensiveRebounds = 0; // 后场篮板
  steals = 0; // 抢断
  blocks = 0; // 盖帽
  turnovers = 0; // 失误
  fouls = 0; // 犯规
}

export class BasketballTeamStatsSide {
  score = 0; // 得分
  rebounds = 0; // 篮板
  assists = 0; // 助攻
  blocks = 0; // 盖帽
  steals = 0; // 抢断
  turnovers = 0; // 失误
}