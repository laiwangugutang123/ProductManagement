<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="商品id">
                <el-input v-model="entity.productId" />
            </el-form-item>
            <el-form-item label="反馈情况">
                <el-input v-model="entity.detail" />
            </el-form-item>
            <el-form-item label="情况">
                <el-input v-model="entity.status" />
            </el-form-item>
            <el-form-item label="审核人">
                <el-input v-model="entity.vertifyMan" />
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/pms/vertifyApi/vertifyApi"
import Msg from "@/utils/msg/msg"
export default {
    props: { id: Number },
    mounted() {
        console.log('mounted' + this.id)
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                detail: '',
                productId: '',
                status:'',
                vertifyMan:''
            }
        }
    },
    methods: {
        sure() {
            this.id == 0 ? this.add() : this.edit()
        },
        add() {
            add(this.entity).then(resp => {
                Msg.success('新建成功')
                this.doCancel()
            })
        },
        edit() {
            edit(this.entity).then(resp => {
                Msg.success('已保存')
                this.doCancel()
            })
        },
        doCancel() {
            this.$emit('doCancel')
        },
        get() {
            console.log('触发了get方法')
            if (this.id != 0) {
                one({ id: this.id }).then(resp => {
                    console.log('编辑收到的:' + JSON.stringify(resp))
                    this.entity = resp.data.help
                })
            }
        },
    },
}
</script>
<style  scoped>
.btnDiv {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
</style>
