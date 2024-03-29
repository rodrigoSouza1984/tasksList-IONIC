import { Component,  } from '@angular/core';
import { NavController } from '@ionic/angular';
import {  Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { OverlayService } from 'src/app/core/services/overlay.service';
import { Task } from '../../models/task.models';
import { TasksService } from '../../services/tasks.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.page.html',
  styleUrls: ['./tasks-list.page.scss'],
})
export class TasksListPage  {

  tasks$: Observable<Task[]>;

  constructor(private navCtrl: NavController, private overlayService: OverlayService ,private taskService: TasksService) { }

  async ionViewDidEnter(): Promise<void> {
    const loading = await this.overlayService.loading();
    this.tasks$ = this.taskService.getAll();
    this.tasks$.pipe(take(1)).subscribe(tasks => loading.dismiss())
  }

  onUpdate(task: Task): void {
    this.navCtrl.navigateForward(['tasks', 'edit', task.id]);
  }

  async onDelete(task: Task): Promise<void> {
    await this.overlayService.alert({
      message: `Do you really want to delete the task "${task.title}"`,
      buttons: [
        {
          text: 'Yes',
          handler: async() => {
            await this.taskService.delete(task);
            await this.overlayService.toast({
              message: `Task "${task.title}" deleted!`
            });
          }
        },
        'No'
      ]
    })
  }

  async onDone(task: Task): Promise<void>{
    const taskToUpdate = { ...task, done: !task.done };
    await this.taskService.update(taskToUpdate);
    await this.overlayService.toast({
      message: `Task "${task.title}" ${taskToUpdate.done ? 'completed' : 'updated'}!!`
    });
  }

}
