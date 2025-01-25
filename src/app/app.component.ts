import { Component } from '@angular/core';
    import { Settings } from './interfaces/settings.interface';
    import { StorageService } from './services/storage.service';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      currentSettings: Settings;
      currentText: string = '';

      constructor(private storageService: StorageService) {
        this.currentSettings = this.storageService.loadSettings();
        this.currentText = this.storageService.loadText() || 'Your text here...';
      }

      onSettingsChange(settings: Settings) {
        this.currentSettings = settings;
      }

      onTextChange(text: string) {
        this.currentText = text;
      }
    }
