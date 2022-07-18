import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: 'user-profile.page.html',
  styleUrls: ['user-profile.page.scss']
})
export class UserProfilePage implements OnInit{

  user: User;

  constructor(private userService: UserService) {}

  ngOnInit(): void {


  }

  ionViewWillEnter() {
    this.userService.userData.then((res)=>{
      this.user =res;
      console.log('User: ',this.user);
    });
  }

}
