import { Component, signal } from '@angular/core';
import { SectionTitle } from '../../../../shared/components/section-title/section-title';
import { TranslatePipe } from '@ngx-translate/core';

interface Feature {
  title: string;
  description: string;
}

@Component({
  selector: 'app-about-section',
  imports: [SectionTitle, TranslatePipe],
  templateUrl: './about-section.html',
  styleUrl: './about-section.scss',
})
export class AboutSection {
  features = signal<Feature[]>([
    {
      title: 'about.features.personal_trainer_title',
      description: 'about.features.personal_trainer_desc',
    },
    {
      title: 'about.features.cardio_programs_title',
      description: 'about.features.cardio_programs_desc',
    },
    {
      title: 'about.features.quality_equipment_title',
      description: 'about.features.quality_equipment_desc',
    },
    {
      title: 'about.features.healthy_nutritions_title',
      description: 'about.features.healthy_nutritions_desc',
    },
  ]);
}
