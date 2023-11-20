import { EDiscussionStatus, EDiscussionType } from 'consts';

export interface IDiscussion {
  id: string;
  title: string;
  status: EDiscussionStatus;
  week: string; // 2020.01
  date: string; // date string
  time: string; // time string
  responsible: string;
  participants: string;
  theme: string;
  type: EDiscussionType;
  videoConf?: string;
  mainQuestions?: string;
  mainTable?: string;
  idTask?: string;
  result?: string;
}
