<script lang="ts" setup>
import { usersForm } from 'src/stores/AllPostReactive';
import { computed } from 'vue';

const userInfo = usersForm;
const usersInfoArr = computed(() => [
  { label: 'Username', modelValue: userInfo.value.username, col: `6` },
  { label: 'Role', modelValue: userInfo.value.username, col: `6` },
  { label: 'First Name', modelValue: userInfo.value.first_name, col: `6` },
  { label: 'Last Name', modelValue: userInfo.value.last_name, col: `6` },
]);

const roleLabel = (role_id: number | string | null | undefined) => {
  const roles: Record<number, string> = {
    1: 'Super Admin',
    2: 'Admin',
    3: 'Worker',
    4: 'Viewer',
  };
  return roles[Number(role_id)] || 'Viewer';
};
</script>

<template>
  <div class="row q-col-gutter-md">
    <div v-for="item in usersInfoArr" :key="item.label" :class="`col-${item.col}`">
      <q-input
        v-if="item.label === 'Role'"
        :model-value="roleLabel(item.modelValue)"
        :label="item.label"
        class="input-uppercase"
        outlined
        readonly
      />
      <q-input
        v-else
        :model-value="item.modelValue"
        :label="item.label"
        class="input-uppercase"
        outlined
        readonly
      />
    </div>
  </div>
</template>
