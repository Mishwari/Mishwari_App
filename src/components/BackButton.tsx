import React, {FC, ReactNode} from 'react';
import { useHandleBack } from '@/hooks/useHandleBack';
import Image from 'next/image'

interface BackButtonProps {
  label?: string;
  className?: string;
  children?: ReactNode; // for nested content like icons or icons with text
  imageSrc?: string;
  imageAlt?: string;
}

const BackButton: FC<BackButtonProps> = ({className, children, imageSrc = '/icons/leftArrow_white.svg', imageAlt='Back' }) => {
    const handleBack = useHandleBack();

    return (
        <button
            className={`focus:outline-none ${className}`}
            onClick={handleBack}
        >
            {children? children : 
            <Image
            src={imageSrc}
            alt={imageAlt}
            height={30}
            width={30}
            className="rotate-180"
          />
            }
        </button>
    );
}

export default BackButton;