import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
/*进度条*/
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

/*element-ui*/
import {Container,Aside,Main,Menu, Submenu,MenuItem,MenuItemGroup,Icon,
  Breadcrumb,BreadcrumbItem,Form,FormItem,Input,Select,Option,Upload,Button,Message,
MessageBox,Loading,Table,TableColumn,Pagination,Dialog,Tag,Switch,Popover} from 'element-ui'
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Icon);
Vue.use(Breadcrumb);
Vue.use(BreadcrumbItem);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Select);
Vue.use(Option);
Vue.use(Upload);
Vue.use(Button);
Vue.prototype.$message = Message;
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$confirm = MessageBox.confirm;
Vue.use(Loading);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Dialog);
Vue.use(Tag);
Vue.use(Switch);
Vue.use(Popover);

/*设置进度条*/
router.beforeEach((to,from,next)=>{
  NProgress.start();
  next();
});
router.afterEach((to,from)=>{
  NProgress.done();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
