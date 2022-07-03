import { Component, OnInit } from '@angular/core';
import {Event} from '../../models/event';
import {EventService} from '../../services/event.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit {

  eventId: number;
  currentEvent: Event;
  participantsList: Array<string>;

  constructor(private eventService: EventService, private route: ActivatedRoute) { 
    this.currentEvent = JSON.parse(localStorage.getItem('currentItem'));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')) {
        this.eventId = Number.parseInt(params.get('id'));
        this.findStudentsOfEvent();
        this.findStudentsOfEvent2();
      }
    });
  }

  findStudentsOfEvent() {
    this.eventService.findStudentsOfEvent(this.eventId).subscribe(data => {
      this.participantsList = data;
    });
  }

  findStudentsOfEvent2() {
    this.eventService.findStudentsOfEvent2(this.eventId).subscribe(data => {
      this.participantsList = data;
    });
  }

}
