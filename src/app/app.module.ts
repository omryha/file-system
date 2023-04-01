import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FilesModule } from './modules/files/files.module';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule} from '@angular/common/http';
@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    FilesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
