import { SideScore } from "./sport";

export class ReqFootballLineup {
  productId = ""; // 产品Id (dcr)
  matchId = ""; // 赛事Id
  lang = "zh_cn"; // 语言 (zh_cn=简中, en=英文)
}

export class RespFootballLineup {
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  homeFormation = ""; // 主队阵型
  awayFormation = ""; // 客队阵型
  homeStarting = new Array<FootballLineupPlayer>(); // 主队先发阵容
  awayStarting = new Array<FootballLineupPlayer>(); // 客队先发阵容
  homeSubstitutes = new Array<FootballLineupPlayer>(); // 主队替补阵容
  awaySubstitutes = new Array<FootballLineupPlayer>(); // 客队替补阵容
  hasLineupGraph = true; // 是否有阵容图
}

export class FootballLineupPlayer {
  playerId = ""; // 球员Id
  playerName = ""; // 球员名称
  playerAbbr = ""; // 球员简称
  playerLogo = ""; // 球员Logo
  shirtNumber = 0; // 球衣号
  position = ""; // 球员位置，F前锋、M中场、D后卫、G守门员、其他为未知
  isCaptain = true; // 是否队长
  x = 0; // 阵容x坐标，总共100
  y = 0; // 阵容y坐标，总共100
  rating = ""; // 评分，10为满分
}

export class ReqFootballLive {
  productId = ""; // 产品Id (dcr)
  matchId = ""; // 赛事Id
  lang = "zh_cn"; // 语言 (zh_cn=简中, en=英文)
}

export class RespFootballLive {
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  climate = new FootballClimateInfo(); // 天气
  stats = new FootballStatsInfo(); // 统计
  incidents = new Array<FootballIncidentInfo>(); // 比赛事件
  tlive = new Array<FootballTliveInfo>(); // 文字直播
}

export class FootballClimateInfo {
  weather = 0; // 天气id(1:局部有云, 2:多云, 3:局部有云/雨, 4:雪, 5:晴, 6:阴有雨/局部有雷暴, 7:阴, 8:薄雾, 9:阴有雨, 10:多云有雨, 11:多云有雨/局部有雷暴, 12:局部有云/雨和雷暴, 13:雾)
  pressure = ""; // 气压 (e.g. "761mmHg")
  temperature = ""; // 温度 (e.g. "22°C")
  wind = ""; // 风速 (e.g. "1.5m/s")
  humidity = ""; // 湿度 (e.g. "70%")
}

export class FootballStatsInfo {
  corner = new SideScore(); // 角球
  yellowCard = new SideScore(); // 黄牌
  redCard = new SideScore(); // 红牌
  shotOnTarget = new SideScore(); // 射正
  shotOffTarget = new SideScore(); // 射偏
  attack = new SideScore(); // 进攻次数
  dangerousAttack = new SideScore(); // 危险进攻
  possession = new SideScore(); // 控球率
}

export class FootballIncidentInfo {
  /**
   * 类型
   * 1:进球, 2:角球, 3:黄牌, 4:红牌, 5:越位, 6:任意球, 7:球门球, 8:点球, 9:换人, 10:比赛开始, 11:中场,
   * 12:结束, 13:半场比分, 15:两黄变红, 16:点球未进, 17:乌龙球, 18:助攻, 19:伤停补时, 21:射正, 22:射偏,
   * 23:进攻, 24:危险进攻, 25:控球率, 26:加时赛结束, 27:点球大战结束, 28:VAR(视频助理裁判), 29:点球(点球大战), 30:点球未进(点球大战)
   */
  type = 0;
  position = 0; // 球员位置，F前锋、M中场、D后卫、G守门员、其他为未知
  time = 0; // 时间(分钟)
  second = 0; // 时间(秒)
  playerName = ""; // 事件相关球员名称（可能不存在）
  assist1Name = ""; // 助攻球员1（可能不存在）
  assist2Name = ""; // 助攻球员2（可能不存在）
  inPlayerName = ""; // 换上球员（可能不存在）
  outPlayerName = ""; // 换下球员（可能不存在）
  homeScore = 0; // 主队比分（进球、未进球 事件存在）
  awayScore = 0; // 客队比分（进球、未进球 事件存在）
  /**
   * VAR原因（VAR事件存在）
   * 0:其他, 1:进球判定, 2:进球未判定, 3:点球判定, 4:点球未判定, 5:红牌判定, 6:出牌处罚判定, 7:错认身份
  */
  varReason = 0;
  /**
   * VAR结果（VAR事件存在）
   * 0:未知, 1:进球有效, 2:进球无效, 3:点球有效, 4:点球取消, 5:红牌有效, 6:红牌取消, 7:出牌处罚核实, 8:出牌处罚更改, 9:维持原判, 10:判罚更改
   */
  varResult = 0;
  /**
   * 事件原因
   * 0:未知, 1:犯规, 2:个人犯规, 3:侵犯对手(罚牌事件)/受伤换人(换人事件), 4:战术犯规(罚牌事件)/战术换人(换人事件), 5:进攻犯规, 6:无球犯规,
   * 7:持续犯规, 8:持续侵犯, 9:暴力行为, 10:危险动作, 11:手球犯规, 12:严重犯规, 13:故意犯规（防守球员为最后一名防守人时）,
   * 14:阻挡进球机会, 15:拖延时间, 16:视频回看裁定, 17:判罚取消, 18:争论, 19:对判罚表达异议, 20:犯规和攻击言语,
   * 21:过度庆祝, 22:没有回退到要求的距离, 23:打架, 24:辅助判罚, 25:替补席, 26:赛后行为, 27:其他原因, 28:未被允许进入场地,
   * 29:进入比赛场地, 30:离开比赛赛场, 31:非体育道德行为, 32:非主观意愿的恶意犯规, 33:假摔, 34:干预var复审,
   * 35:进入裁判评审区, 36:吐口水（向球员或裁判）, 37:病毒
   */
  reasonType = 0;
}

export class FootballTliveInfo {
  time = 0; // 事件时间(分钟)
  /**
   * 类型
   * 1:进球, 2:角球, 3:黄牌, 4:红牌, 5:越位, 6:任意球, 7:球门球, 8:点球, 9:换人, 10:比赛开始, 11:中场,
   * 12:结束, 13:半场比分, 15:两黄变红, 16:点球未进, 17:乌龙球, 18:助攻, 19:伤停补时, 21:射正, 22:射偏,
   * 23:进攻, 24:危险进攻, 25:控球率, 26:加时赛结束, 27:点球大战结束, 28:VAR(视频助理裁判), 29:点球(点球大战), 30:点球未进(点球大战)
   */
  type = 0;
  data = ""; // 事件内容
  position = 0; // 事件发生方，0-中立、1-主队、2-客队
  isHighlight = true; // 是否重要事件
}