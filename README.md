## Install Angular CLI
- ```npm install -g @angular/cli```



## Create App
- ```ng new my-app-name```



## Run App
- ```ng serve```



## Routing

// app-routing.module.ts
```js
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/frontend/home/home.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
```

- Visit ```http://localhost:4200/home```