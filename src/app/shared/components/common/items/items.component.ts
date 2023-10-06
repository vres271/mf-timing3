import { Observable } from "rxjs";
import { Item, ItemDTO } from "src/app/shared/models/items.model";
import { DataService } from "src/app/shared/services/data.service";
import { ItemsService } from "src/app/shared/services/items.service";
import { EditField } from "../items-editor/items-editor.component";

export abstract class ItemsComponent<T extends Item, DTOType extends ItemDTO> {

  items$: Observable<T[]>;
  selectedItems:  T[] = [];
  editedItems: T[];
  fields: EditField[]

  constructor(
    public itemsService: ItemsService<T, DTOType>,
    public dataService: DataService,
  ) {
    this.items$ = this.itemsService.get();
  }

  openEditor(items: Item[]) {
    this.editedItems = items.map(item => item.id 
      ? (item as any).clone() 
      : new this.itemsService.itemClass({id: 0} as T, this.dataService.map));
  }

  copyItem(item: Item) {
    this.itemsService.add(item as DTOType)
      .subscribe()    
  }

  deleteItem(id: number) {
    this.itemsService.delete(id)
      .subscribe()    
  }

}
