type SliderProps = {
  min?: number;
  max?: number;
  step?: number;
  current?: number;
  values?: number[];
  smooth?: boolean;
  range?: boolean;
  dotsValues?: number[];
  showThumbValue?: boolean;
  showMarks?: boolean;
  showMinAndMax?: boolean;
};

export default SliderProps;
