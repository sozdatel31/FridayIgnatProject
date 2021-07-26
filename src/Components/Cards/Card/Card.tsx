import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ArrCardType } from '../../../api/packs-api';
import { DeleteItem } from '../../../Modal/DeleteModal';
import { UpdateItem } from '../../../Modal/UpdateModal';
import { cardsDeleteTC, cardsUpdateTC } from '../../../Redux/cards-reducer';
import { AppStateType } from '../../../Redux/store';
import s from './Card.module.css'

type PropsType = {
    card: ArrCardType
}

export function Card(props: PropsType) {
    const dispatch = useDispatch()

    const deleteCallback = () => {

        dispatch(cardsDeleteTC(props.card._id, props.card.cardsPack_id))
    }
    const updateCallback = (question: string) => {
        dispatch(cardsUpdateTC(props.card._id, props.card.cardsPack_id, question))
    }

    const userID = useSelector<AppStateType, string>(state => state.loginPage.userData._id)



    return <div className={s.packsBodyContainer} key={Math.random()}>
        <div className={s.packsChild2} style={{ width: "250px" }}>{props.card.question}</div>
        <div className={s.packsChild2} style={{ width: "250px" }}>{props.card.answer}</div>

        <div className={s.packsChild2} style={{ width: "100px" }}>{props.card.updated?.slice(0, 10)}</div>
        <div className={s.packsChild2} style={{ width: "100px" }}>{props.card.created?.slice(0, 10)}</div>
        <div className={s.packsChild2} style={{ width: "100px" }}>{Math.round(props.card.grade)}</div>
        <div className={s.packsChild2} style={{ width: "140px" }}>
            <DeleteItem disabled={userID !== props.card.user_id} callback={deleteCallback} />
            <UpdateItem callback={updateCallback}
                value={props.card.question}
                // value2 = {m.answer}
                disabled={userID !== props.card.user_id} />

        </div>
    </div>


}