import React, {useState} from 'react';
import {Button,} from "@mui/material";
import classes from "./Card.module.css";
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Rating, {IconContainerProps} from '@mui/material/Rating';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@mui/icons-material/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import {styleBtn} from "../styles/commonMui";

type AnswerFormType = {
    loadingStatus: string
    onCancel: () => void
    onNextHandler: (grade: number) => void
}

const AnswerForm = ({loadingStatus, onCancel, onNextHandler}: AnswerFormType) => {
    const [value, setValue] = useState<number>(3);
    const customIcons: {
        [index: string]: {
            icon: React.ReactElement;
            label: string;
        };
    } = {
        1: {
            icon: <SentimentVeryDissatisfiedIcon/>,
            label: 'Very Dissatisfied',
        },
        2: {
            icon: <SentimentDissatisfiedIcon/>,
            label: 'Dissatisfied',
        },
        3: {
            icon: <SentimentSatisfiedIcon/>,
            label: 'Neutral',
        },
        4: {
            icon: <SentimentSatisfiedAltIcon/>,
            label: 'Satisfied',
        },
        5: {
            icon: <SentimentVerySatisfiedIcon/>,
            label: 'Very Satisfied',
        },
    };

    function IconContainer(props: IconContainerProps) {
        const {value, ...other} = props;
        return <span {...other}>{customIcons[value].icon}</span>;
    }

    return (
        <div>
            <div className={classes.ratingForm}>
                <FormControl>
                    <FormLabel id="grade-form" sx={{textAlign: 'left', margin: '5px'}}>Rate yourself:</FormLabel>
                    <Rating
                        name="highlight-selected-only"
                        value={value}
                        onChange={(event, newValue) => {
                            const value = newValue
                            if (value !== null) {
                                setValue(value)
                            }
                        }}
                        IconContainerComponent={IconContainer}
                        highlightSelectedOnly
                    />
                </FormControl>
            </div>
            <div className={classes.cardButtons}>
                <Button onClick={onCancel}
                        variant={'contained'}
                        disabled={loadingStatus === 'loading'}
                        sx={styleBtn}>
                    Cancel
                </Button>
                <Button onClick={() => onNextHandler(value)}
                        variant={'contained'}
                        disabled={loadingStatus === 'loading'}
                        sx={styleBtn}>
                    Next
                </Button>
            </div>
        </div>
    );
};

export default AnswerForm;