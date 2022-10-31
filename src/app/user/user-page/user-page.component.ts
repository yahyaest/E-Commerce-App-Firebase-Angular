import { Component, OnInit } from '@angular/core';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {

  constructor() { }
  user!:User
  profileImage!:string



  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user') as string)
    this.user.photoURL ? this.profileImage = this.user.photoURL : this.profileImage = "https://cdn-icons-png.flaticon.com/512/149/149071.png"
  }

}
