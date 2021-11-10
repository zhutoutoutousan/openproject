import {
  ChangeDetectionStrategy,
  Component,
  Input,
  HostBinding,
} from '@angular/core';
import { Subject } from 'rxjs';

export interface IOpSidemenuItem {
  title:string;
  icon?:string;
  count?:number;
  href?:string;
  uiSref?:string;
  uiParams?:unknown;
  children?:IOpSidemenuItem[];
  collapsible?:boolean;
}

@Component({
  selector: 'op-sidemenu',
  templateUrl: './sidemenu.component.html',
  styleUrls: ['./sidemenu.component.sass'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OpSidemenuComponent {
  @HostBinding('class.op-sidemenu') className = true;

  @Input() items:IOpSidemenuItem[] = [];

  @Input() title:string;

  @Input() collapsible = true;

  public collapsed$ = new Subject();

  constructor() {
    this.collapsed$.next(false);
  }
}
