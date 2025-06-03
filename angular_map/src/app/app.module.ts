import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SensorsService } from './map/services/sensor/sensors.service';
import { ReadingsService } from './map/services/readings/readings.service';

@NgModule({
  imports: [BrowserModule, HttpClientModule],
  declarations: [AppComponent],
  providers: [SensorsService, ReadingsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
