import { Observable } from "rxjs";
import { Item, ItemDTO } from "src/app/shared/models/items.model";
import { DataService } from "src/app/shared/services/data.service";
import { ItemsService } from "src/app/shared/services/items.service";
import { EditField } from "../items-editor/items-editor.component";

export abstract class ItemsComponent<ItemType extends Item, DTOType extends ItemDTO> {

  items$: Observable<ItemType[]>;
  selectedItems:  ItemType[] = [];
  editedItems: ItemType[];
  fields: EditField[]

  constructor(
    public itemsService: ItemsService<ItemType, DTOType>,
    public dataService: DataService,
  ) {
    this.items$ = this.itemsService.get();
  }

  openEditor(items: Item[]) {
    this.editedItems = items.map(item => item.id 
      ? (item as any).clone() 
      : new this.itemsService.itemClass({id: 0} as ItemType, this.dataService.map));
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
