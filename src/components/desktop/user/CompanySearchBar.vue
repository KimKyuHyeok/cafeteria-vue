<template>
    <div class="company-list-container">
        <div class="search-bar">
            <form @submit.prevent="searchSubmit">
                <label for="keyword">기업명</label>
                <input type="text" name="keyword"/>
                <button type="submit" class="submit-btn">검색</button>
            </form>

        </div>
        <div class="company-list">
            <div v-for="company in companyList" :key="company.id" class="company-item">
                <h3>회사명 : {{ company.name }}</h3>
                <p>사업자번호 : {{ company.registrationNumber }}</p>
                <button @click="companyUserRequest(company.id)">가입 신청</button>
            </div>
            <div v-if="companyList.length == 0">
                <h5>검색된 내용이 없습니다.</h5>
            </div>
        </div>

    </div>
    
    
</template>

<script>
import { COMPANY_USER_JOIN_REQUEST, FIND_COMPANY_LIST } from '@/graphql'

export default {
    data() {
        return {
            companyList: [],
            keyword: ''
        }
    },
    methods: {
        async searchSubmit() {
            const { data } = await this.$apollo.query({
                query: FIND_COMPANY_LIST,
                variables: {
                    keyword: this.keyword
                }
            })

            this.companyList = data.companyListSearch;
        },

        async companyUserRequest(companyId) {
            try {
                const { data } = await this.$apollo.mutate({
                    mutation: COMPANY_USER_JOIN_REQUEST,
                    variables: {
                        data: {
                            companyId: Number(companyId)
                        }
                    }   
                })

                const result = data.companyUserJoinRequest

                if (result.success == true) {
                    alert('가입 신청이 완료되었습니다.')
                } else {
                    alert('에러가 발생했습니다. 잠시 후에 시도해주세요.')
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
}

</script>

<style scoped>
.company-list-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f8f9fa;
    border-radius: 8px;
}

.search-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
}

.search-bar form {
    display: flex;
    align-items: center;
    width: 100%;
}

.search-bar label {
    font-size: 16px;
    margin-right: 10px;
}

.search-bar input {
    width: 60%;
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 14px;
}

.search-bar .submit-btn {
    padding: 8px 15px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
}

.search-bar .submit-btn:hover {
    background-color: #0056b3;
}

.company-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
}

.company-item {
    background-color: #ffffff;
    padding: 20px;
    border-radius: 8px;
    border: 1px solid #ddd;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.company-item:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
}

.company-item h3 {
    font-size: 18px;
    margin-bottom: 10px;
}

.company-item p {
    font-size: 14px;
    color: #666;
    margin-bottom: 15px;
}

.company-item button {
    padding: 10px 15px;
    background-color: #28a745;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
    width: 100%;
}

.company-item button:hover {
    background-color: #218838;
}

.company-item h5 {
    font-size: 16px;
    color: #888;
    text-align: center;
    grid-column: span 2;
}
</style>

