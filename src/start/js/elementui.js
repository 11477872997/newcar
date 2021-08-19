import { 
    Pagination,
    Dialog,
    // Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    // Radio,
    // RadioGroup,
    // RadioButton,
    // Checkbox,
    // CheckboxButton,
    // CheckboxGroup,
    // Switch,
    Select,
    Option,
    // OptionGroup,
    Button,
    // ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    // TimeSelect,
    // TimePicker,
    // Popover,
    // Tooltip,
    // Breadcrumb,
    // BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    // Tag,
    // Tree,
    // Alert,
    // Slider,
    Icon,
    Row,
    Col,
    // Upload,
    // Progress,
    // Spinner,
    Badge,
    // Card,
    // Rate,
    // Steps,
    // Step,
    // Carousel,
    // CarouselItem,
    // Collapse,
    // CollapseItem,
    // Cascader,
    // ColorPicker,
    // Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    // Timeline,
    // TimelineItem,
    // Link,
    // Divider,
    // Image,
    // Calendar,
    // Backtop,
    // PageHeader,
    // CascaderPanel,
    // Loading,
    MessageBox,
    Message,
    Avatar,
    // Notification
} from "element-ui";


// 存储组件列表
const components = [
    Pagination,
    Dialog,
    // Autocomplete,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Menu,
    Submenu,
    MenuItem,
    MenuItemGroup,
    Input,
    InputNumber,
    // Radio,
    // RadioGroup,
    // RadioButton,
    // Checkbox,
    // CheckboxButton,
    // CheckboxGroup,
    // Switch,
    Select,
    Option,
    // OptionGroup,
    Button,
    // ButtonGroup,
    Table,
    TableColumn,
    DatePicker,
    // TimeSelect,
    // TimePicker,
    // Popover,
    // Tooltip,
    // Breadcrumb,
    // BreadcrumbItem,
    Form,
    FormItem,
    Tabs,
    TabPane,
    // Tag,
    // Tree,
    // Alert,
    // Slider,
    Icon,
    Row,
    Col,
    // Upload,
    // Progress,
    // Spinner,
    Badge,
    // Card,
    // Rate,
    // Steps,
    // Step,
    // Carousel,
    // CarouselItem,
    // Collapse,
    // CollapseItem,
    // Cascader,
    // ColorPicker,
    // Transfer,
    Container,
    Header,
    Aside,
    Main,
    Footer,
    Avatar,
    // Timeline,
    // TimelineItem,
    // Link,
    // Divider,
    // Image,
    // Calendar,
    // Backtop,
    // PageHeader,
    // CascaderPanel,
];

// 定义 element 方法，接收 Vue 作为参数。如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
// 遍历注册全局组件
components.forEach(component => {
  Vue.component(component.name, component)
})
};

// 判断是否是直接引入文件,如果是，就不用调用 Vue.use()
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
};

import Vue from 'vue'
// Vue.prototype.$loading = Loading.service;
// Vue.prototype.$msgbox = MessageBox;
// Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$confirm = MessageBox.confirm;
// Vue.prototype.$prompt = MessageBox.prompt;
// Vue.prototype.$notify = Notification;
Vue.prototype.$message = Message;

// 修改 el-dialog 默认点击遮照为不关闭
Dialog.props.closeOnClickModal.default = false;

// 导出的对象必须具有 install，才能被 Vue.use() 方法安装
export default {
    install
}
 