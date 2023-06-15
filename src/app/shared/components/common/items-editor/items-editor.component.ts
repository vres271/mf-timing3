import { Component, EventEmitter, Input, Output } from '@angular/core';
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
export class ItemsEditorComponent {

  @Input() items: Item[]
  @Input() editFields: EditField[];

  @Output() onItemSave = new EventEmitter<any>();
  @Output() onItemAdd = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  sidebarVisible = false;

  save() {
    if(this.items[0]?.id) {
      this.onItemSave.emit(this.items[0]);
    } else {
      this.onItemAdd.emit(this.items[0]);
    }
  }

  cancel() {
    this.sidebarVisible = false;
    this.onCancel.emit()
  }






}
