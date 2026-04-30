export class ReqSportMatchList {
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  matchTimeType = 1; // 賽事時間類型(1=滾球, 2=今日, 3=早盤, 4=冠軍)
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
  pageIndex = 1; // 頁碼
  pageSize = 10; // 每頁數量
  leagueIds = new Array<string>(); // 聯賽Id
  startTime = -1; // 查詢起始時間(時間戳)
  endTime = -1; // 查詢結束時間(時間戳)
}

export class RespSportMatchList {
  total = 0; // 總筆數
  count = 0; // 顯示筆數
  datas = new Array<SportMatchInfo>();
}

export class SportMatchInfo {
  leagueId = ""; // 聯賽Id
  leagueName = ""; // 聯賽名稱
  leagueLogo = ""; // 聯賽Logo
  matchList = new Array<MatchInfo>(); // 賽事
}

export class MatchInfo {
  matchTime = 0; // 賽事時間 (Unix 毫秒)
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  marketList = new Array<MarketInfo>(); // 玩法
  extraMarketCount = 0; // 更多玩法
  score = ""; // 賽事比分 (1:0)
  matchPeriodId = ""; // 賽事階段Id
  matchPeriodName = ""; // 賽事階段名稱
  matchElapsedSeconds = 0; // 賽事已進行秒數
  matchClockType = 0; // 走表類型(1=正序, 2=倒序)
  matchPeriodStartTime = 0; // 賽事階段開始時間 (Unix 毫秒)
  totalPeriods = 0; // 赛事总局数
  footballData = new FootballSimpleResult; // 足球數據
  basketballData = new BasketballSimpleResult; // 籃球數據
  tennisData = new TennisSimpleResult; // 網球數據
  volleyballData = new VolleyballSimpleResult; // 排球數據
  tabletennisData = new TableTennisSimpleResult(); // 乒乓球數據
  baseballData = new BaseballSimpleResult(); // 棒球數據
  videoInfo = new VideoInfo; // 影片資訊
  animationInfo = new AnimationInfo; // 動畫資訊
}

export class ReqSportH5MatchList {
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  matchTimeType = 1; // 賽事時間類型(1=滾球, 2=今日, 3=早盤, 4=冠軍)
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
  pageIndex = 1; // 頁碼
  pageSize = 10; // 每頁數量
  leagueIds = new Array<string>(); // 聯賽Id
  startTime = -1; // 查詢起始時間(時間戳)
  endTime = -1; // 查詢結束時間(時間戳)
}

export class RespSportH5MatchList {
  total = 0; // 總筆數
  count = 0; // 顯示筆數
  datas = new Array<H5MatchInfo>();
}

export class H5MatchInfo {
  leagueId = ""; // 聯賽Id
  leagueName = ""; // 聯賽名稱
  leagueLogo = ""; // 聯賽Logo
  matchTime = 0; // 賽事時間 (Unix 毫秒)
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  marketList = new Array<MarketInfo>(); // 玩法
  extraMarketCount = 0; // 更多玩法
  score = ""; // 賽事比分 (1:0)
  status = 0; // 状态(0=未开打, 1=比赛中, 2=关闭, 3=取消, 4=结算)
  matchPeriodId = ""; // 賽事階段Id
  matchPeriodStartTime = 0; // 賽事階段開始時間 (Unix 毫秒)
  matchPeriodName = ""; // 賽事階段名稱
  matchElapsedSeconds = 0; // 賽事已進行秒數
  matchClockType = 0; // 走表類型(1=正序, 2=倒序)
  footballData = new FootballSimpleResult; // 足球數據
  basketballData = new BasketballSimpleResult; // 籃球數據
  tennisData = new TennisSimpleResult; // 網球數據
  volleyballData = new VolleyballSimpleResult; // 排球數據
  tabletennisData = new TableTennisSimpleResult(); // 乒乓球數據
  baseballData = new BaseballSimpleResult(); // 棒球數據
  videoInfo = new VideoInfo; // 影片資訊
  animationInfo = new AnimationInfo; // 動畫資訊
}

export class FootballSimpleResult {
  awayCorner: number | null = null; // 主队得分
  awayRedCard: number | null = null; // 客队得分
  awayScore: number | null = null; // 主队角球
  awayYellowCard: number | null = null; // 客队角球
  homeCorner: number | null = null; // 主队黄牌
  homeRedCard: number | null = null; // 客队黄牌
  homeScore: number | null = null; // 主队红牌
  homeYellowCard: number | null = null; // 客队红牌
}

