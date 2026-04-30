import type { LangInfo } from "./player";

export class ReqMenuProduct {
  lang = 'zh_cn'; // 语言 (zh_cn=简中, en=英文)
}

export class RespMenuProduct {
  datas = new Array<MenuProductInfo>();
}

export class MenuProductInfo {
  productId = "";
  productName = "";
  productLangs = new Array<LangInfo>();
}