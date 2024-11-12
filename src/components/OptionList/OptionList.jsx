import React from 'react'
/** @jsxImportSource @emotion/react */
import * as s from './style';

function OptionList({ options, menuCart, setMenuCart }) {

    // 옵션 버튼 클릭 시, (옵션 버튼 클릭 x -> 기본 옵션으로 넣어줌)
    const handleOptionOnClick = (menuDetail, optionDetail) => {
        setMenuCart(menuCart => ({
            ...menuCart,
            options: menuCart.options.map(option => 
                option.optionId === menuDetail.option.optionId 
                ? 
                {
                    optionId: menuDetail.option.optionId,
                    optionName: menuDetail.option.optionName,
                    optionDetailId: optionDetail.optionDetailId,
                    optionDetailValue: optionDetail.optionDetailValue,
                    optionDetailPrice: optionDetail.optionDetailPrice,
                }
                : option
            )
        }));
    };

    return (
        <div css={s.optionDetail}>
        {
            options.map((menuDetail) => {
                return (
                    <div key={menuDetail.menuDetailId} css={s.options}>
                        <p>{menuDetail.option.optionName}</p>
                        <div css={s.buttons}>
                            {
                                menuDetail.option.optionDetail.map(optionDetail => 
                                    <button 
                                        key={optionDetail.optionDetailId} 
                                        onClick={() => handleOptionOnClick(menuDetail, optionDetail)}
                                        css={menuCart.options.filter(op => op.optionDetailId === optionDetail.optionDetailId).length > 0
                                            ? s.activeButton : ''}
                                        >
                                        {optionDetail.optionDetailValue}
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