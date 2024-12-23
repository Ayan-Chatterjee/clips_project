import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {AngularFirestore, AngularFirestoreCollection} from '@angular/fire/compat/firestore';
import IUser from '../models/user.model';
import { Observable,of } from 'rxjs';
import {delay, filter, map,switchMap} from 'rxjs/operators';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { json } from 'stream/consumers';

interface RouteData {
  authOnly?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private userCollection: AngularFirestoreCollection<IUser>;
  public isAuthenticated$ : Observable<boolean>;
  public isAuthenticatedWithDelay$ : Observable<boolean>;
  private redirect = false;

  

  constructor(
    private auth: AngularFireAuth,
    private db: AngularFirestore,
    private router: Router,
    private route: ActivatedRoute
  ) { 
    this.userCollection = this.db.collection<IUser>('users');
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )
    
    this.router.events
  .pipe(
    filter((e) => e instanceof NavigationEnd),
    map(() => this.route.firstChild), // Ensure it picks the first child route
    switchMap((route) => route?.data ?? of<RouteData>({})), // Default to an empty object if no data
  )
  .subscribe((data) => {
    this.redirect = data?.authOnly ?? false; // Use optional chaining for safety
  });
  }

  public async createsUser(userData:IUser){

    if(!userData.password){
      throw new Error('Password is required');
    }

    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, 
      userData.password as string
    )
    if(!userCred.user)
    {
      throw new Error('User can not be found');
    }
    await this.userCollection.doc(userCred.user.uid).set({
      name: userData.name,
      email: userData.email,
      age: userData.age,
      phoneNumber: userData.phoneNumber
    })

    await userCred.user.updateProfile({
      displayName: userData.name
    })
  }
  async logout($event?: Event){
    if($event){
        $event.preventDefault();
    }
    await this.auth.signOut();
    if(this.redirect){
     await this.router.navigateByUrl('/');
    }
  }

}
