import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

/**Routes.*/
import { CodenationRoutingModule } from './codenation-routing.module';

/**Services.*/
import { CodenationService } from './codenation.service';

/**Components.*/
import { JulioCesarComponent } from './julio-cesar/julio-cesar.component';

@NgModule({
  declarations: [
    JulioCesarComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CodenationRoutingModule
  ],
  providers: [
    CodenationService
  ]
})
export class CodenationModule { }
