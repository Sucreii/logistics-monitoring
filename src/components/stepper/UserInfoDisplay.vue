<script lang="ts" setup>
// import { ref } from 'vue'
import { usersForm } from 'src/stores/AllPostReactive';

const userInfo = usersForm;
console.log('User Info: ', userInfo);
</script>

<template>
  <div class="row q-col-gutter-md">
    <div class="col-6">
      <q-input :model-value="userInfo.first_name" label="First Name" outlined readonly />
    </div>

    <div class="col-6">
      <q-input :model-value="userInfo.last_name" label="Last Name" outlined readonly />
    </div>

    <div class="col-6">
      <q-input :model-value="userInfo.username" label="Username" outlined readonly />
    </div>

    <div class="col-6">
      <q-input
        :model-value="
          userInfo.role_id === 1
            ? 'Super Admin'
            : userInfo.role_id === 2
              ? 'Admin'
              : userInfo.role_id === 3
                ? 'Worker'
                : 'Viewer'
        "
        label="Role ID"
        outlined
        readonly
      />
    </div>
  </div>
</template>
