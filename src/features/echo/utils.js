import { WEEKDAY_LABELS } from './constants';

export function pad(value) {
  return `${value}`.padStart(2, '0');
}

export function startOfMonth(date) {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

export function startOfDay(date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

export function addDays(baseDate, offsetDays) {
  const date = new Date(baseDate);
  date.setDate(date.getDate() + offsetDays);
  return date;
}

export function createMoment(baseDate, offsetDays, hours, minutes) {
  const date = addDays(baseDate, offsetDays);
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export function moveMonth(baseDate, delta) {
  return new Date(baseDate.getFullYear(), baseDate.getMonth() + delta, 1);
}

export function toDateKey(date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

export function isSameDay(first, second) {
  return (
    first.getFullYear() === second.getFullYear() &&
    first.getMonth() === second.getMonth() &&
    first.getDate() === second.getDate()
  );
}

export function isTomorrow(date) {
  const tomorrow = addDays(startOfDay(new Date()), 1);
  return isSameDay(date, tomorrow);
}

export function formatClock(date) {
  return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
}

export function formatMonthLabel(date) {
  return `${date.getFullYear()}年 ${date.getMonth() + 1} 月`;
}

export function formatReadableDate(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日`;
}

export function formatMoodTimestamp(date) {
  const today = new Date();
  const yesterday = addDays(startOfDay(today), -1);

  if (isSameDay(date, today)) {
    return `今天 ${formatClock(date)}`;
  }

  if (isSameDay(date, yesterday)) {
    return `昨天 ${formatClock(date)}`;
  }

  return `${formatReadableDate(date)} ${formatClock(date)}`;
}

export function formatLetterDate(date) {
  return `${date.getMonth() + 1}月${date.getDate()}日 · 周${WEEKDAY_LABELS[date.getDay()]}`;
}

export function formatTaskDeadline(deadline) {
  if (!deadline) {
    return '未设置截止时间';
  }

  let prefix = formatReadableDate(deadline);

  if (isSameDay(deadline, new Date())) {
    prefix = '今天';
  } else if (isTomorrow(deadline)) {
    prefix = '明天';
  }

  return `${prefix} ${formatClock(deadline)}`;
}

export function getTimeRemaining(deadline, now) {
  if (!deadline) {
    return {
      text: '没有设置倒计时',
      overdue: false,
    };
  }

  const diff = deadline.getTime() - now.getTime();
  const absMinutes = Math.round(Math.abs(diff) / 60000);

  if (diff <= 0) {
    if (absMinutes < 60) {
      return {
        text: `已逾期 ${absMinutes} 分钟`,
        overdue: true,
      };
    }

    const overdueHours = Math.floor(absMinutes / 60);
    const overdueMinutes = absMinutes % 60;
    return {
      text: `已逾期 ${overdueHours} 小时 ${overdueMinutes} 分钟`,
      overdue: true,
    };
  }

  if (absMinutes < 60) {
    return {
      text: `还剩 ${absMinutes} 分钟`,
      overdue: false,
    };
  }

  const hours = Math.floor(absMinutes / 60);
  const minutes = absMinutes % 60;
  return {
    text: `还剩 ${hours} 小时 ${minutes} 分钟`,
    overdue: false,
  };
}

export function getEnergyModel(value) {
  if (value < 25) {
    return {
      care: '现在先别催自己，把电量一点点接回来就好。',
      recommendedQuadrant: 'not-urgent-not-important',
      reminder: '适合先处理低压力的小事，给自己留一点恢复空间。',
    };
  }

  if (value < 50) {
    return {
      care: '能量还在回升中，先把会打扰你的事情轻轻收住。',
      recommendedQuadrant: 'urgent-not-important',
      reminder: '优先清掉急但不太重要的杂事，减少心里的噪音。',
    };
  }

  if (value < 75) {
    return {
      care: '状态正在变稳，适合把注意力放回真正重要的方向。',
      recommendedQuadrant: 'important-not-urgent',
      reminder: '推进重要但不急的任务，让今天慢慢积累确定感。',
    };
  }

  return {
    care: '现在的你很有力量，可以把高能量用在最关键的地方。',
    recommendedQuadrant: 'urgent-important',
    reminder: '适合集中处理重要且紧急的任务，趁状态在线向前推进。',
  };
}

export function detectEmotion(text) {
  const value = text.toLowerCase();

  if (/(开心|快乐|满足|轻松|顺利|愉快|幸福|好耶)/.test(value)) {
    return 'happy';
  }

  if (/(平静|安静|散步|咖啡|阳光|舒服|慢一点|松弛)/.test(value)) {
    return 'calm';
  }

  if (/(难过|压力|累|迷茫|失落|焦虑|撑不住|疲惫)/.test(value)) {
    return 'sad';
  }

  return 'touched';
}

export function getAiReply(emotion) {
  const responseMap = {
    happy: [
      '这份轻盈很珍贵，把它悄悄留给今天的自己。',
      '听见你在发光，愿这份好心情陪你久一点。',
    ],
    calm: [
      '慢一点并不是停下，而是在给自己留下呼吸的空间。',
      '你现在的节奏很好，温柔地往前走就够了。',
    ],
    sad: [
      '累的时候不必强撑，先把自己安顿好，再慢慢继续。',
      '迷茫不是退步，它只是提醒你需要一点陪伴和停顿。',
    ],
    touched: [
      '能被细小情绪打动，说明你依然保有很柔软的心。',
      '这些微光会留下来，成为之后回望时的温柔证据。',
    ],
  };

  const list = responseMap[emotion] ?? responseMap.touched;
  return list[Math.floor(Math.random() * list.length)];
}

export function buildCalendarDays(monthDate, markedDates) {
  const marked = new Set(markedDates);
  const firstDay = new Date(monthDate.getFullYear(), monthDate.getMonth(), 1);
  const startWeekday = firstDay.getDay();
  const gridStart = addDays(firstDay, -startWeekday);
  const today = new Date();

  return Array.from({ length: 42 }, (_, index) => {
    const currentDate = addDays(gridStart, index);
    const dateKey = toDateKey(currentDate);

    return {
      date: currentDate,
      dateKey,
      label: currentDate.getDate(),
      isCurrentMonth: currentDate.getMonth() === monthDate.getMonth(),
      isToday: isSameDay(currentDate, today),
      isMarked: marked.has(dateKey),
    };
  });
}

export function matchesLetterFilter(letter, filter) {
  if (filter === 'all') {
    return true;
  }

  return letter.type === filter;
}
