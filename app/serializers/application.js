import DS from 'ember-data';
import { isNone } from '@ember/utils';

export default DS.JSONSerializer.extend({

  keyForRelationship(key, typeClass, method) {
    if (typeClass === 'belongsTo') {
      return `${key}Id`;
    }

    return this._super(...arguments);
  },

  serializeBelongsTo(snapshot, json, relationship) {
    // super.serializeBelongsTo(...arguments);
    let key = relationship.key;
    let belongsTo = snapshot.belongsTo(key);

    key = this.keyForRelationship ? this.keyForRelationship(key, "belongsTo", "serialize") : key;
    json[key] = isNone(belongsTo) ? belongsTo : parseInt(belongsTo.record.get('id'));
  }
});
