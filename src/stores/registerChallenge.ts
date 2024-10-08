import { defineStore } from 'pinia';

// types
import { FormPersonalDetailsFields } from '../components/types/Form';

const emptyFormPersonalDetails: FormPersonalDetailsFields = {
  firstName: '',
  lastName: '',
  email: '',
  nickname: '',
  gender: '',
  newsletter: [],
  terms: true,
};

/**
 * Store for the register challenge page.
 * Holds form values and selected options.
 */
export const useRegisterChallengeStore = defineStore('registerChallenge', {
  state: () => ({
    personalDetails: emptyFormPersonalDetails,
    payment: null, // TODO: add data type options
    participation: null, // TODO: add data type options
    organizationId: '',
    addressId: '',
  }),

  getters: {
    getAddressId: (state): string => state.addressId,
    getOrganizationId: (state): string => state.organizationId,
    getPersonalDetails: (state): FormPersonalDetailsFields =>
      state.personalDetails,
  },

  actions: {
    setFormAddressId(addressId: string) {
      this.addressId = addressId;
    },
    setFormOrganizationId(organizationId: string) {
      this.organizationId = organizationId;
    },
    setPersonalDetails(personalDetails: FormPersonalDetailsFields) {
      Object.assign(this.personalDetails, personalDetails);
    },
  },

  persist: true,
});
