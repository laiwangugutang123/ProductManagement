<template>
  
    <div class="login">
        <div class="login-form">
            <div class="login-form-logo">
                <el-image :src="src" fit="fill" :lazy="true"></el-image>
            </div>

            <el-form ref="ruleFormRef" :model="userForm" status-icon :rules="rules" class="login-ruleForm">
                <el-form-item prop="email">
                    <el-input id="email" v-model="userForm.email" autocomplete="off" placeholder="请输入你的用户邮箱" suffix-icon="Message" />
                </el-form-item>
                <el-form-item prop="password">
                    <el-input id="pwd" v-model="userForm.password" type="password" autocomplete="off" placeholder="请输入你的用户密码"
                        suffix-icon="Lock" />
                </el-form-item>

                <el-form-item class="login-form-btns">
                    <el-button type="primary" @click="btnLogin">用户登录</el-button>
                    <el-button @click="resetForm">Reset</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>
<script>
import { defineComponent, ref } from "vue"
import { mapActions, storeToRefs } from "pinia";
import { userLogin } from "../../http";
import { useUserStore } from "../../store/user";
export default defineComponent({
    setup() {
        const src = ref('https://avatars.mds.yandex.net/get-images-cbir/2205849/wzfdqpV62JzBiQZTvNsStg3012/ocr');
        return {
            src,
        }
    },
    data() {
        return {
            n: 30,
            userForm: {
                email: '',
                password: ''
            },
            rules: {
                email: [
                    { required: true, message: '请输入正确的电子邮箱', trigger: 'blur' },
                    { type: 'email', message: "电子邮箱格式错误", trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入正确的用户密码', trigger: 'blur' },
                    { min: 8, message: '密码长度不得小于8个字符', trigger: 'blur' }
                ]
            }
        }
    },
    mounted() {
      

    },
    methods: {
        ...mapActions(useUserStore, ['setToken', 'fillUserinfo']),
        btnLogin() {
            const that = this;
            const email=document.getElementById("email").value
            const pwd=document.getElementById("pwd").value
            // console.log(formEl);
            if (email===''||pwd==='') {
                console.log('false1');
                alert("用户名或密码为空！")
            }
            if ((email==='6118888@qq.com')&&(pwd==='asdf1234')) {
                // const userinfo = result.data.userinfo;
                
                // that.setToken(userinfo.token);
                // that.fillUserinfo(userinfo);
                that.$router.push('/home/brand');

            }else{
                console.log('false');
                alert("用户名或密码错误！")
            }
        },
        resetForm() {
            const formEl = this.$refs.ruleFormRef //取ref对象
            formEl.resetFields()
        }
    }

});
</script>

<style lang="scss" scoped>
body, html {
  margin: 0;
}
canvas{
    display: block;
}
.login {
    height: calc(100vh - 20px);
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.login-form {
    width: 300px;
    height: 400px;
    display: flex;
    flex-direction: column;
    box-shadow: var(--el-box-shadow)
}

.login-form-logo {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 250px;
}

.login-form-btns {
    display: flex;

}

.login-form-btns .el-button {
    flex: 1;
}

.login-ruleForm {
    margin: 10px;
}
</style>