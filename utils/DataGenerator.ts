import { AddressProps } from '../types/types';

export const DataGenerator = new class DataGenerator {
  public addressData(name: string): AddressProps {
    return {
      country: 'Country',
      name,
      mobileNumber: '123456789',
      zipCode: '12345',
      address: 'Address',
      city: 'City',
      state: 'State',
    }
  }
}();
