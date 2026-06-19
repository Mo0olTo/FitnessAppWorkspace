import { Component, computed, effect, EnvironmentInjector, inject, OnInit, runInInjectionContext, signal } from '@angular/core';
import { SectionTitle } from "../../shared/components/section-title/section-title";
import { FilterTabs } from "../../shared/components/filter-tabs/filter-tabs";
import { FilterTab } from '../../shared/components/filter-tabs/models/filter-tabs.model';
import { MuscleFacade } from '../../store/muscles/muscles.facade';
import { FILTER_TABS } from '../../shared/components/filter-tabs/filter-tabs-config/filter-tabs-config';
import { ReuseableCarousel } from "../../shared/components/carousel/carousel";
import { Muscle } from '../../shared/models/muscle-group-res';
import { FULL_BODY_CARDS, FULL_BODY_TAB } from '../../shared/components/filter-tabs/models/FULL-Body';

@Component({
  selector: 'app-classes',
  imports: [SectionTitle, FilterTabs, ReuseableCarousel],
  templateUrl: './classes.html',
  styleUrl: './classes.scss',
})
export class Classes implements OnInit {

  private readonly facade = inject(MuscleFacade);
  private readonly injector = inject(EnvironmentInjector);


  workoutTabs=FILTER_TABS.workoutCategories

  muscles = this.facade.allMuscles;
  loading = this.facade.isloading;
  error = this.facade.error;

  displayedGroup = signal<Muscle[]>(FULL_BODY_CARDS);
  isFullBody = signal<boolean>(true);

  muscleGroup = computed<Muscle[]>(() => this.displayedGroup());
  muscleTabs = computed<FilterTab[]>(() =>[
    FULL_BODY_TAB, 
    ...this.muscles().map(m => ({
      id: m._id,
      label: m.name
    }))
  ]);



  ngOnInit(): void {
    this.facade.loadAllMuscles();
    this.addFullBody()

  }
    

  addFullBody():void{
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const apiData = this.facade.muscleGroup();
        if (apiData?.length && !this.isFullBody()) {
          this.displayedGroup.set(apiData);
        }
      });
    });
  }

  onCategoryChange(tab: FilterTab): void {
    if (tab.id === 'full-body') {
      this.isFullBody.set(true);
      this.displayedGroup.set(FULL_BODY_CARDS);
      return;
    }
    this.isFullBody.set(false);
    this.facade.loadMusclesbyId(tab.id);
  }
}
