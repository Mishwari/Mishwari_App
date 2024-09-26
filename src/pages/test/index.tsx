import React, { useState } from 'react';
import Select from 'react-select';
import emojiFlags from 'emoji-flags';

const countryList = [
  { value: 'US', label: '🇺🇸 United States +1', code: '+1', digitLength: 10 },
  { value: 'CA', label: '🇨🇦 Canada +1', code: '+1', digitLength: 10 },
  { value: 'GB', label: '🇬🇧 United Kingdom +44', code: '+44', digitLength: 10 },
  { value: 'DE', label: '🇩🇪 Germany +49', code: '+49', digitLength: 11 },
  { value: 'FR', label: '🇫🇷 France +33', code: '+33', digitLength: 9 },
  { value: 'AU', label: '🇦🇺 Australia +61', code: '+61', digitLength: 9 },
  { value: 'IN', label: '🇮🇳 India +91', code: '+91', digitLength: 10 },
  { value: 'CN', label: '🇨🇳 China +86', code: '+86', digitLength: 11 },
  { value: 'JP', label: '🇯🇵 Japan +81', code: '+81', digitLength: 10 },
  { value: 'ZA', label: '🇿🇦 South Africa +27', code: '+27', digitLength: 9 },
  { value: 'BR', label: '🇧🇷 Brazil +55', code: '+55', digitLength: 11 },
  { value: 'MX', label: '🇲🇽 Mexico +52', code: '+52', digitLength: 10 }
];

const PhoneNumberInput = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [phoneNumber, setPhoneNumber] = useState(selectedCountry.code);
  const [error, setError] = useState('');

  const handleCountryChange = (selectedOption) => {
    setSelectedCountry(selectedOption);
    setPhoneNumber(selectedOption.code); // Reset phone number with country code
    setError('');
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    console.log(value);
    const regex = new RegExp(`\\${selectedCountry.code}[0-9]*$`)

    // Only allow digits and respect country-specific digit length
    if (regex.test(value)) {
      // Validate that length doesn't exceed the allowed number of digits
      if (value.length <= selectedCountry.code.length + selectedCountry.digitLength) {
        setPhoneNumber(value);
        setError(''); // Clear error if valid
      } else {
        setError(`Phone number should not exceed ${selectedCountry.digitLength} digits after the code.`);
      }
    } else {
      setError('Invalid format: Phone number must start with the country code and contain only numbers.');
    }
  };

  return (
    <div className='flex justify-center items-center bg-blue-300 w-full h-screen'>

    <div dir="ltr" className=" phone-input-container w-full  bg-slate-300 p-10">
      <div className='flex items-center'>
        <Select
          value={selectedCountry}
          onChange={handleCountryChange}
          options={countryList}
          isSearchable
          getOptionLabel={(option) => `${option.label}`}
          getOptionValue={(option) => option.value}
          className='provided+ w-[200px]'
        />
        <input
          type="text"
          value={phoneNumber}
          onChange={handlePhoneNumberChange}
          className='p-2.5 ml-2.5 w-2-5'
          
        />
      </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
    </div>
  );
};

export default PhoneNumberInput;
