import { ref, onMounted, onBeforeUnmount } from 'vue'

export function useDevice() {
  // Define size ranges for mobile, tablet, and desktop
  const isMobile = ref(false)
  const isTablet = ref(false)
  const isDesktop = ref(false)

  const updateDeviceType = () => {
    const width = window.innerWidth

    isMobile.value = width <= 425
    isTablet.value = width > 425 && width <= 768
    isDesktop.value = width > 768
  }

  // Update device type on component mount
  onMounted(() => {
    updateDeviceType()
    window.addEventListener('resize', updateDeviceType)
  })

  // Clean up event listener when the component is destroyed
  onBeforeUnmount(() => {
    window.removeEventListener('resize', updateDeviceType)
  })

  return {
    isMobile,
    isTablet,
    isDesktop,
  }
}