export class BasketballSimpleResult {
  homeScore: number | null = null; // 主队得分
  awayScore: number | null = null; // 客队得分
  firstHalfHomeScore: number | null = null; // 上半场主队得分
  firstHalfAwayScore: number | null = null; // 上半场客队得分
  secondHalfHomeScore: number | null = null; // 下半场主队得分
  secondHalfAwayScore: number | null = null; // 下半场客队得分
  q1Home: number | null = null; // 第一节主队得分
  q1Away: number | null = null; // 第一节客队得分
  q2Home: number | null = null; // 第二节主队得分
  q2Away: number | null = null; // 第二节客队得分
  q3Home: number | null = null; // 第三节主队得分
  q3Away: number | null = null; // 第三节客队得分
  q4Home: number | null = null; // 第四节主队得分
  q4Away: number | null = null; // 第四节客队得分
}

export class TennisSimpleResult {
  homeSets: number | null = null;
  awaySets: number | null = null;
  set1HomeGames: number | null = null;
  set1AwayGames: number | null = null;
  set2HomeGames: number | null = null;
  set2AwayGames: number | null = null;
  set3HomeGames: number | null = null;
  set3AwayGames: number | null = null;
  set4HomeGames: number | null = null;
  set4AwayGames: number | null = null;
  set5HomeGames: number | null = null;
  set5AwayGames: number | null = null;
  currentPointHome: string | null = null;
  currentPointAway: string | null = null;
}

export class VolleyballSimpleResult {
  homeScore: number | null = null;
  awayScore: number | null = null;
  fullHomeScore: number | null = null;
  fullAwayScore: number | null = null;
  set1HomeScore: number | null = null;
  set1AwayScore: number | null = null;
  set2HomeScore: number | null = null;
  set2AwayScore: number | null = null;
  set3HomeScore: number | null = null;
  set3AwayScore: number | null = null;
  set4HomeScore: number | null = null;
  set4AwayScore: number | null = null;
  set5HomeScore: number | null = null;
  set5AwayScore: number | null = null;
  set6HomeScore: number | null = null;
  set6AwayScore: number | null = null;
  set7HomeScore: number | null = null;
  set7AwayScore: number | null = null;
  goldenHomeScore: number | null = null;
  goldenAwayScore: number | null = null;
}

export class TableTennisSimpleResult {
  homeScore: number | null = null;
  awayScore: number | null = null;
  fullHomeScore: number | null = null;
  fullAwayScore: number | null = null;
  game1HomeScore: number | null = null;
  game1AwayScore: number | null = null;
  game2HomeScore: number | null = null;
  game2AwayScore: number | null = null;
  game3HomeScore: number | null = null;
  game3AwayScore: number | null = null;
  game4HomeScore: number | null = null;
  game4AwayScore: number | null = null;
  game5HomeScore: number | null = null;
  game5AwayScore: number | null = null;
  game6HomeScore: number | null = null;
  game6AwayScore: number | null = null;
  game7HomeScore: number | null = null;
  game7AwayScore: number | null = null;
}

