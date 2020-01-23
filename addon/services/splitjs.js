import Service from '@ember/service';
import Split from 'split.js';

const defaultOptions = function() {
  return {
    gutterSize: 7,
    minSize: 30
  };
};

/**
 * Finds the split group that a DOM element belongs to
 * @param {DOM element} element the DOM element of interest
 * @param {[SplitGroup]} splitGroups an array of SplitGroups
 * @returns a SplitGroup or undefined if no group found
 */
const findSplitGroup = function(element, splitGroups) {
  return splitGroups.find(
    group => group.key.isSameNode(element.parentElement)
  );
}

/**
 * Applies SplitJs to the list of dom elements
 * @param {*} panels an array of panel objects
 * @param {*} direction horizontal, vertical, or undefined
 * @returns the split instance
 */
const splitIt = (panels, callback, direction) => {
  if (panels.length > 1) {
    let options = defaultOptions();
    if (direction) {
      options.direction = direction;
    }
    return Split(
      panels.map(panel => panel.element),
      {
        ...options,
        sizes: panels.map(panel => panel.size),
        onDragEnd: (sizes) => {
          callback(sizes);
        }
      }
    );
  } else {
    return null;
  }
}

// A collection of panels all in the same direction
// e.g. a horizontal split group and a vertical split group
class SplitGroup {
  constructor(key, panel, direction) {
    this.key = key;
    this.panels = [ panel ];
    this.direction = direction;
    this.splitInstance = null;
  }

  /**
   * Records the new sizes of the panels because the user could
   * have dragged the split divider around and changed the size
   * @param {*} sizes 
   */
  dragEndCallback(sizes) {
    this.panels = this.panels.map((panel, index) => {
      return { ...panel, size: sizes[ index ] };
    });
  }

  addPanel(panel) {
    const children = [ ...panel.element.parentElement.children ];
    const panels = [
      ...this.panels,
      panel
    ];
    const orderedPanels = children
      .map(child => {
        return panels.find(p => p.element.isSameNode(child));
      })
      .filter(p => p !== undefined);
  
    this.panels = orderedPanels;
    if (this.splitInstance) {
      this.splitInstance.destroy();
    }
    this.splitInstance = splitIt(this.panels, this.dragEndCallback.bind(this), this.direction);
  }

  removePanel(element) {
    if (this.splitInstance) {
      this.splitInstance.destroy();
    }
    this.panels = this.panels.filter(panel => panel.element !== element);
    this.splitInstance = splitIt(this.panels, this.dragEndCallback.bind(this), this.direction);
  }
}

export default class SplitjsService extends Service {
  splitGroups = [];

  addPanel(element, initialSize, direction) {
    const parent = element.parentElement;
    const panel = {
      element,
      size: initialSize
    };
    // Search for existing SplitGroup
    const splitGroup = findSplitGroup(element, this.splitGroups);
    if (splitGroup) {
      splitGroup.addPanel(panel);
    } else {
      this.splitGroups = [
        ...this.splitGroups,
        new SplitGroup(parent, panel, direction)
      ];
    }
  }
 
  removePanel(element) {
    // Search for existing SplitGroup
    const splitGroup = findSplitGroup(element, this.splitGroups);
    if (splitGroup) {
      splitGroup.removePanel(element);
    }
  }
}
