import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';

export interface EditField {
  name: string;
  title: string; 
  type: string; 
  list?: Observable<{value:number, label: string}[]>;
  date?: Date
}

@Component({
  selector: 'app-items-editor',
  templateUrl: './items-editor.component.html',
  styleUrls: ['./items-editor.component.css']
})
export class ItemsEditorComponent implements OnChanges{

  @Input() items: Item[]
  @Input() editFields: EditField[];

  @Output() onItemSave = new EventEmitter<any>();
  @Output() onItemAdd = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();

  sourceItem: any;

  ngOnChanges(changes: SimpleChanges) {
    if(changes?.['items']) {
      this.sourceItem = {...changes['items'].currentValue?.[0]};
    }
  }

  save() {
    if(this.items[0]?.id) {
      const firstItem:any = this.items[0];
      const changedProps = Object.entries(firstItem).filter(entry => entry[1] !== this.sourceItem[entry[0]]);
      this.onItemSave.emit(this.items.map(item => {
        const changedItem:any = {...item};
        changedProps.forEach(entry => {
          changedItem[entry[0]] = entry[1];
        })
        return changedItem;
      }));
    } else {
      this.onItemAdd.emit({...this.items[0]});
    }
    this.items = [];
  }

  cancel() {
    this.items = [];
    this.onCancel.emit()
  }

  get sidebarVisible() {
    return this.items?.length>0
  }






}
