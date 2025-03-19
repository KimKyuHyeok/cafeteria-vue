<template>
  <div class="container">
    <div class="select-container">
      <label for="region">지역 선택</label>
      <select id="region" v-model="selectedRegion">
        <option disabled value="">광역시/도 선택</option>
        <option v-for="region in Object.keys(regionData)" :key="region" :value="region">
          {{ region }}
        </option>
      </select>
    </div>

    <div v-if="subRegions.length > 0" class="select-container">
      <label for="subRegion">구/군/시 선택</label>
      <select id="subRegion" v-model="selectedSubRegion">
        <option disabled value="">구/군/시 선택</option>
        <option v-for="subRegion in subRegions" :key="subRegion" :value="subRegion">
          {{ subRegion }}
        </option>
      </select>
    </div>

    <div v-if="selectedSubRegion" class="search-container">
      <label for="searchRegion">상세 주소</label>
      <input id="searchRegion" v-model="searchRegion" type="text" placeholder="신 주소로 입력해주세요." />
    </div>

    <button class="search-button" @click="handleSubmit">검색</button>
  </div>
</template>

<script>
import { GET_RESTAURANTS } from '@/graphql.js'
import { regionData } from './regionData.js'

export default {
  data() {
    return {
      regionData,
      selectedRegion: '',
      subRegions: [],
      selectedSubRegion: '',
      searchRegion: '',
    }
  },
  watch: {
    selectedRegion(newRegion) {
      this.updateSubRegions(newRegion)
    },
  },
  methods: {
    updateSubRegions(region) {
      this.subRegions = this.regionData[region] || []
      this.selectedSubRegion = ''
    },

    async handleSubmit() {
      if (!this.selectedRegion) {
        alert('광역시/도를 선택하세요.')
        return
      }

      if (!this.selectedSubRegion) {
        alert('구/군/시를 선택하세요.')
        return
      }

      let keyword = `${this.selectedRegion} ${this.selectedSubRegion}`
      if (this.searchRegion) {
        keyword += ` ${this.searchRegion}`
      }

      console.log('🔍 검색 키워드:', keyword)

      try {
        const data = await this.getRestaurants(keyword)
        if (data) {
          this.$emit('restaurants', data)
        }
      } catch (error) {
        console.error('검색 중 오류 발생:', error)
      }
    },

    async getRestaurants(keyword) {
      try {
        const { data } = await this.$apollo.query({
          query: GET_RESTAURANTS,
          variables: { keyword },
        })
        return data.restaurantFindByAddress
      } catch (error) {
        console.error('Error getRestaurants: ', error)
      }
    },
  },
}
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

/* PC에서는 select 요소 높이 정렬 맞추기 */
.select-container {
  display: flex;
  align-items: center;
  gap: 10px;
  min-width: 200px;
}

select,
input {
  padding: 8px 12px;
  font-size: 14px;
  margin-top: 5px;
  width: 200px;
}

option {
  font-size: 16px;
}

/* 검색 입력 필드 */
.search-container {
  display: flex;
  flex-direction: column;
}

.search-container label {
  margin-bottom: 5px;
}

.search-button {
  padding: 10px 20px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.search-button:hover {
  background-color: darkblue;
}

/* 모바일 스타일 */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
    align-items: stretch;
  }

  .select-container {
    flex-direction: column; /* 모바일에서는 세로 정렬 */
    align-items: flex-start;
    width: 100%;
    margin-bottom: 10px;
  }

  select {
    font-size: 16px;
    padding: 10px 12px;
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }

  option {
    font-size: 16px;
  }

  /* 검색 버튼을 항상 맨 아래에 배치 */
  .search-button {
    width: 100%;
    padding: 15px 0;
    margin-top: 10px;
  }
}
</style>
