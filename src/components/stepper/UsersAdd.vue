<script lang="ts" setup>
import { ref } from 'vue';
import { CreateAdditionalUsers } from 'src/utils';
import { usersForm } from 'src/stores/AllPostReactive';

const userInfo = ref(usersForm);
const seePwd = ref(true);
const roleOptions = [
  { label: 'Super Admin', value: 1 },
  { label: 'Admin', value: 2 },
  { label: 'Worker', value: 3 },
  { label: 'Viewer', value: 4 },
];

console.log('User Info: ', userInfo);
</script>

<template>
  <div class="row q-col-gutter-sm">
    <div v-for="field in CreateAdditionalUsers" :class="`col-${field.col}`" :key="field.model">
      <div class="row">
        <div class="col-12">
          <div class="text-subtitle3 text-grey-8">{{ field.label }}</div>
        </div>

        <div class="col-12">
          <q-select
            v-if="field.model === 'role_id'"
            v-model="userInfo[field.model as keyof typeof userInfo]"
            :options="roleOptions"
            option-label="label"
            option-value="value"
            emit-value
            map-options
            placeholder="Select Role"
            :rules="field.rules"
            dense
            outlined
            clearable
          />
          <q-input
            v-else-if="field.model !== 'role_id'"
            v-model="userInfo[field.model as keyof typeof userInfo]"
            :type="field.model === 'password' ? (seePwd ? 'password' : 'text') : field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            dense
            outlined
            clearable
          >
            <!-- 👁 Toggle icon only for password -->
            <template v-if="field.model === 'password'" #append>
              <q-icon
                :name="seePwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="seePwd = !seePwd"
              />
            </template>
          </q-input>
          <q-input
            v-else
            v-model="userInfo[field.model as keyof typeof userInfo]"
            :type="field.type"
            :placeholder="field.placeholder"
            :rules="field.rules"
            dense
            outlined
            clearable
          />
        </div>
      </div>
    </div>
  </div>
</template>
