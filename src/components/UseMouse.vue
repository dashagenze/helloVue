<script setup lang="ts">
import { useMousePosition } from "../hooks/useMousePosition.ts";

const { x, y } = useMousePosition();

</script>

<template>
  <h1>Track your Mouse position</h1>
  <p>x: {{ x }} | y: {{ y }}</p>
</template>

<style scoped>

</style>