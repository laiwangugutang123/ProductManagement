<template>
    <div>
        <el-form :model="entity" label-width="120px">
            <el-form-item label="锁定库存">
                <el-input v-model="entity.lockStock" />
            </el-form-item>
            <el-form-item label="预警库存">
                <el-input v-model="entity.lowStock" />
            </el-form-item>
            <el-form-item label="展示图片">
                <el-input v-model="entity.pic" />
            </el-form-item>
            <el-form-item label="价格">
                <el-input v-model="entity.price" />
            </el-form-item>

            <el-form-item label="商品id">
                <el-input v-model="entity.productId" />
            </el-form-item>
            <el-form-item label="单品促销价格">
                <el-input v-model="entity.promotionPrice" />
            </el-form-item>
            <el-form-item label="销量">
                <el-input v-model="entity.sale" />
            </el-form-item>
            <el-form-item label="sku编码">
                <el-input v-model="entity.skuCode" />
            </el-form-item>

            <el-form-item label="商品销售属性">
                <el-input v-model="entity.spData" />
            </el-form-item>
            <el-form-item label="库存">
                <el-input v-model="entity.stock" />
            </el-form-item>
        </el-form>

        <div class="btnDiv">
            <el-button type="primary" @click="sure">确定</el-button>
            <el-button @click="doCancel">取消</el-button>
        </div>
    </div>
</template>
<script>
import { one, add, edit } from "@/http/pms/skuApi/skuApi"
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
                lockStock: '',
                lowStock: '',
                pic:'',
                price:'',

                productId: '',
                promotionPrice: '',
                sale:'',
                skuCode:'',

                spData: '',
                stock: '',
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
