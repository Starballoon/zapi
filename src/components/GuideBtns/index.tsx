import {useState} from 'react';
import {changeStudyTip, finishStudy} from '../../reducer/modules/user.ts';
import {useAppDispatch} from '../../utils.ts';
import {Button} from 'antd';

export default function GuideBtns({isLast}: { isLast?: boolean }) {
    const [_isLast] = useState<boolean | null>(isLast !== undefined ? isLast : null);
    const dispatch = useAppDispatch();
    const nextStep = () => {
        dispatch(changeStudyTip());
        if (_isLast) {
            dispatch(finishStudy());
        }
    };

    // 点击退出指引
    const exitGuide = () => {
        dispatch(finishStudy());
    };

    return (
        <div className="btn-container">
            <Button className="btn" type="primary" onClick={nextStep}>
                {_isLast ? '完 成' : '下一步'}
            </Button>
            <Button className="btn" type="dashed" onClick={exitGuide}>
                退出指引
            </Button>
        </div>
    );
}