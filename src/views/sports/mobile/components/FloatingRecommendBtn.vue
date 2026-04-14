<template>
  <div ref="btnRef" class="draggable-btn" :style="{ top: position.y + 'px', left: position.x + 'px' }" @pointerdown="startDrag">
    <n-button circle type="primary">
      <n-icon v-html="Fire"></n-icon>
    </n-button>
  </div>
</template>

<script setup lang="ts">
import { nextTick, onMounted, ref } from 'vue';
import { NButton, NIcon } from 'naive-ui';
import Fire from "@/assets/fire.svg?raw";

const position = ref({ x: 340, y: 740 });
const dragging = ref(false);
const btnRef = ref<HTMLElement | null>(null);

let offsetX = 0;
let offsetY = 0;
let elementWidth = 0;
let elementHeight = 0;

const startDrag = (e: PointerEvent) => {
  if (!btnRef.value) return;

  dragging.value = true;

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

  let newX = e.clientX - offsetX;
  let newY = e.clientY - offsetY;

  // 限制 X 軸範圍 (保持在視窗內)
  newX = Math.max(0, Math.min(newX, window.innerWidth - elementWidth));

  // 限制 Y 軸範圍
  newY = Math.max(0, Math.min(newY, window.innerHeight - elementHeight));

  position.value.x = newX;
  position.value.y = newY;
};

const stopDrag = () => {
  dragging.value = false;
  window.removeEventListener('pointermove', onDrag);
  window.removeEventListener('pointerup', stopDrag);
};

onMounted(async () => {
  await nextTick(); // 確保 btnRef 有大小

  if (!btnRef.value) return;
  const rect = btnRef.value.getBoundingClientRect();

  // 自動定位到右下角
  position.value.x = window.innerWidth - rect.width - 20;
  position.value.y = window.innerHeight - rect.height - 60;
});
</script>

<style lang="scss" scoped>
.draggable-btn {
  position: fixed;
  z-index: 100;
  cursor: grab;
  touch-action: none;
  /* 讓手機可拖動 */
}

.draggable-btn:active {
  cursor: grabbing;
}
</style>
