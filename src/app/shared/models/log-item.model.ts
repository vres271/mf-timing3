import { Item } from './items.model.js';

export enum LogItemType{
  Serial = 1,
  timecontrolAPI,
}

export const LogItemTypeNames: Record<LogItemType, string> = {
  [LogItemType.Serial]: 'Serial Port',
  [LogItemType.timecontrolAPI]: 'Timecontrol',
}

export interface LogItemDTO extends Item{
  id: number;
  date: number;
  logItemType: LogItemType;
  detail: any;
}

export class LogItem  implements LogItemDTO{
  id: number;
  date: number;
  logItemType: LogItemType;
  detail: any;
  
  constructor(dto: LogItemDTO, itemsMap: any) {
    Object.assign(this, dto);
  }
  
  get dateString():string {
    return new Date(this.date).toLocaleString();
  }

  get logItemTypeName():string {
    return LogItemTypeNames[this.logItemType];
  }

}

export function DTO2LogItem() {

}

export function LogItem2DTO(item: LogItem):LogItemDTO {
  const dto:LogItemDTO = {
    id: 1*item.id || 0,
    logItemType: 1*item.logItemType || 0,
    detail: item.detail || null,
    date: ((date:any) => typeof date === 'object' ? date.getTime() : date)(item.date),
  }
  return dto;
}
