import { Component, OnInit } from '@angular/core';
import { SortablejsOptions } from 'angular-sortablejs';

@Component({
  selector: 'app-deleteme',
  templateUrl: './deleteme.component.html',
  styleUrls: ['./deleteme.component.scss']
})
export class DeletemeComponent {

  draggableItems = [
    { draggable: true, text: '1' },
    { draggable: true, text: '2' },
    { draggable: false, text: '3' },
    { draggable: true, text: '4' },
    { draggable: true, text: '5' },
  ];

  eventItems = [
    '1',
    '2',
    '3',
    '4',
    '5',
  ];

  eventUpdateCounter = 0;

  scrollableItems = Array.from({ length: 30 }).map((u, i) => i + 1);

  draggableOptions: SortablejsOptions = {
    draggable: '.draggable'
  };

  eventOptions: SortablejsOptions = {
    onUpdate: (event) => {
      this.eventUpdateCounter++;
      console.log('updating');
      console.log(event.oldIndex);
      console.log(event.newIndex);
      console.log(event);
    }

  };

  scrollableOptions: SortablejsOptions = {
    scroll: true,
    scrollSensitivity: 100,
  };

}
