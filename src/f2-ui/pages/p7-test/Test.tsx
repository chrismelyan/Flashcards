import React, {useState} from 'react';
import Checkbox from "../../common/checkbox/Checkbox";
import Input from "../../common/input/Input";
import Button from "../../common/button/Button";
import s from './Test.module.css'

const Test = () => {
    const [text, setText] = useState<string>('')
    const hello = () => {
        alert('Hello world')
    }

    return (
        <div>
            <div className={s.testWrapper}>
            <Input value={text} onChangeText={setText}/>
            <Checkbox> Example </Checkbox>
            <Button onClick={hello}> Send </Button>
            </div>
        </div>
    );
};

export default Test;