import { ETaskPriority, ETaskStatus } from 'consts';

export interface ITask {
  id: string;
  title: string;
  description?: string;
  project?: string;
  result?: string;
  priority: ETaskPriority;
  status: ETaskStatus;
  developer?: string;
  dateStart?: string; // date
  dateEnd?: string; // date
  critical?: boolean;
}
