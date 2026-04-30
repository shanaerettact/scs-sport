<template>
  <div ref="btnRef" class="draggable-btn" :style="{ top: position.y + 'px', left: position.x + 'px' }" @pointerdown="startDrag" @click="handleClick">
    <n-button circle type="primary">
      <n-icon v-html="Fire"></n-icon>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import Fire from "@/assets/fire.svg?raw";

const position = ref({ x: 690, y: 315 });
const dragging = ref(false);
const moved = ref(false);
const startX = ref(0);
const startY = ref(0);

const btnRef = ref<HTMLElement | null>(null);

let offsetX = 0;
let offsetY = 0;
let elementWidth = 0;
let elementHeight = 0;

const startDrag = (e: PointerEvent) => {
  if (!btnRef.value) return;

  dragging.value = true;
  moved.value = false;

  startX.value = e.clientX;
  startY.value = e.clientY;

  const rect = btnRef.value.getBoundingClientRect();
  elementWidth = rect.width;
  elementHeight = rect.height;

  offsetX = e.clientX - position.value.x;
  offsetY = e.clientY - position.value.y;

  window.addEventListener('pointermove', onDrag);
  window.addEventListener('pointerup', stopDrag);
};

const onDrag = (e: PointerEvent) => {
  if (!dragging.value) return;

  // 判斷是否真的有拖動
  if (
    Math.abs(e.clientX - startX.value) > 5 ||
    Math.abs(e.clientY - startY.value) > 5
  ) {
    moved.value = true;
  }

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  newX = Math.max(0, Math.min(newX, window.innerWidth - elementWidth));
  newY = Math.max(0, Math.min(newY, window.innerHeight - elementHeight));

  position.value.x = newX;
  position.value.y = newY;
};

const stopDrag = () => {
  dragging.value = false;
  window.removeEventListener('pointermove', onDrag);
  window.removeEventListener('pointerup', stopDrag);
};

const handleClick = (e: MouseEvent) => {
  if (moved.value) {
    e.preventDefault();
    e.stopPropagation();
    return;
  }
};
</script>

<style lang="scss" scoped>
.draggable-btn {
  position: fixed;
  z-index: 100;
  cursor: grab;
  touch-action: none; // 讓手機可拖動
}

.draggable-btn:active {
  cursor: grabbing;
}
</style>
