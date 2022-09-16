import request from "./request";

// 首页数据接口
export const GetHomeList = () => request.get("/index/index");

// 分类数据获取
export const TypeList = (params) => request.get("/goods/category", { params });

// 分类页面商品列表请求 | 品牌详情中的产品列表 | 搜索框商品搜索
export const SearchGoodsList = (params) => request.get("/goods/list", { params });

// 品牌详情
export const BrandDetail = (params) => request.get("/brand/detail", { params });

//产品明细
export const GoodsDetail = (params) => request.get("/goods/detail", { params });

// 相关产品
export const GoodsRelated = (params) => request.get("/goods/related", { params });

// 搜索窗口请求
export const SearchWindow = () => request.get("/search/index");

// 全部分类数据接口
export const SortWindow = () => request.get("/catalog/index");

// 专题页面数据请求
export const TopicPage = (params) => request.get("/topic/list", { params });

// 获取当前分类数据
export const TypeDate = (params) => request.get("/catalog/current", { params });

// 清除历史记录
export const ClearSearchWindow = () => request.post("/search/clearhistory");

// 实时搜索功能
export const SearchList = (params) => request.get("/search/helper", { params });

// 登录接口
export const DoLogin = (params) => request.post("/auth/loginByWeb", params);

// 获取购物车数据
// export const CartRequest = () => request.get("/cart/index");
export const GetCartData = () => request.get("/cart/index");

// 点击切换商品选中状态
export const cartChecked = (params) => request.post("/cart/checked", params);


export const cartAdd = (params) => request.post("/cart/add", params);


// 删除商品
export const cartDelete = (params) => request.post("/cart/delete", params);

// 获取购物车产品数量
export const cartGoodscount = () => request.get("/cart/goodscount" );


// 步进器
export const cartUpdate = (params) => request.post("/cart/update", params);
