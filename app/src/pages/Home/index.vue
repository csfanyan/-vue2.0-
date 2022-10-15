<template>
  <div>
    <TypeNav> </TypeNav>
    <ListContainer> </ListContainer>
    <Recommend> </Recommend>
    <Rank> </Rank>
    <Like> </Like>
    <!-- 通过v-for，创建两个floor -->
    <!-- :list='floor'，是组件间的props传参 -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list='floor'> </Floor>

    <Brand> </Brand>
  </div>
</template>

<script>
import ListContainer from "@/pages/Home/ListContainer/index";
import Recommend from "@/pages/Home/Recommend/index";
import Rank from "@/pages/Home/Rank/index";
import Like from "@/pages/Home/Like/index";
import Floor from "@/pages/Home/Floor/index";
import Brand from "@/pages/Home/Brand/index";

import { mapState } from "vuex";

export default {
  name: "HOME",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  computed: {
    ...mapState("home", ["floorList"]),
  },
  mounted() {
    this.$store.dispatch("home/getFloorList");
  },
};
</script>

<style scoped>
</style>