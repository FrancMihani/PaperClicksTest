import { required, email, requiredIf, numeric } from '@vuelidate/validators'
import { isIRI } from '@/utils/validations'

const UserSchema = (isUsingGoogleLocation: boolean) => ({
  id: {},
  name: { required },
  username: { required },
  email: { required, email },
  address: {
    street: { required },
    suite: {},
    city: { required },
    zipcode: { required },
    geo: {
      lat: { required: requiredIf(isUsingGoogleLocation) },
      lng: { required: requiredIf(isUsingGoogleLocation) },
    },
  },
  phone: { required, numeric },
  // website: { required, isIRI },
})

export default UserSchema
