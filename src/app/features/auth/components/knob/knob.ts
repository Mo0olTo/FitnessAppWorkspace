import { Component, input, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KnobModule } from 'primeng/knob';

@Component({
  selector: 'app-knob',
  imports: [KnobModule, FormsModule],
  templateUrl: './knob.html',
  styleUrl: './knob.scss',
})
export class Knob {
  value = model<number>(1);
  min = input(0);
  max = input(6);
}