export class BaseballSimpleResult {
  fullInclExtraHomeScore: number | null = null;
  fullInclExtraAwayScore: number | null = null;
  fullHomeScore: number | null = null;
  fullAwayScore: number | null = null;
  firstFiveHomeScore: number | null = null;
  firstFiveAwayScore: number | null = null;
  inning1HomeScore: number | null = null;
  inning1AwayScore: number | null = null;
  inning2HomeScore: number | null = null;
  inning2AwayScore: number | null = null;
  inning3HomeScore: number | null = null;
  inning3AwayScore: number | null = null;
  inning4HomeScore: number | null = null;
  inning4AwayScore: number | null = null;
  inning5HomeScore: number | null = null;
  inning5AwayScore: number | null = null;
  inning6HomeScore: number | null = null;
  inning6AwayScore: number | null = null;
  inning7HomeScore: number | null = null;
  inning7AwayScore: number | null = null;
  inning8HomeScore: number | null = null;
  inning8AwayScore: number | null = null;
  inning9HomeScore: number | null = null;
  inning9AwayScore: number | null = null;
  extraInningHomeScore: number | null = null;
  extraInningAwayScore: number | null = null;
  inning10HomeScore: number | null = null;
  inning10AwayScore: number | null = null;
  inning11HomeScore: number | null = null;
  inning11AwayScore: number | null = null;
  inning12HomeScore: number | null = null;
  inning12AwayScore: number | null = null;
  inning13HomeScore: number | null = null;
  inning13AwayScore: number | null = null;
  inning14HomeScore: number | null = null;
  inning14AwayScore: number | null = null;
  inning15HomeScore: number | null = null;
  inning15AwayScore: number | null = null;
  inning16HomeScore: number | null = null;
  inning16AwayScore: number | null = null;
  inning17HomeScore: number | null = null;
  inning17AwayScore: number | null = null;
  inning18HomeScore: number | null = null;
  inning18AwayScore: number | null = null;
  inning19HomeScore: number | null = null;
  inning19AwayScore: number | null = null;
  inning20HomeScore: number | null = null;
  inning20AwayScore: number | null = null;
  inning21HomeScore: number | null = null;
  inning21AwayScore: number | null = null;
  inning22HomeScore: number | null = null;
  inning22AwayScore: number | null = null;
  inning23HomeScore: number | null = null;
  inning23AwayScore: number | null = null;
  inning24HomeScore: number | null = null;
  inning24AwayScore: number | null = null;
  inning25HomeScore: number | null = null;
  inning25AwayScore: number | null = null;
  inning26HomeScore: number | null = null;
  inning26AwayScore: number | null = null;
  inning27HomeScore: number | null = null;
  inning27AwayScore: number | null = null;
  inning28HomeScore: number | null = null;
  inning28AwayScore: number | null = null;
  inning29HomeScore: number | null = null;
  inning29AwayScore: number | null = null;
  inning30HomeScore: number | null = null;
  inning30AwayScore: number | null = null;
  inning31HomeScore: number | null = null;
  inning31AwayScore: number | null = null;
  inning32HomeScore: number | null = null;
  inning32AwayScore: number | null = null;
  inning33HomeScore: number | null = null;
  inning33AwayScore: number | null = null;
  inning34HomeScore: number | null = null;
  inning34AwayScore: number | null = null;
  inning35HomeScore: number | null = null;
  inning35AwayScore: number | null = null;
  inning36HomeScore: number | null = null;
  inning36AwayScore: number | null = null;
  inning37HomeScore: number | null = null;
  inning37AwayScore: number | null = null;
  inning38HomeScore: number | null = null;
  inning38AwayScore: number | null = null;
  inning39HomeScore: number | null = null;
  inning39AwayScore: number | null = null;
  inning40HomeScore: number | null = null;
  inning40AwayScore: number | null = null;
}

export class VideoInfo {
  flvUrl = ''; // Flv影片連結
  m3u8Url = ''; // M3u8影片連結
  webUrl = ''; // Web影片連結
  hasVideo = false; // 是否有影片
}

export class AnimationInfo {
  animationUrl = ''; // 動畫連結
  hasAnimation = false; // 是否有動畫
}

export class MarketInfo {
  marketId = ""; // 玩法Id
  marketName = ""; // 玩法名稱
  outcomeList = new Array<OutcomeInfo>(); // 投注項目
}

export class OutcomeInfo {
  odds = 0; // 賠率值
  outcomeId = ""; // 投注項id
  outcomeName = ""; // 投注項名稱
  outcomeShowName = ""; // 投注项组合名称
  teamHandicap = ""; // 讓球
  sourceId = ""; // 來源的原始 ID
}

export class ReqSportLeagueList {
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
}

export class RespSportLeagueList {
  datas = new Array<SportLeagueInfo>();
}

export class SportLeagueInfo {
  leagueId = ""; // 聯賽Id
  leagueName = ""; // 聯賽名稱
  leagueLogo = ""; // 聯賽Logo
  sportType = 0; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
}

export class ReqSportMarketList {
  productId = ""; // 產品Id (liveSports、bf)
  matchId = ""; // 賽事Id
  sportType = 0; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
}

export class RespSportMarketList {
  leagueInfo = new SportMarketLeagueInfo; // 聯賽資訊
  matchInfo = new SportMarketMatchInfo; // 賽事資訊
  videoInfo = new VideoInfo; // 影片資訊
  animationInfo = new AnimationInfo; // 動畫資訊
  datas = new Array<MarketInfo>(); // 玩法
}

export class SportMarketLeagueInfo {
  leagueId = ""; // 聯賽Id
  leagueName = ""; // 聯賽名稱
  leagueLogo = ""; // 聯賽Logo
}

