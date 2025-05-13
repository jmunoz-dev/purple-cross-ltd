import { useEmployeeStore } from './stores/employee'

export default {
  install: async () => {
    useEmployeeStore()
  },
}
