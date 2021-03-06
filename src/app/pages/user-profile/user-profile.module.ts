import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserProfilePage } from './user-profile.page';
import { UserProfilePageRoutingModule } from './user-profile-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: '', component: UserProfilePage }]),
    UserProfilePageRoutingModule,
  ],
  declarations: [UserProfilePage]
})
export class UserProfilePageModule {}
