<template>
    <div>
        <div class="nav">
            <div class="up">
                <h1 style="text-align: center;">用户商品管理</h1>

            </div>
            <div class="btn">
                <el-button type="warning" @click="goto()">
                    <el-icon style="vertical-align: middle;">
                        <setting />
                    </el-icon>
                    <span style="vertical-align: middle;"> 管理商品 </span>
                </el-button>
            </div>
        </div>
        <div class="down">
            <div class="ls">
                <ListView :data="data" :column="column" title="商品列表">
                    <slot>
                        <el-table-column label="图片" width="180">
                            <template #default="scope">
                                <img :src="scope.row.pic" style="width: 150px;height: 150px;" />
                            </template>
                        </el-table-column>

                        <el-table-column label="数量" width="200">
                            <template #default="scope" class="num">
                                <span class="ha" @click="doDel(scope.row)">-</span>
                                <span>{{ scope.row.num }}</span>
                                <span class="ha" @click="doAdd(scope.row)">+</span>
                            </template>
                        </el-table-column>
                    </slot>
                </ListView>
            </div>
        </div>

        <div style="display: flex;justify-content: center; background-color: blanchedalmond;">
            <div class="money">
                <span>总计：</span>
                <span>￥{{ money }}</span>
            </div>
        </div>

    </div>
</template>
<script>
import ListView from '@/components/list-view/list-view.vue';
import { page, del } from "@/http/pms/productApi/productApi";
import Msg from "@/utils/msg/msg"
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
            choiceId: 0,
            money: 0
        };
    },
    methods: {
        goto(){
            const that = this;
            that.$router.push('/login');
        },
        doAdd(row) {
            console.log('')
            this.money += row.price
            row.num += 1
        },
        doDel(row) {
            if (row.num > 0) {
                this.money -= row.price
                row.num -= 1
            }
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
                this.data.forEach(item => {
                    item.num = 0
                });
            })
        },
        //规定列表每列名称和显示的属性
        buildColumn() {
            return [
                { prop: "id", label: "编号", width: 100 },
                // { prop: "pic", label: "图片", width: 100 },
                { prop: "name", label: "名称", width: 400 },
                { prop: "productCategoryName", label: "商品分类名称", width: 100 },
                { prop: "brandName", label: "品牌名称", width: 100 },
                { prop: "description", label: "商品描述", width: 100 },
                { prop: "price", label: "价格", width: 100 },
            ];
        }
    },
    components: { ListView }
}
</script>
<style  scoped>
.ls {
    height: 700px;
    overflow-y: auto;
}

.num span {
    width: 30px;
    text-align: center;
    padding: 10px 10px;
}

.ha {
    font-weight: bolder;
    color: white;
    background-color: burlywood;
    padding: 15px 15px;
    margin: 0px 10px;
}

.money {
    display: flex;
    justify-content: space-between;
    padding: 10px 20px;
    width: 400px;
}

.money span {
    font-weight: bold;
    font-size: 20px;
}

.up {
    display: flex;
    justify-content: center;
}

.btn {
    text-align: right;
    margin-right: 200px;
}
.nav{
    background-color: blanchedalmond;
    height: 150px;
}
.down {
    background-color: rgba(211, 203, 157, 0.63);
    display: flex;
    justify-content: center;
    width: 100;
}
</style>
