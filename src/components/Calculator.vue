<template>
  <div class="calculator">
    <h1>Calculate your statistical significance</h1>
    <div class="body">
      <div class="input">
        <div class="input-nums">
          <div class="label">
            <span></span>
            <span>Visitors</span>
            <span>Conversions</span>
            <span></span>
            <span>Conversion rate</span>
          </div>
          <div class="a">
            <span>A</span>
            <input type="text" class="visitor" id="aVisitor" value="50000" />
            <input
              type="text"
              class="conversion"
              id="aConversion"
              value="500"
            />
            <div id="arrow"></div>
            <div class="conversion-rate" id="aConversionRate">2%</div>
          </div>
          <div class="b">
            <span>B</span>
            <input type="text" class="visitor" id="bVisitor" value="50000" />
            <input
              type="text"
              class="conversion"
              id="bConversion"
              value="500"
            />
            <div id="arrow"></div>
            <div class="conversion-rate" id="bConversionRate">1%</div>
          </div>
        </div>
        <div class="input-settings">
          <fieldset class="hypothesis">
            <legend>Hypothesis</legend>
            <div class="choices">
              <div>
                <input type="radio" id="one-sided" value="one-sided" />
                <label for="one-sided">One-Sided</label>
              </div>
              <div>
                <input type="radio" id="two-sided" value="two-sided" checked />
                <label for="two-sided">Two-Sided</label>
              </div>
            </div>
          </fieldset>
          <fieldset class="confidence">
            <legend>Confidence</legend>
            <div class="choices">
              <div>
                <input type="radio" id="ninety" value="0.9" />
                <label for="ninety">90%</label>
              </div>
              <div>
                <input type="radio" id="ninety-five" value="0.95" checked />
                <label for="ninety-five">95%</label>
              </div>
              <div>
                <input type="radio" id="ninety-nine" value="0.99" />
                <label for="ninety-five">99%</label>
              </div>
            </div>
          </fieldset>
        </div>
        <button type="submit" formmethod="get">Calculate</button>
      </div>
      <div class="result">
        <h3 class="summary">Test summary</h3>
        <p class="details">Test details</p>
        <div class="stats">
          <div class="power">
            <span>Power</span>
            <span>80%</span>
          </div>
          <div class="pvalue">
            <span>p value</span>
            <span>0.01</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style>
.calculator {
  --bg-color: #f7f7f7;
  --hl-color: #00bf6f;
  --l-color: #1ac67e;
  --w-color: #ffffff;
  --g-color: #a1a4a7;
  background-color: var(--bg-color);
  padding: 2rem;
}
.calculator .body {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.input-nums,
.input-settings {
  margin: 0.5rem;
}
.calculator .body .input {
  min-width: 30rem;
}
.label,
.a,
.b {
  display: grid;
  grid-template-columns: 5ch 1fr 1fr 5ch 1fr;
  place-items: center;
  padding: 0.1em;
  border-radius: 5px;
  margin-top: 1rem;
}
.label {
  font-weight: 800;
}
.a,
.b {
  height: 5rem;
  font-size: large;
  color: black;
}
.a {
  background-color: var(--w-color);
}
.b {
  background-color: var(--hl-color);
}
.a input,
.b input {
  font-size: x-large;
  width: 6rem;
  text-align: center;
  padding: 0.5em;
  border-radius: 5px;
  font-weight: 500;

  /* remove default border styling */
  border: none;
}
.b input {
  background-color: var(--l-color);
  color: var(--w-color);
}
.conversion-rate {
  font-size: 2.5rem;
  font-weight: 800;
}
.a .conversion-rate {
  color: var(--g-color);
}
.b .conversion-rate {
  color: var(--w-color);
}
.calculator .body .result {
  min-width: 20rem;
}
.input-settings {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.choices {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  padding: 0.5em;
}
.choices * {
  padding: 0.2em;
}
button {
  background-color: var(--hl-color);
  color: var(--w-color);
  font-size: large;
  padding: 1em;
  border-radius: 5px;
  /* remove default style */
  border: none;
}
.result {
  background-color: var(--w-color);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-bottom: 1rem;
}
.result .summary {
  font-size: 2rem;
  color: var(--hl-color);
}
.result .details {
  min-height: 10rem;
}
.result .stats {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
.power,
.pvalue {
  display: flex;
  flex-direction: column;
}
.power > span:first-of-type,
.pvalue > span:first-of-type {
  font-weight: bold;
  font-size: x-large;
}
</style>
