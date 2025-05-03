<template>
  <div class="flex flex-col gap-1">
    <label :for="name" class="text-sm font-medium text-gray-700">
      {{ label }}
      <span v-if="required" class="text-red-500">*</span>
    </label>
    <InputText
      :value="value"
      :type="type"
      :class="['w-full', { 'p-invalid': errorMessage }]"
      :placeholder="placeholder"
      @input="(e: Event) => handleChange((e.target as HTMLInputElement).value)"
      @blur="handleBlur"
    />
    <span v-if="errorMessage" class="text-sm text-red-500">{{ errorMessage }}</span>
  </div>
</template>

<script setup lang="ts">
import { useField } from 'vee-validate';
import InputText from 'primevue/inputtext';

interface Props {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  rules?: string;
  required?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
  type: 'text',
  placeholder: '',
  rules: '',
  required: false,
});

const { value, errorMessage, handleChange, handleBlur } = useField<string>(props.name, props.rules);
</script>