export class SportMarketMatchInfo {
  matchTime = 0; // 賽事時間 (Unix 毫秒)
  matchId = ""; // 賽事Id
  homeTeamId = ""; // 主隊 Id
  homeTeamName = ""; // 主隊名稱
  homeTeamLogo = ""; // 主隊Logo
  awayTeamId = ""; // 客隊 Id
  awayTeamName = ""; // 客隊名稱
  awayTeamLogo = ""; // 客隊Logo
  score = ""; // 賽事比分 (1:0)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  matchPeriodId = ""; // 賽事階段Id
  matchPeriodName = ""; // 賽事階段名稱
  matchPeriodStartTime = 0; // 賽事階段開始時間 (Unix 毫秒)
  matchElapsedSeconds = 0; // 賽事已進行秒數
  matchClockType = 0; // 走表類型(1=正序, 2=倒序)
  footballData = new FootballSimpleResult; // 足球數據
  basketballData = new BasketballSimpleResult; // 籃球數據
  tennisData = new TennisSimpleResult; // 網球數據
  volleyballData = new VolleyballSimpleResult; // 排球數據
  tabletennisData = new TableTennisSimpleResult(); // 乒乓球數據
  baseballData = new BaseballSimpleResult(); // 棒球數據
}

export class ReqSportMatchCount {
  productId = ""; // 產品Id (liveSports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  leagueCategory = 0; // 筛选联赛类别(0=全部, 1=足球五大联赛, 2=热门, 3=NBA)
}

export class RespSportMatchCount {
  inPlayCount = 0; // 滾球賽事數
  todayCount = 0; // 今日賽事數
  earlyCount = 0; // 早盤賽事數
  outrightsCount = 0; // 冠軍賽事數
}

export class ReqSportMatchesResults {
  productId = ""; // 產品Id (livesports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  leagueName = ""; // 聯賽名稱
  teamName = ""; // 隊伍名稱
  sort = 2; // 排序(1=时间正序, 2=时间倒序)
  pageIndex = 1; // 頁碼
  pageSize = 10; // 每頁數量
  startTime = 1714000000000; // 查詢起始時間(時間戳)
  endTime = 1770000000000; // 查詢結束時間(時間戳)
}

export class RespSportMatchesResults {
  total = 0; // 總筆數
  count = 0; // 顯示筆數
  datas = new Array<SportMatchResultInfo>();
}

export class SportMatchResultInfo {
  productId = ""; // 产品Id
  sportType = 0; // 体育类型(1=足球, 2=篮球, 3=网球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  leagueId = ""; // 联赛Id
  leagueName = ""; // 联赛名称
  leagueLogo = ""; // 联赛Logo
  matchTime = 0; // 赛事时间 (Unix 毫秒)
  matchId = ""; // 赛事Id
  homeTeamId = ""; // 主队Id
  homeTeamName = ""; // 主队名称
  homeTeamLogo = ""; // 主队Logo
  awayTeamId = ""; // 客队Id
  awayTeamName = ""; // 客队名称
  awayTeamLogo = ""; // 客队Logo
  footballData = new FootballResult();
  basketballData = new BasketballResult();
  tennisData = new TennisResult();
  volleyballData = new VolleyballResult();
  tabletennisData = new TableTennisResult();
  baseballData = new BaseballResult();
  status = 0; // 状态(0=未开打, 1=比赛中, 2=关闭, 3=取消, 4=结算)
  periodScore: any = null; // 赛事比分
}

export class FootballResult {
  score = new FootballSection();
  corner = new FootballSection();
  yellowCard = new FootballSection();
  redCard = new FootballSection();
}

export class FootballSection {
  full = new SideScore();
  firstHalf = new SideScore();
  secondHalf = new SideScore();
}

export class SideScore {
  home: number | null = null;
  away: number | null = null;
}

export class BasketballResult {
  score = new BasketballScore();
}

export class BasketballScore {
  full = new SideScore();
  firstHalf = new SideScore();
  secondHalf = new SideScore();
  q1 = new SideScore();
  q2 = new SideScore();
  q3 = new SideScore();
  q4 = new SideScore();
  ot = new SideScore();
}

export class TennisResult {
  gamesScore = new SideScore(); // 得分
  setsScore = new TennisSetsScore(); // 局分
}

export class TennisSetsScore {
  total = new SideScore(); // 總盤分
  set1 = new SideScore(); // 第一盤
  set2 = new SideScore(); // 第二盤
  set3 = new SideScore(); // 第三盤
  set4 = new SideScore(); // 第四盤
  set5 = new SideScore(); // 第五盤
}

