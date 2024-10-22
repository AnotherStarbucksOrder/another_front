import React, { useState } from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';

function OptionList({ menuInfo, selectedOptions, handleOptionOnClick}) {

    const [ isActiveOptions, setIsActiveOptions] = useState({}); // {"당도": "달게"};
    

    const handleClick = (optionDetailId, optionName, optionValue, optionPrice) => {
        setIsActiveOptions(options => ({
            ...options,
            [optionName]: optionDetailId
        }))
        handleOptionOnClick(optionName, optionValue, optionPrice)
    }

    return (
        <div css={s.optionDetail}>
        {
            menuInfo.data?.menuDetailList.map((menuDetail) => {
                return (
                    <div key={menuDetail.menuDetailId} css={s.options}>
                        <p>{menuDetail.option.optionName}</p>
                        <div css={s.buttons}>
                            {
                                menuDetail.option.optionDetail.map(option => 
                                    <button 
                                        key={option.optionDetailId} 
                                        value={option.optionDetailId}
                                        onClick={() => {
                                            handleClick(option.optionDetailId, menuDetail.option.optionName, option.optionDetailValue, option.optionDetailPrice)
                                        }}
                                        css={isActiveOptions[menuDetail.option.optionName] === option.optionDetailId 
                                            ? s.activeButton : ''}
                                        >
                                        {option.optionDetailValue}
                                    </button>
                                )
                            }
                        </div>
                    </div>
                )
            })
        }
    </div>
    )
}

export default OptionList;