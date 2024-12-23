import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import firebase from 'firebase/compat/app';
//import 'firebase/compat/auth';
import { environment } from './environments/environment.development';


firebase.initializeApp(environment.firebase);
let appInit = false;
firebase.auth().onAuthStateChanged(()=>{
  if(!appInit) {
  platformBrowserDynamic().bootstrapModule(AppModule, {
    ngZoneEventCoalescing: true
  })
    .catch(err => console.error(err));
}
appInit = true;
})

