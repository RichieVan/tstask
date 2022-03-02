import ISliderModel from '../../interface/ISliderModel';
import ISliderPresenter from '../../interface/ISliderPresenter';
import SliderProps from '../../type/SliderProps';
import ISliderView from '../../interface/ISliderView';
import SliderModel from '../models/SliderModel';
import SliderView from '../views/SliderView';
import SliderViewProps from '../../type/SliderViewProps';

class SliderPresenter implements ISliderPresenter {
  view: ISliderView;

  model: ISliderModel;

  constructor(props: SliderProps) {
    this.model = new SliderModel(props);
    this.view = new SliderView(this);

    this.view.render();
  }

  getClosestValue(pos: number): number {
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const value = this.model.getClosestValue(convertedPos);

    return value;
  }

  getClosestThumb(pos: number): number {
    const value = this.getClosestValue(pos);
    const thumbIndex = this.model.getClosestThumbIndex(value);

    return thumbIndex;
  }

  getClosestPos(pos: number): number {
    const value = this.getClosestValue(pos);
    const closestPos = this.convertSliderValueToDOMPos(value);

    return closestPos;
  }

  getDivisions(): number[] {
    const divisions = this.model.getDivisionsValues();
    return divisions;
  }

  getViewProps(): SliderViewProps {
    const viewProps: SliderViewProps = this.model.getViewProps();
    return viewProps;
  }

  // updateModel(props: SliderProps): void {
  //   Object.keys(props).forEach((key: string) => {
  //     if (key === 'thumbsValues' && props.thumbsValues) this.model.setThumbs(props.thumbsValues);
  //   });
  // }

  updateThumbValue(index: number, pos: number): number {
    const modelValues = this.model.getThumbsValues();
    const convertedPos = this.convertDOMPosToSliderValue(pos);
    const updatedValue = this.model.getClosestValue(convertedPos);
    modelValues[index] = updatedValue;
    this.model.setThumbsValues(modelValues);
    return updatedValue;
  }

  convertDOMPosToSliderValue(pos: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderWidth();
    const result = Math.round((this.model.getMin() + ((sliderWidth / 100) * pos) / (sliderWidth / length)) * 100) / 100;

    return result;
  }

  convertSliderValueToDOMPos(val: number): number {
    const length = this.model.getLength();
    const sliderWidth = this.view.getSliderWidth();
    const pixelPos = (sliderWidth / length) * (val - this.model.getMin());
    const percentPos = Math.round((pixelPos / sliderWidth) * 100000) / 1000;

    return percentPos;
  }

  destroy(): void {
    this.view.destroy();
  }
}

export default SliderPresenter;
