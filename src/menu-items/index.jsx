import dashboard from './dashboard';
import userManagement from './userManagement'; // အသစ်ဆောက်ထားသောဖိုင်ကို import လုပ်ပါ
// အခြားမလိုချင်သော menu items များကို ဖြုတ်လိုက်ပါ (ဥပမာ- import utilities from './utilities')

const menuItems = {
  items: [dashboard, userManagement] // ဤနေရာတွင် စဉ်ပေးလိုက်ပါ
};

export default menuItems;