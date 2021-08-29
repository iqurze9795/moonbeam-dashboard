<template>
  <li
    v-if="canViewVerticalNavMenuLink(item)"
    class="nav-item"
    :class="{
      active: isActive,
      disabled: item.disabled,
    }"
  >
    <b-link v-bind="linkProps" class="d-flex align-items-center">
      <feather-icon :icon="item.icon || 'CircleIcon'" />
      <span class="menu-title text-truncate">{{ t(item.title) }}</span>
      <span class="badge mr-1 ml-auto badge-danger badge-pill" v-show="item.command && notification > 0">{{
        notification
      }}</span>
      <b-badge v-if="item.tag" pill :variant="item.tagVariant || 'primary'" class="mr-1 ml-auto">
        {{ item.tag }}
      </b-badge>
    </b-link>
  </li>
</template>

<script>
import { useUtils as useAclUtils } from "@core/libs/acl"
import { BLink, BBadge } from "bootstrap-vue"
import { useUtils as useI18nUtils } from "@core/libs/i18n"
import useVerticalNavMenuLink from "./useVerticalNavMenuLink"
import mixinVerticalNavMenuLink from "./mixinVerticalNavMenuLink"

export default {
  components: {
    BLink,
    BBadge,
  },
  mixins: [mixinVerticalNavMenuLink],
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const { isActive, linkProps, updateIsActive } = useVerticalNavMenuLink(props.item)
    const { t } = useI18nUtils()
    const { canViewVerticalNavMenuLink } = useAclUtils()
    const { command } = props.item
    let { action, getter } = ["", ""]
    if (command) {
      action = command.action
      getter = command.getter
    }

    return {
      isActive,
      linkProps,
      action,
      getter,
      updateIsActive,

      // ACL
      canViewVerticalNavMenuLink,

      // i18n
      t,
    }
  },
  computed: {
    notification() {
      return this.$store.getters[this.getter] || 0
    },
  },
}
</script>
