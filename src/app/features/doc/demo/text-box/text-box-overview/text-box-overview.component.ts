import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'demo-text-box-overview',
  templateUrl: './text-box-overview.component.html',
  styleUrls: ['./text-box-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TextBoxOverviewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