export class VolleyballResult {
  gamesScore = new SideScore(); // 得分
  setsScore = new VolleyballSetsScore(); // 局分
}

export class VolleyballSetsScore {
  total = new SideScore(); // 總局分
  set1 = new SideScore(); // 第一局
  set2 = new SideScore(); // 第二局
  set3 = new SideScore(); // 第三局
  set4 = new SideScore(); // 第四局
  set5 = new SideScore(); // 第五局
  set6 = new SideScore(); // 第六局
  set7 = new SideScore(); // 第七局
  golden = new SideScore(); // 金局
}

export class TableTennisResult {
  gamesScore = new SideScore(); // 得分
  setsScore = new TableTennisSetsScore(); // 局分
}

export class TableTennisSetsScore {
  total = new SideScore(); // 總局分
  set1 = new SideScore(); // 第一局
  set2 = new SideScore(); // 第二局
  set3 = new SideScore(); // 第三局
  set4 = new SideScore(); // 第四局
  set5 = new SideScore(); // 第五局
  set6 = new SideScore(); // 第六局
  set7 = new SideScore(); // 第七局
}

export class BaseballResult {
  hitsScore = new SideScore(); // 安打數
  score = new BaseballScore(); // 得分數
}

export class BaseballScore {
  full = new SideScore(); // 全場
  firstFive = new SideScore(); // 前五局
  inning1 = new SideScore(); // 第一局
  inning2 = new SideScore(); // 第二局
  inning3 = new SideScore(); // 第三局
  inning4 = new SideScore(); // 第四局
  inning5 = new SideScore(); // 第五局
  inning6 = new SideScore(); // 第六局
  inning7 = new SideScore(); // 第七局
  inning8 = new SideScore(); // 第八局
  inning9 = new SideScore(); // 第九局
}


export class ReqSportMatchPopular {
  productId = ""; // 產品Id (livesports、bf)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
}

export class RespSportMatchPopular {
  datas = new Array<SportMatchPopularInfo>();
}

export class SportMatchPopularInfo {
  leagueId = ""; // 联赛Id
  leagueName = ""; // 联赛名称
  leagueLogo = ""; // 联赛Logo
  matchId = ""; // 赛事Id
  matchTime = 0; // 赛事时间
  homeTeamId = ""; // 主队Id
  homeTeamName = ""; // 主队名称
  homeTeamLogo = ""; // 主队Logo
  awayTeamId = ""; // 客队Id
  awayTeamName = ""; // 客队名称
  awayTeamLogo = ""; // 客队Logo
  market = new MarketInfo(); // 玩法
  matchPeriodId = ""; // 賽事階段Id
  matchPeriodName = ""; // 賽事階段名稱
  matchPeriodStartTime = 0; // 賽事階段開始時間 (Unix 毫秒)
  matchElapsedSeconds = 0; // 賽事已進行秒數
  matchClockType = 0; // 走表類型(1=正序, 2=倒序)
}

export class ReqSportOutcomeRecommend {
  productId = ""; // 產品Id (livesports、bf)
  matchIds = new Array<string>(); // 赛事Id
  lang = ""; // 語系 (zh_cn=簡中, en=英文)
  oddsType = 1; // 盤口類型 (1=香港盤, 2=歐洲盤)
  sportType = 1; // 體育類型(1=足球, 2=籃球, 3=網球, 4=排球, 5=乒乓球, 6=棒球, 7=其他)
}

export class RespSportOutcomeRecommend {
  datas = new Array<SportOutcomeRecommendInfo>();
}

export class SportOutcomeRecommendInfo {
  matchTime = 0; // 赛事时间 (Unix 毫秒)
  matchId = ""; // 赛事Id
  leagueId = ""; // 联赛Id
  leagueName = ""; // 联赛名称
  homeTeamId = ""; // 主队Id
  homeTeamName = ""; // 主队名称
  homeTeamLogo = ""; // 主队Logo
  awayTeamId = ""; // 客队Id
  awayTeamName = ""; // 客队名称
  awayTeamLogo = ""; // 客队Logo
  desc = ""; // 推荐原因
  marketId = ""; // 玩法Id
  marketName = ""; // 玩法名称
  odds = 0; // 赔率值
  outcomeId = ""; // 投注项Id
  outcomeName = ""; // 投注项名称
  outcomeShowName = ""; // 投注项组合名称
  teamHandicap = ""; // 让球
  sourceId = ""; // 来源原始Id
  isSupportCombo = true; // 是否支持串关
  isMarketOpen = true; // 是否开放盘口
}