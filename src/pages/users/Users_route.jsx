// assets
// GroupIcon အစား Ant Design ရဲ့ TeamOutlined ကို ထည့်လိုက်ပါတယ်
import { PlusOutlined, EditOutlined, InfoCircleOutlined, TeamOutlined } from '@ant-design/icons';

// icons
const icons = {
  PlusOutlined,
  EditOutlined,
  InfoCircleOutlined,
  // GroupIcon နေရာမှာ TeamOutlined (Ant Design) ကို အစားထိုးသုံးစွဲခြင်း
  GroupIcon: TeamOutlined 
};

// ============================== MENU ITEMS - PRODUCT ROUTES ============================== //

const UsersRoutes = {
  id: 'Users',
  title: 'Users',
  type: 'group',
  children: [
    {
      id: 'users-list',
      title: 'Users List',
      type: 'item',
      url: '/users/list',
      icon: icons.GroupIcon, // ဒီနေရာက icons.GroupIcon က TeamOutlined ကို ညွှန်ပြနေမှာဖြစ်လို့ အိုကေပါတယ်
      target: false,
    }
  ],
};

export default UsersRoutes;