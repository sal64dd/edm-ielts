import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAnalytics,getAnalytics,ScreenTrackingService,UserTrackingService } from '@angular/fire/analytics';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { provideFunctions,getFunctions } from '@angular/fire/functions';
import { provideMessaging,getMessaging } from '@angular/fire/messaging';
import { providePerformance,getPerformance } from '@angular/fire/performance';
import { provideStorage,getStorage } from '@angular/fire/storage';

import { RouterModule, Routes } from '@angular/router';
import { UnAuthLayoutComponent } from './views/unauth/unauth-layout.component';
import { CommonUiService } from './components/ui/common-ui/services/common-ui.service';
import { CommonApiService } from './services/common-api.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireModule } from '@angular/fire/compat';
import { StorageService } from './services/storage.service';
import { httpService } from './services/http.service';
import { CacheV1Service } from './services/cachev1.service';
import { HttpClientModule } from '@angular/common/http';
import { DictionaryServices } from './services/dictionary.service';
import { ModalEvalTestComponent } from './components/modals/modal-eval-test/modal-eval-test.component';
import { TestV3ApiService } from './services/test-v3-api.service';
import { ModalControllerService } from './services/modal-controller.service';
import { EdmCommonModule } from './components/common/ed-common.module';

import { CarouselModule } from 'ngx-owl-carousel-o';

import { NgChartsModule } from 'ng2-charts';
import { FullCalendarModule } from '@fullcalendar/angular';
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction'; // a plugin!

const routes: Routes = [
  {
    path: 'user',
    loadChildren: () => import('./views/user/user.module').then(m => m.UserLayoutModule),
    canLoad: []
  },
  {
    path: 'test',
    loadChildren: () => import('./views/tests/test-v3.module').then(m => m.TestV3Module),
    canLoad: []
  },
];

FullCalendarModule.registerPlugins([ // register FullCalendar plugins
  dayGridPlugin,
  interactionPlugin
]);

@NgModule({
  declarations: [
    AppComponent, UnAuthLayoutComponent, ModalEvalTestComponent,
  ],
  imports: [
    RouterModule.forRoot(routes),
    CarouselModule,
    BrowserAnimationsModule,

    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAnalytics(() => getAnalytics()),
    provideFirestore(() => getFirestore()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    NgbModule,

    HttpClientModule,
    EdmCommonModule,
    NgChartsModule,
    FullCalendarModule
  ],
  providers: [
    ScreenTrackingService, CommonUiService, CommonApiService,
    httpService, StorageService, CacheV1Service, DictionaryServices,
    TestV3ApiService, ModalControllerService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
