import { Component, OnInit } from '@angular/core';
import {EventService} from '../../services/event.service';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {Event} from '../../models/event';
import {Transaction} from '../../models/transaction';
import {Router} from '@angular/router';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  itemList: Array<Event>;
  errorMessage: string;
  infoMessage: string;
  currentUser: User;

  constructor(private userService: UserService, private eventService: EventService, private router: Router) 
  {
    this.currentUser = this.userService.currentUserValue;
  }

  ngOnInit() {
    this.findAllItems();
  }

  findAllItems() {
    this.eventService.findAllItems().subscribe(data => {
      this.itemList = data;
    });
  }

  enroll(event: Event) {
    if(!this.currentUser){
      this.errorMessage = "You should sign in to enroll a item";
      return;
    }
    var transaction = new Transaction();
    transaction.userId = this.currentUser.id;
    transaction.event = event;

    this.eventService.enroll(transaction).subscribe(data => {
      this.infoMessage = "Mission is completed.";
    }, err => {
      this.errorMessage = "Unexpected error occurred.";
    });
  }

  detail(event: Event) {
    localStorage.setItem("currentItem", JSON.stringify(event));
    this.router.navigate(['/detail', event.id]);
  }
}
