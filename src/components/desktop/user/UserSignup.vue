<template>
    <div class="register-container">
        <h1>유저 회원가입</h1>
        <form @submit.prevent="handleSubmit">
            <div class="form-group">
                <label for="name">이름</label>
                <input
                    type="text"
                    id="name"
                    v-model="form.name"
                    placeholder="이름을 입력하세요"
                    required
                />
            </div>
  
            <div class="form-group">
                <label for="email">이메일</label>
                <input
                    type="text"
                    id="email"
                    v-model="form.email"
                    placeholder="이메일을 입력해주세요."
                    required
                />
            </div>
  
            <div class="form-group">
                <label for="password">비밀번호</label>
                <input
                    type="password"
                    id="password"
                    v-model="form.password"
                    placeholder="비밀번호를 입력하세요"
                    required
                />
            </div>
  
            <div class="form-group">
                <label for="confirmPassword">비밀번호 확인</label>
                <input
                    type="password"
                    id="confirmPassword"
                    v-model="form.confirmPassword"
                    placeholder="비밀번호를 다시 입력하세요"
                    required
                />
            </div>
  
            <div class="form-group">
                <label for="phoneNumber">전화번호</label>
                <input
                    type="text"
                    id="phoneNumber"
                    v-model="form.phoneNumber"
                    placeholder="전화번호를 입력하세요"
                    required
                />
            </div>
  
            <button type="submit" class="submit-btn">회원가입</button>
        </form>
    </div>
</template>
  
<script>
import { USER_SIGNUP } from '@/graphql';
    export default {
        data() {
            return {
                form: {
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                phoneNumber: "",
                },
            };
        },
    methods: {
        async handleSubmit() {
            try {
                if (this.form.password !== this.form.confirmPassword) {
                    alert("비밀번호가 일치하지 않습니다.");
                    return;
                }
                if (this.form.phoneNumber.includes('-')) {
                    alert("전화번호에 하이픈(-)을 포함할 수 없습니다.");
                    return;
                }
            
                const { data } = await this.$apollo.mutate({
                    mutation: USER_SIGNUP,
                    variables: {
                        data: {
                            name: this.form.name,
                            email: this.form.email,
                            password: this.form.password,
                            phoneNumber: this.form.phoneNumber
                        }
                    }
                })

                let token = data.userSignup.accessToken;

                if (token) {
                    localStorage.setItem('userToken', token);
                    this.$router.push('/user/coupons')
                }
            } catch (error) {
                if (error.graphQLErrors && error.graphQLErrors.length > 0) {
                    const errorMessage = error.graphQLErrors[0].message;
                    alert(errorMessage);
                } else {
                    alert("회원가입 중 문제가 발생했습니다. 다시 시도해주세요.");
                }
                console.error("에러 상세:", error);
            }
        },
    },
};
</script>

<style scoped>
.register-container {
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 15px;
}

label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    color: #555;
}

input {
    width: 100%;
    padding: 10px;
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    transition: border-color 0.3s;
}

input:focus {
    border-color: #007bff;
}

.submit-btn {
    width: 100%;
    padding: 10px;
    background-color: #007bff;
    color: white;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-btn:hover {
    background-color: #0056b3;
}

.submit-btn:active {
    background-color: #003d80;
}
</style>
  