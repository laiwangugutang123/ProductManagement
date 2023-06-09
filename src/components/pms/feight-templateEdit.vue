<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="持续费用">
                <el-input v-model="entity.continmeFee" />
            </el-form-item>
            <el-form-item label="继续重量">
                <el-input v-model="entity.continueWeight" />
            </el-form-item>

            <el-form-item label="计费类型">
                <el-select v-model="entity.chargeType" placeholder="请选择">
                    <el-option v-for="item in enableArr" :key="item.value" :label="item.label" :value="item.value" />
                </el-select>
            </el-form-item>

            <el-form-item label="目的地">
                <el-input v-model="entity.dest" />
            </el-form-item>

            <el-form-item label="首费">
                <el-input v-model="entity.firstFee" />
            </el-form-item>

            <el-form-item label="首重">
                <el-input v-model="entity.firstWeight"/>
            </el-form-item>

            <el-form-item label="名称">
                <el-input v-model="entity.name"/>
            </el-form-item>


            <el-form-item label="展示情况">
                <el-input v-model="entity.showStatus" />
            </el-form-item>

            <el-form-item label="排序">
                <el-input v-model="entity.sort" />
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/pms/feightApi/feightApi"
import Msg from "@/utils/msg/msg"
export default {
    props: { id: Number },
    mounted() {
        console.log('onMounted' + this.id)
        this.get()
    },
    data() {
        return {
            entity: {
                id: 0,
                chargeType: '',
                continmeFee: '',
                continueWeight: '',
                dest: '',
                firstFee: '',
                firstWeight: '',
                name: '',
            },
            enableArr: [
                { value: 0, label: '按重量' },
                { value: 1, label: '按件数' }
            ]
        }
    },
    methods: {
        sure() {
            this.id == 0 ? this.add() : this.edit()
        },
        add() {
            add(this.entity).then(resp=>{
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
