import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Hero } from './hero/hero';
import { ImageComparison } from './image-comparison/image-comparison';
import { ResultsTables } from './results-tables/results-tables';
import { References } from './references/references';

@NgModule({
  declarations: [App, Hero, ImageComparison, ResultsTables, References],
  imports: [BrowserModule, AppRoutingModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
