import { isPlatformBrowser } from '@angular/common';
import { DOCUMENT, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
type Language = 'en' | 'ar';
@Injectable({
  providedIn: 'root',
})
export class MyTranslate {
  private readonly VALID_LANGUAGES: Language[] = ['en', 'ar'];
  currentLang = signal<Language>('en');
  private readonly _translateService = inject(TranslateService);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly _document = inject(DOCUMENT);

  initLanguage(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const savedLang = localStorage.getItem('language') as Language;
    const lang = savedLang && this.VALID_LANGUAGES.includes(savedLang) ? savedLang : 'en';
    this.applyLang(lang);
  }

  switchLang(Lang: Language) {
    if (!isPlatformBrowser(this.platformId)) return;
    localStorage.setItem('language', Lang);
    this.applyLang(Lang);
  }

  private applyLang(lang: Language) {
    this.currentLang.set(lang);
    this._translateService.use(lang);
  }

  updateDocumentLanguage() {
    const Lang = this.currentLang();
    this._document.documentElement.dir = Lang === 'ar' ? 'rtl' : 'ltr';
    this._document.documentElement.lang = Lang;
  }
}
