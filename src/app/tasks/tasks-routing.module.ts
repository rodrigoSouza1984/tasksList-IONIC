import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../core/guards/auth.guard';
import { TaskSavePageModule } from './pages/task-save/task-save.module';
import { TasksListPageModule } from './pages/tasks-list/tasks-list.module';

const routes: Routes = [

  {
    path: '',
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'create',//jeito do ionic 5
        loadChildren: () => import('./pages/task-save/task-save.module').then( m => m.TaskSavePageModule)
      },
      {
        path: 'edit/:id',//buscando pelo id
        loadChildren: () => import('./pages/task-save/task-save.module').then( m => m.TaskSavePageModule)
      },
      {
        path: '',//jeito do ionic 4
        loadChildren: './pages/tasks-list/tasks-list.module#TasksListPageModule'
      }      
    ]  
  },
  
  
];

@NgModule({
  imports: [RouterModule.forChild(routes), TasksListPageModule, TaskSavePageModule],
  exports: [RouterModule]
})
export class TasksRoutingModule { }
