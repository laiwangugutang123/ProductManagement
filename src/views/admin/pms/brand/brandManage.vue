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
                <ListView :data="data" :column="column" title="品牌列表">
                    <slot>
                        <el-table-column label="是否为品牌制造商" width="120">
                            <template #default="scope">
                                <span>{{ scope.row.factoryStatus == 0 ? '不是' : '是' }}</span>
                            </template>
                        </el-table-column>
                        <el-table-column label="专区大图" width="180">
                            <template #default="scope">
                                <img :src="scope.row.bigPic" style="width: 150px;height: 150px;" />
                            </template>
                        </el-table-column>

                        <el-table-column label="品牌logo" width="180">
                            <template #default="scope">
                                <img :src="scope.row.logo" style="width: 150px;height: 150px;" />
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

        <el-dialog v-model="visible" v-if="visible" width="30%" title="品牌信息">
            <BrandEdit :id="choiceId" @doCancel="doCancel"></BrandEdit>
        </el-dialog>
    </div>
</template>
<script>
import ListView from '@/components/list-view/list-view.vue';
import { page, del } from "@/http/pms/brandApi/brandApi";
import Msg from "@/utils/msg/msg"
import BrandEdit from '../../../../components/pms/brandEdit.vue';
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
                // { prop: "bigPic", label: "专区大图", width: 300 },
                { prop: "brandStory", label: "品牌故事", width: 500 },
                { prop: "firstLetter", label: "首字母", width: 100 },
                // { prop: "logo", label: "品牌logo", width: 200 },
                { prop: "name", label: "名称", width: 70 },
                { prop: "productCommentCount", label: "商品评论数量", width: 80 },
                { prop: "productCount", label: "商品数量", width: 80 },
            ];
        }
    },
    components: { ListView, BrandEdit }
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
