<script setup>
import useDisclose from '@/composables/useDisclose'
const { isOpen, onOpen, onClose } = useDisclose()

const buttonGroups = [
  {
    variant: '',
    buttons: [
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'large', disabled: true }
    ]
  },
  {
    variant: 'primary',
    buttons: [
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'large', disabled: true }
    ]
  },
  {
    variant: 'secondary',
    buttons: [
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'large', disabled: true }
    ]
  },
  {
    variant: 'tertiary',
    buttons: [
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'large', disabled: true }
    ]
  },
  {
    variant: 'text',
    buttons: [
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'large', disabled: true }
    ]
  },
  {
    variant: 'textGradient',
    buttons: [
      { size: 'small' },
      { size: 'default' },
      { size: 'large' },
      { size: 'large', disabled: true }
    ]
  }
]
const tab = ref(2)
const tabs = ['Tab 1', 'Tab 2', 'Tab 333333333']
const currentPage = ref(1)
const pageCount = ref(10)
const options = [
  { title: 'Option 1', value: '1' },
  { title: 'Option 2', value: '2' },
  { title: 'Option 3', value: '3' }
]
</script>

<template>
  <div
    v-for="group in buttonGroups"
    :key="group.type"
    class="p-[12px] flex flex-row gap-2 items-center"
  >
    <BaseButton
      v-for="button in group.buttons"
      :key="button.size"
      :class="`${button.size}`"
      :disabled="button.disabled"
      :variant="group.variant"
    >
      Button
    </BaseButton>
  </div>

  <div class="flex gap-2 flex-wrap">
    <BaseTextField placeholder="Placeholder" class="mt-6" />
    <BaseTextField label="Label" placeholder="Placeholder" />
    <BaseTextField label="Label" placeholder="Placeholder" disabled />
    <BaseTextField label="Label" placeholder="Placeholder" errorMessage="Error message" />
  </div>
  <div class="flex gap-2 flex-wrap">
    <BaseTextArea placeholder="Placeholder" class="mt-6" />
    <BaseTextArea maxLength="300" label="Label" placeholder="Placeholder" />
    <BaseTextArea label="Label" placeholder="Placeholder" disabled />
    <BaseTextArea label="Label" placeholder="Placeholder" errorMessage="Error message" />
  </div>
  <div class="flex gap-2">
    <BaseTooltip placement="top">
      <template #default>
        <BaseButton size="medium">Tooltip</BaseButton>
      </template>
      <template #content>
        <div>Item 1</div>
      </template>
    </BaseTooltip>
    <BaseChip>Chip</BaseChip>
    <BaseChip color="success">Success</BaseChip>
    <BaseChip color="error">Error</BaseChip>
    <BaseChip color="info">Info</BaseChip>
    <BaseBadge>1</BaseBadge>
    <BaseBadge color="success">1</BaseBadge>
    <BaseBadge color="error">1</BaseBadge>
    <BaseBadge color="info">1</BaseBadge>
    <BaseButton size="medium" @click="onOpen">Modal</BaseButton>
    <BaseModal :isOpen="isOpen" :onClose="onClose">
      <template #header>
        <div>ModalHeader</div>
      </template>
      <div>ModalContent</div>
    </BaseModal>

    <BaseCheckbox> <template #prepend>Label</template> </BaseCheckbox>
    <BaseCheckbox class="w-full"> Label </BaseCheckbox>
  </div>
  <div class="flex flex-col gap-12">
    <BaseTabs v-model="tab" :items="tabs" type="vertical" />
    <BaseTabs v-model="tab" :items="tabs" />
    <BaseWindow v-model="tab" class="h-[400px]">
      <BaseWindowItem :value="0">Content 1</BaseWindowItem>
      <BaseWindowItem :value="1">Content 2</BaseWindowItem>
      <BaseWindowItem :value="2">Content 3</BaseWindowItem>
    </BaseWindow>
  </div>

  <div class="flex gap-2 flex-wrap mt-2">
    <BaseIcons name="Close" />
    <BaseSelect placeholder="Placeholder" class="mt-4" :options="options" />
    <BaseSelect label="Label" placeholder="Placeholder" :options="options" />
    <BaseSelect label="Multiple" placeholder="Placeholder" multiple :options="options" />
    <BaseSelect label="Label" placeholder="Placeholder" disabled :options="options" />
    <BaseSkeleton />
    <BaseSkeleton type="avatar" />
    <BaseDropUpload accept="video/mp4" description="description" />
  </div>
  <div>
    <BaseDropdown>
      <BaseButton size="medium">Dropdown</BaseButton>
      <template #content>
        <div>Item 1</div>
        <div>Item 2</div>
        <div>Item 3</div>
      </template>
    </BaseDropdown>
    <BaseProgressLinear value="90" />
    <BaseProgressCircular value="50" />
    <BaseProgressCircular rotate class="text-primary-500" />
  </div>
  <div class="flex gap-4">
    <BaseAvatar
      size="sm"
      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2430d959-ea06-470f-a7c4-45c9d358e25f/dg4w17r-4e2a0d83-063a-4185-8135-0660e4e87ade.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0MzBkOTU5LWVhMDYtNDcwZi1hN2M0LTQ1YzlkMzU4ZTI1ZlwvZGc0dzE3ci00ZTJhMGQ4My0wNjNhLTQxODUtODEzNS0wNjYwZTRlODdhZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.l8d8rYZP8hXP-wDYqBgmlQ2OVcoJZ9N2VMOfJfZVsfY"
    />
    <BaseAvatar
      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2430d959-ea06-470f-a7c4-45c9d358e25f/dg4w17r-4e2a0d83-063a-4185-8135-0660e4e87ade.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0MzBkOTU5LWVhMDYtNDcwZi1hN2M0LTQ1YzlkMzU4ZTI1ZlwvZGc0dzE3ci00ZTJhMGQ4My0wNjNhLTQxODUtODEzNS0wNjYwZTRlODdhZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.l8d8rYZP8hXP-wDYqBgmlQ2OVcoJZ9N2VMOfJfZVsfY"
    />

    <BaseAvatar
      size="lg"
      src="https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/2430d959-ea06-470f-a7c4-45c9d358e25f/dg4w17r-4e2a0d83-063a-4185-8135-0660e4e87ade.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7InBhdGgiOiJcL2ZcLzI0MzBkOTU5LWVhMDYtNDcwZi1hN2M0LTQ1YzlkMzU4ZTI1ZlwvZGc0dzE3ci00ZTJhMGQ4My0wNjNhLTQxODUtODEzNS0wNjYwZTRlODdhZGUucG5nIn1dXSwiYXVkIjpbInVybjpzZXJ2aWNlOmZpbGUuZG93bmxvYWQiXX0.l8d8rYZP8hXP-wDYqBgmlQ2OVcoJZ9N2VMOfJfZVsfY"
    />
    <BaseAvatar
      number="8"
      size="lg"
      src="https:81130272136461_7329584774974077295_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=efb6e6&_nc_ohc=GpxrPSaN4GQAX8tzaJf&_nc_ht=scontent.fsgn5-8.fna&oh=00_AfCbvqhCMZTdL13pYaZnUwXVUCS6-HqDgxrvfDBWfEREcA&oe=65D840AC"
    />
  </div>
  <div>
    <BasePagination :currentPage="currentPage" :pageCount="pageCount" />
  </div>
</template>
