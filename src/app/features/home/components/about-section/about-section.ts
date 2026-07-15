import { Component, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';

interface Feature {
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  imports: [SectionTitle],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
})
export class AboutSection {
  features = signal<Feature[]>([
    {
      title: 'Personal Trainer',
      description: 'Achieve your fitness goals with the guidance of our certified trainers.',
    },
    {
      title: 'Cardio Programs',
      description: 'From steady-state runs to interval sprints, our treadmill programs.',
    },
    {
      title: 'Quality Equipment',
      description: 'Our gym is equipped with the latest cardio & strength machines.',
    },
    {
      title: 'Healthy Nutritions',
      description: 'Fuel your fitness journey with customized meal plans for you.',
    },
  ]);
}
