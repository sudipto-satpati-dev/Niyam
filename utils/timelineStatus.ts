import { TimelineItem, ItemStatus, DailyLog } from '../types/log';

const today = () => new Date().toISOString().split('T')[0];

export const getItemStatus = (
  item: TimelineItem,
  dailyLog: DailyLog,
  now: Date = new Date()
): ItemStatus => {
  const isLogged = dailyLog.completedItems.includes(item.time);
  if (isLogged) return 'done';

  const [h, m] = item.time.split(':').map(Number);
  const itemTime = new Date();
  itemTime.setHours(h, m, 0, 0);

  const isToday = dailyLog.date === today();
  if (!isToday) return 'missed';
  if (now > itemTime) return 'overdue';
  return 'upcoming';
};
