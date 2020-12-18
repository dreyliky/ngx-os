import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'doc-component-layout',
  templateUrl: './component-layout.component.html',
  styleUrls: ['./component-layout.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
