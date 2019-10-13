import Preference from './Preference';
import {createEl} from './utils';

export default class ChoicePreference extends Preference {

  constructor({name, label, description, choices, defaultValue}) {
    super({name, label, description, defaultValue});
    this.choices = choices;
    // Make sure we have default choice
    if(this._defaultValue === undefined && this.choices.length > 0){
      this._defaultValue = this.choices[0].name;
    }
    this._addChoices();
  }

  _buildEl() {
    return document.createElement('form');
  }

  _addChoices() {
    for (let choice of this.choices) {
      const checkedAttr = this._defaultValue === choice.name ? 'checked' : '';
      this.el.appendChild(createEl(`<div class="radio-container">
        <input type="radio" name="${this.name}" value="${choice.name}" ${checkedAttr}>
        <label for="${this.name}">${choice.label}</label>
        <c-information class="radio-container__description" text="${choice.description}"/>
    </div>
      `));
    }

  }

  get() {
    const formData = new FormData(this.el);
    return formData.get(this.name);
  }

  set({value}) {
    for (let $input of this.el.querySelectorAll('input')) {
      $input.checked = $input.value === value;
    }
    super.set({value});
  }
}

ChoicePreference.TYPE = 'choice';
