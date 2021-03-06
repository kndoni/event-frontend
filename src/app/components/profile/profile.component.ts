import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {Transaction} from '../../models/transaction';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  currentUser: User;
  transactionList: Array<Transaction>;

  constructor(private userService: UserService, private eventService: EventService,
    private router: Router) {
      this.currentUser = this.userService.currentUserValue;
    }

  ngOnInit() {
    if(!this.currentUser){
      this.router.navigate(['/login']);
      return;
    }
    this.findTransactionsOfUser();
  }

  findTransactionsOfUser() {
    this.eventService.findTransactionsOfUser(this.currentUser.id).subscribe(data => {
      this.transactionList = data;
    });
  }

  logOut(){
    this.userService.logOut().subscribe(data => {
      this.router.navigate(['/login']);
    });
  }
}
