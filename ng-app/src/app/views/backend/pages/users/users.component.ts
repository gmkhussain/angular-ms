import { Component, OnInit, OnDestroy } from '@angular/core';
import { UsersService } from './users.service';

import {  takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit, OnDestroy {

  users = [];
  destroy$: Subject<boolean> = new Subject<boolean>();
  constructor(private usersService: UsersService) { }

  ngOnInit() {
    // this.usersService.sendGetRequest().subscribe((data: any)=> {
    //   console.log(data);
    //   this.users = data;
    // })
    this.usersService.sendGetRequest().pipe(takeUntil(this.destroy$)).subscribe((data: any )=> {
      console.log(data);
      this.users = data;
    })
  }


  ngOnDestroy() {
    this.destroy$.next(true);
    // Unsubscribe from the subject
    this.destroy$.unsubscribe();
  }


}
