import { Component, OnInit } from '@angular/core';
import { doSomething } from 'src/app/util/util.services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  public currentTab: string = 'mission';

  tabChange (selectedTab: string) {
    this.currentTab = selectedTab
  }

  // tabChange = tabChanger( this.currentTab );

  add = doSomething;


  constructor(
  ) { }

  
  ngOnInit(): void {
  }

}
