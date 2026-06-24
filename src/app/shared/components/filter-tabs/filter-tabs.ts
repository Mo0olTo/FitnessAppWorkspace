import { Component, computed, input, output } from '@angular/core';
import { FilterTab,  } from './models/filter-tabs.model';

@Component({
  selector: 'app-filter-tabs',
  imports: [],
  templateUrl: './filter-tabs.html',
  styleUrl: './filter-tabs.scss',
})
export class FilterTabs  {


  tabs = input.required<FilterTab[]>();
  muscleGroup = input<any[]>([]);

  tabChanged = output<FilterTab >();

  selectedTabs = input<string>('full-body');
  allTabs = computed(() => [
    ...this.tabs()
  ]);


  onSelectTab(tab: FilterTab): void {
    this.tabChanged.emit(tab);
  }


}
