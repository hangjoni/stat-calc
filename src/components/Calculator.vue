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
            <input
              type="text"
              class="visitor"
              id="aVisitor"
              v-model="aVisitor"
            />
            <input
              type="text"
              class="conversion"
              id="aConversion"
              v-model="aConversion"
            />
            <div id="arrow"></div>
            <div class="conversion-rate" id="aConversionRate">
              {{ aConversionRate }}%
            </div>
          </div>
          <div class="b">
            <span>B</span>
            <input
              type="text"
              class="visitor"
              id="bVisitor"
              v-model="bVisitor"
            />
            <input
              type="text"
              class="conversion"
              id="bConversion"
              v-model="bConversion"
            />
            <div id="arrow"></div>
            <div class="conversion-rate" id="bConversionRate">
              {{ bConversionRate }}%
            </div>
          </div>
        </div>
        <div class="input-settings">
          <fieldset class="hypothesis">
            <legend>Hypothesis</legend>
            <div class="choices">
              <div>
                <input
                  type="radio"
                  id="one-sided"
                  value="false"
                  v-model="isTwoTailed"
                />
                <label for="one-sided">One-Sided</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="two-sided"
                  value="true"
                  v-model="isTwoTailed"
                />
                <label for="two-sided">Two-Sided</label>
              </div>
            </div>
          </fieldset>
          <fieldset class="confidence">
            <legend>Confidence</legend>
            <div class="choices">
              <div>
                <input
                  type="radio"
                  id="ninety"
                  value="90"
                  v-model="confidence"
                />
                <label for="ninety">90%</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ninety-five"
                  value="95"
                  v-model="confidence"
                />
                <label for="ninety-five">95%</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ninety-nine"
                  value="99"
                  v-model="confidence"
                />
                <label for="ninety-five">99%</label>
              </div>
            </div>
          </fieldset>
        </div>
        <button type="submit" formmethod="get">Calculate</button>
      </div>
      <div class="result">
        <h3 class="summary">{{ result.testSummary }}</h3>
        <div class="details">
          <span>{{ result.details }}</span>
          <span>{{ result.testResult }}</span>
        </div>
        <div class="stats">
          <div class="power">
            <span>Power</span>
            <span>{{ result.power }}</span>
          </div>
          <div class="pvalue">
            <span>p value</span>
            <span>{{ result.pvalue }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import ABTest from "../composables/statTests.js";

export default {
  setup() {
    let aVisitor = ref(50000);
    let aConversion = ref(500);
    let bVisitor = ref(50000);
    let bConversion = ref(570);
    let isTwoTailed = ref(true);
    let confidence = ref(95);

    let aConversionRate = computed(() => {
      return ((aConversion.value * 100) / aVisitor.value).toFixed(2);
    });

    let bConversionRate = computed(() => {
      return ((bConversion.value * 100) / bVisitor.value).toFixed(2);
    });

    let result = computed(() => {
      return ABTest(
        aVisitor.value,
        bVisitor.value,
        aConversion.value,
        bConversion.value,
        confidence.value,
        isTwoTailed.value
      );
    });
    console.log("result", result.value);

    let color = computed(() => {
      if (result.value.isStatSig) {
        return { main: "#00bf6f", minor: "#1ac67e" };
      } else {
        return { main: "#05467e", minor: "#1e598b" };
      }
    });

    return {
      aVisitor,
      aConversion,
      aConversionRate,
      bVisitor,
      bConversion,
      bConversionRate,
      isTwoTailed,
      confidence,
      result,
      color,
    };
  },
};
</script>

<style>
.calculator {
  --bg-color: #f7f7f7;
  --hl-color: #00bf6f;
  --l-color: #1ac67e;
  --w-color: #ffffff;
  --g-color: #a1a4a7;
  --color-main: v-bind("color.main");
  --color-minor: v-bind("color.minor");
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
  margin: 3rem;
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
  background-color: var(--color-main);
}
.a input,
.b input {
  font-size: x-large;
  width: 6rem;
  text-align: center;
  padding: 0.5em;
  border-radius: 5px;
  font-weight: 500;
  margin: 1rem;

  /* remove default border styling */
  border: none;
}
.b input {
  background-color: var(--color-minor);
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
  justify-content: space-around;
  padding-bottom: 1rem;
  font-size: 1.2rem;
}
.result .summary {
  font-size: 2rem;
  color: var(--hl-color);
}
.result .details {
  min-height: 10rem;
  margin: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
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
