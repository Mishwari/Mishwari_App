import React, { useState } from 'react';

const countryList = [
  { value: 'US', label: 'United States', symbol: '🇺🇸', code: '+1', digitLength: 10 },
  { value: 'CA', label: 'Canada', symbol: '🇨🇦', code: '+1', digitLength: 10 },
  { value: 'GB', label: 'United Kingdom', symbol: '🇬🇧', code: '+44', digitLength: 10 },
  { value: 'DE', label: 'Germany', symbol: '🇩🇪', code: '+49', digitLength: 11 },
  { value: 'FR', label: 'France', symbol: '🇫🇷', code: '+33', digitLength: 9 },
  { value: 'AU', label: 'Australia', symbol: '🇦🇺', code: '+61', digitLength: 9 },
  { value: 'IN', label: 'India', symbol: '🇮🇳', code: '+91', digitLength: 10 },
  { value: 'CN', label: 'China', symbol: '🇨🇳', code: '+86', digitLength: 11 },
  { value: 'JP', label: 'Japan', symbol: '🇯🇵', code: '+81', digitLength: 10 },
  { value: 'ZA', label: 'South Africa', symbol: '🇿🇦', code: '+27', digitLength: 9 },
  { value: 'BR', label: 'Brazil', symbol: '🇧🇷', code: '+55', digitLength: 11 },
  { value: 'MX', label: 'Mexico', symbol: '🇲🇽', code: '+52', digitLength: 10 }
];

const PhoneNumberInput = () => {
  const [selectedCountry, setSelectedCountry] = useState(countryList[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(''); // Search functionality

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  const filteredCountryList = countryList.filter((country) =>
    country.label.toLowerCase().includes(searchTerm)
  );

  const handleCountryChange = (country) => {
    setSelectedCountry(country);
    setPhoneNumber('');
    setDropdownOpen(false);
    setSearchTerm(''); // Clear search term on selection
    setError('');
  };

  const handlePhoneNumberChange = (e) => {
    const value = e.target.value;
    const digitLimit = selectedCountry.digitLength;
    const regex = /^[0-9]*$/; // Allow only numbers

    if (regex.test(value)) {
      if (value.length <= digitLimit) {
        setPhoneNumber(value);
        setError('');
      } else {
        setError(`Phone number should not exceed ${digitLimit} digits.`);
      }
    } else {
      setError('Invalid format: Only numbers are allowed.');
    }
  };

  return (
    <div dir='ltr' className="flex justify-center items-center bg-blue-300 w-full h-screen">
      <div className="phone-input-container w-full bg-slate-300 p-10">
        <div className="flex items-center relative">
          {/* Country dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="p-2 bg-white border border-gray-300 w-max flex gap-2 justify-between items-center"
            >
              <span>{selectedCountry.symbol}</span> {/* Only symbol after selection */}
              <span>{dropdownOpen ? '▲' : '▼'}</span>
            </button>

            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-[300px] bg-white border border-gray-300 z-10">
                {/* Search input */}
                <input
                  type="text"
                  value={searchTerm}
                  onChange={handleSearchChange}
                  placeholder="Search country"
                  className="p-2 w-full border-b border-gray-300"
                />

                {/* Dropdown list */}
                <ul className="max-h-60 overflow-auto">
                  {filteredCountryList.map((country) => (
                    <li
                      key={country.value}
                      onClick={() => handleCountryChange(country)}
                      className="p-2 cursor-pointer hover:bg-gray-100 flex justify-between"
                    >
                      <span>{country.symbol} {country.label}</span> {/* Show symbol + label */}
                      <span>{country.code}</span>
                    </li>
                  ))}

                  {filteredCountryList.length === 0 && (
                    <li className="p-2 text-gray-500">No country found</li>
                  )}
                </ul>
              </div>
            )}
          </div>

          {/* Phone number input */}
          <div className="ml-2.5 flex items-center">
            <span className="mr-2 w-9 font-bold">{selectedCountry.code}</span>
            <input
              type="number"
              value={phoneNumber}
              onChange={handlePhoneNumberChange}
              placeholder={`Enter ${selectedCountry.digitLength} digits`}
              className="p-2.5 w-[150px] border border-gray-300"
            />
          </div>
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </div>
    </div>
  );
};

export default PhoneNumberInput;
