import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'showcase-taskbar-button',
  templateUrl: './taskbar-button.component.html',
  styleUrls: ['./taskbar-button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskbarButtonComponent {

}
