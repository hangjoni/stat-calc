<template>
  <div class="calculator">
    <div
      class="bg-slate-100 w-full p-12 flex flex-col justify-evenly items-center md:items-start md:flex-row gap-6 text-lg my-2"
    >
      <!-- The left side: Calculator input -->
      <div class="md:w-1/2">
        <div class="input-nums shadow-md">
          <div class="grid grid-cols-calc gap-3 p-3">
            <span></span>
            <span>Visitors</span>
            <span>Conversions</span>
            <span></span>
            <span>Conversion rate</span>
          </div>
          <div
            class="grid grid-cols-calc gap-3 p-3 text-white"
            :class="result.isStatSig ? 'bg-greenMain' : 'bg-blueMain'"
          >
            <span>A</span>
            <input
              type="text"
              class="text-white text-center"
              :class="result.isStatSig ? 'bg-greenMinor' : 'bg-blueMinor'"
              id="aVisitor"
              v-model="aVisitor"
            />
            <input
              type="text"
              class="text-white text-center"
              :class="result.isStatSig ? 'bg-greenMinor' : 'bg-blueMinor'"
              id="aConversion"
              v-model="aConversion"
            />
            <div id="arrow border-2 border-lime-300"></div>
            <div class="" id="aConversionRate">{{ aConversionRate }}%</div>
          </div>
          <div class="grid grid-cols-calc gap-3 p-3 text-black">
            <span>B</span>
            <input
              type="text"
              class="text-center"
              id="bVisitor"
              v-model="bVisitor"
            />
            <input
              type="text"
              class="text-center"
              id="bConversion"
              v-model="bConversion"
            />
            <div id="arrow"></div>
            <div class="conversion-rate" id="bConversionRate">
              {{ bConversionRate }}%
            </div>
          </div>
        </div>
        <!-- Options -->
        <div class="grid grid-cols-2 gap-10 py-6 text-sm">
          <!-- Hypothesis Option -->
          <fieldset class="shadow-md p-3">
            <legend class="font-medium">Hypothesis</legend>
            <div class="flex gap-3 justify-evenly items-center">
              <div>
                <input
                  type="radio"
                  id="one-sided"
                  value="false"
                  v-model="isTwoTailed"
                />
                <label for="one-sided"> One-Sided</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="two-sided"
                  value="true"
                  v-model="isTwoTailed"
                />
                <label for="two-sided"> Two-Sided</label>
              </div>
            </div>
          </fieldset>
          <!-- Confidence Option -->
          <fieldset class="shadow-md p-3">
            <legend class="font-medium">Confidence</legend>
            <div class="flex gap-3 justify-evenly items-center">
              <div>
                <input
                  type="radio"
                  id="ninety"
                  value="90"
                  v-model="confidence"
                />
                <label for="ninety"> 90%</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ninety-five"
                  value="95"
                  v-model="confidence"
                />
                <label for="ninety-five"> 95%</label>
              </div>
              <div>
                <input
                  type="radio"
                  id="ninety-nine"
                  value="99"
                  v-model="confidence"
                />
                <label for="ninety-five"> 99%</label>
              </div>
            </div>
          </fieldset>
        </div>
        <!-- <button
          type="submit"
          formmethod="get"
          class="bg-green-600 p-3 mx-auto mt-6 rounded text-white hover:-translate-y-0.5 duration-500 shadow-md"
        >
          Calculate
        </button> -->
      </div>
      <div class="md:w-1/3 p-6 flex flex-col justify-evenly shadow-md bg-white">
        <h3
          class="font-bold text-lg tracking-wider mb-4"
          :class="result.isStatSig ? 'text-greenMain' : 'text-blueMain'"
        >
          {{ result.testSummary }}
        </h3>
        <div class="details flex flex-col gap-3">
          <span>{{ result.details }}</span>
          <span>{{ result.testResult }}</span>
        </div>
        <div class="flex flex-row justify-evenly">
          <div class="flex flex-col">
            <span class="font-semibold">Power</span>
            <span>{{ result.power }}</span>
          </div>
          <div class="flex flex-col">
            <span class="font-semibold">p value</span>
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

<style></style>
