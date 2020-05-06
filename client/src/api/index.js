import axios from 'axios'

//配置默认参数
axios.defaults.baseURL = 'http://118.190.201.130:3001';//默认访问地址
//跨域允许携带cookie
axios.defaults.withCredentials = true;
//设置post请求格式
axios.defaults.headers.post["Content-Type"] = 'application/x-www-from-urlencoded';

/*登录接口 */
export function loginAdmin(options) {
  return axios.post('/login',options);
}

/*验证登录*/
export function ifLogin() {
  return axios.post('/login/ifLogin');
}

/*发表文章接口*/
export function postArticle({type,title,content,tag,surface}){
  return axios.post('/article/add',{type,title,content,tag,surface});
}

/*请求文章*/
export function getArticle(skip=0,limit=5) {
  return axios.get('/article/get'+`?skip=${skip}&limit=${limit}`);
}

/*文章删除*/
export function articleDelete(_id) {
  if (!_id){
    return Promise.reject();
  }
  return axios.post('/article/delete',{_id});
}

/*文章更新*/
export function updateArticle(_id,options) {
  return axios.post('/article/update',{_id,options});
}

/*请求articleInfo*/
export function getArticleInfo() {
  return axios.get('/article/getInfo');
}


/*请求用户列表*/
export function getUserList() {
  return axios.get('/user/get');
}

/*删除用户*/
export function deleteUser(_id) {
  return axios.post('/user/delete',{_id});
}

/*更新用户数据*/
export function updateUser(_id,data) {
  return axios.post('/user/update',{_id,data});
}

/*请求留言的接口*/
export function getMessageList() {
  return axios.get('/message/get');
}

/*删除留言接口*/
export function deleteMessage(_id) {
  return axios.post('/message/delete',{_id});
}

/*添加日记*/
export function diaryAdd(txt,img) {
  return axios.post('/diary/add',{txt,img});
}

/*请求日记*/
export function getDiary() {
  return axios.get('/diary');
}

/*删除日记*/
export function deleteDiary(_id) {
  return axios.post('/diary/delete',{_id});
}

/*添加友链*/
export function linksAdd(options) {
  return axios.post('/links/add',options);
}

/*请求友链*/
export function getLinks() {
  return axios.get('/links');
}

/*删除友链*/
export function deleteLinks(_id) {
  return axios.post('/links/delete',{_id});
}


/*退出登录*/
export function loginOut() {
  return axios.post('/login/logOut');
}