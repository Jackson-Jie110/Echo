export const QUADRANT_ORDER = [
  'urgent-important',
  'important-not-urgent',
  'urgent-not-important',
  'not-urgent-not-important',
];

export const QUADRANT_META = {
  'urgent-important': {
    name: '重要且紧急',
    shortName: '推进当下',
  },
  'important-not-urgent': {
    name: '重要不紧急',
    shortName: '慢慢积累',
  },
  'urgent-not-important': {
    name: '紧急不重要',
    shortName: '尽快清理',
  },
  'not-urgent-not-important': {
    name: '不重要不紧急',
    shortName: '给自己留白',
  },
};

export const WEEKDAY_LABELS = ['日', '一', '二', '三', '四', '五', '六'];

export const HOME_ENTRY_ITEMS = [
  {
    key: 'today',
    label: '今日',
    kicker: '整理',
    note: '轻轻安顿今天',
    icon: 'sun',
  },
  {
    key: 'light',
    label: '拾光',
    kicker: '倾听',
    note: '写下此刻心绪',
    icon: 'feather',
  },
  {
    key: 'echo',
    label: '回响',
    kicker: '收藏',
    note: '翻开回声信件',
    icon: 'mail',
  },
  {
    key: 'my',
    label: '我的',
    kicker: '关系',
    note: '看见陪伴轨迹',
    icon: 'star',
  },
];

export const TAB_ITEMS = [
  { key: 'today', label: '今日', icon: 'sun' },
  { key: 'light', label: '拾光', icon: 'feather' },
  { key: 'echo', label: '回响', icon: 'mail' },
  { key: 'my', label: '我的', icon: 'star' },
];

export const ECHO_FILTERS = [
  { key: 'all', label: '全部' },
  { key: 'day', label: '日' },
  { key: 'week', label: '周' },
  { key: 'month', label: '月' },
];

export const MY_FEATURES = ['形象 DIY', 'MBTI 设定', '记忆管理', '设置'];
