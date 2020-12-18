import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'doc-component-property',
  templateUrl: './component-property.component.html',
  styleUrls: ['./component-property.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ComponentPropertyComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
