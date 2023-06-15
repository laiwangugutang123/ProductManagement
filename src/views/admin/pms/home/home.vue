<template>
    <div class="big">
        <div class="up">
            <div>
                <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true"
                    background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
                    <el-menu-item index="/home/brand">品牌管理</el-menu-item>
                    <el-menu-item index="/home/feightTemplate">运费模板管理</el-menu-item>
                    <el-menu-item index="/home/product">商品管理</el-menu-item>
                    <el-menu-item index="/home/productAttribute">商品属性管理</el-menu-item>
                    <el-menu-item index="/home/productAttributeCategory">商品属性类别管理</el-menu-item>
                    <el-menu-item index="/home/productAttributeValue">商品属性值管理</el-menu-item>
                    <el-menu-item index="/home/productCategory">商品类别管理</el-menu-item>
                    <el-menu-item index="/home/relation">商品分类属性关系管理</el-menu-item>
                    <el-menu-item index="/home/vertify">商品广告记录管理</el-menu-item>
                    <el-menu-item index="/home/sku">库存管理</el-menu-item>
                    <!-- <el-menu-item index="/home/shop">购物车</el-menu-item> -->
                </el-menu>
            </div>
        </div>

        <div class="down">
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeIndex: '/home/brand'
        }
    },
    methods: {
    },
}
</script>
<style  scoped>
.up {
    width: 80%;
    height: 20%;
    display: flex;
    direction: ltr;
    margin: 0 auto;
}

.down {
    width: 100%;
    height: 800%;
    overflow-y: auto;
}

.big {
    width: 100%;
    height: 100%;
    padding: 0px;
}
</style>
