import React, { useState } from 'react';
import axios from 'axios';
import { ResponseHandler } from '../helpers/responseHandler';

export const Api = (module = undefined) => {
    const storageKey = 'tr-app-storage';
    const [ entities, setEntities ] = useState([]);
    const [filter, setFilter] = useState(null);
    const [ numItems, setNumItems ] = useState(null);
    const { errorHandler } = ResponseHandler();

    const list = async (data={}, mod = undefined) => {

        return axios
            .post(`${axios.defaults.baseURL}api/${module || mod}/list`, JSON.stringify(filterStorage(data)))
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
            .post(`${axios.defaults.baseURL}api/${module}/save`, JSON.stringify(data))
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    const find = async (id) => {

        return axios
            .post(`${axios.defaults.baseURL}api/${module}/find/${id}`)
            .then(function (response) {
                return response.data;
            }.bind(this))
            .catch(errorHandler.bind(this));

    }

    const remove = async (id) => {

        return axios
            .post(`${axios.defaults.baseURL}api/${module}/remove/${id}`)
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