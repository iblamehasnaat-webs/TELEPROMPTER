import { Component, Output, EventEmitter, OnInit } from '@angular/core';
    import { Settings } from '../../interfaces/settings.interface';
    import { StorageService } from '../../services/storage.service';

    @Component({
      selector: 'app-settings',
      templateUrl: './settings.component.html',
      styleUrls: ['./settings.component.css']
    })
    export class SettingsComponent implements OnInit {
      @Output() settingsChange = new EventEmitter<Settings>();
      @Output() textChange = new EventEmitter<string>();
      settings: Settings = {
        horizontalFlip: false,
        verticalFlip: false,
        speed: 'medium',
        font: 'Arial',
        fontSize: 24,
        theme: 'light'
      };
      text: string = '';

      constructor(private storageService: StorageService) { }

      ngOnInit(): void {
        this.loadSettings();
        this.loadText();
      }

      loadSettings() {
        const savedSettings = this.storageService.loadSettings();
        if (savedSettings) {
          this.settings = savedSettings;
          this.applyTheme();
          this.emitSettings();
        }
      }

      loadText() {
        this.text = this.storageService.loadText() || '';
      }

      toggleHorizontalFlip() {
        this.settings.horizontalFlip = !this.settings.horizontalFlip;
        this.saveSettings();
      }

      toggleVerticalFlip() {
        this.settings.verticalFlip = !this.settings.verticalFlip;
        this.saveSettings();
      }

      saveSettings() {
        this.storageService.saveSettings(this.settings);
        this.emitSettings();
      }

      saveText() {
        this.storageService.saveText(this.text);
      }

      emitSettings() {
        this.settingsChange.emit(this.settings);
      }

      onTextChange(text: string) {
        this.textChange.emit(text);
      }

      toggleTheme() {
        this.settings.theme = this.settings.theme === 'light' ? 'dark' : 'light';
        this.applyTheme();
        this.saveSettings();
      }

      applyTheme() {
        document.documentElement.setAttribute('data-theme', this.settings.theme);
      }
    }
