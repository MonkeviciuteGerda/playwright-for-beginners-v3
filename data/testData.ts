import { AddressProps } from '../types/types'

export const testUser = {
  email: 'jane.doe@test.com',
  password: 'jane.doe'
}

export const baseAddress = (name: string): AddressProps => {
  return {
    country: 'Country',
    name: name,
    mobileNumber: '123456789',
    zipCode: '12345',
    address: 'Address',
    city: 'City',
    state: 'State',
  }
}