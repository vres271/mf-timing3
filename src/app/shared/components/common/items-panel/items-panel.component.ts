import { Component, Input, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';

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

  @Input() items$: Observable<any[]>;
  @Input() fields: Field[];
  @Input() editFields: EditField[];
  @Input() itemsService: any;

  selectedItems:  any[] = [];
  sidebarVisible: boolean;
  fieldNames: string[];
  editedItem: any;
  editedItems: any[];

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

  openEditor(items?: any[]) {
    this.sidebarVisible = true;
    if (items) {
      this.editedItems = items.map(item => this.itemsService.item2DTO(item))
    } else {
      this.editedItems = [{}];
      this.editedItems[0].id = 0;
    }
  }

  closeEditor() {
    this.sidebarVisible = false;
    this.editedItems = [];
    this.selectedItems = [];
  }

  save() {
    if(this.editedItems[0]?.id) {
      this.itemsService.save(this.editedItems[0])
        .subscribe((res:any)=> {
          this.closeEditor()
        })
    } else {
      this.itemsService.add(this.editedItems[0])
        .subscribe((res:any)=> {
          this.closeEditor()
        })
    }
  }

  delete(items: any[]) {
    this.itemsService.delete(items[0].id)
      .subscribe((res:any)=> {
        console.log('deleted', res);
        this.selectedItems = [];
        this.closeEditor()
      })
  }

  copy(items: any[]) {
    this.itemsService.add({...items[0], id: 0})
      .subscribe((res:any)=> {
        console.log('deleted', res);
      })

  }


}
