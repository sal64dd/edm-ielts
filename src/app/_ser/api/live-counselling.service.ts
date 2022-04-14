import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { throwError } from 'rxjs';
import { map } from 'rxjs/operators';
const resources = {
  activeSessions: 'live-counselling-sessions',
  waitlist:'user-waitlist'
}

@Injectable({providedIn: 'root'})
export class LiveCounsellingService {

  constructor(private store: Firestore, private afs: AngularFirestore) {
  }

  getSessions(){
    return collectionData(collection(this.store, resources.activeSessions));
  }

  getWaitlist(){
    return this.afs.collection(resources.waitlist).valueChanges({idField: 'id'});
  }

  createSession(sessionId, userData){
    this.afs.collection(resources.waitlist).doc(userData.id).delete();

    return this.afs.collection(resources.activeSessions).add({
      'mod-link': "test1",
      'user-link': "1b4f0e9851971998e732078544c96b36c3d01cedf7caa332359d6f1d83567014",
      userid: userData.id + ''
    });

  }

  addUserToWaitlist(res){
    return this.afs.collection(resources.waitlist).add(res);
  }

  getSessionWithUserId(id){
    return this.afs.collection(resources.activeSessions, ref => ref.where('userid', '==', id)).valueChanges().pipe(map(s => {
      if(s && s?.length > 0){
        return s;
      } else{
        throw Error('no sessions found with id: '+ id)
      }
    }));
  }

  getSessionWithId(id){
    return this.afs.collection(resources.activeSessions).doc(id).valueChanges().pipe(map(s => {
      if(s){
        return s;
      } else{
        throw Error('no sessions found with id: '+ id)
      }
    }));
  }



}
