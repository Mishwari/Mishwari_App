import React from 'react';
import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { SortItem } from '../../pages/bus_list/index' //type

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

interface SortDropdownProps {
    selectedSort:SortItem;
    sortList:SortItem[];
    setSelectedSort:React.Dispatch<React.SetStateAction<SortItem>>

}

const SortDropdown = ({ selectedSort, setSelectedSort, sortList }: SortDropdownProps) => {
    return (
        <Listbox value={selectedSort} onChange={setSelectedSort}>
            {({ open }) => (
                <>
                    <div className="relative">
                        <Listbox.Button className="flex gap-1 focus:outline-none">
                            <span className="">Sort: {selectedSort.name}</span>
                            <span className="items-center">
                                <Image
                                    src='/icons/downArrow.svg'
                                    alt='down arrow'
                                    width={25}
                                    height={25}
                                />
                            </span>
                        </Listbox.Button>

                        <Transition
                            show={open}
                            as={React.Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <Listbox.Options className="absolute mt-1 w-[100] bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                                {sortList.map((listItem) => (
                                    <Listbox.Option
                                        key={listItem.id}
                                        className={({ active }) =>
                                            classNames(
                                                active ? 'text-[#005687] bg-[lightblue]' : 'text-gray-900',
                                                'cursor-default select-none relative py-2 pl-3 pr-9 '
                                            )
                                        }
                                        value={listItem}
                                    >
                                        {({ selected, active }) => (
                                            <div className='flex w-max justify-between'>
                                                <span className={classNames(selected ? 'font-semibold' : 'font-normal', 'mr-4 block truncate')}>
                                                    {listItem.name}
                                                </span>

                                                {selectedSort.id == listItem.id && (
                                                    <span
                                                        className={classNames(
                                                            active ? 'text-white' : 'text-indigo-600',
                                                            'absolute inset-y-0 right-0 flex items-center pr-4 '
                                                        )}
                                                    >
                                                        <Image src='/icons/checkListIcon.svg' alt="checkListIcon" className="stroke-[blue]" width={20} height={20} />
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                    </Listbox.Option>
                                ))}
                            </Listbox.Options>
                        </Transition>
                    </div>
                </>
            )}
        </Listbox>
    );
}

export default SortDropdown;
