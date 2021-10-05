import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'showcase-documentation',
  templateUrl: './documentation.component.html',
  styleUrls: ['./documentation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DocumentationComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
