<template>
  <component
    class="dropdown"
    :is="tag"
    :class="[
      { show: isOpen },
      { dropdown: direction === 'down' },
      { dropup: direction === 'up' }
    ]"
    aria-haspopup="true"
    :aria-expanded="isOpen"
    @click="toggleDropDown"
    v-click-outside="closeDropDown"
  >
    <slot name="title">
      <h4> 
        <a
          style="color: black"
          class="dropdown-toggle nav-link"
          :class="{ 'no-caret': hideArrow }"
          data-toggle="dropdown"
        >
          <i class="black" :class="icon"></i>
          <span class="no-icon black">{{ title }}</span>
        </a>
      </h4>
    </slot>
    <ul
      class="dropdown-menu"
      :class="[
        { 'dropdown-menu-right': position === 'right' },
        { show: isOpen }
      ]"
    >
      <slot></slot>
    </ul>
  </component>
</template>
<script>
export default {
  name: 'drop-down',
  props: {
    direction: {
      type: String,
      default: 'down'
    },
    title: String,
    icon: String,
    position: String,
    hideArrow: Boolean,
    tag: {
      type: String,
      default: 'li'
    }
  },
  data() {
    return {
      isOpen: false
    };
  },
  provide() {
    return {
      closeDropDown: this.closeDropDown
    }
  },
  methods: {
    toggleDropDown() {
      this.isOpen = !this.isOpen;
      this.$emit('change', this.isOpen);
    },
    closeDropDown() {
      this.isOpen = false;
      this.$emit('change', this.isOpen);
    }
  }
};
</script>
<style>
.dropdown {
  list-style-type: none;
}

.dropdown .dropdown-toggle {
  cursor: pointer;
}

.black {
  color: black;
}
</style>
