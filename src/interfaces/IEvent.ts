import { EEventStatus, EEventMode, EModes } from 'consts';

export interface IEvent {
  id: string;
  dt: string; // datetime
  title: string;
  status_old: EEventStatus;
  status_new: EEventStatus;
  change_all?: string;
  developer: string;
  task_id: string;
  mainTable: EModes;
  theme?: string;
  project: string;
  event: EEventMode;
}
