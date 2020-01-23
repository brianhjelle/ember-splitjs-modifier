import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';
import sinon from 'sinon';

const initialSize = 25;
const defaultDirection = 'horizontal';

//Stub service
class SplitServiceStub extends Service {
  addPanel() {}
  removePanel() {}
}

module('Integration | Modifier | splitjs', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function(assert) {    
    this.owner.register('service:splitjs', SplitServiceStub);
  });

  test('it calls addPanel upon installation into the DOM', async function(assert) {
    const splitService = this.owner.lookup('service:splitjs');
    sinon.spy(splitService, 'addPanel');

    await render(hbs`<div class="ember-splitjs-modifier-container">
      <div id="left" {{splitjs initialSize=45 direction="vertical"}}>Left</div>
      <div id="right" {{splitjs initialSize=55 direction="vertical"}}>Right</div>
    </div>`);

    const left = this.element.querySelector('#left');
    const right = this.element.querySelector('#right');
    const actualLeftArgs = splitService.addPanel.firstCall.args;
    const actualRightArgs = splitService.addPanel.secondCall.args;

    assert.ok(splitService.addPanel.calledTwice);
    assert.ok(actualLeftArgs[0].isSameNode(left));
    assert.ok(actualRightArgs[0].isSameNode(right));
    assert.equal(actualLeftArgs[1], 45, 'initial size is respected');
    assert.equal(actualRightArgs[1], 55, 'initial size is respected');
    assert.equal(actualLeftArgs[2], 'vertical', 'direction is respected');
    assert.equal(actualRightArgs[2], 'vertical', 'direction is respected');
  });

  test('it calls removePanel when torn down from DOM', async function(assert) {
    const splitService = this.owner.lookup('service:splitjs');
    sinon.spy(splitService, 'removePanel');
    this.set('showLeft', true);
    this.set('showRight', true);

    await render(hbs`<div class="ember-splitjs-modifier-container">
      {{#if this.showLeft}}
        <div id="left1" {{splitjs}}>Left</div>
      {{/if}}
      {{#if this.showRight}}
        <div id="right1" {{splitjs}}>Right</div>
      {{/if}}
    </div>`);

    const left = this.element.querySelector('#left1');
    const right = this.element.querySelector('#right1');
    this.set('showLeft', false);
    this.set('showRight', false);
    const actualLeft = splitService.removePanel.firstCall.args[0];
    const actualRight = splitService.removePanel.secondCall.args[0];

    assert.ok(actualLeft.isSameNode(left));
    assert.ok(actualRight.isSameNode(right));
  });

  // Replace this with your real tests.
  test('it defaults to an initial size of 25 and undefined direction', async function(assert) {
    const splitService = this.owner.lookup('service:splitjs');
    sinon.spy(splitService, 'addPanel');

    await render(hbs`<div class="ember-splitjs-modifier-container">
      <div id="left" {{splitjs}}>Left</div>
      <div id="right" {{splitjs}}>Right</div>
    </div>`);

    const actualLeftArgs = splitService.addPanel.firstCall.args;
    const actualRightArgs = splitService.addPanel.secondCall.args;

    assert.equal(actualLeftArgs[1], 25, 'default size is 25');
    assert.equal(actualRightArgs[1], 25, 'default size is 25');
    assert.equal(actualLeftArgs[2], undefined, 'default direction is undefined');
    assert.equal(actualRightArgs[2], undefined, 'default direction is undefined');
  });
});
