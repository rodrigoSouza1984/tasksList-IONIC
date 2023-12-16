import { NgModule } from '@angular/core';


import { TaskSavePageRoutingModule } from './task-save-routing.module';

import { TaskSavePage } from './task-save.page';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    TaskSavePageRoutingModule
  ],
  declarations: [TaskSavePage]
})
export class TaskSavePageModule {}
