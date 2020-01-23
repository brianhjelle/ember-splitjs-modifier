import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Service | splitjs', function(hooks) {
  setupTest(hooks);

  test('it adds a panel ...', function(assert) {
    let service = this.owner.lookup('service:splitjs');
    assert.ok(service);
  });

  test('it removes a panel ...', function(assert) {
    let service = this.owner.lookup('service:splitjs');
    assert.ok(service);
  });
});