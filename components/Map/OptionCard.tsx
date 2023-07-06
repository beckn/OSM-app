import React from 'react'
import { IconType } from 'react-icons'
import cs from 'classnames'
import { useLanguage } from '../../hooks/useLanguage'
import { Image } from '@chakra-ui/react'
import { toast } from 'react-toastify'

type OptionMeta = {
    tagValue: string
    tagName: string
    title?: string
}

type OptionIcons = {
    iconUrl: string
    iconUrlLight: string
}

interface OptionCardProps {
    optionMeta: OptionMeta
    optionIcons: OptionIcons
    isSelected?: boolean
    setOption: React.Dispatch<React.SetStateAction<OptionMeta>>
}

const OptionCard: React.FC<OptionCardProps> = ({
    optionMeta: { tagName, tagValue, title },
    optionIcons: { iconUrl, iconUrlLight },
    isSelected,
    setOption,
}) => {
    const { t } = useLanguage()
    return (
        <div
            className="text-center"
            onClick={(e) => {
                setOption({ tagName, tagValue })
            }}
        >
            <div
                className={cs(
                    'mb-2 min-w-[40px] min-h-[40px]  rounded-xl p-3 shadow-custom',
                    { ['bg-palette-primary']: isSelected },
                    { ['bg-white']: !isSelected }
                )}
            >
                <Image
                    src={isSelected ? iconUrlLight : iconUrl}
                    alt="Icon"
                />
            </div>
            <p
                className={cs('text-xs', {
                    ['text-palette-primary']: isSelected,
                })}
            >
                {t[`${title}`]}
            </p>
        </div>
    )
}

export default OptionCard
