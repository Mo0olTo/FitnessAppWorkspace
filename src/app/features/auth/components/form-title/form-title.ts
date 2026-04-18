import { Component, input } from '@angular/core';

@Component({
  selector: 'app-form-title',
  imports: [],
  templateUrl: './form-title.html',
  styleUrl: './form-title.scss',
})
export class FormTitle { 

  title = input<string>('')
  subTitle = input<string>('')
  reverse = input<boolean>(false)

}
