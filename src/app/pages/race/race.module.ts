import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RaceComponent } from '../race/race.component';
import { RaceRoutingModule } from './race-routing.module';
import { MenuModule } from 'primeng/menu';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SidebarModule } from 'primeng/sidebar';
import { RacersComponent } from './racers/racers.component';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DateTimeModule } from 'src/app/shared/components/controls/date-time/date-time.module';
import { ItemsPanelModule } from 'src/app/shared/components/common/items-panel/items-panel.module';
import { RacersEditorComponent } from './racers/racers-editor/racers-editor.component';
import { RacesComponent } from './races/races.component';
import { RacersService } from 'src/app/shared/services/racers.service';
import { RacesService } from 'src/app/shared/services/races.service';
import { RacesEditorComponent } from './races/races-editor/races-editor.component';
import { TimingComponent } from './timing/timing.component';
import { RaceEventsService } from 'src/app/shared/services/race-events.service';
import { StepsModule } from 'primeng/steps';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TabViewModule } from 'primeng/tabview';

@NgModule({
  declarations: [
    RaceComponent,
    RacersComponent,
    RacersEditorComponent,
    RacesComponent,
    RacesEditorComponent,
    TimingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RaceRoutingModule,
    MenuModule,
    CardModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    SidebarModule,
    DropdownModule,
    DateTimeModule,
    ItemsPanelModule,
    StepsModule,
    ConfirmDialogModule,
    TabViewModule,
  ],
  providers: [
    RacersService,
    RacesService,
    RaceEventsService,
  ],

})
export class RaceModule { }
