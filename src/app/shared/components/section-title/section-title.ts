import { Component, input } from '@angular/core';

@Component({
  selector: 'app-section-title',
  imports: [],
  templateUrl: './section-title.html',
  styleUrl: './section-title.scss',
})
export class SectionTitle {

  sectionTitleImage=input<string>('') 
  logo=input<string>('')
  sectionName=input<string>('') 

  centeredName=input<boolean>(false)

}
