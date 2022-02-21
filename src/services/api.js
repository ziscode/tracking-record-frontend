import React, { useState } from 'react';
import axios from 'axios';
import { errorHandler } from '../helpers/errorhandler';

export const Api = (module = undefined) => {
    const storageKey = 'tr-app-storage';
    const API_URL='http://localhost/tracking-record/backend/public/';
    const [ entities, setEntities ] = useState([]);
    const [filter, setFilter] = useState(null);
    const [ numItems, setNumItems ] = useState(null);

    const list = async (data={}, mod = undefined) => {
        
        return axios
            .post(`${API_URL}api/${module || mod}/list`, JSON.stringify(filterStorage(data)))
            .then(function (response) {
                if (response.data) {
                    setEntities(response.data.list);
                    setNumItems(response.data.numItems);
                    return response.data;
                }
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    const save = async (data = {}) => {

        return axios
            .post(`${API_URL}api/${module}/save`, JSON.stringify(data))
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    const find = async (id) => {

        return axios
            .post(`${API_URL}api/${module}/find/${id}`)
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    const remove = async (id) => {

        return axios
            .post(`${API_URL}api/${module}/remove/${id}`)
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    const filterStorage = (data, module) => {
        let key = storageKey+module;
        let  localStorageFilter = JSON.parse(localStorage.getItem(key));
        
        if (!localStorageFilter)
            localStorageFilter = {};

        let localFilters = !filter ? {} : filter;

        Object.entries(localFilters).forEach(field => (field[0] in data) == false ? data[field[0]] = "" : null);
        Object.entries(data).forEach(field => localFilters[field[0]] = field[1]);

        setFilter(localFilters);

        localStorageFilter[storageKey] = localFilters;
        localStorage.setItem(key, JSON.stringify(localStorageFilter));

        return localFilters;
    }

    return {
        entities,
        numItems,
        list,
        save,
        find,
        remove
    }

}