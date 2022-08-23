import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

/**Components.*/
import { JulioCesarComponent } from './julio-cesar/julio-cesar.component';

const codenationRoutes: Routes = [
  {
    path: 'julio-cesar',
    component: JulioCesarComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(codenationRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class CodenationRoutingModule { }
