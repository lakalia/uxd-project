onClick={() => {
          const newSelectedColors = Object.keys(selectedColors).map(
            (key) => selectedColors[key]
          );
          if (!newSelectedColors.includes(colorScale(domainValue))) {
            newSelectedColors.push(colorScale(domainValue));
          } else {
            newSelectedColors.pop(colorScale(domainValue));
          }
          //console.log(newSelectedColors);
          return onSelectColor(newSelectedColors);
        }}

onClick={() => {
          if (!selectedColors.includes(colorScale(domainValue))) {
            selectedColors.push(colorScale(domainValue));
          } else {
            selectedColors.pop(colorScale(domainValue));
          }
          //console.log(newSelectedColors);
          return onSelectColor(selectedColors);
        }}

        onClick={() => {
          if (!selectedColors.includes(colorScale(domainValue))) {
            selectedColors.push(colorScale(domainValue));
          } else {
            for (var i = 0; i < selectedColors.length; i++) {
              if (selectedColors[i] == colorScale(domainValue)) {
                selectedColors.splice(i, 1);
              }
            }
          }
          //console.log(SelectedColors);
          return onSelectColor(selectedColors);
        }}
  
  /*        <text
            className="axis-label"
            x={innerWidth / 2}
            y={innerHeight + xAxisLabelOffset}
            textAnchor="middle"
          >
            {xAxisLabel}
          </text> 
    */
          
        <Slider
          min={minYr}
          max={maxYr}
          step={yrStep}
          value={yr}
          onChange={({ value }) => setYr(value)}
        /> 
        
         <Slider 
          minYr = {minYr}
  				maxYr = {maxYr}
  				yrStep = {yrStep}
  				yr = {yr}
  				onSlide = {setYr}
          />
        
        <input
          type="range"
          min={minYr}
          max={maxYr}
          step={yrStep}
          value={yr}
          onChange={setYr}
        />
        
        <input
          type="range"
          min={minYr}
          max={maxYr}
          step={yrStep}
          value={yr}
          onChange={({ value }) => setYr(value)}
        />
        
  // sample code for tickmarks and labels
        <input type="range" list="tickmarks">

<datalist id="tickmarks">
  <option value="0" label="0%"></option>
  <option value="10"></option>
  <option value="20"></option>
  <option value="30"></option>
  <option value="40"></option>
  <option value="50" label="50%"></option>
  <option value="60"></option>
  <option value="70"></option>
  <option value="80"></option>
  <option value="90"></option>
  <option value="100" label="100%"></option>
</datalist>
          
          
          // final working input code
          <text>1950</text>
        <input
          class="slider"
          list="tickmarks"
          type="range"
          min={minYr}
          max={maxYr}
          step={yrStep}
          value={yr}
          onChange={(e) => setYr(e.target.value)}
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
        <label>Year</label>
          
          
 const sliderHidden = xAttribute == 'year' ? { visibility: 'hidden' } : { visibility: 'visible' };
          <div style={sliderHidden}></div>