import { NgModule } from '@angular/core';
    import { BrowserModule } from '@angular/platform-browser';
    import { FormsModule } from '@angular/forms';

    import { AppComponent } from './app.component';
    import { TeleprompterComponent } from './components/teleprompter/teleprompter.component';
    import { SettingsComponent } from './components/settings/settings.component';
    import { StorageService } from './services/storage.service';

    @NgModule({
      declarations: [
        AppComponent,
        TeleprompterComponent,
        SettingsComponent
      ],
      imports: [
        BrowserModule,
        FormsModule
      ],
      providers: [StorageService],
      bootstrap: [AppComponent]
    })
    export class AppModule { }
