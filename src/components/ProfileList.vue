<template>
  <div class="profile-list">
    <ProfileListItem
      v-for="(profile, index) in profiles"
      :key="index"
      :profile="profile"
      :subscription="subscriptions.find(subscription => subscription.profileId === profile.id)"
    />
  </div>
</template>

<script>
import ProfileListItem from './ProfileListItem.vue';
export default {
  name: 'ProfileList',
  components: {
    ProfileListItem
  },
  props: {
    profiles: {
      type: Array,
      required: true
    },
    subscriptions: {
      type: Array,
      required: true
    }
  },
}
</script>