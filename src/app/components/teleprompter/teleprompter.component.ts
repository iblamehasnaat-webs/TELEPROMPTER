import { Component, ViewChild, ElementRef, Input, OnChanges, SimpleChanges, HostListener } from '@angular/core';
    import { Settings } from '../../interfaces/settings.interface';
    import { StorageService } from '../../services/storage.service';

    @Component({
      selector: 'app-teleprompter',
      templateUrl: './teleprompter.component.html',
      styleUrls: ['./teleprompter.component.css']
    })
    export class TeleprompterComponent implements OnChanges {
      @Input() settings: Settings = {
        horizontalFlip: false,
        verticalFlip: false,
        speed: 'medium',
        font: 'Arial',
        fontSize: 24,
        theme: 'light'
      };
      @Input() text: string = '';
      @ViewChild('teleprompterText') teleprompterText!: ElementRef;

      scrollInterval: any;
      scrollPosition: number = 0;
      isScrolling: boolean = false;
      isFullscreen: boolean = false;

      constructor(private storageService: StorageService) {
      }

      ngOnChanges(changes: SimpleChanges): void {
        if (changes['settings']) {
          this.applySettings();
        }
      }

      ngAfterViewInit() {
        this.applySettings();
      }

      applySettings() {
        this.updateTextTransform();
      }

      getTransform(): string {
        let transform = '';
        if (this.settings.horizontalFlip) {
          transform += 'scaleX(-1) ';
        }
        if (this.settings.verticalFlip) {
          transform += 'scaleY(-1) ';
        }
        return transform.trim();
      }

      updateTextTransform() {
        if (this.teleprompterText) {
          this.teleprompterText.nativeElement.style.transform = this.getTransform();
        }
      }

      play() {
        if (this.isScrolling) return;
        this.isScrolling = true;
        this.scrollInterval = setInterval(() => {
          if (this.teleprompterText) {
            this.teleprompterText.nativeElement.scrollTop += this.getScrollSpeed();
            this.scrollPosition = this.calculateScrollPercentage();
          }
        }, this.getInterval());
      }

      pause() {
        this.isScrolling = false;
        clearInterval(this.scrollInterval);
      }

      reset() {
        this.isScrolling = false;
        clearInterval(this.scrollInterval);
        if (this.teleprompterText) {
          this.teleprompterText.nativeElement.scrollTop = 0;
          this.scrollPosition = 0;
        }
      }

      onScroll() {
        this.scrollPosition = this.calculateScrollPercentage();
      }

      onManualScroll(event: any) {
        if (this.teleprompterText) {
          const scrollHeight = this.teleprompterText.nativeElement.scrollHeight - this.teleprompterText.nativeElement.clientHeight;
          const newScrollTop = (event.target.value / 100) * scrollHeight;
          this.teleprompterText.nativeElement.scrollTop = newScrollTop;
          this.scrollPosition = this.calculateScrollPercentage();
        }
      }

      calculateScrollPercentage(): number {
        if (!this.teleprompterText) return 0;
        const scrollTop = this.teleprompterText.nativeElement.scrollTop;
        const scrollHeight = this.teleprompterText.nativeElement.scrollHeight - this.teleprompterText.nativeElement.clientHeight;
        return scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
      }

      getInterval(): number {
        switch (this.settings.speed) {
          case 'slow': return 100;
          case 'medium': return 50;
          case 'fast': return 20;
          default: return 50;
        }
      }

      getScrollSpeed(): number {
        switch (this.settings.speed) {
          case 'slow': return 1;
          case 'medium': return 2;
          case 'fast': return 4;
          default: return 2;
        }
      }

      toggleFullscreen() {
        if (!this.isFullscreen) {
          if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
          }
        } else {
          if (document.exitFullscreen) {
            document.exitFullscreen();
          }
        }
        this.isFullscreen = !this.isFullscreen;
      }

      @HostListener('document:fullscreenchange', ['$event'])
      onFullscreenChange(event: any) {
        this.isFullscreen = !!document.fullscreenElement;
      }
    }
