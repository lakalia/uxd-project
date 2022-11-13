export const Slider = ({ minYr, maxYr, yrStep, yr, onSlide, sliderHidden }) => (
  sliderHidden == 'visible' ?
  <>
    <text>1950</text>
    <input
      class="slider"
      list="tickmarks"
      type="range"
      min={minYr}
      max={maxYr}
      step={yrStep}
      value={yr}
      onChange={(e) => onSlide(e.target.value)}
    />
    <datalist id="tickmarks">
      <option value="1950"></option>
      <option value="1975"></option>
      <option value="2000"></option>
      <option value="2015"></option>
    </datalist>
    <text>
      {' '}
      2015 <br />{' '}
    </text>
    <label>Year: </label>
    <text>{yr}</text>
  </> : <> </>
);
