import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CalendarPageRoutingModule } from './calendar-routing.module';
import { CalendarPage } from './calendar.page';
import { CalendarModule } from 'ion2-calendar';
import { NgCalendarModule  } from 'ionic2-calendar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalendarModule,
    RouterModule.forChild([
      {
        path: '',
        component: CalendarPage
      }
    ]),
    CalendarPageRoutingModule,
    NgCalendarModule,
  ],
  declarations: [CalendarPage]
})
export class CalendarPageModule {}


