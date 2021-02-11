import { computed } from '@ember/object';
import { Ability } from 'ember-can';
import { inject as service } from '@ember/service';
import { Promise } from 'rsvp';

export default Ability.extend({
  currentUser: service(),
  session: service(),

  // only the person who wrote a post can edit it
  canEdit: computed(function () {
    if (!this.get('session.isAuthenticated')) {
      return false;
    }
    console.log(this.get('currentUser.user.group'));
    return new Promise((resolve, reject) => {
      return this.get('currentUser.user.group').then((group) => {
        resolve(group.get('isWrite'));
      }).catch(() => {
        reject(false);
      });
    });

  }).volatile(),

  canCreate: computed(function () {
    if (!this.get('session.isAuthenticated')) {
      return false;
    }
    console.log(this.get('currentUser.user.group'));
    return new Promise((resolve, reject) => {
      return this.get('currentUser.user.group').then((group) => {
        console.log(group);
        resolve(group.get('isAdmin'));
      }).catch(() => {
        reject(false);
      });
    });

  }).volatile()
});
