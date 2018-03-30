import {Component, OnChanges, EventEmitter, forwardRef} from '@angular/core';
import {OnClickEvent, OnRatingChangeEven, OnHoverRatingChangeEvent} from './star-rating-struct';
import {StarRating} from './star-rating';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from '@angular/forms';

import {StarRatingUtils} from './star-rating.utils';
import { StarRatingConfigService } from './star-rating-config';

const STAR_RATING_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StarRatingComponent),
  multi: true
};


@Component({
  selector: 'app-star-rating-comp',
  providers: [STAR_RATING_CONTROL_ACCESSOR],
  inputs: [
    'getHalfStarVisible'
    , 'getColor'
    , 'showHalfStars'
    , 'hoverEnabled'
    , 'rating'
    , 'step'
    , 'disabled'
    , 'readOnly'
    , 'space'
    , 'starType'
    , 'size'
    , 'speed'
    , 'numOfStars'
    , 'direction'
    , 'staticColor'
    , 'labelPosition'
    , 'labelText'
    , 'id'
  ],
  outputs: [
    'onClick'
    , 'onRatingChange'
    , 'onHoverRatingChange'
  ],
  templateUrl: 'star-rating.component.html'
})
export class StarRatingComponent extends StarRating implements OnChanges, ControlValueAccessor {

  onRatingChange: EventEmitter<OnRatingChangeEven> = new EventEmitter<OnRatingChangeEven>();
  onHoverRatingChange: EventEmitter<OnHoverRatingChangeEvent> = new EventEmitter<OnHoverRatingChangeEvent>();
  onTouch: Function;
  onModelChange: Function;
  private onModelChangeRegistered = false;
  private onTouchRegistered = false;

  // Outputs
  ///////////////////////////////////////////////////////////////////////////////////////////
  onClick: EventEmitter<OnClickEvent> = new EventEmitter<OnClickEvent>();

  saveOnClick($event: OnClickEvent) {
    if (this.onClick) {
      this.onClick.emit($event);
    }
  }


  saveOnRatingChange($event: OnRatingChangeEven) {
    if (this.onRatingChange) {
      this.onRatingChange.emit($event);
    }
  }


  saveOnHover($event: OnHoverRatingChangeEvent) {
    if (this.onHoverRatingChange) {
      this.onHoverRatingChange.emit($event);
    }
  }


  saveOnTouch() {
    if (this.onTouchRegistered) {
      this.onTouch();
    }
  }

  saveOnModelChange(value: number) {
    if (this.onModelChangeRegistered) {
      this.onModelChange(value);
    }
  }

  /**ACCESSIBILITY **/

  // Keyboard events
  onKeyDown(event: KeyboardEvent) {

    const handlers: any = {
      // Decrement
      Minus: () => this.decrement(),
      ArrowDown: () => this.decrement(),
      ArrowLeft: () => this.decrement(),

      // Increment
      Plus: () => this.increment(),
      ArrowRight: () => this.increment(),
      ArrowUp: () => this.increment(),

      // Reset
      Backspace: () => this.reset(),
      Delete: () => this.reset(),
      Digit0: () => this.reset()
    };

    const handleDigits = (eventCode: string): void => {
      const dStr = 'Digit';
      const digit: number = parseInt(eventCode.substr(dStr.length, eventCode.length - 1));
      this.rating = digit;
    };

    if (handlers[event['code']] || StarRatingUtils.isDigitKeyEventCode(event['code'])) {
      if (StarRatingUtils.isDigitKeyEventCode(event['code'])) {
        handleDigits(event['code']);
      } else {
        handlers[event['code']]();
      }
      event.preventDefault();
      event.stopPropagation();
    }

    this.saveOnTouch();
  }

  // Focus events
  onBlur(event: FocusEvent) {
    this.focus = false;
    event.preventDefault();
    event.stopPropagation();
    this.saveOnTouch();
  }

  onFocus(event: FocusEvent) {
    this.focus = true;
    event.preventDefault();
    event.stopPropagation();
    this.saveOnTouch();
  }

  // Hover events
  onStarHover(rating?: number): void {

    if (!this.interactionPossible() || !this.hoverEnabled) {
      return;
    }

    this.hoverRating = rating ? parseInt(rating.toString()) : 0;

    // fire onHoverRatingChange event
    const $event: OnHoverRatingChangeEvent = { hoverRating: this.hoverRating};
    this.saveOnHover($event);


  }

  /**Form Control - ControlValueAccessor implementation**/

  writeValue(obj: any): void {
    this.rating = obj;
  }

  registerOnChange(fn: any): void {
    this.onModelChange = fn;
    this.onModelChangeRegistered = true;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
    this.onTouchRegistered = true;
  }

  constructor(public config: StarRatingConfigService) {
    super(config);
  }

  // Overrides
  setRating(value: number): void {
    const initValue = this.rating;
    super.setRating(value);

    // if value changed trigger valueAccessor events and outputs
    if (initValue !== this.rating) {
      const $event: OnRatingChangeEven = {rating: this.rating};
      this.saveOnRatingChange($event);

      this.saveOnModelChange(this.rating);
    }

  }

  /**
   * onStarClicked
   *
   * Is fired when a star is clicked. And updated the rating value.
   * This function returns if the disabled or readOnly
   * property is set. If provided it emits the onClick event
   * handler with the actual rating value.
   *
   * @param rating
   */
  onStarClicked(rating: number): void {

    // fire onClick event
    if (!this.interactionPossible()) {
      return;
    }

    this.rating = rating;

    const onClickEventObject: OnClickEvent = {
      rating: this.rating
    };
    this.saveOnClick(onClickEventObject);

  }

  /**
   * ngOnChanges
   * @param changes
   */
  ngOnChanges(changes: any): void {

  }

}
