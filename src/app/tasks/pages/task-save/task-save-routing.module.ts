import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TaskSavePage } from './task-save.page';

const routes: Routes = [
  {
    path: '',
    component: TaskSavePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TaskSavePageRoutingModule {}
