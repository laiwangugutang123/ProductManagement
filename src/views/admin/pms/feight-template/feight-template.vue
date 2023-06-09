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
                <ListView :data="data" :column="column" title="运费模板列表">
                    <slot>
                        <el-table-column label="计费类型" width="120">
                            <template #default="scope">
                                <span>{{ scope.row.chargeType == 0 ? '按重量' : '按件数' }}</span>
                            </template>
                        </el-table-column>
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

        <el-dialog v-model="visible" v-if="visible" width="30%" title="运费模板信息">
            <feightTemplateEdit :id="choiceId" @doCancel="doCancel"></feightTemplateEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '@/components/list-view/list-view.vue';
import { page, del } from "@/http/pms/feightApi/feightApi";
import Msg from "@/utils/msg/msg"
import feightTemplateEdit from '../../../../components/pms/feight-templateEdit.vue';
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
                { prop: "firstFee", label: "首费", width: 100 },
                { prop: "firstWeight", label: "首重", width: 100 },
                { prop: "dest", label: "目的地", width: 100 },
                { prop: "continmeFee", label: "首费", width: 200 },
                { prop: "continueWeight", label: "首重", width: 100 },
                { prop: "name", label: "名称", width: 100 },
            ];
        }
    },
    components: { ListView, feightTemplateEdit }
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
