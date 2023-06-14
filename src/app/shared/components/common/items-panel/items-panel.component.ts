import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';

export interface EditField {
  name: string;
  title: string; 
  type: string; 
  list?: Observable<{value:number, label: string}[]>;
  date?: Date
}

export interface Field {
  name: string;
  title: string; 
  type: string; 
}

@Component({
  selector: 'app-items-panel',
  templateUrl: './items-panel.component.html',
  styleUrls: ['./items-panel.component.css']
})
export class ItemsPanelComponent {

  @Input() items$: Observable<Item[]>;
  @Input() fields: Field[];
  @Input() editFields: EditField[];
  @Input() item2DTO: (item: any) => any;

  @Output() onItemSave = new EventEmitter<any>();
  @Output() onItemAdd = new EventEmitter<any>();
  @Output() onItemDelete = new EventEmitter<any>();

  selectedItems:  Item[] = [];
  sidebarVisible: boolean;
  fieldNames: string[];
  editedItem: Item;
  editedItems: Item[];

  constructor(
  ) {}

  ngOnInit() {
    this.fieldNames = this.fields.map(f => f.name);
  }

  onRowSelect(e: any) {
    // this.openEditor(this.selectedItems);
  }

  onRowUnselect() {
    if (!this.selectedItems.length) {
      this.closeEditor()
    }
  }

  openEditor(items?: Item[]) {
    this.sidebarVisible = true;
    if (items) {
      this.editedItems = items.map(item => this.item2DTO(item))
    } else {
      this.editedItems = [{id:0}];
    }
  }

  closeEditor() {
    this.sidebarVisible = false;
    this.editedItems = [];
    this.selectedItems = [];
  }

  save() {
    if(this.editedItems[0]?.id) {
      this.onItemSave.emit(this.editedItems[0]);
    } else {
      this.onItemAdd.emit(this.editedItems[0]);
    }
    this.closeEditor();
  }

  delete(items: Item[]) {
    this.onItemDelete.emit(items[0].id);
    this.selectedItems = [];
    this.closeEditor()
  }

  copy(items: Item[]) {
    this.onItemAdd.emit({...items[0], id: 0});
  }

}
