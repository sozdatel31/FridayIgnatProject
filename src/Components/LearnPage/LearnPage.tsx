import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect, useParams } from "react-router-dom";
import { ArrCardType } from "../../api/packs-api";
import { cardsTC, setGradeTC } from "../../Redux/cards-reducer";
import { authTC } from "../../Redux/login-reducer";
import { AppStateType } from "../../Redux/store";
import { PATH } from "../../Routes";
import SuperButton from "../../SuperComponents/c2-SuperButton/SuperButton";
import s from './LearnPage.module.css'

const grades = ['dont know', "i'm forgot", 'I thought', 'almost correct', 'I know'];

const getCard = (cards: ArrCardType[]) => {
    const sum = cards.reduce((acc, card) => acc + (6 - card.grade) * (6 - card.grade), 0);
    const rand = Math.random() * sum;
    const res = cards.reduce((acc: { sum: number, id: number }, card, i) => {
        const newSum = acc.sum + (6 - card.grade) * (6 - card.grade);
        return { sum: newSum, id: newSum < rand ? i : acc.id }
    }
        , { sum: 0, id: -1 });
    console.log('test: ', sum, rand, res)

    return cards[res.id + 1];
}

const LearnPage = () => {
    const isAuth = useSelector<AppStateType, string>(state => state.loginPage.isAuth)
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [first, setFirst] = useState<boolean>(true);
    // const [first, setFirst] = useState<boolean>(0);
    const { cards } = useSelector((state: AppStateType) => state.cards);
    const { id } = useParams<{ id: string }>()

    const [card, setCard] = useState<ArrCardType>({
        answer: 'answer fake',
        question: 'question fake',
        cardsPack_id: '',
        grade: 0,
        shots: 0,
        user_id: '',
        created: '',
        updated: '',
        _id: 'fake'
    });

    const dispatch = useDispatch();
    useEffect(() => {
        //dispatch(cardsTC(id))

        if (first) {
            dispatch(cardsTC(id));
            setFirst(false);
        }

        console.log('cards', cards)
        if (cards.length > 0) setCard(getCard(cards));

        return () => {
            console.log('LearnContainer useEffect off');
        }
    }, [dispatch, id,
        // dispatch, id, cards, first
    ]);

    useEffect(() => {
        if (!isAuth)
            dispatch(authTC())
    }, [isAuth])

    const onNext = () => {
        setIsChecked(false);

        if (cards.length > 0) {
            // dispatch
            setCard(getCard(cards));
        } else {

        }
    }
    if (isAuth === "") { return <Redirect to={"/login"} />; }
    return (
        <div className={s.container}>
            <div className={s.title}>Go To Learn!!</div>
            <br />
            <div className={s.question}> <b>Question:</b> {card.question}</div>
            <br />
            <div className={s.control}>
                <NavLink to={PATH.PACKS_PAGE}>   <SuperButton onClick={() => { }} className={s.cancelBtn}>Cancel</SuperButton> </NavLink>

                <SuperButton onClick={() => setIsChecked(true)} style={{ width: "188px" }}>Check</SuperButton>
            </div>

            {isChecked && (
                <>
                    <div className={s.question}> <b>Answer: </b>{card.answer}</div>
                    <div className={s.checkBlock}>
                        {grades.map((g, i) => (
                            <SuperButton key={'grade-' + i} className={s.answerBtn} style={{ opacity: `${i / 10 + 0.6}` }} onClick={() => {
                                dispatch(setGradeTC(card._id, i + 1))
                            }}>{g}</SuperButton>
                        ))}
                    </div>
                    <div>Your Grade for this question: <b>{card.grade}</b></div>
                    <div>Your attempts for this question:   <b>{card.shots}</b></div>
                    <div className={s.control}>
                        <NavLink to={PATH.PACKS_PAGE}>   <SuperButton onClick={() => { }} className={s.cancelBtn}>Cancel</SuperButton> </NavLink>
                        <SuperButton onClick={onNext} style={{ width: "188px" }}>next</SuperButton>
                    </div>
                </>
            )}
        </div>
    );
};

export default LearnPage;