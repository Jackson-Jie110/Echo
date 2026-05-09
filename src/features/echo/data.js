import { QUADRANT_META } from './constants';
import { createMoment } from './utils';

export function createInitialQuadrants() {
  const baseDate = new Date();

  return {
    'urgent-important': {
      ...QUADRANT_META['urgent-important'],
      tasks: [
        {
          id: 'report',
          name: '完成项目报告',
          deadline: createMoment(baseDate, 0, 18, 30),
          completed: true,
        },
        {
          id: 'meeting',
          name: '准备会议材料',
          deadline: createMoment(baseDate, 1, 9, 0),
          completed: false,
        },
        {
          id: 'reply',
          name: '回复关键邮件',
          deadline: createMoment(baseDate, 0, 21, 15),
          completed: false,
        },
      ],
    },
    'important-not-urgent': {
      ...QUADRANT_META['important-not-urgent'],
      tasks: [
        {
          id: 'learn',
          name: '学习新的表达方式',
          deadline: createMoment(baseDate, 3, 20, 0),
          completed: false,
        },
        {
          id: 'exercise',
          name: '出门散步 20 分钟',
          deadline: createMoment(baseDate, 0, 20, 30),
          completed: true,
        },
        {
          id: 'read',
          name: '读完今天的十页书',
          deadline: null,
          completed: false,
        },
        {
          id: 'trip',
          name: '整理周末小计划',
          deadline: createMoment(baseDate, 4, 19, 30),
          completed: false,
        },
        {
          id: 'files',
          name: '归档桌面文件',
          deadline: null,
          completed: false,
        },
      ],
    },
    'urgent-not-important': {
      ...QUADRANT_META['urgent-not-important'],
      tasks: [
        {
          id: 'delivery',
          name: '拿快递',
          deadline: createMoment(baseDate, 0, 19, 0),
          completed: false,
        },
        {
          id: 'bill',
          name: '缴本月水电费',
          deadline: createMoment(baseDate, 2, 12, 0),
          completed: true,
        },
      ],
    },
    'not-urgent-not-important': {
      ...QUADRANT_META['not-urgent-not-important'],
      tasks: [
        {
          id: 'breathe',
          name: '留十分钟发呆',
          deadline: null,
          completed: false,
        },
      ],
    },
  };
}

export function createInitialMoods() {
  const baseDate = new Date();

  return [
    {
      id: 'mood-1',
      createdAt: createMoment(baseDate, 0, 9, 20),
      content: '今天想慢一点，但也想把真正重要的事情认真做好。',
      emotion: 'calm',
      aiComment: '慢一点不代表停下，按自己的节奏推进也很有力量。',
      pending: false,
    },
    {
      id: 'mood-2',
      createdAt: createMoment(baseDate, -1, 22, 45),
      content: '看了一部老电影，被一些细小的情绪轻轻击中了。',
      emotion: 'touched',
      aiComment: '旧时光会在心里留下回响，而你仍然保有感受它的柔软。',
      pending: false,
    },
    {
      id: 'mood-3',
      createdAt: createMoment(baseDate, -2, 19, 30),
      content: '今天工作有点累，感觉脑子一直在转，需要一点停顿。',
      emotion: 'sad',
      aiComment: '累的时候先别催自己，你已经做得很多了。',
      pending: false,
    },
  ];
}

export function createInitialLetters() {
  const baseDate = new Date();

  return [
    {
      id: 'letter-1',
      date: createMoment(baseDate, -2, 21, 10),
      tags: ['成长', '反思'],
      summary: '这一周你把复杂的事情慢慢理顺了，犹豫没有消失，但你开始带着它前进。',
      greeting: '致这周认真生活的你',
      body:
        '有些进步不会立刻发出声响，它更像一张被光照过的纸，安静地留下纹理。\n\n你没有一下子变得强大，但你确实比前几天更稳定了。那些愿意继续尝试、继续整理情绪、继续把一件小事做完的时刻，都会在之后轻轻托住你。',
      quote: '“真正的变化，常常发生在你没有察觉的时候。”',
      read: false,
    },
    {
      id: 'letter-2',
      date: createMoment(baseDate, -9, 20, 45),
      tags: ['温暖'],
      summary: '那些细微的美好像散落的光点，让你在疲惫里仍能感到被生活温柔接住。',
      greeting: '给仍然愿意感受的人',
      body:
        '你记住了咖啡香、晚风、傍晚的楼影，还有一个突然放松下来的瞬间。\n\n这些看似很小的片段，其实正在一点点修复你。请继续允许自己被美好触碰，不必总是高效，也不必一直强大。',
      quote: '“温柔不是退让，而是一种带着力量的留白。”',
      read: true,
    },
    {
      id: 'letter-3',
      date: createMoment(baseDate, -18, 21, 25),
      tags: ['勇气', '突破'],
      summary: '面对不确定时你没有转身离开，而是带着紧张迈出了那一步。',
      greeting: '写给曾经犹豫的你',
      body:
        '你不是没有害怕，只是最后依然选择了尝试。\n\n很多看起来普通的决定，在之后回望时都会变成重要的转折。谢谢你没有彻底放弃，也谢谢你在混乱里还记得照顾自己。',
      quote: '“勇气并不总是响亮，它有时只是第二天继续出发。”',
      read: false,
    },
  ];
}
