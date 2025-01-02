<template>
    <div class="container">
      <div class="select-container">
        <label for="region">지역 선택</label>
        <select id="region" v-model="selectedRegion" @change="updateSubRegions">
          <option disabled value="">광역시/도 선택</option>
          <option v-for="region in Object.keys(regionData)" :key="region" :value="region">
            {{ region }}
          </option>
        </select>
      </div>
  
      <div class="select-container" v-if="subRegions.length > 0">
        <label for="subRegion">세부 지역 선택</label>
        <select id="subRegion" v-model="selectedSubRegion">
          <option disabled value="">구/군/시 선택</option>
          <option v-for="subRegion in subRegions" :key="subRegion" :value="subRegion">
            {{ subRegion }}
          </option>
        </select>
      </div>
  
      <button @click="handleSubmit">전송</button>
    </div>
</template>
  
<script>
  import { regionData } from "./regionData.js"; // 데이터 파일 가져오기
  
  export default {
    data() {
      return {
        regionData, // 지역 데이터 가져오기
        selectedRegion: "", // 선택된 광역시/도
        subRegions: [], // 선택된 광역시/도에 따른 세부 지역
        selectedSubRegion: "", // 선택된 세부 지역
      };
    },
    methods: {
      updateSubRegions() {
        this.subRegions = this.regionData[this.selectedRegion] || [];
        this.selectedSubRegion = "";
      },
  
      handleSubmit() {
        if (!this.selectedRegion) {
          alert("지역을 선택하세요.");
          return;
        }

        if (this.selectedRegion && this.subRegions) {
            return this.selectedRegion + '-' + this.subRegions
        }
      },
    },
  };
</script>
  
<style scoped>
  .container {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
    flex-wrap: wrap;
  }
  
  .select-container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  select {
    padding: 5px 10px;
    font-size: 16px;
    margin-top: 5px;
  }
  
  button {
    padding: 10px 20px;
    background-color: blue;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: darkblue;
  }
</style>
  