import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Item } from 'src/app/shared/models/items.model';
import { ItemsPanelService } from './items-panel.service';
import { ItemsEditorComponent } from '../items-editor/items-editor.component';

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

  @ViewChild(ItemsEditorComponent) editor: ItemsEditorComponent;

  selectedItems:  Item[] = [];
  sidebarVisible: boolean;
  fieldNames: string[];
  editedItem: Item;
  editedItems: Item[];

  constructor(
    private itemsPanelService: ItemsPanelService
  ) {}

  ngOnInit() {
    this.fieldNames = this.fields.map(f => f.name);
    this.itemsPanelService.onSave()
      .subscribe(res => {
        console.log('Save result', res)
      })
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
    this.editor.sidebarVisible = true;
    if (items) {
      this.editedItems = items.map(item => this.item2DTO(item))
    } else {
      this.editedItems = [{id:0}];
    }
  }

  closeEditor() {
    this.editor.sidebarVisible = false;
    this.editedItems = [];
    this.selectedItems = [];
  }

  save(item:any) {
    if(item?.id) {
      this.onItemSave.emit(item);
    }
    this.closeEditor();
  }

  add(item:any) {
    this.onItemAdd.emit(item);
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
