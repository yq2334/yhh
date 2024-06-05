<template>
  <view class="dict-wrap">
    <template v-for="(item, index) in options">
      <template v-if="values.includes(item.value)">
        <span :key="item.value" class="el-tag" :index="index" v-if="item.raw && item.raw.cssClass != ''"
          :class="item.raw.cssClass">{{ item.label }}</span>
        <!-- <span :key="item.value" class="el-tag" :index="index" v-else>{{ item.label }}</span> -->
        <view class="tag-item" v-else-if="item.raw && item.raw.listClass != ''">
          <u-tag :text="item.label" plain size="mini"
            :type="item.raw.listClass == 'primary' ? '' : item.raw.listClass"></u-tag>
        </view>

        <span class="el-tag" :index="index" v-else>{{item.label}}</span>

      </template>
    </template>
  </view>
</template>

<script>
  export default {
    name: "DictTag",
    props: {
      options: {
        type: Array,
        default: null,
      },
      value: [Number, String, Array],
    },
    computed: {
      values() {
        if (this.value !== null && typeof this.value !== 'undefined') {
          return Array.isArray(this.value) ? this.value : [String(this.value)];
        } else {
          return [];
        }
      },
    },
  };
</script>
<style lang="scss" scoped>
  .el-tag+.el-tag {
    margin-left: 10px;
  }

  .dict-wrap {
    display: inline-flex;
    /* display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-around; */

    .tag-item+.tag-item {
      margin-left: 10px;
    }
  }
</style>