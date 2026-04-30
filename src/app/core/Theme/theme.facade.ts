import { computed, inject, Injectable } from "@angular/core";
import { Darkmode } from "./darkmode/darkmode";

@Injectable({providedIn: 'root'})
export class ThemeFacade {

    private readonly dark=inject(Darkmode) 

    currentTheme = this.dark.currentTheme

    isDark = computed(()=>this.currentTheme()=== 'dark')

    toggleTheme(){
        this.dark.toggleTheme()
    }

}