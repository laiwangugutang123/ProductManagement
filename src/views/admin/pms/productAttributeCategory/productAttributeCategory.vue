<template>
    <div>
        <div class="up">
            <el-button type="primary" @click="doAdd()">
            <el-icon style="vertical-align: middle;">
                <circle-plus />
            </el-icon>
            <span style="vertical-align: middle;"> 新建 </span>
        </el-button>
        </div>

        <div class="down">
            <div class="ls">
                <ListView :data="data" :column="column" title="商品属性类别列表">
                    <slot>
                        <el-table-column label="操作" width="200">
                            <template #default="scope">
                                <el-button type="primary" @click="doEdit(scope.row.id)">
                                    <el-icon style="vertical-align: middle;">
                                        <edit />
                                    </el-icon>
                                    <span style="vertical-align: middle;"> 编辑 </span>
                                </el-button>
                                <el-button type="danger" @click="doDelete(scope.row.id)">
                                    <el-icon style="vertical-align: middle;">
                                        <delete />
                                    </el-icon>
                                    <span style="vertical-align: middle;"> 删除 </span>
                                </el-button>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <el-dialog v-model="visible" v-if="visible" width="30%" title="商品属性类别信息">
            <ProductAttirbuteCategoryEdit  :id="choiceId" @doCancel="doCancel"></ProductAttirbuteCategoryEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '@/components/list-view/list-view.vue';
import { page, del } from "@/http/pms/productAttributeCategoryApi/productAttributeCategoryApi";
import Msg from "@/utils/msg/msg"
import ProductAttirbuteCategoryEdit from '../../../../components/pms/productAttirbuteCategoryEdit.vue';
export default {
    mounted() {
        this.column = this.buildColumn()
        this.all()
    },
    data() {
        return {
            data: [],       
            column: [],     
            visible: false,
            choiceId: 0
        };
    },
    methods: {
        //编辑
        doEdit(id) {
            this.choiceId = id
            this.visible = true
            console.log('编辑的id:' + this.choiceId + '  visible:' + this.visible)
        },
        //新建
        doAdd() {
            console.log('触发了添加方法')
            this.choiceId = 0
            this.visible = true
        },
        //关闭弹窗
        doCancel() {
            this.visible = false
            this.all()
        },
        //删除
        doDelete(id) {
            console.log('删除的id:' + id)
            del({ id: id }).then(resp => {
                Msg.success('删除成功')
                this.all()
            })
        },
        //查询所有
        all() {
            let pageDto = {
                current: 1,
                size: 100
            }
            page(pageDto).then(resp => {
                console.log('收到回复：' + JSON.stringify(resp.data))
                this.data = resp.data.page.records
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                { prop: "attributeCount", label: "属性数量", width: 100 },
                { prop: "name", label: "名称", width: 100 },
                { prop: "paramCount", label: "参数数量", width: 100 },
            ];
        }
    },
    components: { ListView, ProductAttirbuteCategoryEdit }
}
</script>
<style  scoped>
.up {
    margin-top: 10px;
    display: flex;
    justify-content: center;
}
.ls {
    height: 700px;
    overflow-y: auto;
}
.down {
    margin-top: 20px;
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
