import Modifier from 'ember-modifier';
import { inject as service } from '@ember/service';

export default class SplitjsModifier extends Modifier {
  @service
  splitjs;

  get initialSize() {
    // Default to 25% width of available space
    return this.args.named.initialSize || 25;
  }

  didInstall() {
    this.splitjs.addPanel(
      this.element,
      this.initialSize,
      this.args.named.direction
    );
  }

  willRemove() {
    this.splitjs.removePanel(this.element);
  }
}
