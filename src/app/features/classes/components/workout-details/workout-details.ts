import { Component, computed, effect, EnvironmentInjector, inject, input, OnInit, output, runInInjectionContext, signal } from '@angular/core';
import { SectionTitle } from "../../../../shared/components/section-title/section-title";
import { FilterTab } from '../../../../shared/components/filter-tabs/models/filter-tabs.model';
import { FULL_BODY_CARDS, FULL_BODY_TAB } from '../../../../shared/components/filter-tabs/models/FULL-Body';
import { MuscleFacade } from '../../../../store/muscles/muscles.facade';
import { Muscle } from '../../../../shared/models/muscle-group-res';
import { ExercisesFacade } from '../../../../store/exercises/exercises.facade';
import { Exercise } from '../../../../shared/models/exercise-res';
import { ListCard } from "../../../../shared/components/listCard/list-card/list-card";
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { RecommendedMeals } from "../../../../shared/components/recommended-meals/recommended-meals";

@Component({
  selector: 'app-workout-details',
  imports: [SectionTitle,  ListCard, RecommendedMeals],
  templateUrl: './workout-details.html',
  styleUrl: './workout-details.scss',
})
export class WorkoutDetails implements OnInit {

  private readonly facade = inject(MuscleFacade);
  private readonly exercisefacade = inject(ExercisesFacade);
  private readonly injector = inject(EnvironmentInjector);
  private readonly sanitizer = inject(DomSanitizer);

  muscles = this.facade.allMuscles
  loading = this.facade.isloading
  error = this.facade.error

  exercises=input<Exercise[]>([])
  isLoading = this.exercisefacade.isLoading
  isError =this.exercisefacade.error


  onAction=output<void>()

  selectedExercise = signal<Exercise | null>(null);
  shouldAutoplay = signal<boolean>(false); 
  showVideoInfo = signal(true);
  isClosing = signal(false);


  getSafeUrl(ex: Exercise | null, autoplay = false): SafeResourceUrl | null {
    const link = ex?.short_youtube_demonstration_link;
    if (!link) return null;

    let embedUrl = link;

    if (link.includes('watch?v=')) {
      embedUrl = link.replace('watch?v=', 'embed/');
    }

    if (link.includes('youtu.be')) {
      const id = link.split('youtu.be/')[1];
      embedUrl = `https://www.youtube.com/embed/${id}`;
    }

    if (autoplay) {
      embedUrl += (embedUrl.includes('?') ? '&' : '?') + 'autoplay=1';
    }

    return this.sanitizer.bypassSecurityTrustResourceUrl(embedUrl);
  }


  displayedGroup = signal<Muscle[]>(FULL_BODY_CARDS);
  isFullBody = signal<boolean>(true);

  muscleTabs = computed<FilterTab[]>(() =>[
    FULL_BODY_TAB,
    ...this.muscles().map(m => ({
      id: m._id,
      label: m.name
    }))
  ]);


  ngOnInit(): void {
    this.facade.loadAllMuscles();
    this.addFullBody();
    this.autoSelectFirstExercise();
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

  autoSelectFirstExercise(): void {
    runInInjectionContext(this.injector, () => {
      effect(() => {
        const list = this.exercises();
        if (list.length && !this.selectedExercise()) {
          this.selectedExercise.set(list[0]);
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

  onActionClick(){
    this.onAction.emit()
  }

  onSelectExercise(exercise: Exercise) {

    if (this.selectedExercise()?._id !== exercise._id) {
      this.shouldAutoplay.set(false);
    }
    
    this.selectedExercise.set(exercise);
    this.showVideoInfo.set(true);
  } 

  onPlayButton():void{
    if (this.shouldAutoplay()) return;

    this.shouldAutoplay.set(true);
    this.hideVideoInfo()
  }

  hideVideoInfo() {
    this.isClosing.set(true);
    setTimeout(() => {
      this.showVideoInfo.set(false);
      this.isClosing.set(false);
    }, 1000);
  }
}
