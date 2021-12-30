import { Component, OnInit } from '@angular/core';
import { doSomething, dateFormat } from 'src/app/util/util.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  public currentTab: string = 'mission';

  public todayFormatedFunc = dateFormat('2021-12-30T06:47:00.241');
  public today = '2021-12-30T06:47:00.241'

  tabChange (selectedTab: string) {
    this.currentTab = selectedTab
  }


  public add = doSomething;
  
//  returnedData : any;
 

  constructor(
    // public add: doSomething
  ) { }


  ngOnInit(): void {
    // this.returnedData = doSomething('steve');
  }

}
