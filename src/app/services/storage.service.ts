import { Injectable } from '@angular/core';
    import { Settings } from '../interfaces/settings.interface';

    @Injectable({
      providedIn: 'root'
    })
    export class StorageService {

      constructor() { }

      saveSettings(settings: Settings) {
        localStorage.setItem('teleprompterSettings', JSON.stringify(settings));
      }

      loadSettings(): Settings {
        const settings = localStorage.getItem('teleprompterSettings');
        return settings ? JSON.parse(settings) : {
          horizontalFlip: false,
          verticalFlip: false,
          speed: 'medium',
          font: 'Arial',
          fontSize: 24,
          theme: 'light'
        };
      }

      saveText(text: string) {
        localStorage.setItem('teleprompterText', text);
      }

      loadText(): string | null {
        return localStorage.getItem('teleprompterText');
      }
    }
