import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  imports: [
      CommonModule,
      FormsModule,
      IonicModule,
  ],
  declarations: [LoadingComponent],
  exports: [LoadingComponent]
})
export class ShareModule {}
