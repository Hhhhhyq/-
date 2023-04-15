import Vue from "vue";

import {
  Button,
  Select,
  Form,
  FormItem,
  Input,
  Checkbox,
  Message,
  Container,
  Header,
  Aside,
  Main,
  Menu,
  MenuItem,
  MenuItemGroup,
  Submenu,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  Tag,
  Table,
  TableColumn,
  Pagination,
  Image,
  Empty,
  Popconfirm,
  Dialog,
  Descriptions,
  DescriptionsItem,
  Card,
  Tabs,
  TabPane,
  MessageBox,
  Upload,
} from "element-ui";
Vue.use(Button);
Vue.use(Select);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input);
Vue.use(Checkbox);
Vue.use(Container);
Vue.use(Header);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(MenuItemGroup);
Vue.use(Submenu);
Vue.use(Dropdown);
Vue.use(DropdownItem);
Vue.use(DropdownMenu);
Vue.use(Tag);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Pagination);
Vue.use(Image);
Vue.use(Empty);
Vue.use(Popconfirm);
Vue.use(Dialog);
Vue.use(Descriptions);
Vue.use(DescriptionsItem);
Vue.use(Card);
Vue.use(Tabs);
Vue.use(TabPane);
Vue.use(Upload);

//引入嵌入式过渡动画
import 'element-ui/lib/theme-chalk/base.css';
// collapse 展开折叠
import CollapseTransition from 'element-ui/lib/transitions/collapse-transition';
Vue.component(CollapseTransition.name, CollapseTransition)

Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm