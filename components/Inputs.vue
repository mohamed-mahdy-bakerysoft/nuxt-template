<script setup lang="ts">
defineProps(['data', 'formData', 'error', 'disabled'])
</script>
<template>
  <div
    class="inputs flex items-start flex-wrap gap-[8px]"
    v-for="item in formData"
    :class="item.class"
  >
    <div class="flex-1">
      <BaseTextField
        v-if="item.type === 'textField'"
        v-model="data[item.key]"
        class="w-full"
        :errorMessage="error && error[item.key]"
        v-bind="item.props || {}"
        :disabled="disabled"
        :label="item.label"
      >
        <template v-if="item.appendIconText || item.appendIcon" v-slot:appendIcon="props">
          <div
            v-bind="props"
            class="py-1 px-2 rounded-lg bg-blueGray-light-200 flex items-center justify-center"
          >
            <p class="font-bold" v-if="item.appendIconText">{{ item.appendIconText }}</p>
            <BaseIcons :name="item.appendIcon" v-if="item.appendIcon" />
          </div>
        </template>
      </BaseTextField>
      <BaseSelect
        v-if="item.type === 'selectField'"
        v-model="data[item.key]"
        :options="item.options"
        v-bind="item.props || {}"
        :disabled="disabled"
        :label="item.label"
      />

      <BaseDatePicker
        v-model="data[item.key]"
        v-if="item.type == 'datePicker'"
        v-bind="item.props || {}"
        :disabled="disabled"
        :errorMessage="error[item.key]"
        :label="item.label"
      />
      <BaseTextArea
        v-if="item.type === 'textArea'"
        v-model="data[item.key]"
        class="w-full"
        variant="underlined"
        :error-messages="error[item.key]"
        v-bind="item.props || {}"
        :disabled="disabled"
        :label="item.label"
      />
    </div>
  </div>
</template>
