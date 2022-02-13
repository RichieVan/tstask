import ISliderModel from '../../interface/ISliderModel';
import { SliderModelValues } from '../../type/SliderModel';
import SliderProps from '../../type/SliderProps';

class SliderModel implements ISliderModel {
  min: number;

  max: number;

  step: number;

  values: number[];

  dotsValues: number[];

  constructor(props: SliderProps) {
    this.min = props.min;
    this.max = props.max;
    this.step = props.step || (this.getLength() / 20);
    this.values = props.values || this.calculateValues();
    this.dotsValues = [this.min];

    if (this.min >= this.max) {
      throw new Error('Минимальное значение не может быть больше максимального');
    }

    if (this.step > this.getLength()) {
      throw new Error('Шаг не может быть больше разницы минимального и максимального значения');
    }
  }

  getStep(): number {
    return this.step;
  }

  getLength(): number {
    const length = this.max - this.min;
    return length;
  }

  getValues(): number[] {
    return this.values;
  }

  getClosestValue(target: number): number {
    let closestVal = 0;
    this.values.reduce((max, value) => {
      const diff = Math.abs(value - target);

      if (diff <= max) {
        closestVal = value;
        return diff;
      }
      return max;
    }, this.getLength());
    return closestVal;
  }

  getClosestDotIndex(target: number): number {
    let closestIndex = 0;
    this.dotsValues.reduce((max, value, index) => {
      const diff = Math.abs(value - target);

      if (diff <= max) {
        closestIndex = index;
        return diff;
      }
      return max;
    }, this.getLength());
    return closestIndex;
  }

  calculateValues(): number[] {
    const { min, max, step } = this;
    const values: SliderModelValues = [];
    const steps = Math.round(this.getLength() / step);

    for (let i = 0; i < steps; i += 1) {
      const value = Math.round((min + i * step) * 1000) / 1000;
      values.push(value);
    }
    values.push(max);

    return values;
  }
}

export default SliderModel;
