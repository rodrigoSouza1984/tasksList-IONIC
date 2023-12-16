import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Firestore } from 'src/app/core/classes/firestore.class';
import { AuthService } from 'src/app/core/services/auth.service';
import { Task } from '../models/task.models';

@Injectable({
  providedIn: 'root'
})
export class TasksService extends Firestore<Task> {

  constructor(private authService: AuthService, db: AngularFirestore) {
    super(db);
    this.init();
  }

  private init(): void{
    this.authService.authState$.subscribe(user => {
      if (user) {
        this.setCollection(`/users/${user.uid}/tasks`);
        return;
      }
      this.setCollection(null);
    });
  }
  
}
