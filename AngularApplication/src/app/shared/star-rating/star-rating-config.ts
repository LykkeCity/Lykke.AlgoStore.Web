import {
  starRatingSizes,
  starRatingSpeed,
  starRatingPosition,
  starRatingStarTypes,
  starRatingColor
} from './star-rating-struct';
import { Injectable } from '@angular/core';

/**
 * Configuration service for the StarRating component.
 * You can inject this service, typically in your root component, and customize the values of its properties in
 * order to provide default values for all the star ratings used in the application.
 */
@Injectable()
export class StarRatingConfigService {

  classEmpty = 'default-star-empty-icon';

  classHalf = 'default-star-half-icon';

  classFilled = 'default-star-filled-icon';

  numOfStars = 6;

  size: starRatingSizes = 'medium';

  speed: starRatingSpeed = 'noticeable';

  labelPosition: starRatingPosition = 'left';

  starType: starRatingStarTypes = 'svg';

  assetsPath = 'assets/images/';


  svgPath: string = this.assetsPath + 'star-rating.icons.svg';
  svgEmptySymbolId = 'star-empty';
  svgHalfSymbolId = 'star-half';
  svgFilledSymbolId = 'star-filled';

  svgPathEmpty: string = this.svgPath + '#' + this.svgEmptySymbolId;

  svgPathHalf: string = this.svgPath + '#' + this.svgHalfSymbolId;

  svgPathFilled: string = this.svgPath + '#' + this.svgFilledSymbolId;

  getColor(rating: number, numOfStars: number, staticColor?: starRatingColor): starRatingColor {
    rating = rating || 0;

    // if a fix color is set use this one
    if (staticColor) {
      return staticColor;
    }

    // calculate size of smallest fraction
    const fractionSize = numOfStars / 3;

    // apply color by fraction
    let color: starRatingColor = 'default';
    if (rating > 0) {
      color = 'negative';
    }
    if (rating > fractionSize) {
      color = 'ok';
    }
    if (rating > fractionSize * 2) {
      color = 'positive';
    }

    return color;
  }

  getHalfStarVisible(rating: number): boolean {
    return Math.abs(rating % 1) > 0;
  }

  setStars(value: number): void {
    this.numOfStars = value;
  }

  setClassEmpty(emptyClass: string): void {
    this.classEmpty = emptyClass;
  }

  setClassHalf(halfClass: string): void {
    this.classHalf = halfClass;
  }

  setSpeed(speed: starRatingSpeed): void {
    this.speed = speed;
  }

  setAssetsPath(assetsPath: string): void {
    this.assetsPath = assetsPath;
  }

}
