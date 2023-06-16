import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';

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

  @Output() onItemDelete = new EventEmitter<any>();
  @Output() onItemCopy = new EventEmitter<Item>();
  @Output() onEditorOpen = new EventEmitter<Item[]>();

  selectedItems:  Item[] = [];
  fieldNames: string[];

  constructor() {}

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
    if (items) {
      this.onEditorOpen.emit(items)
    } else {
      this.onEditorOpen.emit([{id:0}]);
    }
  }

  closeEditor() {
    this.selectedItems = [];
  }

  delete(items: Item[]) {
    this.onItemDelete.emit(items[0].id);
    this.selectedItems = [];
    this.closeEditor()
  }

  copy(items: Item[]) {
    this.onItemCopy.emit({...items[0], id: 0});
  }

}
