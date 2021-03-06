import React, { useState, useEffect } from 'react';

import { IoDocumentTextOutline } from 'react-icons/io5';

import { useAppDispatch, useAppSelector } from '../../../app/hooks';

import Form from '../../Form/Form';
import Table from '../../Table/Table';

import { setRequestCount, filterUsers } from '../../../app/slices/tableSlice';

import './mainPage.scss';

// /. imports

const MainPage: React.FC = () => {

    const {
        requestСount,
        isTableDataLoading,
        tableData,
        isMainPage
    } = useAppSelector(state => state.tableSlice);

    const [text, setText] = useState<string>('заявок');

    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(setRequestCount(tableData.length));
        if (requestСount >= 5 || requestСount === 0) {
            setText('заявок');
        } else if (requestСount >= 2 || requestСount <= 4) {
            setText('заявки');
        } else if (requestСount === 1) {
            setText('заявка');
        };
    }, [requestСount, tableData]);

    useEffect(() => {
        return () => {
            dispatch(filterUsers({ name: 'ID', value: '' }));
            dispatch(filterUsers({ name: 'FIO', value: '' }));
            dispatch(filterUsers({ name: 'BIRTH', value: '' }));
            dispatch(filterUsers({ name: 'PHONE', value: '' }));
        };
    }, [isMainPage]);

    return (
        <div className="main-page">
            <div className="main-page__wrapper">
                <div className="result">
                    <div className="result__wrapper">
                        <IoDocumentTextOutline size={'34px'} color={'#000'} />
                        <h1 className="result__text">{isTableDataLoading ? '0' : requestСount} {text}</h1>
                    </div>
                </div>
                <Form />
                <Table />
            </div>
        </div>
    );
};

export default MainPage;
