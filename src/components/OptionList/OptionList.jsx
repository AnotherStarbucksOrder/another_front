import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';

function OptionList({ menuInfo, handleOptionOnClick }) {

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
                                        onClick={() => {handleOptionOnClick(menuDetail.option.optionName, option.optionDetailValue, option.optionDetailPrice)}}
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